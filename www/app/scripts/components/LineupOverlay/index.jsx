import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LineupShirt from './LineupShirt';

class LineupOverlay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openTeam: 1
        }

        this.toTeam1 = this.toTeam1.bind(this);
        this.toTeam2 = this.toTeam2.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.teamToDisplay === 1) {
            this.toTeam1();
        }
        if(nextProps.teamToDisplay === 2) {
            this.toTeam2();
        }
    }

    toTeam1() {
        this.setState({openTeam: 1});
    }

    toTeam2() {
        this.setState({openTeam: 2});
    }

    render() {
        return (
            <div className={`lineup-overlay ${this.props.hidden ? 'hidden-up' : ''}`}>
                <div className='football-field-outline'></div>
                <div className='counter-skew'>
                    {/*Team Colours*/}
                    <div className={`team1-colors ${this.state.openTeam == 1 ? '' : 'faded'}`} onClick={this.toTeam1}></div>
                    <div className={`team2-colors ${this.state.openTeam == 2 ? '' : 'faded'}`} onClick={this.toTeam2}></div>

                    {/*Team Names*/}
                    <div className={`team1-name ${this.state.openTeam == 1 ? '' : 'faded'}`} onClick={this.toTeam1}>Real Madrid</div>
                    <div className={`team2-name ${this.state.openTeam == 2 ? '' : 'faded'}`} onClick={this.toTeam2}>Barcelona</div>

                    {/*Line up*/}
                    <div className={`team1-lineup ${this.state.openTeam == 1 ? '' : 'transparent'}`}>
                        <LineupShirt colorLeft="rgb(250, 250, 250)" colorRight="rgb(240, 240, 240)" colorDarker="black" textColor="black" number="1" position="GK"/>
                    </div>
                    <div className={`team2-lineup ${this.state.openTeam == 2 ? '' : 'transparent'}`}>
                        <LineupShirt colorLeft="#003175" colorRight="#850D37" colorDarker="black" number="12" position="GK2"/>
                    </div>
                </div>
            </div>
        );
    }
}

LineupOverlay.propTypes = {

};

export default LineupOverlay;