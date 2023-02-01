import { useEffect, useState } from 'react';

import { Button, Card, Container, Grid, Image, Text, useTheme } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';

import Layouts from 'davsua/components/layouts/Layouts';
import { Pokemon } from 'davsua/interfaces';
import { localFavorites, getPokemonInfo } from 'davsua/utils';

import confetti from 'canvas-confetti';
import { TextColor } from 'davsua/components/pokemon/TextColor';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  //console.log(pokemon.types[0].type);
  const { theme } = useTheme();

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
          <Card
            style={{
              backgroundColor: theme?.colors.gray300.value
            }}
          >
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
          <Card
            style={{
              backgroundColor: theme?.colors.gray300.value
            }}
          >
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              {/*<Text>{pokemon.type}</Text>*/}

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
              <Text h2>Type: </Text>
              <Text
                h3
                color={TextColor(pokemon.type[0].type.name)}
                css={{
                  paddingLeft: '10px'
                }}
                transform="capitalize"
              >
                {pokemon.type[0].type.name}
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layouts>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, i) => `${i + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id }
    })),
    //fallback: false
    fallback: 'blocking' // permite encontrar la peticion asi no se haya pasado inicialmente (ej: pokemon 152)
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/', // a donde redigira
        permanent: false // en este caso false por que es posible que se sigan creando pokemones
      }
    };
  }

  return {
    props: {
      pokemon
    },
    revalidate: 86400 // dato en segundos (revalidacion de la data (pagina))
  };
};

export default PokemonPage;
