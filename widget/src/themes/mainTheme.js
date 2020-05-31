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
          footer: {
          },
        },
      },
      MuiSvgIcon: {
        root: {
          height: '1rem',
        }
      },
      MuiSelect: {
        select: {
          paddingRight: 0
        }
      }
    },
  });