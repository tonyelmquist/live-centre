import {
  teal600, teal800, teal700,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: teal800,
    primary2Color: teal700,
    primary3Color: teal600,
    accent1Color: "#0E2272", //Dark blue
    accent2Color: "#0E2272",
    accent3Color: "#0E2272",
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: teal600,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};
