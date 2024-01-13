const express = require('express')
const helper = require('./helper.js') 
const bodyParser= require('body-parser')
const app = express()
const sequelize = require('./src/db/sequelize');
const port = process.env.PORT || 3000;

const logger = (req, res, next)=> {
    console.log(`URL : ${req.url}`)
    next()
}
 sequelize.initDb();
 sequelize.initUser();

 app.get('/', (req, res)=>{
  res.json('Hello, Heroku!')
 })
app.use(bodyParser.json())
app.use(logger
    )

    // Ici nous placerons nos futurs points de terminaison liés à la base de données
const findAllPokemons = require('./src/routes/findAllPokemons.js')
findAllPokemons(app);
const findPokemonByPk= require('./src/routes/findPokemonByPk.js')
findPokemonByPk(app);
const updatePokemon= require('./src/routes/updatePokemon.js')
updatePokemon(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/createPokemon')(app); 
const login= require('./src/routes/login.js')
login(app); 

//****************************************************************************** */
// on ajoute la gestion des erreurs
app.use(({res})=> {
  const message =" Impossible de trouver l'URL demandée! vous pouvez essayer une autre URL"
res.status(401).json({message})
}) 


app.listen(port, () => console.log(`notre application node est demarré sur http://localhost:${port}`))
