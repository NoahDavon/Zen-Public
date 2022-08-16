import { useTheme } from '@mui/material/styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import React, {useState} from 'react';
import {useCart} from 'react-use-cart';
function ProductCard(props) {
    const theme = useTheme();
    const [grind, setGrind] = useState("Choose Grind");
    const {addItem} = useCart();
    const product = props.product;
    const handleChange = (event) => {
        setGrind(event.target.value);
      };
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    const grinds = ['Whole Beans', 'Cold Brew', 'French Press', 'Coffee Maker', 'Chemex', 'V60', 'Aeropress', 'Moka Pot', 'Espresso'];
    return ( 
        <div>
            <Card raised sx={{display:'flex', flexDirection:'column',width:'90vw',maxWidth:'30rem', margin:'15px'}}>
                <CardMedia
                component='img'
                src={'/Coffees/' + product.name + '.jpeg'}
                height='auto'
                sx={{position:'sticky'}}
                />
                <CardContent sx={{height:'30vh', overflowY:'scroll', minHeight:'6rem'}}>
                <Typography align='center'>Notes: {product.Notes}</Typography>
                    <Typography align='center'>Region: {product.Region}</Typography>
                    <Typography align='center'>Process: {product.Process}</Typography>
                    <Typography align='center'>Varietal: {product.Varietal}</Typography>
                    <Typography align='center'>Altitude: {product.Altitude}</Typography>
                    <Typography align='center'>180g bag</Typography>
                    <Typography align='center'>{product.description}</Typography>
                </CardContent>
                <CardActions sx={{fontSize:'1rem', position:'sticky', display:'flex', flexDirection:'row', flexWrap:'wrap',minHeight:'5rem', justifyContent:'space-around', alignItems:'center', justifySelf:'center', height:'fit-content'}}>
                    {product.price} EGP
                    <Select
                    value={grind}
                    defaultValue="Choose Grind"
                    onChange={handleChange}
                    sx={{'.MuiSelect-icon': {color: theme.palette.text.primary}, fontSize:'1rem'}}
                    >
                        <MenuItem disabled value="Choose Grind" sx={{fontSize:'1rem'}}>Choose Grind</MenuItem>
                        {grinds.map(grind => <MenuItem key={grind} value={grind} sx={{fontSize:'1rem'}}>{grind}</MenuItem> )}
                    </Select>
                    <Button disabled={!grinds.includes(grind)} variant="outline" color="primary" onClick={()=>{
                        const newItem = product;
                        newItem.id = props.id + grind;
                        newItem.uid = props.id;
                        newItem.grind = grind;
                        addItem(newItem);
                        handleClick();
                        }
                    }>
                        <Typography fontSize='1rem'>Add To Cart</Typography>
                    </Button>
                </CardActions>
            </Card>
            <Snackbar
            open={open}
            autoHideDuration={800}
            onClose={handleClose}
            >
                <Alert onClose={handleClose} variant='outlined' color='primary' severity="success" sx={{ width: '100%' }}>
                    Added to cart!
                </Alert>
            </Snackbar>
        </div>
     );
}

export default ProductCard;