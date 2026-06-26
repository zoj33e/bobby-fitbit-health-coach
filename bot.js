const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Client: McpClient } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const WORK_DIR = process.env.WORK_DIR || __dirname;
const COACH_FILE = path.join(WORK_DIR, 'COACH.md');

const MOON_EMOJI = '🌙';
const CROSS_EMOJI = '❌';

if (!BOT_TOKEN || !CHANNEL_ID || !GEMINI_API_KEY) {
    console.error(`${CROSS_EMOJI} Missing env vars: DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID, GEMINI_API_KEY`);
    process.exit(1);
}

// ── Gemini ────────────────────────────────────────────────────────────────────
const genai = new GoogleGenerativeAI(GEMINI_API_KEY);
const gemini = genai.getGenerativeModel({ model: 'gemini-2.5-flash' });

// ── MCP Client Singleton ──────────────────────────────────────────────────────
let _mcpClient = null;
let _mcpConnecting = null;

async function getMcpClient() {
    if (_mcpClient) return _mcpClient;
    if (_mcpConnecting) return _mcpConnecting;

    _mcpConnecting = (async () => {
        console.log('[MCP] Connecting to google-health-mcp...');
        const isWin = process.platform === 'win32';
        const transport = new StdioClientTransport({
            command: isWin ? 'cmd' : 'npx',
            args: isWin
                ? ['/c', 'npx', '--yes', 'google-health-mcp-unofficial']
                : ['--yes', 'google-health-mcp-unofficial']
        });

        transport.onclose = () => {
            console.log('[MCP] Disconnected, will reconnect on next call.');
            _mcpClient = null;
            _mcpConnecting = null;
        };

        const mcp = new McpClient({ name: 'health-bot', version: '1.0.0' }, { capabilities: {} });
        await mcp.connect(transport);
        console.log('[MCP] Connected.');
        _mcpClient = mcp;
        _mcpConnecting = null;
        return _mcpClient;
    })();

    return _mcpConnecting;
}

async function callTool(name, args) {
    const mcp = await getMcpClient();
    const result = await mcp.callTool({ name, arguments: args });
    return result.content?.[0]?.text ?? JSON.stringify(result.content);
}

// ── Health Data (all fetched in parallel) ─────────────────────────────────────
async function fetchHealthData() {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];

    console.log('[Health] Fetching all metrics in parallel...');
    const [wellness, sleep, heartRate, rhr, steps, weekly] = await Promise.all([
        callTool('google_health_wellness_context', { days: 7, timezone: 'Asia/Bangkok', response_format: 'json' }),
        // list_data_points for sleep: returns full sessions regardless of midnight boundaries
        callTool('google_health_list_data_points', { data_type: 'sleep', page_size: 3, response_format: 'json' }),
        // list_data_points for heart-rate: recent samples (overnight context)
        callTool('google_health_list_data_points', { data_type: 'heart-rate', page_size: 200, response_format: 'json' }),
        callTool('google_health_list_data_points', { data_type: 'daily-resting-heart-rate', page_size: 7, response_format: 'json' }),
        callTool('google_health_daily_rollup', { data_type: 'steps', start_date: today, end_date: today, response_format: 'json' }),
        callTool('google_health_weekly_summary', { days: 7, timezone: 'Asia/Bangkok', response_format: 'json' }),
    ]);
    console.log('[Health] All metrics fetched.');

    return { wellness, sleep, heartRate, rhr, steps, weekly };
}

// ── Conversation Memory ───────────────────────────────────────────────────────
const userHistory = new Map(); // userId -> { history: [...], timestamp }
const HISTORY_TTL = 30 * 60 * 1000; // 30 min
const MAX_HISTORY_TURNS = 6; // 3 exchanges (user + model pairs)

function getHistory(userId) {
    const stored = userHistory.get(userId);
    if (!stored || Date.now() - stored.timestamp > HISTORY_TTL) return [];
    return stored.history;
}

function saveHistory(userId, history) {
    userHistory.set(userId, { history, timestamp: Date.now() });
}

// ── Generation ────────────────────────────────────────────────────────────────
async function generateBriefing(healthData) {
    const coachPrompt = fs.readFileSync(COACH_FILE, 'utf8');
    const fullPrompt = `${coachPrompt}

=== HEALTH DATA (pre-fetched — use this directly) ===
${JSON.stringify(healthData, null, 2)}`;

    const result = await gemini.generateContent(fullPrompt);
    return result.response.text();
}

