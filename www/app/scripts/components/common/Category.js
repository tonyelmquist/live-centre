import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink, Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Video from '../../components/Item';
import IconButton from 'material-ui/IconButton';
import BackButton from 'material-ui/svg-icons/hardware/keyboard-backspace';
import {fullWhite, blueGrey900} from 'material-ui/styles/colors';

const styles = {
    mediumIcon: {
        width: 36,
        height: 36
    },
    medium: {
        width: 64,
        height: 64,
        padding: 10
    }
};

const iconStyle = {
    width: 36,
    height: 36
};

class Category extends Component {
    _renderVideos = () =>
        this.props.videos.map((video)=>{
            return (
                <Col xs={6} md={3}>
                    <Video video={video}/>
                </Col>
            );


        });

    render() {
        return (
            <div>
                <div className='category'>
                    <NavLink to='/Home'>
                        <div className='item'><IconButton style={styles.medium} iconStyle={styles.mediumIcon}><BackButton color={blueGrey900}/></IconButton></div>
                    </NavLink>
                    <h2 className='item'>Category Name</h2>
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


const mapStateToProps = (state) => {
    return {videos: state.videos.items};
};

export default connect(mapStateToProps)(Category);
