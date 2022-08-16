import { Typography } from '@mui/material';
import React from 'react';
import ImageCard from '../../components/ImageCard';
import CoffeeSun from '../../public/About/CoffeeSun.jpg';
import BerriesBag from '../../public/About/BerriesBag.jpg';
import V60Pour from '../../public/About/V60Pour.jpg';
function About() {
    return ( 
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
            <Typography variant='h1'
             margin={'20px'}
             align='center'
             >
                 Find Your Zen
            </Typography>
            <ImageCard imageSource={CoffeeSun}>
                Zen Specialty Coffee was founded on the belief that everyone has their own unique perfect cup of coffee.

                <br/>We think that finding that cup is a journey, and we'd like to be your guide and companion on that journey.

                <br/>With our curated coffee delivery service, you'll receive top-quality coffee right at your doorstep.  With our subscription service, you'll never have to worry about having great coffee ever again.            </ImageCard>
            <Typography variant='h1'
             margin={'20px'}
             align='center'
             >
                 Bringing Specialty To You
            </Typography>
            <ImageCard imageSource={BerriesBag} reverse>
                At Zen, we believe that coffee can be so much more than a quick caffeine fix. In order to reach its full potential, every step has to be absolutely perfect. From picking, to washing, to roasting, to brewing.


                <br/>Specialty Coffee is a philosophy that's been taking the world by storm in the last decade. It emphasizes fair treatment of farmers, selection of great beans, and roasting to full potential.


                <br/>That is why we only roast the best quality coffee we can find. We deal directly with specialty farms, and buy only their best lots. We then carefully roast them to bring out the best in the bean, and we grind them to order. Every step is done ethically, and every bean can be traced back to its farm. 
            </ImageCard>
            <Typography variant='h1'
             margin={'20px'}
             align='center'
             >
                 Your Personal Barista
            </Typography>
            <ImageCard imageSource={V60Pour}>
                Traversing the vast world of coffee can be challenging; it certainly was for our specialists, when they first started. We are here to help. From choosing coffees tailored to your taste and experience, to giving you great tips and equipment to improve your recipes, we at Zen have one goal: For you to reach your Zen. For you to find your personal perfect cup. 
            </ImageCard>
        </div>
     );
}

export default About;