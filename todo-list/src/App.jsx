
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

// import { createTheme, ThemeProvider } from '@mui/material/styles';


import VariantButtonGroup from './Components/btn';
import { green , red  } from '@mui/material/colors';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Activities from './Components/newActiv';



const theme = createTheme({
  palette: {
    primary: { main: green[500] },
    secondary: { main: red[900] },
    background: { default: '#52042e' },
  },
});

const innerTheme = createTheme({ palette: { primary: { main: red[500] } } });

// const theme = createTheme({
//   palette: {
//     primary: {  main: green[500],},
//     secondary: { main: red[500], },
//   },
// });

function App() {
 const [ filter , setFilter] = useState("all")
  return (
    
    <>
     <ThemeProvider theme={theme}>
    <CssBaseline  />

    
    
      
      <Container maxWidth="sm" >
       
        <Box sx={{ bgcolor: '#f5e2db',  marginTop:"50px", borderRadius:"15px"}} >
          <div >
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", color:"black"}}>
             <h1 > To Do List</h1>
            
          </div>
           <div>
            <ThemeProvider theme={innerTheme}>
              <VariantButtonGroup filter={filter} setFilter ={setFilter}/>
            </ThemeProvider>  
             </div>
         
        </div>
          
          {/* <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Box sx={{width:"80%"}}>
             <Box sx={{ bgcolor: '#ef9a9a',  marginTop:"20px", borderRadius:"5px", padding:"10px"}}  >
              <div style={{display:"flex", justifyContent:"space-between"}}>
                  hello everyone 
                  <div style={{display:"flex", gap:"12px"}}>
                        <Fab sx={{ width: 36, height: 36, minHeight: 0 }} color="secondary" aria-label="add" >
                         <DeleteForeverIcon/> </Fab>

                          <Fab sx={{ width: 36, height: 36, minHeight: 0 }} color="secondary" aria-label="add">
                         <AddIcon /> </Fab>

                         <Fab sx={{ width: 36, height: 36, minHeight: 0 }} color="secondary" aria-label="add">
                         <EditIcon style={{fontSize:"22px"}}/> </Fab>
                  </div>
                  
              </div>
                
             </Box>

              <Box sx={{ bgcolor: '#ef9a9a',  marginTop:"20px", borderRadius:"5px", padding:"10px", marginBottom:"10px"}}  >
                 hello everyone
             </Box>
           </Box>

          </div> */}
            <Activities filter={filter} />
    </Box>
       
 </Container>
       
         
    

   </ThemeProvider>
   
    </>
  );
}

export default App;