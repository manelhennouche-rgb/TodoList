import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';





import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#4c1a82',
      main: '#2f127f',
      dark: '#220453',
      contrastText: '#fff',
    },
    secondary: {
       light: '#d84f36',
      main: '#a72920',
     
      dark: '#7d030b',
      contrastText: '#f2ebeb',
    },

    pink : {
        pink:'#fce4ec'
    },
    green: {
         light: '#46a70d',
      main: '#1aa10b',
     
      dark: '#077814',
      contrastText: '#f2ebeb',
    }

  },
});


export default function VariantButtonGroup({ filter, setFilter }) {
  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      
      <ButtonGroup variant="outlined" aria-label="Basic button group">
<ThemeProvider theme={theme}>
  
        <Button  variant={filter === "all" ? "contained" : "outlined"}
            onClick={() => setFilter("all")} color='primary'>voir tout</Button>
    
        <Button  variant={filter === "done" ? "contained" : "outlined"}
            onClick={() => setFilter("done")} color='green' >ce que j'ai fais</Button>
        <Button  variant={filter === "todo" ? "contained" : "outlined"}
            onClick={() => setFilter("todo")} color='secondary'>je n'ai pas fais</Button>
        </ThemeProvider>
      </ButtonGroup>
      
    </Box>
  );
}