import React from 'react';
import ProductCard from '../../components/ProductCard';
import {firestore} from '../../lib/firebase';
function Shop( {data} ) {
    return ( 
        !data?
            <div>Loading</div>
            :
        <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', justifySelf:'center'}}>
            {data.map((p) => 
                <ProductCard key={p.id} product ={p.product} id={p.id}/>
            )}
        </div>
     );
}

export async function getServerSideProps(){
    const dataSnap = await firestore.collection('products').get();
    const data = dataSnap.docs.map(doc => new Object({id: doc.id, product: doc.data()}))
    return {props: {data}}
    
}

export default Shop;