import { Link, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Tamp from '../../public/Contact/Tamp.jpg';
function contact() {
    return ( 
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
            <div style={{width:'50%', margin:'40px', alignSelf:'center'}}>
                <Image src={Tamp}/>
            </div>
            <Typography variant='body1' align='center' marginX='30px'>
                We're available for wholesale, private labeling, and barista training. We welcome your inquiries!
                You can reach us at <Link href='mailto:info@zenspecialtycoffee.com'>info@zenspecialtycoffee.com</Link>
            </Typography>
        </div>
     );
}

export default contact;