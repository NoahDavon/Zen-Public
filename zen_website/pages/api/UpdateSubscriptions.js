import admin from "../../lib/firebaseAdmin";
import { processSubscription } from "./CheckoutFunction";

const firestore = admin.firestore();

export default async function handler(req, res) {

  const passcode = process.env.PASSCODE;

  if(req.headers.passcode === passcode)
  {
    const dateNow =  new Date();
    const dueSubscriptionsSnapshot = await firestore.collection('subscriptions').where('nextBilling', '<=', dateNow).get();
    let subs = [];
    await Promise.all(dueSubscriptionsSnapshot.docs.map(async sub => 
      {
        subs.push({id: sub.id, data: sub.data()})
        await processSubscription(sub.id);
      }));

    
    res.status(200).json("Updated " + subs.length + " Subscriptions today!");
  }

  else
  {
    res.status(403).json();
  }
}

export async function updateBillingDate(orderReferenceID) {
  let nextBillingDate = new Date();
  var newDate = new Date();
  const subRef = firestore.collection('subscriptions').doc(orderReferenceID);
  const subDoc = await subRef.get();
  switch (subDoc.data().cycle) {
    case 'weekly':
      newDate = new Date(nextBillingDate.setDate(nextBillingDate.getDate() + 7));
      break;
    case 'bimonthly':
      newDate = new Date(nextBillingDate.setDate(nextBillingDate.getDate() + 14));
      break;
    case 'monthly':
      newDate = new Date(nextBillingDate.setMonth(nextBillingDate.getMonth() + 1));
      break;
  }

  await subRef.update({ lastBilling: new Date(), nextBilling: newDate });
}
