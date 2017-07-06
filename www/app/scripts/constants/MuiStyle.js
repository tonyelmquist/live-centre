import {
  grey200, grey600, blueGrey800,
  white, fullBlack, blue200, blue400, blue100, lightBlue50,

} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default {
    spacing: spacing.default,
    fontFamily: 'Roboto, sans-serif',
    borderRadius: 2,
    palette: {
        primary1Color: white,
        primary2Color: grey600,
        primary3Color: grey200,
        accent1Color: blue200,
        accent2Color: blue400,
        accent3Color: blue100,
        textColor: fullBlack,
        secondaryTextColor: (0, fade)(fullBlack, 0.7),
        alternateTextColor: blueGrey800,
        canvasColor: lightBlue50,
        borderColor: (0, fade)(fullBlack, 0.3),
        disabledColor: (0, fade)(fullBlack, 0.3),
        pickerHeaderColor: (0, fade)(fullBlack, 0.5),
        clockCircleColor: (0, fade)(fullBlack, 0.12),
    },
};
