import { createMuiTheme } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { colors } from './colors';
import { generateShadows } from './shadows';

const baseDarkPalette: ThemeOptions['palette'] = {
  type: 'dark',
  text: {
    primary: colors.white[50],
    secondary: colors.white[900],
  },
  primary: colors.yellow,
  secondary: colors.green,
  error: colors.red,
  background: {
    default: colors.purple[900],
    paper: colors.purple[500],
  },
};
const baseLightPalette: ThemeOptions['palette'] = {
  type: 'light',
  text: {
    primary: colors.purple[900],
    secondary: colors.purple[500],
  },
  primary: colors.yellow,
  secondary: colors.darkGreen,
  background: {
    default: colors.white[500],
    paper: colors.white[50],
  },
};

const { palette: lightPalette, breakpoints } = createMuiTheme({
  palette: baseLightPalette,
});
const { palette: darkPalette } = createMuiTheme({ palette: baseDarkPalette });

const themeFactory = (
  palette: ThemeOptions['palette'],
  shadows: ThemeOptions['shadows'],
) =>
  createMuiTheme({
    palette,
    shape: {},
    shadows,
    typography: {
      fontSize: 16,
    },
    overrides: {
      MuiAppBar: {
        colorDefault: {
          backgroundColor: 'transparent',
        },
      },
      MuiButton: {
        textSecondary: {
          color: palette?.text?.secondary,
        },
      },
      MuiTypography: {
        h1: {
          [breakpoints.down('sm')]: {
            fontSize: '5vmax',
          },
        },
        h2: {
          [breakpoints.down('sm')]: {
            fontSize: '4vmax',
          },
        },
        h3: {
          [breakpoints.down('sm')]: {
            fontSize: '3.75vmax',
          },
        },
        h4: {
          [breakpoints.down('sm')]: {
            fontSize: '3.3vmax',
          },
        },
      },
    },
    props: {
      MuiTextField: {
        variant: 'outlined',
      },
      MuiButton: {
        color: 'primary',
      },
      MuiLink: {
        underline: 'always',
      },
    },
  });

export const lightTheme = themeFactory(lightPalette, generateShadows());
export const darkTheme = themeFactory(darkPalette, generateShadows());
