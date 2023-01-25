import { Grid, Card } from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/router';

type Props = {
  pokemonId: number;
};

const FavoriteCardPokemon: React.FC<Props> = ({ pokemonId }) => {
  let router = useRouter();

  const onClickFavs = () => {
    router.push(`pokemon/${pokemonId}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemonId} onClick={onClickFavs}>
      <Card isHoverable isPressable css={{ padding: 10 }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          width={'100%'}
          height={140}
        />
      </Card>
    </Grid>
  );
};

export default FavoriteCardPokemon;
