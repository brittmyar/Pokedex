////////////////////////
// Require Dependencies
////////////////////////
const express = require('express');
const Pokemon = require('./models/pokemon.js');
const methodOverride = require("method-override")
/////////////////////////
// Initialize Express App
/////////////////////////
const app = express();
const port = 3000

////////////////////////////////////////////
// Middleware (Above Routes, Under Express)
////////////////////////////////////////////

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(methodOverride("_method"))
////// DEFINE ROUTES ///////

////////////
// Index
///////////
app.get('/', (request, respond) => {
    respond.render('index.ejs', { data: Pokemon});
});

///////////
// Show
//////////
app.get('/:id', (request, respond) => {
    respond.render('show.ejs', { data: Pokemon[request.params.id] });
});
//////////
// New
//////////
app.get("'/'/new", (request, respond) => {
    respond.render('new.ejs')
});

app.post('/', (request, respond) => {
    console.log(request.body)
    data.push(request.body)
    respond.redirect('/pokemons')
});


app.delete("/:id", (req, res) => {
    Pokemon.splice(req.params.id, 1) //remove the item from the array
    res.redirect("/") //redirect back to index route
  })




////////////
// Listen
///////////
app.listen(port, () => {
    console.log(`listening on port`, port)
});