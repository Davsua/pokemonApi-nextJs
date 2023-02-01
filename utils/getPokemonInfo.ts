import { pokeApi } from 'davsua/api';
import { Pokemon } from 'davsua/interfaces';

export const getPokemonInfo = async (nameOrId: string) => {
  // se convierte en promesa para buscar si existe, si no existe, envolver el error
  try {
    //de donde lo saco (ruta real) -> https://pokeapi.co/api/v2/pokemon/ditto
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    // tomar solo los datos necesarios (optimizar)
    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      type: data.types
    };
  } catch (err) {
    return null;
  }
};
