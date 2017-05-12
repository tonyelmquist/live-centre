import React from 'react';
import HomeGrid from '../Grid';
import HeroCarousel from './Carousel';


const styles = {
  headline: {
    fontSize: 24,
    fontWeight: 400,
    height: '100%'
  },
  buttonbar: {
      bottom: 0,
      left: 0,
      position: 'fixed',
  },
  swipeContainer: {
      height: '100%',
      marginTop: '64px',
      marginBottom: '50px'
  }
};

export default class HomePage extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div className="slide">
                <h1 style={styles.headline}>{i18next.t('route_home')}</h1>
                <HomeGrid/>
                <HeroCarousel/>
            </div>
            
        );
    }
}
