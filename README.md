# WORLD QUEST

Mobile-first global adventure game prototype.

## Run locally
Open `index.html` in a modern browser. No build step or dependency installation is required.

## Gameplay
- Mission completion rewards and XP/level progression
- Select and discover destinations: Lagos, Abuja, Benin City, Osogbo, Nairobi, Tokyo, and New York
- Daily virtual coin bonus and consecutive-day streak
- City trivia mission, hidden-cache mission, exploration, economy, and community missions
- Field journal and local progress persistence
- Responsive mobile layout and accessible button controls

## Save data
Progress is saved in the browser's local storage under `world-quest-save-v2`. It is local to the device/browser and is not synced to an account.

## Important prototype limitations
- Coins are fictional in-game points with no cash value.
- No deposits, withdrawals, payments, or real-money earning are implemented.
- Supabase authentication/cloud saves, server-authoritative rewards, multiplayer, and production anti-cheat are not connected yet.
- This repository contains the playable frontend source; the deployed Vercel version may not yet be linked to GitHub for automatic deployments.

## Files
- `index.html` — app shell
- `styles.css` — responsive UI styles
- `game.js` — missions, destinations, rewards, progression, local saves
