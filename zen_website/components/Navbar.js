import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Badge, Grid, IconButton, Stack, Tooltip} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MainMenu from './MainMenu';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuButton from './MenuButton';
import {useCart} from 'react-use-cart';
import Link from 'next/link';
import CartMenu from './CartMenu';
import UserMenu from './UserMenu';
import Logo from '../public/logo/Logo2.png';
import TextLogo from '../public/logo/LogoText.png';
import Image from 'next/image';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Navbar(props) {
  const {
    totalItems,
  } = useCart();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])
  const theme = useTheme();
  const bWideScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative' color="background">
        <Toolbar>
          <Grid container alignItems={'center'} justifyContent={"space-between"}>
            {bWideScreen?
            <Grid item display={'flex'} justifyContent={'space-around'} alignItems={'center'} xs={3} flexDirection='row'>
                <MainMenu horizontal/>
            </Grid>
            :
            <Grid item xs={3}>
              <MenuButton icon={<MenuIcon style={{fontSize:'4rem'}} />}>
                  <MainMenu/>
              </MenuButton>
            </Grid>
            }
            <Grid item display={'flex'} minHeight={160} justifyContent={'center'} alignItems={'center'} xs = {5}>
                <Stack>
                  <Link href='/' passHref>
                    <a>
                      <div style={{height:'auto', width: bWideScreen? '120px' : '70%', margin:'20px'}}>
                        <Image src={Logo}/>
                      </div>
                    </a></Link>
                  {!bWideScreen &&
                  <div style={{height: 'auto', width:'100%', paddingBottom:'10px'}}>
                    <Image src={TextLogo} />
                  </div>
                  }
                </Stack>
                <Link href='/' passHref>
                  <a>{bWideScreen &&
                  <div style={{height: 'auto', width:'100%', paddingBottom:'10px'}}>
                    <Image src={TextLogo} />
                  </div>
                }</a></Link>
            </Grid>
            <Grid item display={'flex'} minHeight={160} justifyContent={'center'} alignItems={'center'} xs = {3}>
              {hasMounted && <Badge badgeContent={totalItems} color={'secondary'}>
                <MenuButton icon={<ShoppingCartIcon style={{fontSize:'2rem'}}/>}>
                  <CartMenu/>
                </MenuButton>
              </Badge>}
              <div style={{width:'20px'}}></div>
              <MenuButton icon={<AccountCircleIcon style={{fontSize:'2rem'}}/>}>
                <UserMenu/>
              </MenuButton>
              <Tooltip title={"Change Theme"}>
                <IconButton sx={{ ml: 1 }} onClick={() => props.setDark(!props.dark)} color="inherit">
                  {props.dark? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}