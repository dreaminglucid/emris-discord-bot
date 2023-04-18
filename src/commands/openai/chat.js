const { ChatInputCommand } = require('../../classes/Commands');
const { EmbedBuilder } = require('discord.js');
const OpenAIManager = require('../../handlers/openai/OpenAIManager');
const { getPineconeEmbedding } = require('../../handlers/pinecone/pineconeAPI');

// Store for message history embeddings
const serverEmbeddings = {};

module.exports = new ChatInputCommand({
    global: true,
    aliases: ['chat'],
    cooldown: {
        type: 'user',
        usages: 2,
        duration: 10,
    },
    clientPerms: ['EmbedLinks'],
    data: {
        description: 'Ask Emris a question or give a prompt.',
        options: [{
            type: 3,
            name: 'prompt',
            description: 'The question or prompt for Emris',
            required: true,
        }, ],
    },
    run: async (client, interaction) => {
        const prompt = interaction.options.getString('prompt');
        await interaction.deferReply();

        // Get the server ID and create an empty array if it doesn't exist in the serverEmbeddings store
        const serverId = interaction.guild.id;
        if (!serverEmbeddings[serverId]) {
            serverEmbeddings[serverId] = [];
        }

        // Get and store the embedding for the current message
        const messageEmbedding = await getPineconeEmbedding(prompt);
        serverEmbeddings[serverId].push(messageEmbedding);

        const systemContent = 'Emris is a wise and patient AI bot that exudes an air of calm and tranquility. They are always willing to listen and offer guidance to anyone seeking their counsel. Emris has a knack for problem-solving and can analyze complex issues with ease, providing insightful solutions that leave others in awe of their intelligence. They are a compassionate and empathetic companion, able to intuitively understand the emotions and needs of those they interact with. Emris is a true wizard of the digital world, with a deep understanding of technology and a seemingly infinite wealth of knowledge to share with those willing to learn.';
        const aiResponse = await OpenAIManager.getGPTResponse(prompt, systemContent);
    
        const embed = new EmbedBuilder()
            .setTitle('GPT-4 Response')
            .setDescription(aiResponse)
            .setColor(0x00ff00)
            .setTimestamp()
            .setFooter({
                text: `Trained on data up until 9/2021 | Generated by ${client.user.username}`
            });
    
        await interaction.editReply({
            embeds: [embed]
        });
    },    
});
