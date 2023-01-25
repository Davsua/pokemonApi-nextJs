import { Card, Container, Grid, Image, Text } from '@nextui-org/react';
import Layouts from 'davsua/components/layouts/Layouts';
import FavoritePokemon from 'davsua/components/pokemon/FavoritesPokemon';
import { NoFavorites } from 'davsua/components/ui';
import { localFavorites } from 'davsua/utils';
import { useState, useEffect } from 'react';

const FavoritePages = () => {
  const [favoritePokemons, setfavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setfavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layouts title="Favorites">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokemon pokemons={favoritePokemons} />
      )}
    </Layouts>
  );
};

export default FavoritePages;
