const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokemon-favoritos')
    .setDescription('Guarda a tus pokemon favoritos!')
    .addStringOption(option => option
      .setName('nombre')
      .setDescription('Nombre de tu pokemon')
      .setRequired(true),
    ),
  async execute(interaction) {
    const id = interaction.user.id;
    const poke_name = interaction.options.getString('nombre');
    const CreateUserStmlt = db.prepare(`
    INSERT INTO pkm (poke_name, user_id) VALUES (?, ?)
    `);
    CreateUserStmlt.run(poke_name, id);
    console.log(poke_name, id);
    await interaction.reply('Pokemon Guardado!');
  },

};
