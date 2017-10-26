import { Dimensions, Platform } from 'react-native';

/**
 *
 * @param {ScaledSize} dim the dimensions object
 * @param {*} limit the limit on the scaled dimension
 */

const msp = (dim, limit) => dim.scale * dim.width >= limit || dim.scale * dim.height >= limit;

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
    const dim = Dimensions.get('window');
    return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
const isLandscape = () => {
    const dim = Dimensions.get('window');
    return dim.width >= dim.height;
};

/**
 * Returns true if the device is a tablet
 */
const isTablet = () => {
    const dim = Dimensions.get('window');
    return (dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900));
};

/**
 * Returns true if the device is a phone
 */
const isPhone = () => !isTablet();

const orientation = () => (isPortrait() ? 'PORTRAIT' : 'LANDSCAPE');

const dimensions = (target) => {
    const targetScreen = target !== 'screen' ? 'window' : 'screen';
    // if (target !== 'screen') targetScreen = 'window';
    const { width, height } = Dimensions.get(`${targetScreen}`);
    return { width, height };
};

const OS = Platform.OS;

export default {
    orientation,
    dimensions,
    isPortrait,
    isLandscape,
    isTablet,
    isPhone,
    OS
};
