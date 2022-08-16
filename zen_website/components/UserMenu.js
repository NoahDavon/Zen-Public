import React from 'react';
import {Typography, MenuItem} from '@mui/material'
import Link from 'next/link'
import { AuthContext } from '../lib/context';
import { useContext } from 'react';
import { auth } from '../lib/firebase';
function UserMenu() {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <Link href='/order' underline='hover'>
                <MenuItem>
                <Typography variant='h1' fontSize='1rem'>  Orders & Subscriptions  </Typography>
                </MenuItem>
            </Link>
            {
            user &&
            <MenuItem onClick={() => auth.signOut()}>
                <Typography variant='h1' fontSize='1rem'>  Sign Out  </Typography>
            </MenuItem>
            }
        </div>
    );
}

export default UserMenu;