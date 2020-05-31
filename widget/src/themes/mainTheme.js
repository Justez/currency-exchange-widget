import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue } from '@material-ui/core/colors'

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
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          header: {
          },
          body: {
            overflowX: 'hidden',
            overflowY: 'auto',
          },
          img: {
            height: '0.7rem',

          },
          footer: {
          },
        },
      },
      MuiSelect: {
        select: {
          paddingRight: 0
        }
      },
      MuiChip: {
        root: {
          '&:hover': {
            cursor: 'pointer'
          }
        },
        label: {
          minWidth: 0,
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    },
  });