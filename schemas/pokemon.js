import { z } from 'zod'

export const pokemonSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be 2 or more characters long' }),
  url: z.string().url({ message: 'Url must be a valid url' }),
  base_experience: z.number().int().positive(),
  height: z.number().int().positive(),
  weight: z.number().int().positive(),
  types: z.array(z.enum(['fire', 'grass', 'poison', 'water'])).nonempty()
})

export function validateMovie (movie) {
  const parsedMovie = pokemonSchema.safeParse(movie)
  if (!parsedMovie.success) throw new Error(parsedMovie.error.format().name?._errors ?? 'The movie is not valid')
  return parsedMovie.data
}

export function validatePartialMovie (data) {
  const parsedData = pokemonSchema.partial().safeParse(data)
  if (!parsedData.success) throw new Error(parsedData.error.name ?? 'The movie is not valid')
  return parsedData.data
}
