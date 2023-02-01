import { Image, Link, Spacer, Text, useTheme, Switch, createTheme } from '@nextui-org/react';
import { useTheme as useNextTheme } from 'next-themes';

export const NavBar = () => {
  // usar color de UI
  const { theme } = useTheme();

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
          padding: '0 20px',
          backgroundColor: theme?.colors.gray100.value,
          color: theme?.colors.gray300.value
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
          <Text h2>P</Text>
          <Text h3>okemon</Text>
        </Link>
        {/*</NextLink>*/}

        <Spacer css={{ flex: 1 }} />

        {/*<NextLink href="\favorites" passHref>*/}
        <Link href="/favorites">
          <Text>Favoritos</Text>
        </Link>
        {/*</NextLink>*/}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          padding: '5px 20px'
        }}
      >
        <Switch checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
        <Spacer y={2} />
      </div>
    </>
  );
};

//export default NavBar
