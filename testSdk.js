const pokemon = require('pokemontcgsdk');

pokemon.configure({ apiKey: '43ca3105-335d-4abb-be38-10812b3f1622' });

// Get a single card by ID
// pokemon.card.find('base1-4').then((card) => {
//   console.log(card.name); // "Charizard"
// });

// Filter cards via the q param
// pokemon.card.where({ q: 'name:blastoise' }).then((result) => {
//   console.log(result.data[0].name); // "Blastoise"
// });

// Filter cards via the q param and specific page
// pokemon.card.where({ q: 'name:blastoise', pageSize: 10, page: 3 }).then((result) => {
//   console.log(result.data[0].name); // "Blastoise"
// });

// Automatically page through card data
// pokemon.card.all({ q: 'name:blastoise' }).then((cards) => {
//   console.log(cards[0].name); // "Blastoise"
// });

// Get a single set by ID
// pokemon.set.find('swsh1').then((set) => {
//   console.log(set); // "Base"
// });

// TESTING AREA

// Get all sets
pokemon.set.all().then((sets) => {
  console.log(sets[0].name); // "Base"
});

pokemon.set.where({ q: 'legalities.standard:legal' }).then((result) => {
  console.log(result.data[0].name);
});

pokemon.set.where({ pageSize: 10, page: 2 }).then((result) => {
  console.log(result.data[0].name);
});