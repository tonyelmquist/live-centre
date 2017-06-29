import React from 'react';


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

export default class FavoritePage extends React.Component {
    render() {
        return (
          <div className="slide">
            <h1 style={styles.headline}>{i18next.t('route_favorites')}</h1>
            <div className="player">
              {/* <Player/> */}
            </div>
          </div>
        );
    }
}
