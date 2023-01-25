const toggleFavorite = (id: number) => {
  //creo un arreglo que si existe me devuleve el valor de favorites, si no existe me devuelve otra cosa
  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.includes(id)) {
    // filtro el id que le paso y si ya existe lo filtra y lo elimina
    favorites = favorites.filter((pokemonId) => pokemonId !== id);
    //console.log('eliminado');
  } else {
    // si no existe, lo añade a el arreglo
    favorites.push(id);
  }

  // grabo en el local storage el nuevo arreglo
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existPokeInFav = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  return favorites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};

const exportedObject = {
  toggleFavorite,
  existPokeInFav,
  pokemons
};

export default exportedObject;
