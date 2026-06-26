# 🏃 Bobby — AI Health Coach for Fitbit via Discord

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Discord](https://img.shields.io/badge/Discord-Bot-5865F2)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-blue)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![TH](https://img.shields.io/badge/lang-th-red.svg)](https://github.com/zoj33e/bobby-fitbit-health-coach/blob/main/README.th.md)
> Fitbit Premium coaching costs $10/month and isn't available in many countries, including Thailand.
> This project provides an AI-powered health coach using your Fitbit data — for free, powered by Gemini.

A Discord bot that analyzes your Fitbit data through Google Health using Gemini AI, delivering personalized coaching, daily briefings, and interactive health conversations.

---

## 🚀 Highlights

- ⚡ Parallel data fetching — no sequential AI tool calls
- 🧠 Conversation memory — follow-up questions just work
- 🌏 Thai + English — responds in whichever language you write in
- 💰 Runs on Gemini free tier
- 🔒 Health data never stored

---

## ✨ Features

- **Daily morning briefing** — Full health dashboard at 9 AM: readiness score, sleep breakdown, RHR trend, exercise recommendation, lifestyle tips
- **On-demand briefing** — `@Bobby briefing` / `@Bobby บรีฟ` anytime
- **Natural language Q&A** — Ask anything: *"How did I sleep?"*, *"Should I train hard today?"*, *"What's my RHR trend?"*
- **Conversation memory** — Follow-up questions work naturally. Ask *"Why?"* and it knows what you mean (30-minute session window)
- **Thai & English** — Responds in whichever language you write in
- **Dynamic readiness colors** — Discord embed is 🟢 green / 🟡 yellow / 🔴 red based on your actual recovery score
- **Real data only** — Uses only real numbers from your Fitbit. Never fabricates

---

## 📸 Demo

![Bobby Demo](https://raw.githubusercontent.com/zoj33e/bobby-fitbit-health-coach/refs/heads/main/demo.png)

---

## 💬 Example

**User:** `@Bobby Should I train hard today?`

**Bobby:**
> 🟡 **Moderate day — your body is telling you to hold back a little.**
>
> You slept 6h 12m last night (efficiency 81%) and your resting heart rate is 5 bpm above your 7-day baseline. Neither is alarming on its own, but together they suggest your body hasn't fully recovered.
>
> **Today:** Stick to moderate intensity — a tempo run, a technique-focused lift, or a 45-min zone 2 session. Avoid maxing out or heavy HIIT.
>
> **One thing to fix:** You've had two nights under 7h this week. That's the pattern to break — one good night won't fully reset things, but it'll help.
>
> ℹ️ General guidance only, not medical advice.

**User:** `Why is my RHR elevated?`

**Bobby:**
> Hard to say for certain from the data alone, but the most likely reasons: accumulated fatigue from the past few days of training, slight dehydration, or the shorter sleep compounding. Your RHR has been creeping up since Wednesday — that's usually a sign your body needs more recovery time than it's getting.

---

## 🧰 What You Need

- A **Fitbit** account synced to **Google Health** (Fitbit app → Account → Google Health → enable sync)
- [Node.js](https://nodejs.org/) v18+ (includes `npx`)
- A **Discord account** and a server you can add bots to
- A **Google Cloud project** — free, you just need a Google account
- A **Gemini API key** from [Google AI Studio](https://aistudio.google.com/apikey) — free tier is sufficient

---

## 🚀 Setup

### Part 1 — Google Cloud OAuth

This is the one-time step that lets the app read your Fitbit data via Google Health API.

**1. Create a project**

Go to [console.cloud.google.com](https://console.cloud.google.com) → create a new project (name it anything, e.g. `health-bot`).

**2. Enable the Google Health API**

APIs & Services → Library → search `Google Health API` → Enable.

**3. Configure OAuth consent screen**

APIs & Services → OAuth consent screen (or "Google Auth Platform"):
- App name: anything (e.g. `Health Bot`)
- User support email + Developer contact: your email
- Audience: **External**
- Test users → Add users: add the Google account that's linked to your Fitbit *(critical — login will fail without this)*

**4. Create OAuth credentials**

Clients → Create client:
- Application type: **Web application**
- Authorized redirect URIs: `http://127.0.0.1:3000/callback` *(must be exact)*

Click Create → save your **Client ID** (`...apps.googleusercontent.com`) and **Client Secret** (`GOCSPX-...`).

---

### Part 2 — Connect Google Health MCP

**1. Run setup** (it will ask for your Client ID, Client Secret, and redirect URI from Part 1)

```bash
npx -y google-health-mcp-unofficial setup --scope-preset full
# Redirect URI: http://127.0.0.1:3000/callback
# Privacy mode: press Enter to accept default
```

**2. Authenticate** (links your Google/Fitbit account)

```bash
npx -y google-health-mcp-unofficial auth --no-open
# Prints a URL → open it in your browser → sign in with the account linked to Fitbit → Allow all scopes
```

**3. Verify the connection**

```bash
npx -y google-health-mcp-unofficial doctor --live
# Should show: Google Health connected + token saved
```

Credentials are saved to `~/.google-health-mcp/` — outside the project, never committed.

---

### Part 3 — Create the Discord Bot

**1.** Go to [Discord Developer Portal](https://discord.com/developers/applications) → New Application → give it a name.

**2.** Bot → Add Bot → copy the **Bot Token** (treat this like a password).

**3.** Bot → enable **Message Content Intent** (required to read `@mentions`).

**4.** OAuth2 → URL Generator:
- Scopes: `bot`
- Bot permissions: `Send Messages`, `Read Message History`, `Embed Links`

Open the generated URL → add the bot to your server.

**5.** In Discord: right-click the channel where you want briefings → **Copy Channel ID** (enable Developer Mode in Discord settings first if the option isn't there).

---

### Part 4 — Configure the Project

**1. Clone and install**

```bash
git clone https://github.com/yourusername/health-agent.git
cd health-agent
npm install
```

**2. Create your `.env` file**

```bash
cp .env.example .env
```

Open `.env` and fill in every value:

```env
DISCORD_BOT_TOKEN=your_discord_bot_token     # from Part 3 step 2
DISCORD_CHANNEL_ID=your_channel_id           # from Part 3 step 5
GEMINI_API_KEY=your_gemini_api_key           # from Google AI Studio
WORK_DIR=C:\Users\yourname\health-agent      # absolute path to this folder
```

> **Windows users:** use backslashes in `WORK_DIR`, e.g. `C:\Users\yourname\health-agent`

---

### Part 5 — Run

```bash
npm start
```

Expected output:
```
Logged in as Bobby#1234!
[MCP] Connecting to google-health-mcp...
[MCP] Connected.
Briefing scheduler active: 9:00 AM daily.
```

Go to Discord and type `@Bobby briefing` — you should see the bot start typing and deliver a health dashboard within a few seconds.

---

## 🕹️ Usage

| Command | What it does |
|---------|-------------|
| `@Bobby briefing` / `@Bobby บรีฟ` | Trigger the full daily health report right now |
| `@Bobby How did I sleep last night?` | Coached sleep analysis |
| `@Bobby Should I train hard today?` | Readiness-based training recommendation |
| `@Bobby How's my RHR this week?` | Heart rate trend analysis |
| `@Bobby เมื่อคืนนอนเป็นยังไง?` | Same questions work in Thai |
| `@Bobby` *(no text)* | Shows a help prompt |

**Follow-up questions work.** After any response:

- *"Why?"* / *"ทำไม?"*
- *"What should I do about that?"*
- *"Tell me more about the RHR part"*

Bobby remembers the last 3 exchanges per user for 30 minutes. After 30 minutes of inactivity, the session resets.

---

## ⚙️ Configuration

### Change the briefing time

In `bot.js`, find the cron line and edit the schedule:

```js
cron.schedule('0 9 * * *', postDailyBriefing); // 9:00 AM daily
```

Uses standard cron syntax — `minute hour * * *`. Examples:
- 7:30 AM → `'30 7 * * *'`
- 8:00 AM → `'0 8 * * *'`

### Change the AI model

In `bot.js`:

```js
const gemini = genai.getGenerativeModel({ model: 'gemini-2.5-flash' });
```

Any model from [Google AI Studio](https://aistudio.google.com) works. `gemini-2.5-flash` is recommended for speed and quality.

### Customize the coach

Edit `COACH.md` to change tone, format, readiness thresholds, or language preferences. This file is the full system prompt sent to Gemini every morning. It's plain text — no code required.

---

## 🛠 Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Missing GOOGLE_HEALTH...` error | OAuth setup not complete | Complete Parts 1–2 |
| `access_denied` during login | Your email not added as Test User | Google Cloud → Audience → Test Users → add your email |
| `redirect_uri_mismatch` | Redirect URI doesn't match exactly | Must be `http://127.0.0.1:3000/callback` — no trailing slash |
| Bot is online but doesn't respond | Message Content Intent not enabled | Discord Dev Portal → Bot → enable Message Content Intent |
| Bot responds but data is empty | Fitbit not synced to Google Health | Fitbit app → Account → Google Health → enable and force sync |
| `CHANNEL_ID` not found error | Wrong channel ID or bot not in server | Re-invite bot, re-copy channel ID with Developer Mode on |
| Briefing generates but looks wrong | Gemini free tier quota hit | Wait until quota resets, or upgrade to pay-as-you-go |
| `npm start` fails immediately | Missing `.env` values | Check all 4 values are filled in `.env` |

---

## 🧠 How It Works

```
Fitbit Device
     ↓ syncs
Google Health API
     ↓
google-health-mcp-unofficial  ←── MCP Client (starts once, stays warm)
     ↓ parallel fetch (sleep + RHR + steps + heart rate + weekly summary)
bot.js (Node.js)
     ↓
Gemini 2.5 Flash  ←── all data embedded in one prompt, one generation
     ↓
Discord Embed  (🟢 / 🟡 / 🔴 readiness color)
```

Health data is fetched in parallel *before* calling Gemini. Gemini gets everything in one prompt and generates once — no sequential tool-call roundtrips. The MCP client stays connected after the first request, so subsequent calls are fast.

### What It Analyzes

| Metric | Source | Used For |
|--------|--------|----------|
| Sleep stages (Deep/REM/Light/Awake) | Fitbit | Sleep quality score |
| Sleep duration & efficiency | Fitbit | Readiness gate |
| Resting Heart Rate (today) | Fitbit | Recovery signal |
| RHR 7-day baseline | Fitbit | Trend comparison |
| Steps today | Google Health | Activity load |
| Heart rate samples | Fitbit | Overnight context |
| Weekly activity summary | Google Health | Training load |

> **Note:** HRV is not currently exposed by the Google Health API v4 and is omitted from the output.

### Readiness Scoring

| Score | Criteria |
|-------|----------|
| 🟢 Green | Sleep ≥7h, efficiency ≥85%, RHR ≤ baseline |
| 🟡 Yellow | Sleep 6–7h, or RHR 3–5 bpm above baseline |
| 🔴 Red | Sleep <6h, or RHR >5 bpm above baseline |

RHR baseline is computed from all available recent data (minimum 3 days). RHR *below* baseline = better-than-usual recovery → pushes toward Green.

---

## 🏗️ Project Structure

```
health-agent/
├── bot.js               # Main bot (Discord, MCP client, Gemini)
├── COACH.md             # Daily briefing prompt — edit to customize the coach
├── .env                 # Your secrets (never commit this)
├── .env.example         # Template for first-time setup
├── .agents/
│   └── mcp_config.json  # MCP server configuration
└── package.json
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `discord.js` | Discord bot framework |
| `@google/generative-ai` | Gemini API client |
| `@modelcontextprotocol/sdk` | MCP client for google-health-mcp |
| `node-cron` | Briefing scheduler |
| `dotenv` | Environment variables |

---
