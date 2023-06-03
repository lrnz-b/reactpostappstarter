import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import { NavLink } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Text,
  rem
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  authBtn: {
    backgroundColor: '#ff6b6b',

    ...theme.fn.hover({
      backgroundColor: theme.fn.darken('#fa5252', 0.05),
    }),
  },

  logo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const Navbar = () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const onLogout = () => {
    logoutService();
  };

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <NavLink to="/" className={classes.logo}>
            <MantineLogo size={30} color='red'/>
          </NavLink>
          <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
            <NavLink to="/" className={classes.link}>
              <Text>Home</Text>
            </NavLink>

            {!!user && (
              <NavLink to="posts" className={classes.link}>
                <Text>Posts</Text>
              </NavLink>
            )}

          </Group>

          {!!user 
            ? (<NavLink to="/" onClick={onLogout}>
                <Button className={`${classes.authBtn} ${classes.hiddenMobile}`}>
                  Logout
                </Button>
              </NavLink>)
            : (
              <NavLink to="login">
                <Button className={`${classes.authBtn} ${classes.hiddenMobile}`}>
                  Log in
                </Button>
              </NavLink>)
          }

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
          <NavLink to="/" className={classes.link} onClick={closeDrawer}>
            <Text>Home</Text>
          </NavLink>

          {!!user && (
            <NavLink to="posts" className={classes.link} onClick={closeDrawer}>
              <Text>Posts</Text>
            </NavLink>
          )}

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          {!!user
            ? (
                <NavLink to="/" onClick={onLogout}>
                  <Group position="center" pb="xl" px="md" grow>
                    <Button onClick={closeDrawer}>
                      <Text>Logout</Text>
                    </Button>
                  </Group>
                </NavLink>
              )
            : (
                <NavLink to="login">
                  <Group position="center" pb="xl" px="md" grow>
                    <Button onClick={closeDrawer}>
                      <Text>Login</Text>
                    </Button>
                  </Group>
                </NavLink>
              )
          }

        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Navbar;