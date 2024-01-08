const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('crear-entrenador-pokemon')
    .setDescription('Crea tu entrenador!')
    .addStringOption(option => option
      .setName('nombre-entrenador')
      .setDescription('Tu nombre de entrenador!')
      .setRequired(true),
    ),
  async execute(interaction) {
    const id = interaction.user.id;
    const name = interaction.options.getString('nombre-entrenador');
    const CreateUserStmlt = db.prepare(`
    INSERT INTO users ( name, user_id) VALUES (?, ?)
    `);
    CreateUserStmlt.run(id, name);
    console.log(id, name);
    await interaction.reply('Usuario Creado!');
  },

};
