import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue, common } from '@material-ui/core/colors';

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
      },
    },
    MuiSelect: {
      select: {
        paddingRight: 0,
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
    MuiInputAdornment: {
      root: {
        display: 'block',
        maxHeight: 'unset',
        height: 'unset',
      },
    },
  },
});