import React, { Component } from 'react';
import { RouteTransition } from 'react-router-transition';
import { Route, Switch } from 'react-router';

let prevTab = 0;
let direction = 1; // 1 = right, 0 = left, -1 == no direction


const TransitionRoutes = (props) => {

    const swipeStyle = () => {
        console.log(direction);
        if (direction === 1) {
            return { e: 100, l: -100 };
        } else if (direction === 0) {
            console.log("direction == 0");
            return { e: -100, l: 100 };
        }
        console.log("direction= -1");
        return { e: 0, l: 0, };
        
    };

    return (<Route render={({ location, match, history }) => {
        console.log('location', location);

        if (location.state !== undefined) {
            if (location.state.tabIndex > prevTab) {
                direction = 1;
            } else {
                direction = 0;
            }
            prevTab = location.state.tabIndex;
        } else {
            direction = -1;
        }
        console.log(prevTab);
        return (
                <RouteTransition
                    pathname={location.pathname}
                    atEnter={{ translateX: swipeStyle().e }}
                    atLeave={{ translateX: swipeStyle().l }}
                    atActive={{ translateX: 0 }}
                    mapStyles={styles => ({ transform: `translateX(${styles.translateX}%)` })}
                >
                    <div
                        id="mainContent"
                        ref={ref => (this.mainContent = ref)}
                        className="mainContent"
                    >
                    <Switch key={location.key} location={location}>
                        {props.children}
                    </Switch>
                    </div>

                </RouteTransition>
            );
    }}
    />
    );
};


export default TransitionRoutes;
