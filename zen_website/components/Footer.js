import { Divider, Typography, Link, Button } from '@mui/material';
import React, {useState} from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
 

function Footer() {
    const [open, setOpen] = useState(false);
    return ( 
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', marginLeft:'auto', marginRight:'auto', width:'fit-content', marginTop:'20px'}}>
            <Divider/>
            <Button onClick={(e) => setOpen(!open)} sx={{textTransform:'none', marginY:'30px', borderRadius:'10px'}} variant='contained'><Typography variant="h3" align='center'>Get The Coffee While It's Hot! 
            <br/>Sign up for our newsletter now!</Typography></Button>
            {open&&<iframe style={{minHeight:'450px', color: '#0c1f23', border:'0'}} src="https://cdn.forms-content.sg-form.com/8018ca58-0f72-11ed-a38b-620ff682f10d"/>}
            <div style={{display:'flex', justifyContent:'space-between',alignSelf:'center'}}>
                <Link href='https://www.facebook.com/Zenspecialtycoffee'><FacebookIcon sx={{fontSize:60}}/></Link>
                <Link href='https://www.instagram.com/zenspecialtycoffee/'><InstagramIcon sx={{fontSize:60}}/></Link>
            </div>
        </div>
     );
}

export default Footer;