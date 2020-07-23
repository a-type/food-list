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

const {
  palette: lightPalette,
  breakpoints,
  spacing,
  typography,
} = createMuiTheme({
  palette: baseLightPalette,
  typography: {
    fontSize: 16,
  },
  shape: {
    borderRadius: 24,
  },
});
const { palette: darkPalette } = createMuiTheme({ palette: baseDarkPalette });

const themeFactory = (
  palette: ThemeOptions['palette'],
  shadows: ThemeOptions['shadows'],
) =>
  createMuiTheme({
    palette,
    shape: {
      borderRadius: 24,
    },
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
        root: {
          fontSize: '0.85rem',
        },
        textSecondary: {
          color: palette?.text?.secondary,
        },
      },
      MuiTypography: {
        h1: {
          fontSize: typography.pxToRem(48),
          [breakpoints.down('sm')]: {
            fontSize: '4vmax',
          },
        },
        h2: {
          fontSize: typography.pxToRem(40),
          [breakpoints.down('sm')]: {
            fontSize: '3vmax',
          },
        },
        h3: {
          fontSize: typography.pxToRem(32),
          [breakpoints.down('sm')]: {
            fontSize: '2.75vmax',
          },
        },
        h4: {
          fontSize: typography.pxToRem(24),
          [breakpoints.down('sm')]: {
            fontSize: '2.3vmax',
          },
        },
      },
      MuiFilledInput: {
        root: {
          borderRadius: 24,
          padding: spacing(1),
          backgroundColor: colors.grey[100],
          '&$focused': {
            backgroundColor: colors.yellow[100],
          },
        },
      },
      MuiInputLabel: {
        filled: {
          transform: 'translate(18px, 28px) scale(1)',
          '&$shrink': {
            transform: 'translate(18px, 10px) scale(0.75)',
          },
        },
      },
      MuiFormLabel: {
        root: {
          '&$focused': {
            color: colors.yellow[900],
          },
        },
      },
      MuiChip: {
        root: {
          backgroundColor: colors.grey[100],
        },
      },
      MuiIconButton: {
        root: {
          color: colors.grey[900],
        },
      },
    },
    props: {
      MuiTextField: {
        variant: 'filled',
      },
      MuiButton: {
        color: 'primary',
      },
      MuiLink: {
        underline: 'always',
      },
      MuiFilledInput: {
        disableUnderline: true,
      },
    },
  });

export const lightTheme = themeFactory(lightPalette, generateShadows());
export const darkTheme = themeFactory(darkPalette, generateShadows());
