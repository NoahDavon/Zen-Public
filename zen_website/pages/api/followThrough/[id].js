import { DeliveryRequest } from "../CheckoutFunction";
import admin from "../../../lib/firebaseAdmin";

export default async function handler(req, res) {
    const firestore = admin.firestore();
    const {id} = req.query;
    if(req.method !== 'POST'){
        console.log('Invalid request');
        res.status(401).json({ ERROR: 'Invalid Method' })
        return;
    }
    console.log(req.body);
    const orderReference = firestore.collection('orders').doc(id);
    const order = await orderReference.get().then(doc => doc.data());
    if(req.body.payment_result.response_status !== 'A')
    {
        await orderReference.update({orderStatus: 'fail'});
        res.status(200).json({})
        return;
    }

    if(order.cycle !== 'oneTime')
    {
        console.log("Registering subscription on follow through");
        const itemSnap = await firestore.collection('tokens').doc(orderReference.id).get();
        if(!itemSnap.exists && req.body.token)
        {
            await firestore.collection('tokens').doc(orderReference.id).set({token: req.body.token, ref: req.body.tran_ref});
            console.log(req.body.tran_ref);
        }
        
    }

    await orderReference.update({orderStatus: 'paid'});
    await DeliveryRequest(id);
    res.status(200).json({})
  }
  