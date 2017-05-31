import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink, Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import VideoItem from '../../components/Item';
import IconButton from 'material-ui/IconButton';
import BackButton from 'material-ui/svg-icons/hardware/keyboard-backspace';
import {fullWhite, blueGrey900} from 'material-ui/styles/colors';

const styles = {
    mediumIcon: {
        width: 32,
        height: 32
    },
    medium: {
        width: 64,
        height: 64,
        padding: 18
    }
};


class Category extends Component {
    _renderVideos = () =>
        this.props.videos.map((video)=>{
            return (
                <Col xs={6} md={2}>
                    <VideoItem video={video}/>
                </Col>
            );


        });

    render() {
        // console.log(this.props);
        return (
            <div>
                <div className='category'>
                    <NavLink to='/Home'>
                        <div className='item'><IconButton style={styles.medium} iconStyle={styles.mediumIcon}><BackButton color={blueGrey900}/></IconButton></div>
                    </NavLink>
                    <h2 className='item'>{this.props.category}</h2>
                </div>
                <Grid fluid>
                    <Row>
                      {this._renderVideos()}
                    </Row>
                </Grid>

            </div>

        );
    };
};

Category.propTypes = {
    videos : React.PropTypes.array.isRequired
};

export default Category;
