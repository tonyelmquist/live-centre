import React from 'react';
import HomeGrid from '../Grid';
import HeroCarousel from '../Carousel';

//Transition
import {CSSTransitionGroup as Transition} from 'react-transition-group/CSSTransitionGroup';


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
                <HeroCarousel/>
                <HomeGrid/>               
            </div>
            
        );
    }
}
