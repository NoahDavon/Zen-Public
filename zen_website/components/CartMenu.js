import { Button, Divider, Menu, Tooltip } from '@mui/material';
import React from 'react';
import {useCart} from 'react-use-cart';
import CartMenuItem from './CartMenuItem';
import Link from 'next/link';
function CartMenu() {
    const {items, isEmpty, cartTotal, emptyCart} = useCart();
    return (
        <div style={{fontSize: '1rem'}}> 
            {isEmpty && <div>The cart is empty!!</div>}
            {!isEmpty &&
            <div>
                <div style={{display:'flex', flexDirection:'row',alignItems:'center', justifyContent:'space-evenly', minWidth:'40vw'}}>
                    <div style={{width:'30%'}}>Name</div>
                    <div style={{width:'20%'}}>Price</div>
                    <div style={{width:'10rem'}}>Quantity</div>
                    <div style={{width:'20%'}}>Total Price</div>
                    <div style={{width:'10%'}}></div>
                </div>
                <Divider/>
            </div>
            }
            {items.map(item => <CartMenuItem key={item.id} item={item}/>)}
            {!isEmpty&&
            <div>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', margin: '10px'}}>
                    <Tooltip title={"FREE shipping on orders above 500 EGP!"}>
                        <div>Shipping: {cartTotal > 500? 'FREE!' : 45 + ' EGP'}</div>
                    </Tooltip>
                </div>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
                    <div>Total: {cartTotal > 500? cartTotal : cartTotal + 45} EGP</div>
                    <Button onClick={() => emptyCart()}>Clear Cart</Button>
                    <Link href='/checkout'><Button>Checkout</Button></Link>
                </div>
            </div>}

        </div>
    );
}

export default CartMenu;