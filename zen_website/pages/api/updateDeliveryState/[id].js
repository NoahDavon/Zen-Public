import admin from "../../../lib/firebaseAdmin";
export default async function handler(req, res) {
    const firestore = admin.firestore();
    const {id} = req.query;
    if(req.method !== 'POST'){
        console.log('Invalid request');
        res.status(401).json({ ERROR: 'Invalid Method' })
        return;
    }
    const body = req.body;
    console.log(body);
    const orderReference = firestore.collection('orders').doc(id);
    await orderReference.update({deliveryStatus: body.state});
    res.status(200).json({})
    return;
}