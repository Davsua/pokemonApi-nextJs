import { useEffect, useState } from 'react';

import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';

import { pokeApi } from 'davsua/api';
import Layouts from 'davsua/components/layouts/Layouts';
import { Pokemon, PokemonResponse } from 'davsua/interfaces';
import { localFavorites, getPokemonInfo } from 'davsua/utils';

import confetti from 'canvas-confetti';

interface Props {
  pokemon: Pokemon;
}

const PokemonName: NextPage<Props> = ({ pokemon }) => {
  const [isInFav, setIsInFav] = useState(false);

  // lo debo setear aqui y no directamente en el useState evitando el error de hidratacion
  useEffect(() => {
    setIsInFav(localFavorites.existPokeInFav(pokemon.id));
  }, [pokemon.id]);

  const onToggleFavorites = () => {
    localFavorites.toggleFavorite(pokemon.id); //.toggleFavorite(pokemon.id)
    // modifica en tiempo real al cambiar el valor que tenga
    setIsInFav(!isInFav);

    if (isInFav) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    });
  };

  return (
    <Layouts title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>

              {/* onPress === onClick en nextUI*/}
              <Button color="gradient" ghost={!isInFav} onPress={onToggleFavorites}>
                {isInFav ? 'En favoritos' : 'Guardar en favoritos'}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container display="flex" direction="row" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layouts>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  //tomo los datos de mi peticion
  const { data } = await pokeApi.get<PokemonResponse>(`pokemon?limit=151`);
  //tomo el dato especifico que busco
  const pokemonNames: string[] = data.results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonNames.map((name) => ({
      params: { name }
    })),

    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // lo que recibo
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    }
  };
};

export default PokemonName;
