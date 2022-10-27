const express =  require('express');
const app = express();

const mongoose = require('mongoose');

const product = require('./storeSchema.js');

const mongodb = require('mongodb');

const bodyparser = require('body-parser');

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:false}));

const uri = 'mongodb+srv://jusu:jusu@cluster0.lemh2mq.mongodb.net/storelibrary?retryWrites=true&w=majority'
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser:true})

const db = mongoose.connection
db.once('open', function() {
    console.log('Tietokantayhteys avattu');
})

app.get('/storelibrary', function(req,res) {
    product.find(req.query, function( err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result);
        }
    })
    })

app.post('/newProduct', function (req, res) {
    delete req.body._id; 
    db.collection('storelibrary').insertOne(req.body);
    res.send('Product is added with following data: ' + JSON.stringify(req.body));
})

app.post('/deleteProduct', function (req, res) {
    db.collection('storelibrary').deleteOne( { _id: new mongodb.ObjectId(req.body._id)}, function( err, result){
        if ( err ) {
            res.send('Error deleting with following data: ' + err);
        } else {
            res.send('Product is deleted with following id: ' + req.body._id);
        }
    });
   
})

app.post('/updateProduct', function(req,res){
    db.collection('storelibrary').updateOne({_id:new mongodb.ObjectId(req.body._id)},{$set:{Manufacturer:req.body.Manufacturer, Model:req.body.Model, Price:req.body.Price, ProductCategory:req.body.ProductCategory, Color:req.body.Color}},function(err,results){
        if ( err ) {
            res.send('Error updating: ' + err);
        } else {
            res.send('Product is updated with following id: ' + req.body._id + ' and following data: ' + JSON.stringify(req.body) );
        }
    });
   
})


const server = app.listen(8080, function(){});
