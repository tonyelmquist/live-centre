import React from 'react';
import HomeGrid from '../Grid';
import HeroCarousel from '../Carousel';
import Category from '../../components/common/Category';


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
                {/* <Category/> */}
                <HeroCarousel/>
                <HomeGrid/>
            </div>

        );
    }
}
