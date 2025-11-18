import { Client, GatewayIntentBits, EmbedBuilder, ChannelType } from 'discord.js';
import { generateText } from 'ai';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const PREFIX = '!';

const SYSTEM_PROMPT = `You are an expert AI assistant with specialized knowledge in three key areas:

1. MATHEMATICS: You excel at solving math problems from basic arithmetic to advanced calculus, linear algebra, statistics, and more. Always show your work step-by-step for clarity.

2. CODING & PROGRAMMING: You're a skilled software engineer proficient in all major programming languages (Python, JavaScript, Java, C++, Go, Rust, etc.). You can explain concepts, debug code, write algorithms, and provide best practices.

3. VIDEO GAMES & GAMING: You have extensive knowledge of video games across all genres, gaming platforms, esports, game mechanics, strategies, and gaming industry trends.

When answering:
- Be clear, concise, and well-structured
- For math: Show all steps and reasoning
- For coding: Provide code examples when relevant, with explanations
- For gaming: Share tips, strategies, and detailed game knowledge
- Use code blocks for code snippets
- Ask clarifying questions if needed
- Be friendly and encouraging`;

const slashCommands = [
  {
    name: 'ask',
    description: 'Ask the AI anything - math, coding, gaming, or general questions',
    options: [
      {
        name: 'question',
        description: 'Your question for the AI',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'chat',
    description: 'Chat with the AI about any topic',
    options: [
      {
        name: 'message',
        description: 'Message to send to the AI',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'math',
    description: 'Ask a math question',
    options: [
      {
        name: 'problem',
        description: 'Your math problem',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'code',
    description: 'Ask a coding/programming question',
    options: [
      {
        name: 'question',
        description: 'Your coding question',
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'gaming',
    description: 'Ask about video games, strategies, or gaming knowledge',
    options: [
      {
        name: 'question',
        description: 'Your gaming question',
        type: 3,
        required: true,
      },
    ],
  },
];

client.once('ready', async () => {
  console.log(`Bot logged in as ${client.user.tag}`);

  try {
    await client.application.commands.set(slashCommands);
    console.log('Slash commands registered successfully');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ask' || command === 'ai') {
    const question = args.join(' ');

    if (!question) {
      return message.reply('Please provide a question!');
    }

    try {
      await message.channel.sendTyping();

      const response = await generateText({
        model: 'openai/gpt-4-mini',
        system: SYSTEM_PROMPT,
        prompt: question,
        temperature: 0.7,
        maxTokens: 2000,
      });

      const chunks = response.text.match(/[\s\S]{1,1900}/g) || [];

      for (const chunk of chunks) {
        await message.reply(chunk);
      }
    } catch (error) {
      console.error('Error generating response:', error);
      message.reply('Sorry, I encountered an error while processing your request.');
    }
  }

  if (command === 'math') {
    const problem = args.join(' ');
    if (!problem) return message.reply('Please provide a math problem!');

    try {
      await message.channel.sendTyping();
      const response = await generateText({
        model: 'openai/gpt-4-mini',
        system: SYSTEM_PROMPT,
        prompt: `Math problem: ${problem}`,
        temperature: 0.7,
        maxTokens: 2000,
      });

      const chunks = response.text.match(/[\s\S]{1,900}/g) || [];
      for (const chunk of chunks) {
        await message.reply(chunk);
      }
    } catch (error) {
      console.error('Error:', error);
      message.reply('Error processing math problem.');
    }
  }

  if (command === 'code') {
    const question = args.join(' ');
    if (!question) return message.reply('Please ask a coding question!');

    try {
      await message.channel.sendTyping();
      const response = await generateText({
        model: 'openai/gpt-4-mini',
        system: SYSTEM_PROMPT,
        prompt: `Coding question: ${question}`,
        temperature: 0.7,
        maxTokens: 2000,
      });

      const chunks = response.text.match(/[\s\S]{1,900}/g) || [];
      for (const chunk of chunks) {
        await message.reply(chunk);
      }
    } catch (error) {
      console.error('Error:', error);
      message.reply('Error processing coding question.');
    }
  }

  if (command === 'game' || command === 'gaming') {
    const question = args.join(' ');
    if (!question) return message.reply('Please ask a gaming question!');

    try {
      await message.channel.sendTyping();
      const response = await generateText({
        model: 'openai/gpt-4-mini',
        system: SYSTEM_PROMPT,
        prompt: `Gaming question: ${question}`,
        temperature: 0.7,
        maxTokens: 2000,
      });

      const chunks = response.text.match(/[\s\S]{1,900}/g) || [];
      for (const chunk of chunks) {
        await message.reply(chunk);
      }
    } catch (error) {
      console.error('Error:', error);
      message.reply('Error processing gaming question.');
    }
  }

  if (command === 'ping') {
    message.reply(`Pong! ${client.ws.ping}ms`);
  }

  if (command === 'help') {
    const helpEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('AI Bot Commands')
      .addFields(
        { name: '!ask <question>', value: 'Ask the AI anything' },
        { name: '!math <problem>', value: 'Solve a math problem' },
        { name: '!code <question>', value: 'Ask a coding question' },
        { name: '!game <question>', value: 'Ask about video games' },
        { name: '!ping', value: 'Check bot latency' },
        { name: '!help', value: 'Show this message' },
        { name: '/ask <question>', value: 'Slash command version' },
        { name: '/math <problem>', value: 'Math slash command' },
        { name: '/code <question>', value: 'Code slash command' },
        { name: '/gaming <question>', value: 'Gaming slash command' }
      );

    message.reply({ embeds: [helpEmbed] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  try {
    if (commandName === 'ask' || commandName === 'chat') {
      const input = options.getString('question') || options.getString('message');

      await interaction.deferReply();

      const response = await generateText({
        model: 'openai/gpt-4-mini',
        system: SYSTEM_PROMPT,
        prompt: input,
        temperature: 0.7,
        maxTokens: 2000,
      });

      const chunks = response.text.match(/[\s\S]{1,900}/g) || [];

      if (chunks.length > 0) {
        await interaction.editReply(chunks[0]);

        for (let i = 1; i < chunks.length; i++) {
          await interaction.followUp(chunks[i]);
        }
      }
    }

    if (commandName === 'math') {
      const problem = options.getString('problem');
      await interaction.deferReply();

      const response = await generateText({
        model: 'openai/gpt-4-mini',
        system: SYSTEM_PROMPT,
        prompt: `Math problem: ${problem}`,
        temperature: 0.7,
        maxTokens: 2000,
      });

      const chunks = response.text.match(/[\s\S]{1,900}/g) || [];
      if (chunks.length > 0) {
        await interaction.editReply(chunks[0]);
        for (let i = 1; i < chunks.length; i++) {
          await interaction.followUp(chunks[i]);
        }
      }
    }

    if (commandName === 'code') {
      const question = options.getString('question');
      await interaction.deferReply();

      const response = await generateText({
        model: 'openai/gpt-4-mini',
        system: SYSTEM_PROMPT,
        prompt: `Coding question: ${question}`,
        temperature: 0.7,
        maxTokens: 2000,
      });

      const chunks = response.text.match(/[\s\S]{1,900}/g) || [];
      if (chunks.length > 0) {
        await interaction.editReply(chunks[0]);
        for (let i = 1; i < chunks.length; i++) {
          await interaction.followUp(chunks[i]);
        }
      }
    }

    if (commandName === 'gaming') {
      const question = options.getString('question');
      await interaction.deferReply();

      const response = await generateText({
        model: 'openai/gpt-4-mini',
        system: SYSTEM_PROMPT,
        prompt: `Gaming question: ${question}`,
        temperature: 0.7,
        maxTokens: 2000,
      });

      const chunks = response.text.match(/[\s\S]{1,900}/g) || [];
      if (chunks.length > 0) {
        await interaction.editReply(chunks[0]);
        for (let i = 1; i < chunks.length; i++) {
          await interaction.followUp(chunks[i]);
        }
      }
    }
  } catch (error) {
    console.error('Error handling slash command:', error);
    if (interaction.deferred) {
      interaction.editReply('Sorry, I encountered an error.');
    } else {
      interaction.reply('Sorry, I encountered an error.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
