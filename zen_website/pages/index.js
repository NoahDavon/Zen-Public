import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { useState } from 'react';
import ImageCard from '../components/ImageCard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CoffeeBerries from '../public/Home/CoffeeBerries.jpg'
import LatteArt from '../public/Home/LatteArt.jpg';
import V60 from '../public/Home/V60.jpg'

function themedIcon()
{
  return <ExpandMoreIcon/>
}
export default function Home() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }
  return (
    <div>
      <Typography
      variant='h1'
      align='center'
      padding={'1em'}>
        Your Coffee Is About To Get A Lot Better.
      </Typography>

      <ImageCard imageSource={CoffeeBerries}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography variant='h3'>The Best Coffee There Is,</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h4'>Get ready for specialty-grade coffee</Typography>
            <br/>It's not hyperbole. Specialty-grade coffee is simply the best coffee on offer anywhere. And we have it right here, for your tasting pleasure.
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={themedIcon()}>
            <Typography variant='h3'>Ethically Sourced,</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h4'>Together against farmer exploitation</Typography>
            <br/>Coffee has had a long history of farmer abuse. At Zen, we import from the farmer directly, insuring they are always fairly paid.
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={themedIcon()}>
            <Typography variant='h3'>Freshly Roasted,</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h4'>Get it while it's hot!</Typography>
            <br/>Our coffee is expertly roasted right here in Egypt, just hours before it's handed off to be delivered. We also age it to order. That means you only get the freshest, best-tasting coffee there is.       
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary expandIcon={themedIcon()}>
            <Typography variant='h3'>And At Your Door!</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h4'>Coffee's never been easier.</Typography>
            <br/>We deliver absolutely everywhere in Egypt. Whether you're a long-time subscriber or just trying out a bag or two, we gotchu! All our coffee is delivered within the week, so you can get your caffeine fix ASAP!
          </AccordionDetails>
        </Accordion>
      </ImageCard>
      <ImageCard imageSource={LatteArt} reverse>
        <Typography variant='h3'>A Whole New World</Typography>
        <br/>We have a huge selection of origins, farms, notes, and even varietals.


        <br/>Our coffee is always imported seasonally, so the menu is always changing!


        <br/>Experience flavors in coffee you never have before; flowery, fruity, nutty, sweet - The world specialty coffee offers is endless.     
      </ImageCard>
      <ImageCard imageSource={V60}>
        <Typography variant='h3'>More Than A Caffeine Hit</Typography>
        <br/>Specialty coffee is a hobby - a passion. Try out new varieties, and develop new recipes. Come up with your own ultimate techniques.


        <br/>Specialty coffee is more than just coffee; it's something you get better at with every cup.
      </ImageCard>
    </div>
  )
}
