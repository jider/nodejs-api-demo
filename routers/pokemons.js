import { Router } from 'express'
import { PokemonsController } from '../controllers/pokemons.js'

export function createPokemonRouter ({ pokemonModel }) {
  const pokemonRouter = Router()
  const pokemonController = new PokemonsController({ pokemonModel })

  pokemonRouter.get('/', pokemonController.getAll)
  pokemonRouter.post('/', pokemonController.create)
  
  pokemonRouter.get('/:id', pokemonController.getById)
  pokemonRouter.patch('/:id', pokemonController.update)
  pokemonRouter.delete('/:id', pokemonController.delete)

  return pokemonRouter
}



