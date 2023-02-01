import { Grid, Card, Row, Text, useTheme } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import { SmallPokemon } from '../../interfaces';
import { useRouter } from 'next/router';
import axios from 'axios';
import { TextColor } from './TextColor';

interface Props {
  pokemon: SmallPokemon;
  //pokemonInfo: Pokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  //console.log(pokemon.type);

  const { theme } = useTheme();

  const router = useRouter();

  const onClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  const [type, settype] = useState();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((res) => settype(res.data.types[0].type.name))
      .catch((err) => console.log(err));
  }, [pokemon.name]);

  //console.log(type);

  const pokemonx = {
    ...pokemon,
    type: type
  };

  //console.log(pokemonx.type);

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
      <Card
        isHoverable
        isPressable
        onClick={onClick}
        style={{
          backgroundColor: theme?.colors.gray300.value,
          borderColor: theme?.colors.gray500.value,
          borderStyle: 'solid',
          borderWidth: '2px'
        }}
      >
        <Card.Body css={{ p: 1 }}>
          <Card.Image
            src={pokemon.img}
            width="100%"
            height={140}
            style={{
              padding: '8px'
            }}
          />
          <Card.Footer
            style={{
              borderTopColor: theme?.colors.gray500.value,
              borderTopWidth: '2px',
              borderTopStyle: 'solid'
            }}
          >
            <Row justify="space-between">
              <Text transform="capitalize">{pokemon.name}</Text>
              <Text color={TextColor(pokemonx?.type)}>{type}</Text>
            </Row>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Grid>
  );
};
