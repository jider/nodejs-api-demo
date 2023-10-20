import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils/readJSON.js'

// import pokemons from '../data/pokemons.json' assert { type: 'json' }
// import fs from 'node:fs'
// const pokemons = JSON.parse(fs.readFileSync('./data/pokemons.json', 'utf-8'))

const pokemons = readJSON('../data/pokemons.json')

export class PokemonModel {
  static async delete ({ id }) {
    const pokemonIdx = await this.getIndexById({ id })
    if (pokemonIdx === -1) return false

    pokemons.splice(pokemonIdx, 1)
    return true
  }

  static async get ({ type }) {
    let filteredPokemons = pokemons
    if (type) {
      filteredPokemons = pokemons.filter(p => p.types.some(pt => pt.toLowerCase() === type.toLowerCase()))
    }

    return filteredPokemons
  }

  static async getById ({ id }) {
    return pokemons.find(p => p.id === id)
  }

  static async getIndexById ({ id }) {
    return pokemons.findIndex(p => p.id === id)
  }

  static async create ({ pokemonData }) {
    const newPokemon = {
      id: randomUUID(),
      ...pokemonData
    }

    pokemons.push(newPokemon)

    return newPokemon
  }

  static async update ({ id, pokemonData }) {
    const pokemonIdx = await this.getIndexById({ id })

    if (pokemonIdx === -1) return false

    pokemons[pokemonIdx] = {
      ...pokemons[pokemonIdx],
      ...pokemonData
    }

    return pokemons[pokemonIdx]
  }
}
