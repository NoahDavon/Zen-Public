import { Divider, IconButton, MenuItem } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CancelIcon from '@mui/icons-material/Cancel';
import {useCart} from 'react-use-cart'
function CartMenuItem(props) {
    const {updateItemQuantity} = useCart();
    return (
        <div style={{width:props.width??'100%'}}> {props.item !== undefined &&
            <div style={{display:'flex', flexDirection:'row',alignItems:'center', justifyContent:'space-evenly', minWidth: props.width??'40vw'}}>
                <div style={{width:'30%'}}>{props.item.displayName} - {props.item.grind}</div>
                <div style={{width:'20%'}}>{props.item.price} EGP</div>
                <div style={{width:'10rem', justifyContent: 'space-between', flexDirection: 'row', alignItems:'center'}}>
                    <IconButton color="inherit" onClick={()=>updateItemQuantity(props.item.id, props.item.quantity - 1)}><RemoveIcon/></IconButton>
                    {props.item.quantity}
                    <IconButton color="inherit" onClick={()=>updateItemQuantity(props.item.id, props.item.quantity + 1)}><AddIcon/></IconButton>
                </div>
                <div style={{width:'20%'}}>{props.item.price * props.item.quantity} EGP</div>
                <IconButton sx={{width:'10%'}} color="inherit" onClick={()=>updateItemQuantity(props.item.id, 0)}><CancelIcon/></IconButton>
            </div>}
            <Divider/>
        </div>
     );
}

export default CartMenuItem;