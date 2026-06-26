# 🏃 Bobby — โค้ชสุขภาพ AI สำหรับ Fitbit ผ่าน Discord

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Discord](https://img.shields.io/badge/Discord-Bot-5865F2)
![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

> Fitbit Premium coaching ราคา ~$10/เดือน และไม่รองรับหลายประเทศ รวมถึงไทย
> โปรเจกต์นี้เป็นโค้ชสุขภาพ AI ที่ใช้ข้อมูล Fitbit จริงของคุณ — ฟรี ขับเคลื่อนด้วย Gemini

บอท Discord ที่วิเคราะห์ข้อมูล Fitbit ของคุณผ่าน Google Health ด้วย Gemini AI ให้คำแนะนำส่วนตัว รายงานประจำวัน และปรึกษาด้านสุขภาพแบบต่อเนื่อง

---

## 🚀 Highlights

- ⚡ ดึงข้อมูลแบบขนาน — ไม่มีการรอ AI tool call ทีละตัว
- 🧠 จำบริบทการสนทนา — ถามต่อเนื่องได้เลย
- 🌏 ไทย + อังกฤษ — ตอบในภาษาที่คุณพิมพ์
- 💰 ใช้ Gemini free tier ได้
- 🔒 ไม่มีการบันทึกข้อมูลสุขภาพ

---

## ✨ ฟีเจอร์

- **รายงานสุขภาพประจำวัน** — dashboard สุขภาพอัตโนมัติทุกเช้า 9:00 น. พร้อมคะแนนความพร้อม, วิเคราะห์การนอน, แนวโน้ม RHR, คำแนะนำการออกกำลังกาย และการใช้ชีวิต
- **เรียกดูรายงานได้ทันที** — `@Bobby บรีฟ` หรือ `@Bobby briefing` ได้ตลอดเวลา
- **ถามตอบด้วยภาษาธรรมชาติ** — ถามอะไรก็ได้: _"เมื่อคืนนอนเป็นยังไง?"_, _"วันนี้ควรเทรนหนักไหม?"_
- **จำบริบทการสนทนา** — ถามต่อได้ตามธรรมชาติ ถาม _"ทำไม?"_ แล้วบอทรู้ว่าคุณถามเรื่องอะไร (เก็บประวัติ 30 นาที)
- **รองรับทั้งไทยและอังกฤษ** — ตอบในภาษาที่คุณพิมพ์เข้ามา
- **สีแสดงสถานะพร้อม** — ขอบ embed เปลี่ยนเป็น 🟢 เขียว / 🟡 เหลือง / 🔴 แดง ตามคะแนนฟื้นตัวจริง
- **ข้อมูลจริงเท่านั้น** — ใช้ตัวเลขจาก Fitbit เท่านั้น ไม่แต่งขึ้นมาเอง

---

## 📸 ตัวอย่างจริง

![Bobby Demo](https://cdn.discordapp.com/attachments/1295556410494423061/1520083551414910996/image.png)

---

## 💬 ตัวอย่างบทสนทนา

**User:** `@Bobby วันนี้ควรเทรนหนักไหม?`

**Bobby:**

> 🟡 **วันนี้ควรเทรนแบบปานกลาง — ร่างกายกำลังบอกให้พักบ้าง**
>
> เมื่อคืนนอน 6 ชั่วโมง 12 นาที (ประสิทธิภาพ 81%) และอัตราการเต้นหัวใจขณะพักสูงกว่า baseline 7 วัน อยู่ 5 bpm ทั้งสองอย่างรวมกันบ่งบอกว่าร่างกายยังฟื้นตัวไม่เต็มที่
>
> **วันนี้:** ออกกำลังกายแบบ moderate — วิ่ง tempo, ฝึกเทคนิค หรือ zone 2 ประมาณ 45 นาที หลีกเลี่ยง max effort หรือ HIIT หนัก
>
> **สิ่งที่ควรแก้:** สัปดาห์นี้นอนน้อยกว่า 7 ชั่วโมงมาสองคืนแล้ว นั่นคือ pattern ที่ต้องเปลี่ยน
>
> ℹ️ เป็นคำแนะนำทั่วไป ไม่ใช่คำแนะนำทางการแพทย์

**User:** `ทำไม RHR ถึงสูง?`

**Bobby:**

> บอกแน่ชัดจากข้อมูลอย่างเดียวไม่ได้ แต่สาเหตุที่น่าจะเป็นที่สุดคือ: ความเหนื่อยสะสมจากการเทรนช่วงที่ผ่านมา, ดื่มน้ำน้อยไปนิด หรือการนอนน้อยที่มาซ้ำเติม RHR ของคุณค่อย ๆ ขึ้นมาตั้งแต่วันพุธ — มักเป็นสัญญาณว่าร่างกายต้องการเวลาฟื้นตัวมากกว่าที่ได้รับ

---

## 🧰 สิ่งที่ต้องมี

- บัญชี **Fitbit** ที่ซิงค์ข้อมูลกับ **Google Health** (Fitbit app → Account → Google Health → เปิด sync)
- [Node.js](https://nodejs.org/) v18 ขึ้นไป (มี `npx` ติดมาด้วย)
- บัญชี **Discord** และเซิร์ฟเวอร์ที่คุณเพิ่มบอทได้
- **Google Cloud project** — ฟรี ใช้แค่ Google account
- **Gemini API key** จาก [Google AI Studio](https://aistudio.google.com/apikey) — free tier เพียงพอ

---

## 🚀 วิธีติดตั้ง

### ส่วนที่ 1 — สร้าง Google Cloud OAuth

ขั้นตอนนี้ทำครั้งเดียว เพื่อให้บอทสามารถอ่านข้อมูล Fitbit ผ่าน Google Health API ได้

**1. สร้าง Project**

ไปที่ [console.cloud.google.com](https://console.cloud.google.com) → สร้าง project ใหม่ (ตั้งชื่ออะไรก็ได้ เช่น `health-bot`)

**2. เปิดใช้งาน Google Health API**

APIs & Services → Library → ค้น `Google Health API` → Enable

**3. ตั้งค่า OAuth consent screen**

APIs & Services → OAuth consent screen (หรือ "Google Auth Platform"):

- App name: อะไรก็ได้ เช่น `Health Bot`
- User support email + Developer contact: อีเมลของคุณ
- Audience: **External**
- Test users → Add users: ใส่อีเมล Google ที่ผูกกับ Fitbit _(สำคัญมาก — ถ้าไม่ใส่จะ login ไม่ผ่าน)_

**4. สร้าง OAuth credentials**

Clients → Create client:

- Application type: **Web application**
- Authorized redirect URIs: `http://127.0.0.1:3000/callback` _(ต้องเป๊ะ ไม่มี trailing slash)_

กด Create → เก็บ **Client ID** (`...apps.googleusercontent.com`) และ **Client Secret** (`GOCSPX-...`) ไว้

---

### ส่วนที่ 2 — เชื่อม Google Health MCP

**1. ตั้งค่า** (จะถาม Client ID, Client Secret และ Redirect URI จากส่วนที่ 1)

```bash
npx -y google-health-mcp-unofficial setup --scope-preset full
# Redirect URI: http://127.0.0.1:3000/callback
# Privacy mode: กด Enter รับค่า default
```

**2. เชื่อมบัญชี** (ผูก Google/Fitbit account)

```bash
npx -y google-health-mcp-unofficial auth --no-open
# พิมพ์ URL ออกมา → เปิดในเบราว์เซอร์ → login บัญชีที่ผูก Fitbit → Allow ทุก scope
```

> ใช้ `--no-open` เผื่อเบราว์เซอร์ไม่เด้งอัตโนมัติ

**3. เช็กว่าเชื่อมสำเร็จ**

```bash
npx -y google-health-mcp-unofficial doctor --live
# ควรเห็น: Google Health connected + token saved
```

---

### ส่วนที่ 3 — สร้าง Discord Bot

**1.** ไปที่ [Discord Developer Portal](https://discord.com/developers/applications) → New Application → ตั้งชื่อ

**2.** Bot → Add Bot → คัดลอก **Bot Token** (เก็บเป็นความลับ ห้ามแชร์)

**3.** Bot → เปิด **Message Content Intent** (จำเป็นเพื่ออ่าน `@mention`)

**4.** OAuth2 → URL Generator:

- Scopes: `bot`
- Bot permissions: `Send Messages`, `Read Message History`, `Embed Links`

เปิด URL ที่สร้างขึ้น → เพิ่มบอทเข้าเซิร์ฟเวอร์

**5.** ใน Discord: คลิกขวาที่ช่องที่ต้องการ → **Copy Channel ID**
_(ถ้าไม่เห็นตัวเลือกนี้ ไปที่ Settings → Advanced → เปิด Developer Mode ก่อน)_

---

### ส่วนที่ 4 — ตั้งค่าโปรเจกต์

**1. Clone และติดตั้ง**

```bash
git clone https://github.com/yourusername/health-agent.git
cd health-agent
npm install
```

**2. สร้างไฟล์ `.env`**

```bash
cp .env.example .env
```

เปิดไฟล์ `.env` และใส่ค่าทุกตัว:

```env
DISCORD_BOT_TOKEN=โทเค็นบอทจากส่วนที่ 3 ข้อ 2
DISCORD_CHANNEL_ID=ไอดีช่องจากส่วนที่ 3 ข้อ 5
GEMINI_API_KEY=Gemini API key จาก Google AI Studio
WORK_DIR=C:\Users\ชื่อของคุณ\health-agent
```

> **Windows:** ใช้ backslash ใน `WORK_DIR` เช่น `C:\Users\bobby\health-agent`

---

### ส่วนที่ 5 — รันบอท

```bash
npm start
```

ควรเห็น:

```
Logged in as Bobby#1234!
[MCP] Connecting to google-health-mcp...
[MCP] Connected.
Briefing scheduler active: 9:00 AM daily.
```

ไปที่ Discord แล้วพิมพ์ `@Bobby บรีฟ` — บอทควรเริ่มพิมพ์ และส่ง dashboard สุขภาพภายในไม่กี่วินาที

---

## 🕹️ วิธีใช้งาน

| คำสั่ง                            | ความหมาย                             |
| --------------------------------- | ------------------------------------ |
| `@Bobby บรีฟ` / `@Bobby briefing` | เรียกดูรายงานสุขภาพเต็มทันที         |
| `@Bobby เมื่อคืนนอนเป็นยังไง?`    | วิเคราะห์การนอนแบบโค้ช               |
| `@Bobby วันนี้ควรเทรนหนักไหม?`    | คำแนะนำการออกกำลังกายตามสถานะพร้อม   |
| `@Bobby RHR สัปดาห์นี้เป็นยังไง?` | วิเคราะห์แนวโน้มอัตราการเต้นหัวใจ    |
| `@Bobby Should I train today?`    | ถามภาษาอังกฤษก็ได้ — ตอบในภาษาที่ถาม |
| `@Bobby` _(ไม่มีข้อความ)_         | แสดง prompt ช่วยเหลือ                |

**ถามต่อเนื่องได้เลย** หลังได้รับคำตอบ สามารถถามต่อได้:

- _"ทำไม?"_
- _"ควรทำอะไรกับเรื่องนี้?"_
- _"ขยายความเพิ่มเติมได้ไหม?"_

Bobby จำประวัติ 3 รอบล่าสุดต่อคนต่อ 30 นาที หลังจากนั้นจะเริ่มเซสชันใหม่

---

## ⚙️ การปรับแต่ง

### เปลี่ยนเวลาส่งรายงาน

ใน `bot.js` แก้ไขบรรทัด cron:

```js
cron.schedule("0 9 * * *", postDailyBriefing); // 9:00 น. ทุกวัน
```

ใช้ syntax cron มาตรฐาน — `นาที ชั่วโมง * * *` ตัวอย่าง:

- 7:30 น. → `'30 7 * * *'`
- 8:00 น. → `'0 8 * * *'`

### เปลี่ยนโมเดล AI

ใน `bot.js`:

```js
const gemini = genai.getGenerativeModel({ model: "gemini-2.5-flash" });
```

ใช้ model ไหนก็ได้จาก [Google AI Studio](https://aistudio.google.com) แนะนำ `gemini-2.5-flash` เพื่อความเร็วและคุณภาพ

### ปรับแต่งโค้ช

แก้ไข `COACH.md` เพื่อเปลี่ยนโทน, รูปแบบรายงาน, ภาษา หรือเกณฑ์คะแนนความพร้อม ไฟล์นี้คือ prompt ที่ส่งให้ Gemini ทุกเช้า ไม่ต้องแก้โค้ด

---

## 🛠 ปัญหาที่พบบ่อย

| อาการ                      | สาเหตุ                               | วิธีแก้                                                         |
| -------------------------- | ------------------------------------ | --------------------------------------------------------------- |
| `Missing GOOGLE_HEALTH...` | ยังไม่ได้ทำ OAuth/setup              | ทำส่วนที่ 1–2 ให้ครบ                                            |
| `access_denied` ตอน login  | ยังไม่เพิ่ม Test User                | Google Cloud → Audience → Test Users → ใส่อีเมล                 |
| `redirect_uri_mismatch`    | URI ไม่ตรง                           | ต้องเป็น `http://127.0.0.1:3000/callback` เป๊ะ                  |
| บอท online แต่ไม่ตอบ       | ไม่ได้เปิด Message Content Intent    | Discord Dev Portal → Bot → เปิด Message Content Intent          |
| บอทตอบแต่ข้อมูลว่าง        | Fitbit ไม่ได้ sync กับ Google Health | Fitbit app → Account → Google Health → เปิด sync และ force sync |
| ช่องหา Channel ID ไม่เจอ   | ยังไม่เปิด Developer Mode            | Discord Settings → Advanced → เปิด Developer Mode               |
| รายงานสร้างได้แต่ดูผิดปกติ | Gemini free tier quota หมด           | รอ quota reset หรืออัปเกรด                                      |
| `npm start` error ทันที    | ค่าใน `.env` ยังไม่ครบ               | เช็กทุกค่าใน `.env` ให้ครบ 4 ตัว                                |

---

## 🧠 ระบบทำงานอย่างไร

```
อุปกรณ์ Fitbit
     ↓ ซิงค์ข้อมูล
Google Health API
     ↓
google-health-mcp-unofficial  ←── MCP Client (เปิดครั้งเดียว ค้างไว้)
     ↓ ดึงข้อมูลพร้อมกัน (การนอน + RHR + ก้าว + อัตราการเต้นหัวใจ + สรุปรายสัปดาห์)
bot.js (Node.js)
     ↓
Gemini 2.5 Flash  ←── ข้อมูลถูกฝังใน prompt เดียว สร้างคำตอบครั้งเดียว
     ↓
Discord Embed  (🟢 / 🟡 / 🔴 ตามสถานะพร้อม)
```

ดึงข้อมูลสุขภาพทั้งหมดแบบขนาน _ก่อน_ เรียก Gemini ทำให้ Gemini ได้รับข้อมูลครบใน prompt เดียวและสร้างคำตอบครั้งเดียว MCP client ค้างการเชื่อมต่อหลัง request แรก ทำให้ request ถัดไปเร็วขึ้นมาก

### ข้อมูลที่วิเคราะห์

| ข้อมูล                               | แหล่งที่มา    | ใช้สำหรับ          |
| ------------------------------------ | ------------- | ------------------ |
| ระยะการนอน (Deep/REM/Light/Awake)    | Fitbit        | คะแนนคุณภาพการนอน  |
| ระยะเวลานอนและประสิทธิภาพ            | Fitbit        | เกณฑ์ความพร้อม     |
| อัตราการเต้นหัวใจขณะพัก (RHR) วันนี้ | Fitbit        | สัญญาณการฟื้นตัว   |
| Baseline RHR 7 วัน                   | Fitbit        | เปรียบเทียบแนวโน้ม |
| จำนวนก้าววันนี้                      | Google Health | โหลดกิจกรรม        |
| ตัวอย่างอัตราการเต้นหัวใจ            | Fitbit        | บริบทช่วงกลางคืน   |
| สรุปกิจกรรมรายสัปดาห์                | Google Health | โหลดการฝึก         |

> **หมายเหตุ:** HRV ยังไม่ถูก expose ผ่าน Google Health API v4 ระบบจะละไว้โดยไม่แสดงว่า "ขาดข้อมูล"

### การคำนวณคะแนนความพร้อม

| คะแนน     | เกณฑ์                                      |
| --------- | ------------------------------------------ |
| 🟢 เขียว  | นอน ≥7h, ประสิทธิภาพ ≥85%, RHR ≤ baseline  |
| 🟡 เหลือง | นอน 6–7h หรือ RHR สูงกว่า baseline 3–5 bpm |
| 🔴 แดง    | นอน <6h หรือ RHR สูงกว่า baseline >5 bpm   |

Baseline RHR คำนวณจากข้อมูลที่มี (ขั้นต่ำ 3 วัน) RHR _ต่ำกว่า_ baseline = ร่างกายฟื้นตัวดีกว่าปกติ → ผลักไปทาง Green

---

## 🏗️ โครงสร้างโปรเจกต์

```
health-agent/
├── bot.js               # โค้ดหลัก (Discord, MCP client, Gemini)
├── COACH.md             # Template prompt สำหรับรายงานประจำวัน — แก้ตรงนี้เพื่อ customize โค้ช
├── .env                 # ข้อมูลลับของคุณ (ห้าม commit)
├── .env.example         # Template สำหรับการตั้งค่าครั้งแรก
├── .agents/
│   └── mcp_config.json  # การตั้งค่า MCP server
└── package.json
```

---

## 🔒 ความปลอดภัย

- **ห้าม commit ไฟล์ `.env`** — มีบอทโทเค็น, Channel ID และ Gemini key อยู่ ถูก gitignore ไว้แล้ว
- **Bot Token = รหัสผ่าน** ถ้าหลุด ให้ regenerate ทันทีใน Discord Developer Portal (Channel ID และเซิร์ฟเวอร์เดิมใช้ต่อได้)
- **Google Health OAuth token** ถูกเก็บที่ `~/.google-health-mcp/tokens.json` ในเครื่องคุณ — อยู่นอก repo, read-only scope
- **ข้อมูลสุขภาพไม่ถูกบันทึก** ดึงเฉพาะเวลาถาม ส่งไปยัง Gemini ใน memory แล้วทิ้ง ไม่มีการเขียนลง disk
