import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue, common, red } from '@material-ui/core/colors'

export default createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
      dark: blue[800],
      light: blueGrey['A200'],
    },
    secondary: {
      light: blueGrey[50],
      main: blue[900],
      dark: blueGrey[100]
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflowX: 'hidden',
          overflowY: 'auto',
        },
        img: {
          height: '0.7rem',
          paddingLeft: '0.2rem'
        },
      },
    },
    MuiSelect: {
      select: {
        paddingRight: 0
      },
    },
    MuiChip: {
      root: {
        backgroundColor: `${common.white} !important`,
        marginTop: '-16px',
        '&:hover': {
          cursor: 'pointer',
        },
      },
      label: {
        minWidth: 0,
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    MuiButton: {
      outlined: {
        backgroundColor: common.white,
      },
    },
    MuiInput: {
      root: {
        fontSize: '1.5rem',
        minWidth: '15vw',
        maxWidth: '32vw',
      }
    },
    MuiInputAdornment: {
      root: {
        display: 'block',
        maxHeight: 'unset',
        height: 'unset'
      }
    },
    MuiTypography: {
      caption: {
        color: red['A400']
      }
    }
  },
});