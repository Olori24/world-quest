# 🌍 WORLD QUEST

> **Explore the world. Complete quests. Build your legend.**

WORLD QUEST is a mobile-first global adventure game prototype where players explore destinations, take on missions, earn virtual coins and XP, discover hidden caches, and build a personal field journal.

[![Play](https://img.shields.io/badge/Play-WORLD%20QUEST-6D5EF7?style=for-the-badge)](https://world-quest-psi.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/Olori24/world-quest)
[![Status](https://img.shields.io/badge/Status-Prototype-orange?style=for-the-badge)](https://github.com/Olori24/world-quest)

<p align="center"><img src="assets/world-quest-logo.svg" alt="WORLD QUEST logo" width="180" /></p>

## 🎮 Your adventure starts here

- 🗺️ **Explore destinations:** Lagos, Abuja, Benin City, Osogbo, Nairobi, Tokyo, and New York
- 🧭 **Take on missions:** city trivia, exploration, hidden-cache hunts, economy, and community quests
- 🪙 **Earn virtual rewards:** complete missions to collect in-game coins and XP
- 📈 **Progress your character:** level up and track your adventure
- 📅 **Return for daily expeditions:** claim the daily bonus and build a streak
- 📖 **Keep your field journal:** review discoveries and mission progress
- 📱 **Play on mobile:** responsive interface and touch-friendly controls

## 🚀 Play

**[Launch WORLD QUEST](https://world-quest-psi.vercel.app/)**

## 🧑‍💻 Run locally

No dependency installation or build step is currently required.

1. Clone the repository:
   ```bash
   git clone https://github.com/Olori24/world-quest.git
   cd world-quest
   ```
2. Open `index.html` in a modern browser.
3. Start exploring and completing missions.

Or run a local server:
```bash
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000).

## 🧩 Project structure

| File | Purpose |
| --- | --- |
| `index.html` | Game shell and interface |
| `styles.css` | Responsive styling and visual presentation |
| `game.js` | Missions, destinations, progression, rewards, and local save logic |
| `assets/world-quest-logo.svg` | Project logo and repository branding |

## 💾 Progress and saves

Progress is stored in browser local storage on the current device/browser. It is not currently synced to a user account or cloud service.

## ⚠️ Prototype scope

WORLD QUEST is a **playable frontend prototype**, not a production multiplayer or real-money game.

- Coins are fictional in-game points and have **no cash value**.
- Deposits, withdrawals, payment processing, and real-money earnings are not implemented.
- Supabase authentication/cloud saves, server-authoritative rewards, multiplayer, and production anti-cheat are not connected.
- Local browser saves may not transfer between devices or browsers.
- The live Vercel deployment and GitHub automatic deployment configuration should be verified separately.

## 🛠️ Roadmap

- [ ] Account authentication and secure cloud saves
- [ ] Server-authoritative mission and reward validation
- [ ] Multiplayer exploration and social features
- [ ] More cities, story missions, and activities
- [ ] Stronger QA, accessibility, and mobile-device testing
- [ ] Production security and anti-cheat review

## 🤝 Contributing

Ideas, bug reports, and contributions are welcome. Please open an issue with clear reproduction steps or a feature proposal before making large changes.

## 📜 License

No license file is currently declared. Until a license is added, all rights remain with the repository owner; do not assume the code is open for reuse.

---

<p align="center"><strong>WORLD QUEST — Your world. Your story. Your legend.</strong></p>
