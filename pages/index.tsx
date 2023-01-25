import Layouts from '../components/layouts/Layouts';
import { NextPage, GetStaticProps } from 'next';
import { pokeApi } from '../api';
import { PokemonResponse, SmallPokemon } from '../interfaces';
import { Grid } from '@nextui-org/react';
import { PokemonCard } from 'davsua/components/pokemon/PokemonCard';

interface Props {
  pokemons: SmallPokemon[];
}

// funcion para obtener todos los pokemon y asignar id e img al final

const HomePage: NextPage<Props> = ({ pokemons }) => {
  //console.log(pokemons);

  return (
    <Layouts title="Listado de pokemons">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layouts>
  );
};

// SE EJECUTA UNICAMENTE DEL LADO DEL SERVIDOR
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonResponse>('/pokemon?limit=151');
  //console.log(data);
  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`
  }));

  // console.log(pokemons)

  return {
    props: {
      pokemons
    }
  };
};

export default HomePage;
