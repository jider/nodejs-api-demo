import { validateMovie, validatePartialMovie } from '../schemas/pokemon.js'

export class PokemonsController {
  constructor ({ pokemonModel }) {
    this.pokemonModel = pokemonModel
    this.test = 999
  }

  getAll = async (req, res) => {
    const { type } = req.query
    return res.status(200).json(await this.pokemonModel.get({ type }))
  }

  getById = async (req, res) => {
    const { id } = req.params
    const pokemon = await this.pokemonModel.getById({ id: Number(id) })

    if (!pokemon) return res.status(404).json({ message: 'Pokemon not found' })
    return res.status(200).json(pokemon)
  }

  create = async (req, res) => {
    try {
      const pokemonData = validateMovie(req.body)
      const newPokemon = await this.pokemonModel.create({ pokemonData })
      return res.status(201).json(newPokemon)

    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params
      const pokemonData = validatePartialMovie(req.body)
      const result = await this.pokemonModel.update({ id: Number(id), pokemonData })

      if (!result) return res.status(404).json({ message: 'Pokemon not found' })
      return res.status(200).json(result)

    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.pokemonModel.delete({ id: Number(id) })

    if (!result) return res.status(404).json({ message: 'Pokemon not found' })
    return res.status(204).json()
  }
}
