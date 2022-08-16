import { updateBillingDate } from "./UpdateSubscriptions";
import admin from "../../lib/firebaseAdmin";
const bostaAPIKey = process.env.BOSTA_KEY;
const payTabsKey = process.env.PAYTABS_KEY;
const profile_id = process.env.PROFILE_ID;

const firestore = admin.firestore();
async function handler(req, res) {
    const orderReferenceID = await req.body.orderReferenceID;
    const redirectURL = await ProcessOrder(orderReferenceID);
    console.log(redirectURL);
    res.status(200).json({redirectURL: redirectURL});
}

async function getTotalPrice(order)
{
    var price = 0;
    await Promise.all(order.items.map(async (item) =>
    {
        const itemSnap = await firestore.collection('products').doc(item.uid).get();
        if(!itemSnap.exists)
        {
            throw new Error;
        }

        const itemData = itemSnap.data();
        price += (itemData.price * item.quantity);
    }))
    price = price + (price > 500? 0 : 45)
    return price;
}

async function ProcessOrder(orderReferenceID, subPaymentObject = null)
{
    var redirectURL;
    const orderReference = firestore.collection('orders').doc(orderReferenceID);
    const order = await orderReference.get().then(order =>order.data());
    order.date = new Date();
    order.totalPrice = await getTotalPrice(order);
    await orderReference.update(order);
    if(order.paymentMethod === 'CC')
    {
        const shippingDetails = {
            name: order.name,
            email: order.email,
            street1: order.address,
            city: order.area,
            state: order.city,
            country: 'EG',
        }

        const payTabsObject = subPaymentObject?? {
            profile_id: profile_id,
            tran_type: 'sale',
            tran_class: 'ecom',
            tokenise: '2',
            cart_description: JSON.stringify(order.items),
            cart_id: orderReference.id,
            cart_currency: "EGP",
            cart_amount: order.totalPrice,
            return: 'https://www.zenspecialtycoffee.com/order/' + orderReferenceID,
            callback: 'https://www.zenspecialtycoffee.com/api/followThrough/' + orderReferenceID,
            shipping_details: shippingDetails,
            customer_details: order.sameBillingAddress? shippingDetails : {}
        }

        console.log(payTabsObject);

        const response = await fetch('https://secure-egypt.paytabs.com/payment/request', 
        {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache',
            headers: 
            {
                'Authorization': payTabsKey,
                'Content-Type': 'application/json',
            },
    
             body: JSON.stringify(payTabsObject)
        });
        const ok = response.ok;
        const responseObject = await response.json()
        console.log(responseObject);

        if(!ok)
        {
            await orderReference.update({orderStatus: 'fail'});
            redirectURL = '/order/' + orderReferenceID;
            return redirectURL;
        }

        await orderReference.update({orderStatus: 'pending'});
        redirectURL =  responseObject.redirect_url
        return redirectURL;
    }
    orderReference.update({orderStatus:'COD'});
    redirectURL = await DeliveryRequest(orderReference.id);
    return redirectURL
}

export async function DeliveryRequest(orderReferenceID)
{
    const orderReference = firestore.collection('orders').doc(orderReferenceID);
    const orderDocument = await orderReference.get();
    const order = orderDocument.data();
    const deliveryObject = {
        pickupAddress: {
            firstLine: 'Neighborhood 58 Villa 149 10th Of Ramadan',
            city: 'EG-10'

        },
        dropOffAddress: {
            firstLine: order.address,
            zone: order.area,
            city: order.cityCode

        },
        receiver:{
            firstName: order.name,
            lastName: order.name,
            phone: order.phoneNumber
        },
        type: 10,
        cod: order.paymentMethod === 'COD'? order.totalPrice : 0,
        webhookUrl: 'https://www.zenspecialtycoffee.com/api/updateDeliveryState/' + orderReferenceID,

    }

    const response = await fetch('https://app.bosta.co/api/v0/deliveries',
        {
            method: 'POST', 
            mode: 'cors',
            cache: 'no-cache',
            headers: 
            {
                'Authorization': bostaAPIKey,
                'Content-Type': 'application/json'
            },
    
             body: JSON.stringify(deliveryObject)
        });
        const responseObject = await response.json()
        console.log(responseObject);
        if(!response.ok)
        {
            await orderReference.update({
                deliveryStatus: 'failed',
                log: responseObject
            });
            return '/order/' + orderReference.id
        }

        await orderReference.update({
            deliveryStatus: responseObject.state.value,
            log: responseObject
        });
        await registerAndRefreshSubscription(orderReference.id);
    
        return '/order/' + orderReference.id
}


async function registerAndRefreshSubscription(orderReferenceID) {
    const orderReference = firestore.collection('orders').doc(orderReferenceID);
    const order = await orderReference.get().then((snap) => snap.data());
    if (order.cycle !== 'oneTime') {
        const sub = await firestore.collection('subscriptions').doc(orderReference.id).get();

        if (!sub.exists) {
            await firestore.collection('subscriptions').doc(orderReference.id).set(order);
        }

        await updateBillingDate(orderReferenceID);
    }
}


export async function processSubscription(orderReferenceID)
{
    const sub = await firestore.collection('subscriptions').doc(orderReferenceID).get().then((snap) => snap.data());
    const newOrderID = await firestore.collection('orders').add({...sub, cycle: 'oneTime', sub: true}).then(ref => ref.id);
    const tokenData = await firestore.collection('tokens').doc(orderReferenceID).get().then((snap) => snap.data());
    const paymentObject = tokenData?{
        profile_id: profile_id,
        tran_type: 'sale',
        tran_class: 'recurring',
        cart_id: newOrderID,
        cart_currency: 'EGP',
        cart_amount: sub.totalPrice,
        cart_description: JSON.stringify(sub.items),
        token: tokenData.token,
        tran_ref: tokenData.ref,
        callback: 'https://www.zenspecialtycoffee.com/api/followThrough/' + newOrderID
    }
    : null
    await ProcessOrder(newOrderID, paymentObject);
    await updateBillingDate(orderReferenceID);
}

export default handler;