async function generateQueryReply(query, healthData, userId) {
    const history = getHistory(userId);

    // First message in a session: embed the full context and health data
    // Follow-ups: just the query — history carries the context
    const messageToSend = history.length === 0
        ? `You are a personal health coach — direct, encouraging, and insightful.
Reply in the same language the user wrote in (Thai or English).
Do NOT just recite numbers. Interpret what the data means, give a clear verdict (good/okay/poor), explain why, and give 1-2 concrete actionable takeaways.
Lead with the insight, not the data. Be conversational — like a coach giving a quick debrief.
Use real numbers only — if data is missing, say so.

Readiness benchmarks:
- Sleep: ≥7h = good, 6-7h = okay, <6h = poor | Efficiency ≥85% = good
- Deep sleep: ~15-20% of total | REM: ~20-25% of total

=== TODAY'S HEALTH DATA ===
${JSON.stringify(healthData, null, 2)}

User: ${query}`
        : query;

    const chat = gemini.startChat({ history });
    const result = await chat.sendMessage(messageToSend);
    const reply = result.response.text();

    const newHistory = [
        ...history,
        { role: 'user', parts: [{ text: messageToSend }] },
        { role: 'model', parts: [{ text: reply }] },
    ].slice(-MAX_HISTORY_TURNS);

    saveHistory(userId, newHistory);
    return reply;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function readinessColor(text) {
    if (text.includes('🟢')) return 5763719;   // green
    if (text.includes('🟡')) return 16705372;  // yellow
    if (text.includes('🔴')) return 15548997;  // red
    return 5763719;
}

// ── Discord Bot ───────────────────────────────────────────────────────────────
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

async function postDailyBriefing(channelOverride = null) {
    console.log('[Briefing] Starting...');
    try {
        const channel = channelOverride ?? await client.channels.fetch(CHANNEL_ID);
        if (!channel) return console.error(`${CROSS_EMOJI} Channel not found`);

        await channel.sendTyping();
        const typingInterval = setInterval(() => channel.sendTyping().catch(() => {}), 8000);

        try {
            if (!fs.existsSync(COACH_FILE)) {
                clearInterval(typingInterval);
                return channel.send(`${CROSS_EMOJI} COACH.md not found`);
            }

            const healthData = await fetchHealthData();
            const brief = await generateBriefing(healthData);
            clearInterval(typingInterval);

            const color = readinessColor(brief);
            const chunkSize = 3900;
            for (let i = 0; i < brief.length; i += chunkSize) {
                const embed = new EmbedBuilder()
                    .setTitle(`${MOON_EMOJI} Daily Health Briefing`)
                    .setDescription(brief.substring(i, i + chunkSize))
                    .setColor(color)
                    .setFooter({ text: 'Generated by Gemini + Google Health MCP' })
                    .setTimestamp();
                await channel.send({ embeds: [embed] });
            }
            console.log('[Briefing] Done!');
        } catch (err) {
            clearInterval(typingInterval);
            throw err;
        }
    } catch (error) {
        console.error('[Briefing] Failed:', error);
        try {
            const ch = channelOverride ?? await client.channels.fetch(CHANNEL_ID);
            if (ch) await ch.send(`${CROSS_EMOJI} Failed to generate briefing: ${error.message}`);
        } catch {}
    }
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    getMcpClient().catch(err => console.error('[MCP] Warm-up failed:', err));
    cron.schedule('0 9 * * *', postDailyBriefing);
    console.log('Briefing scheduler active: 9:00 AM daily.');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.mentions.has(client.user)) return;

    const query = message.content.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim();

    if (!query) {
        return message.reply(`Hey! Ask me anything about your health today (e.g. "How did I sleep last night?" or "Should I work out today?")\nTip: say **briefing** to get your full daily report right now.`);
    }

    if (['briefing', 'บรีฟ'].includes(query.toLowerCase())) {
        await postDailyBriefing(message.channel);
        return;
    }

    try {
        await message.channel.sendTyping();
        const typingInterval = setInterval(() => message.channel.sendTyping().catch(() => {}), 8000);

        try {
            const healthData = await fetchHealthData();
            const reply = await generateQueryReply(query, healthData, message.author.id);
            clearInterval(typingInterval);

            const maxLimit = 1900;
            let isFirst = true;
            for (let i = 0; i < reply.length; i += maxLimit) {
                const chunk = reply.substring(i, i + maxLimit);
                if (isFirst) { await message.reply(chunk); isFirst = false; }
                else { await message.channel.send(chunk); }
            }
        } catch (err) {
            clearInterval(typingInterval);
            throw err;
        }
    } catch (error) {
        console.error('[Mention] Error:', error);
        await message.reply(`${CROSS_EMOJI} Failed to fetch health data: ${error.message}`);
    }
});

client.login(BOT_TOKEN);
