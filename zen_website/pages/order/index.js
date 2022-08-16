import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../../lib/context';
import Login from '../../components/Login';
import NextLink from 'next/link';

import { Tabs, Tab, Typography, Divider, Pagination, Link, Button, LinearProgress } from '@mui/material';
import { firestore } from '../../lib/firebase';
import TabPanel from '../../components/TabPanel';

const LIMIT = 5;

function Orders() {
    const {user} = useContext(AuthContext);
    const [value, setValue] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const getMoreOrders = async () =>
    {
        if(!user) return;

        const cursor = orders.length? orders[orders.length - 1].data.date : new Date();

        const newOrders = await firestore.collection('orders').
            where('email', '==', user.email).
            orderBy('date', 'desc').
            startAfter(cursor).limit(orders.length? LIMIT : LIMIT * 3).get().
            then((snap) => snap.docs.map((doc) => {return {id:doc.id, data: doc.data()}}));

        setOrders(orders.concat(newOrders));
    }

    const getMoreSubs = async (refresh = false) =>
    {
        if(!user) return;

        const cursor = subs.length? subs[subs.length - 1].data.date : new Date();
        await firestore.waitForPendingWrites();
        const newOrders = await firestore.collection('subscriptions').
            where('email', '==', user.email).
            orderBy('date', 'desc').
            startAfter(cursor).limit(subs.length? LIMIT : LIMIT * 3).get().
            then((snap) => snap.docs.map((doc) => {return {id:doc.id, data: doc.data()}}));

        setSubs(refresh? newOrders :subs.concat(newOrders));
    }

    useEffect(()=>
    {
        setPage(1);
        setLoading(true);
        setOrders([]);
        setSubs([]);
        getMoreOrders().then(getMoreSubs).then(()=> setLoading(false));
    }
    , [user])

    const handleChange = (_, newValue) => {
        setPage(1);
        setValue(newValue);
    };

    return (
        !user?
        <div style={{margin: 'auto', width:'fit-content', display:'flex', justifyContent:'center', flexDirection:'column'}}>
            <Typography sx={{marginY:'1.5rem'}}>Please sign in to view your orders & subscriptions. If it's your first time here, signing in will create an account for you.</Typography>
            <Login/>
        </div>
        :
        <div>
            <div style={{margin: 'auto', width:'fit-content', display:'flex', justifyContent:'center', flexDirection:'column', marginY:'10px'}}>
                <Tabs value={value} onChange={handleChange} sx={{marginY:'20px'}}>
                    <Tab label="Orders" value={'orders'}/>
                    <Tab label="Subscriptions" value={'subs'}/>
                </Tabs>
                {loading && <LinearProgress color='primary'/>}
            </div>
                <TabPanel value={value} index='orders'>
                    {orders.length !== 0? 
                    <div>
                        <div style={{overflowY:'scroll'}}>
                            <div style={{margin: 'auto', width:'100rem', display:'flex', justifyContent:'center', flexDirection:'column', marginY:'10px'}}>
                                <div style={{display:'flex', flexDirection:'row', marginY:'10px'}}>
                                    <div style={{width: '20%'}}>Order reference</div>
                                    <div style={{width: '15%'}}>Date ordered</div>
                                    <div style={{width: '15%'}}>Number of items</div>
                                    <div style={{width: '15%'}}>Total price</div>
                                    <div style={{width: '15%'}}>Payment method</div>
                                    <div style={{width: '15%'}}>Status</div>
                                </div>
                                <Divider></Divider>
                                {orders.slice((page-1)*LIMIT, Math.min(orders.length, (page)*LIMIT )).map((order) =>
                                <div key= {order.id} style={{display:'flex', flexDirection:'row', marginY:'10px'}}>
                                    <div style={{width: '20%'}}><NextLink href={'/order/' + order.id} passHref><Link>{order.id}</Link></NextLink></div>
                                    <div style={{width: '15%'}}>{(new Date(order.data.date.toMillis())).toLocaleDateString('en-UK')}</div>
                                    <div style={{width: '15%'}}>{order.data.items.length}</div>
                                    <div style={{width: '15%'}}>{order.data.totalPrice} EGP</div>
                                    <div style={{width: '15%'}}>{order.data.paymentMethod}</div>
                                    <div style={{width: '15%'}}>{order.data.deliveryStatus}</div>
                                </div>
                                )}        
                            </div>
                        </div>
                        <div style={{margin:'auto', width:'fit-content'}}>
                        {Math.ceil(orders.length/LIMIT) > 1 &&<Pagination alignSelf='center' page={page} count={Math.ceil(orders.length/LIMIT)} onChange={(e, v) =>{
                            setPage(v);
                            getMoreOrders();
                            }} color="primary" />
                        }
                        </div>
                    </div>
                    :
                    loading? <div></div> : <div style={{width: "fit-content", margin:'auto'}}>Nothing to show here</div>
                    }
                </TabPanel>
                <TabPanel value={value} index='subs'>
                    {subs.length !== 0? 
                    <div>
                        <div>
                            <div style={{margin: 'auto', width:'100rem', display:'flex', justifyContent:'center', flexDirection:'column', marginY:'10px'}}>
                                <div style={{display:'flex', flexDirection:'row', marginY:'10px'}}>
                                    <div style={{width: '20%'}}>Subscription reference</div>
                                    <div style={{width: '15%'}}>Last billing</div>
                                    <div style={{width: '15%'}}>Total price</div>
                                    <div style={{width: '15%'}}>Payment method</div>
                                    <div style={{width: '15%'}}>Next billing</div>
                                    <div style={{width: '15%'}}></div>
                                </div>
                                <Divider></Divider>
                                {subs.slice((page-1)*LIMIT, Math.min(subs.length, (page)*LIMIT )).map((sub) =>
                                <div key= {sub.id} style={{display:'flex', flexDirection:'row', marginY:'10px'}}>
                                    <div style={{width: '20%'}}>{sub.id}</div>
                                    <div style={{width: '15%'}}>{(new Date(sub.data.lastBilling.toMillis())).toLocaleDateString('en-UK')}</div>
                                    <div style={{width: '15%'}}>{sub.data.totalPrice} EGP</div>
                                    <div style={{width: '15%'}}>{sub.data.paymentMethod}</div>
                                    <div style={{width: '15%'}}>{(new Date(sub.data.nextBilling.toMillis())).toLocaleDateString('en-UK')}</div>
                                    <div style={{width: '15%'}}><Button variant='contained' onClick={async ()=> {
                                        setLoading(true);
                                        await firestore.collection('subscriptions').doc(sub.id).delete();
                                        await getMoreSubs(true);
                                        setPage(Math.min(page, Math.ceil(subs.length/LIMIT)))
                                        setLoading(false);
                                        }
                                        }>Cancel</Button></div>
                                </div>
                                )}
                            </div>
                        </div>
                        <div style={{margin:'auto', width:'fit-content'}}>
                        {Math.ceil(subs.length/LIMIT) > 1 &&<Pagination alignSelf='center' page={page} count={Math.ceil(subs.length/LIMIT)} onChange={(e, v) =>{
                            setPage(v);
                            getMoreSubs();
                            }} color="primary" />
                        }
                        </div>
                    </div>
                    :
                    loading? <div></div> : <div style={{width: "fit-content", margin:'auto'}}>Nothing to show here</div>
                    }
                </TabPanel>
            
        </div>
     );
}

export default Orders;