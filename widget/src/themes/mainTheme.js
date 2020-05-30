import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, blue } from '@material-ui/core/colors'

export default createMuiTheme({
    palette: {
      primary: {
        main: blue[700],
        dark: blue[800],
        light: blueGrey['A200'],
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          header: {
          },
          body: {
            overflowX: 'hidden',
            overflowY: 'auto',
            color: '#fff'
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