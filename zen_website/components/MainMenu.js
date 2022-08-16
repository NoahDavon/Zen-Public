import React from 'react';
import {Typography, MenuItem} from '@mui/material'
import Link from 'next/link'
function MainMenu(props) {
    return (
        <div style={props.horizontal &&{display: 'flex' , flexDirection: 'row', justifyContent:'space-around', alignItems:'center', width:'100%'}}>
            <Link href='/about' underline='hover'>
                <MenuItem>
                <Typography variant='h1' fontSize='1rem'>  ABOUT  </Typography>
                </MenuItem>
            </Link>
            <Link href='/contact' underline='hover'>
                <MenuItem>
                <Typography variant='h1' fontSize='1rem'>  CONTACT  </Typography>
                </MenuItem>
            </Link>
            <Link href='/faq' underline='hover'>
                <MenuItem>
                <Typography variant='h1' fontSize='1rem'>  FAQ  </Typography>
                </MenuItem>
            </Link>
            <Link href='/shop' underline='hover'>
                <MenuItem>
                <Typography variant='h1' fontSize='1rem'>  SHOP  </Typography>
                </MenuItem>
            </Link>
        </div>
    );
}

export default MainMenu;