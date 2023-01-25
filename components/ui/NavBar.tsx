import { Image, Link, Spacer, Text, useTheme } from '@nextui-org/react';
import NextLink from 'next/link';

export const NavBar = () => {
  // usar color de UI
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0 20px',
        backgroundColor: theme?.colors.gray100.value
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
        alt="icono app"
        width={70}
        height={70}
      />

      {/*<NextLink href="/" passHref>*/}
      <Link href="/">
        <Text color="white" h2>
          P
        </Text>
        <Text color="white" h3>
          okemon
        </Text>
      </Link>
      {/*</NextLink>*/}

      <Spacer css={{ flex: 1 }} />

      {/*<NextLink href="\favorites" passHref>*/}
      <Link href="/favorites">
        <Text color="white">Favoritos</Text>
      </Link>
      {/*</NextLink>*/}
    </div>
  );
};

//export default NavBar
