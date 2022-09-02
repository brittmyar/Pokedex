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

//////////
// New
//////////
app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/", (req, res) => {
    Pokemon.unshift(req.body)
    res.redirect("/")
});

///////////
// Show
//////////
app.get('/:id', (request, respond) => {
    respond.render('show.ejs', { data: Pokemon[request.params.id] });
});



app.delete("/:id", (req, res) => {
    Pokemon.splice(req.params.id, 1) //remove the item from the array
    res.redirect("/") //redirect back to index route
  })

  
  app.get("/:id/edit", (req, res) => {
    res.render(
        "edit.ejs",
        {
            data: Pokemon[req.params.id],
            id: [req.params.id],
        }
    )
})

app.put("/:id", (req, res) => {
    Pokemon[req.params.id] = req.body
    res.redirect("/" +req.params.id)
})


////////////
// Listen
///////////
app.listen(port, () => {
    console.log(`listening on port`, port)
});