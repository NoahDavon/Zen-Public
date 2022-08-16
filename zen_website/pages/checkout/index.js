import React, {useReducer, useState, useContext, createContext} from 'react';
import { AuthContext } from '../../lib/context';
import {useCart} from 'react-use-cart';
import {Link, TextField, Button, FormControlLabel, Typography, RadioGroup, Radio, FormLabel, Autocomplete, CircularProgress, Backdrop, Checkbox, Snackbar, Alert, Tooltip} from '@mui/material'
import NextLink from 'next/link';
import Login from '../../components/Login'
import {cityCodes} from '../../components/cityCodes';
import { firestore } from '../../lib/firebase';
import {useRouter} from 'next/router';

const formContext = createContext({cycle: null, formInput: null, error: false, sameBillingAddress:false, errorObject: null});
function Checkout() {
    const [errorObject, setErrorObject] = useState({name: false, phone: false, area: false, address: false });
    const router = useRouter();
    const {user} = useContext(AuthContext);
    const [cycle, setCycle] = useState('oneTime');
    const {isEmpty, items, emptyCart} = useCart();
    const [loading, setLoading] = useState(false);
    const [sameBillingAddress, setSameBillingAddress] = useState(false);
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
          city: "Cairo",
          cityCode:'EG-01',
          area:"",
          phone:"",
          name:"", 
          address:"",
        }
      );
    
    const handleSubmit = async evt => {
        const error = {
            name: !(/([A-Z]|[a-z]|['-]]){1,99}?[\s]([A-Z]|[a-z]|['-]){1,99}?[\s]?([\s]?([A-Z]|[a-z]|['-]){1,99}?){0,5}?[\s]?/.test(formInput.name)),
            phone: !(/((\+201)[1250][0-9]{8})|((01)[1250][0-9]{8})/.test(formInput.phoneNumber)),
            area: formInput.area.length < 2,
            address: formInput.address.length < 5
        }
        setErrorObject(error)

        if(error.name || error.phone || error.area || error.address)
         {
            console.log(error);
            return;
         }
        setLoading(true);
        let formResponse = formInput;
        formResponse.phoneNumber =  (formResponse.phoneNumber.length > 11? '' : '+2') + formResponse.phoneNumber;
        formResponse.email = user.email;
        formResponse.cycle = cycle;
        formResponse.paymentMethod = evt.target.name;
        formResponse.items = items;
        formResponse.sameBillingAddress = sameBillingAddress;
        console.log(formResponse);

        const orderReference = await firestore.collection('orders').add(formResponse);
        const response = await fetch('/api/CheckoutFunction', 
        {
            method: 'POST', 
            cache: 'no-cache',
            headers: 
            {
                'Content-Type': 'application/json',
            },
    
             body: JSON.stringify({orderReferenceID: orderReference.id})
        });

        const responseObject = await response.json();
        console.log('URL IS' + responseObject.redirectURL);
        emptyCart();
        router.push(responseObject.redirectURL);
        //TODO Submit Data
      };
    
      const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
      };

    return ( 
    isEmpty?
    <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap', justifyContent:'center', justifySelf:'center'}}>
       <Typography sx={{margin:'50px'}}>Your cart is empty!! <br/><NextLink href='/shop' passHref><Link>Back to the shop →</Link></NextLink></Typography>
       
    </div>
    :
    !user?
    <div style={{margin: 'auto', width:'fit-content', display:'flex', justifyContent:'center', flexDirection:'column'}}>
        <Typography sx={{marginY:'1.5rem'}}>Please sign in to complete your order. If it's your first time here, signing in will create an account for you.</Typography>
        <Login/>
    </div>
    :
    <formContext.Provider value={{cycle: cycle, errorObject: errorObject}}>
        <Snackbar open={errorObject.address || errorObject.name || errorObject.phone || errorObject.area}>
            <Alert severity="error" sx={{ width: '100%' }}>
            Please check your information and try again. 
            </Alert>
        </Snackbar>
        <Backdrop
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        >
            Please do not refresh or close the page...
            <CircularProgress/>
        </Backdrop>
        <CheckoutForm handleSubmit={handleSubmit} handleInput={handleInput} setCycle={setCycle} setFormInput={setFormInput} setSameBillingAddress={setSameBillingAddress}/>
    </formContext.Provider>
    );
}

function CheckoutForm(props) {
    const cycles = [
        {value: 'oneTime', label: 'One-Time'},
        {value: 'weekly', label: 'Weekly'},
        {value: 'bimonthly', label:'Bi-monthly'},
        {value: 'monthly', label:'Monthly'}
    ]

    const {handleSubmit, handleInput, setCycle, setFormInput, setSameBillingAddress} = props;
    const {cycle, errorObject} = useContext(formContext);
    return ( 
        <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', justifyContent:'center', justifySelf:'center', alignItems:'center'}}>
        <form style={{justifyItems:'center', alignItems:'center',}}>
            <Typography sx={{marginY:'30px'}}>Delivery Address:</Typography>
            <TextField
            error= {errorObject.name}
            variant='filled'
            sx={{marginY:'30px'}}
            label="Name"
            name="name"
            onChange={handleInput}
            helperText={errorObject.name? 'Please enter your full name' : ''}
            />
            <TextField
            error={errorObject.phone}
            variant='filled'
            sx={{marginY:'30px'}}
            label="Phone Number"
            name="phoneNumber"
            onChange={handleInput}
            helperText={errorObject.phone? 'Invalid phone number' : ''}
            />
            <br/>
            <Autocomplete
            defaultValue={'Cairo'}
            disablePortal
            options={cityCodes}
            sx={{ width: 250 }}
            onChange={(event, newValue) => {
                setFormInput({ ['city']: newValue.label? newValue.label : 'Cairo' });
                setFormInput({ ['cityCode']: newValue.label? newValue.code : "EG-01" });
              }}
            renderInput={(params) => <TextField {...params} label="City" />}
            />
            <br/>
            <TextField
            error={errorObject.area}
            sx={{marginY:'30px'}}
            label="Area"
            name="area"
            onChange={handleInput}
            helperText={errorObject.area? 'That\'s too short!' : ''}
            />
            <br/>
            <TextField
            error={errorObject.address}
            sx={{marginY:'30px'}}
            label="Address"
            name="address"
            multiline
            rows={4}
            onChange={handleInput}
            helperText={errorObject.address? 'That\'s too short!' : ''}
            />
        </form>
        <FormControlLabel control={<Checkbox onChange={(e)=> setSameBillingAddress(e.target.checked)}/>} label="Same As Billing Address" />
        <div style={{display: 'flex', flexDirection:'column', justifyContent:'space-around', alignItems: 'center', width:'60%',flexWrap:'wrap'}}>
            <FormLabel>Subscription frequency:</FormLabel>
            <RadioGroup
                row
                value={cycle}
                defaultValue="oneTime"
                onChange={(e) => setCycle(e.target.value)}
            >
                {cycles.map(c => <FormControlLabel key={c.value} value={c.value} control={<Radio/>} label={c.label} />)}
            </RadioGroup>
            <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-around', alignItems: 'center',flexWrap:'wrap'}}>
                <Tooltip title="Coming soon!">
                <span>
                <Button
                disabled
                name='CC'
                sx={{margin:'30px'}}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                >
                Pay with credit/debit card
                </Button>
                </span>
                </Tooltip>
                <Button
                name='COD'
                sx={{margin:'30px'}}
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                >
                Cash On Delivery
                </Button>
            </div>
        </div>
                
    </div>
     );
}

export default Checkout;