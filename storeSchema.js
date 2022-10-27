//Otetaan Mongoose käyttöön
const mongoose = require('mongoose');
const storeSchema = mongoose.Schema;

//Tietokantarakenne
let product = new storeSchema ( {
    Manufacturer: {
      type: String
    },
    Model: {
      type: String
    },
    Price: {
      type: String
    },
    Color: {
      type: String
    },
    ProductCategory: {
      type: String
    }
},
    { collection: 'storelibrary'}
)

// Export model, jossa kokoelman ja skeeman nimi
module.exports = mongoose.model('storelibrary', product);