import express from 'express'
import helmet from 'helmet'

import { corsMiddleware } from './middlewares/cors.js'
import { createPokemonRouter } from './routers/pokemons.js'
import { PokemonModel } from './models/pokemon.js'

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(helmet())
app.use(corsMiddleware())

// Router
app.use('/pokemons', createPokemonRouter({ pokemonModel: PokemonModel }))

const port = process.env.PORT ?? 1234

app.listen(port, () => { console.log(`Listening on port ${ port }`) })
