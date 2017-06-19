import React from 'react';
import PropTypes from 'prop-types';

import IconButton from 'material-ui/IconButton';
import PlayCircle from 'material-ui/svg-icons/av/play-circle-outline';
import PlayHover from 'material-ui/svg-icons/av/play-circle-filled';
import {fullWhite, teal300} from 'material-ui/styles/colors';

const styles = {
  icon: {
    width: 80,
    height: 80,
  },
  button: {
    width: 100,
    height: 100,
    padding: 16,
  },
};


const Poster = (props) => {
    return (
        <div className='poster'>
            <img className='image' src={props.imageUrl} alt='Video Thumbnail' />
            <div className='overlay'>
                <div className='overlay-content'>
                    <IconButton
                      iconStyle={styles.icon}
                      style={styles.button}
                    >
                        <PlayCircle color={fullWhite} hoverColor={teal300} />
                    </IconButton>

                </div>
            </div>
        </div>
    );
};

Poster.propTypes = {
    handlePlay: PropTypes.func.isRequired,
    imageUrl: PropTypes.string.isRequired
};

export default Poster;
