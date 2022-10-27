// Ota express käyttöön
const express =  require('express');
const app = express();

// Ota mongoose käyttöön -> tietokantayhteys
const mongoose = require('mongoose');

//Ota product käyttöön
const product = require('./storeSchema.js');

//Ota monngodb käyttöön
const mongodb = require('mongodb');

//Ota bodyparser käyttöön lomakkeen käsittelyä varten
const bodyparser = require('body-parser');

//Aseta määritykset express-palvelimelle
//Ota käyttöön public-tiedosto
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));

//Muodostetaan tietokantayhteys
// Luo vakio connectionstringille
const uri = 'mongodb+srv://jusu:jusu@cluster0.lemh2mq.mongodb.net/storelibrary?retryWrites=true&w=majority'

//Muodostetaan yhteystietokantaan
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser:true})

// Luodaan vakio tietokantayhteydelle
const db = mongoose.connection

// Ilmoitus jos yhteys ok
db.once('open', function() {
    console.log('Tietokantayhteys avattu');
})

// Kirjoita get-funktio, req.query toimii nyt
app.get('/storelibrary', function(req,res) {

     // Hae tuotteet tietokannasta
    product.find(req.query, function( err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
    })

// Tuotteen lisäys post-funktio
app.post('/newProduct', function (req, res) {
     //console.log(req.body)
    //Varmistetaan, ettei ole ID:tä ja poistetaan jos on.
    delete req.body._id; 
    //Lisätään collectioniin uusi tuote
    db.collection('storelibrary').insertOne(req.body);
    res.send('Product is added with following data: ' + JSON.stringify(req.body));
})

// Poistofunktio
app.post('/deleteProduct', function (req, res) {
    // Poistetaan collectionista tuote
    db.collection('storelibrary').deleteOne( { _id: new mongodb.ObjectId(req.body._id)}, function( err, result){
        if ( err ) {
            res.send('Error deleting with following data: ' + err);
        } else {
            res.send('Product is deleted with following id: ' + req.body._id);
        }
    });
   
})

//Päivitysfunktio
app.post('/updateProduct', function(req,res){
    //Päivitetän collectionista tuote. Kolme parametria: ID, mitä päivitetään ja funktio virheenkäsittelyyn ja palautteeseen.
    db.collection('storelibrary').updateOne({_id:new mongodb.ObjectId(req.body._id)},{$set:{Manufacturer:req.body.Manufacturer, Model:req.body.Model, Price:req.body.Price, ProductCategory:req.body.ProductCategory, Color:req.body.Color}},function(err,results){
        if ( err ) {
            res.send('Error updating: ' + err);
        } else {
            res.send('Product is updated with following id: ' + req.body._id + ' and following data: ' + JSON.stringify(req.body) );
        }
    });
   
})

//Laitetaan palvelin kuuntelemaan porttia 8080
const server = app.listen(8080, function(){});
