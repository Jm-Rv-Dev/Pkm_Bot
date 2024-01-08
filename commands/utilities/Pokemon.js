const { default: axios } = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pokedex')
    .setDescription('Busca un Pokemon!')
    .addStringOption(option => option
      .setName('nombre-pokemon')
      .setDescription('El nombre del pokemon que quieres buscar')
      .setRequired(true),
    ),
  async execute(interaction) {
    const pkmName = interaction.options.getString('nombre-pokemon');
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmName}/`);
    const exampleEmbed = new EmbedBuilder()
      .setColor('Aqua')
      .setTitle(String(data.name))
      .setDescription(`Experiencia base: ${String(data.base_experience)}`)
      .setThumbnail(String(data.sprites.front_default))
      .addFields(
        { name: 'Tipo', value: String(data.types[0].type.name) },
        { name: '\u200B', value: '\u200B' },
        { name: 'Altura', value:`Fts: ${String(data.height)} `, inline: true },
        { name: 'Peso', value: ` libras: ${String(data.weight)}`, inline: true },
      )
      .addFields({ name: 'Velocidad', value:`Velocidad: ${String(data.stats[5].base_stat)}`, inline: true })
      .setImage(String(data.sprites.other['official-artwork'].front_default))
      .setTimestamp();


    interaction.channel.send({ embeds: [exampleEmbed] });
  },
};