import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NextLink from 'next/link';

function themedIcon()
{
  return <ExpandMoreIcon/>
}

function AccordionQuestion(props)
{
    return <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
      <Typography variant='body1'>{props.question}</Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography variant='body1'>{props.children}</Typography>
    </AccordionDetails>
  </Accordion>
}

function faq() {
    return ( 
    <div style={{display:'flex', justifyContent:'center', flexDirection:'column', width:'60%', alignSelf:'center', marginLeft:'20%', marginBottom:'20px', marginTop:'40px'}}>
        <AccordionQuestion question={'What\'s so \"special\" about specialty coffee?'}>
            

            Specialty means a couple of things.


            <br/>Specialty coffee is a culture around drinking the best coffee there is. It started from Italy and took the world by storm in the last decade.


            <br/>It's is also a grading of coffee beans. Of every 10 coffee beans, one bean is good enough to be called specialty.

            <br/><NextLink href='/about' passHref><Link>Learn more →</Link></NextLink>

        </AccordionQuestion>
        <AccordionQuestion question={'I can\'t find your prices anywhere!'}>
            We haven't launched yet! But if you're curious, we plan to sell all of our single-origin coffees at 220 EGP per 180 gm bag. Subscribe to our newsletter below to hear about us as soon as we launch!
        </AccordionQuestion>
        <AccordionQuestion question={'I\'m new to coffee. What do I choose?'}>
            Let our experts choose for you! We have tasting professionals just for this reason. From the shop, just buy "Barista's Choice" and we'll take good care of you.
        </AccordionQuestion>
        <AccordionQuestion question={'Do I have to subscribe to buy your coffee?'}>         
            Not at all! We have single purchase options for those of you just trying us out. You'll find that in the store section.
        </AccordionQuestion>
        <AccordionQuestion question={'Where do you deliver?'}>
            Absolutely everywhere in Egypt. 
        </AccordionQuestion>
        <AccordionQuestion question={'My favorite coffee is no longer on the menu!'}>
            To ensure you only get the freshest coffee, our menu changes seasonally. If you really liked it, though, be sure to write us about it! We'll try our hardest to buy again from that farm next season! 
        </AccordionQuestion>
        <AccordionQuestion question={'I\'d like a special request with my coffee'}>
            If you have any special requests regarding grind size, packaging, delivery, etc.. You can send us a message with your order date (and preferably your contact info) and we can figure something out. We gotchu.
            <br/><NextLink href='/contact' passHref><Link>Contact us →</Link></NextLink>
        </AccordionQuestion>
        <AccordionQuestion question={'Your bags weigh 180 g each. Isn\'t that an odd weight?'}>
            180 is quite even.

            <br/>No just kidding, we chose 180 because it's a convenient number for specialty recipes. It means that you have exactly 10-12 cups' worth of ground coffee. Less waste, less grounds hanging out in your empty bag. 
        </AccordionQuestion>
        <AccordionQuestion question={'Why don\'t you grind for turkish?'}>
            Our relationship with Turkish brewing is.. complicated. Truth be told, we've not yet found a good roast profile to satisfy the local Turkish coffee drinker. We find that boiling the coffee together with water brings out excessive bitterness and masks the flavor notes that make the coffee so special.

            <br/>However we will let you know the moment we do crack the code on Turkish coffee, though!
        </AccordionQuestion>
        <AccordionQuestion question={'I have a cafe and would really like to serve your coffee!'}>
            Drop us a line! We offer a variety of coffees with different qualities and prices and we'd be very happy to roast under your brand. We also offer barista training and cafe interior design, for those businesses wanting to serve specialty drinks in their establishments.
            <br/><NextLink href='/contact' passHref><Link>Contact us →</Link></NextLink>
        </AccordionQuestion>
        <AccordionQuestion question={'Do you have a cafe where I could try your coffee?'}>
            Not yet! However we do promotions all year round where we serve espresso drinks in various tourist sites. Subscribe to our newsletter and we'll let you know!
        </AccordionQuestion>
    </div> 
    );
}

export default faq;