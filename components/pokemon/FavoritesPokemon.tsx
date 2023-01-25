import { Grid, Card } from '@nextui-org/react';
import React from 'react';
import FavoriteCardPokemon from './FavoriteCardPokemon';

type Props = {
  pokemons: number[];
};

const FavoritePokemons: React.FC<Props> = ({ pokemons }) => {
  // Tambien en vez de pasar prop con los pokemon, lo puedo leer directamente de local storage
  //console.log(localStorage.getItem('favorites'));
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavoriteCardPokemon pokemonId={id} key={id} />
      ))}
    </Grid.Container>
  );
};

export default FavoritePokemons;
