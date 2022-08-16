import React from 'react';
import Image from 'next/image';
 function ImageCard(props) {
    return ( 
    <div style={{margin:'10px'}}>
        <div style={{display:'flex', flexDirection: props.reverse? 'row-reverse' : 'row', justifyContent:'space-around', alignItems:'center', flexWrap: 'wrap'}}>
            <div style={{height:'auto', maxWidth:'50vw', minWidth:'300px', maxWidth:'40em', padding:'10px'}}>
                <Image src={props.imageSource}/>
            </div>
            <div style={{maxWidth:'30em', margin:'10px'}}>{props.children}</div>
        </div>
    </div> );
 }
 
 export default ImageCard;