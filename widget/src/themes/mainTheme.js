import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue, common, pink } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      light: common.white,
      main: blue[700],
      dark: blueGrey[50]
    },
    secondary: {
      main: pink['A200'],
      dark: pink[900],
      light: pink[50],
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