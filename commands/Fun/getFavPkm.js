const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');
const AsciiTable = require('ascii-table');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('obtener-pokemons')
    .setDescription('Obten las notas de tus pokemons favoritos!'),
  async execute(interaction) {
    const id = interaction.user.id;
    // Get uset form db
    const notes = db.prepare(`
    SELECT * FROM pkm
    WHERE user_id = ?
    `).all(id);
    const lala = notes.map(nota => [nota.poke_name]);
    console.log(lala);
    if (!notes) {
      return await interaction.reply('Su notas no existen');
    }
    const table = AsciiTable.factory({
      title: 'Tus Pokemons Favoritos',
      heading: ['Nombre'],
      rows: lala,
    });

    await interaction.reply(table.toString());

  } };