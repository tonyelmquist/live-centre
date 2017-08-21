import React, { Component } from 'react';
import { RouteTransition } from 'react-router-transition';
import {  spring } from 'react-motion';
import { Route, Switch } from 'react-router';

let prevTab = 0;
let direction = 1; // 1 = right, 0 = left, -1 == no direction

const slideConfig = { stiffness: 330, damping: 30 };

const TransitionRoutes = (props) => {
    return (<Route render={({ location, match, history }) => {
        let animStyle = {};

        if (location.state !== undefined) {
            if (location.state.tabIndex == undefined) {
                animStyle = { e: 0, l: 0, };
            } else if (location.state.tabIndex > prevTab) {
                animStyle = { e: 1, l: -1 };
            } else {
                animStyle = { e: -1, l: 1 };
            }
            prevTab = location.state.tabIndex;
        } else {
            animStyle = { e: 0, l: 0, };
        }

        return (
            <RouteTransition
                pathname={location.pathname}
                atEnter={{ translateX: animStyle.e, o:0,}}
                atLeave={{ translateX: animStyle.l, o:0,}}
                atActive={{ translateX: 0, o:1,}}
                mapStyles={styles => ({ 
                    transform: `translateX(${styles.translateX * 100}%)`,
                    //opacity: styles.o, 
                    willChange: 'transform',
                    })
                }
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
