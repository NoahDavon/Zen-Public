import { firestore } from '../../lib/firebase';
import React, { useState, useEffect } from 'react';

export async function getServerSideProps(context){
    const {id} = context.params;
    console.log(id)
    return {
        props: context.params,
    }
}
function OrderResponse(props) {
    const [order, setOrder] = useState();
    useEffect(() => {
        let unsubscribe;
        const orderRef = firestore.collection('orders').doc(props.id);
        unsubscribe = orderRef.onSnapshot((order) =>{
            setOrder({data: order.data(), id: order.id });
        });
        return unsubscribe; 
    }, [order])
    return ( 
        order !== undefined?
        <div style={{margin:'auto', justifyContent:'center', alignItems:'center', textAlign: 'center', width:'fit-content', display:'flex', flexDirection:'column'}}>
            <div>Order Reference: {order.id}</div>
            <div>Order status: {order.data.deliveryStatus}</div>
            <div>Items: </div>
            {order.data.items.map((item) =>
                <div key = {item.name}>  {item.displayName} - {item.grind} - {item.quantity} bags </div>
            )}
        </div> 
        :
        <div>404. That means you shouldn't be here.</div>
    );
}



export default OrderResponse;