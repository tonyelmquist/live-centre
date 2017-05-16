import React from 'react';

export default class FavoritePage extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div  className="slide">

                <h1 style={styles.headline}>{i18next.t('route_categories')}</h1>
                <div className="player">
                        {/* <Player/> */}
                </div>
            </div>

        );
    }
}
