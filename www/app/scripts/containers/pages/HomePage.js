import React from 'react';
import HomeGrid from '../HomeGrid';
import Category from '../../containers/CategoryContainer';
import Overlay from '../../containers/OverlayContainer';


const styles = {
    headline: {
        fontSize: 24,
        fontWeight: 400,
        height: '100%',
    },
    buttonbar: {
        bottom: 0,
        left: 0,
        position: 'fixed',
    },
    swipeContainer: {
        height: '100%',
        marginTop: '64px',
        marginBottom: '50px',
    },
};

const starterSlide = 2;

export default class HomePage extends React.Component {
    render() {
        return (
          <div className="slide">
            <HomeGrid />
          </div>
        );
    }
}
