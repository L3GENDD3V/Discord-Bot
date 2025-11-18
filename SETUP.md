# Discord AI Bot Setup Guide

## Prerequisites
- Node.js 18+
- A Discord server
- Discord bot token

## Step 1: Create a Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Name your bot and click "Create"
4. Go to the "Bot" tab and click "Add Bot"
5. Under TOKEN, click "Copy" to copy your bot token
6. Enable these Intents:
   - Message Content Intent
   - Server Members Intent (optional)

## Step 2: Set Up the Bot Code

1. Copy `.env.example` to `.env`
2. Paste your bot token as `DISCORD_TOKEN`
3. Run `npm install`
4. Run `npm start` to start the bot

## Step 3: Add Bot to Your Discord Server

1. In Developer Portal, go to OAuth2 > URL Generator
2. Select scopes: `bot`
3. Select permissions: `Send Messages`, `Read Messages`
4. Copy the generated URL and open it in your browser
5. Select your server and authorize

## Commands

### Prefix Commands (use `!`)
- `!ask <question>` - Ask the AI
- `!chat <message>` - Chat with the AI
- `!ping` - Check bot latency
- `!help` - Show commands

### Slash Commands (use `/`)
- `/ask <question>` - Ask the AI
- `/chat <message>` - Chat with the AI

## Deployment

For 24/7 hosting, deploy to:
- **Railway** - Recommended
- **Render**
- **Replit**
- **Your own server**

Use `npm start` as the start command.
