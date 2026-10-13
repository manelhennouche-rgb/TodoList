import Box from '@mui/material/Box';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState , useEffect } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';



const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
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
      // contrastText: '#f2ebeb',
    }

  },
});
export default function Activities({ filter }){
   


  const [ text, setText] = useState("");
  const [activitie , setActivities] = useState(()=>{
     const saved = localStorage.getItem("activities") ;
     return saved ? JSON.parse(saved) : [];
})
const [ editText , setEditText] = useState("")
const [ editingId , setEditingId] = useState(null)
  

 const filteredActivities = activitie.filter((a) => {
    if (filter === "done") return a.done;
    if (filter === "todo") return !a.done;
    return true; // "all"
  });
useEffect(()=>{
  localStorage.setItem("activities", JSON.stringify(activitie))
}, [activitie])

  function handledcheck(Id){

   const newList =  activitie.map((ac) => {
      if(ac.id === Id){
           return {...ac, done : !ac.done}
      }
      return ac 
    }
    
    )
    setActivities(newList);
  }

 function handleDelete(id) {
  if (window.confirm("Supprimer cette activité ?")) {
    setActivities(activitie.filter((a) => a.id !== id));
  }
}

function handleEdit(a) {
  setEditingId(a.id);
  setEditText(a.title);   // pré-remplit le champ
}

function handleSave(id) {
  if (editText.trim() === "") return;

  setActivities(
    activitie.map((a) => (a.id === id ? { ...a, title: editText } : a))
  );
  setEditingId(null);     // on quitte le mode édition
}
  const listact = filteredActivities.map((a)  => {
    const color = a.done ? "#107710" : "#c0bcbc" ;
    return(
               <Box key={a.id} sx={{ bgcolor: '#ef9a9a',  marginTop:"20px", borderRadius:"5px", padding:"10px"}}  >             
                 <div style={{display:"flex", justifyContent:"space-between"}}>
                            <div style={{display:"flex" ,flexDirection: "column" }}>
                                 {editingId === a.id ? (
                                  <ThemeProvider theme={theme}>
                                   <TextField
                                     color='primary'
                                     value={editText}
                                     onChange={(e) => setEditText(e.target.value)}
                                     onKeyDown={(e) => {
                                       if (e.key === "Enter") handleSave(a.id);
                                       if (e.key === "Escape") setEditingId(null);   // annule
                                     }}
                                     variant="standard"
                                     size="small"
                                     autoFocus
                                   /></ThemeProvider>) : (  a.title)}
                                      <div style={{display:"flex",flexDirection: "row", alignItems:"center" ,color:"#100c0c76"}}>
                                        <CalendarMonthIcon/>
                                        <h6 style={{margin:"0px"}}>{a.date}</h6>
                                      </div>
                            </div>                
                     {/* LES BOUTTONS   */}
                        <div style={{display:"flex", gap:"12px"}}>
                         
                         <ThemeProvider theme={theme}>
                            <Fab sx={{ width: 36, height: 36, minHeight: 0, bgcolor: !a.done ? "#e7e2e2" : "#1faa1f" , "&:hover": { bgcolor: color }  }}  aria-label="add" onClick={()=> handledcheck(a.id)} >
                             <CheckIcon/> </Fab>
    
                               <Fab sx={{ width: 36, height: 36, minHeight: 0 }} color="secondary" aria-label="add" onClick={()=> handleDelete(a.id)}>
                             <DeleteForeverIcon/> </Fab>
                            
                             <Fab sx={{ width: 36, height: 36, minHeight: 0 }} color="primary" aria-label="add"
                              onClick={() => (editingId === a.id ? handleSave(a.id) : handleEdit(a))}>   
                              {editingId === a.id ? <CheckIcon /> : <EditIcon style={{ fontSize: "22px" }} />} </Fab>
                             </ThemeProvider>
                     </div>
                  </div> 
                </Box> )})
      function handleAdd(){
        if(text.trim() === "") return ;
          const newActivity = {
             id: Date.now(),
             title: text,
             date: new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }),
             done: false,
      };
        setActivities([...activitie , newActivity ]);
        setText("");
      }
    return(
        <>
         <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

          {/* TOUTES LES ACTIVITEE  */}

            <Box sx={{width:"80%"}}>

              {/* UNE ACTIVITEE  */}
                {listact}   
            </Box>
          </div>


          {/* AJOUTER UNE NOUVELLE ACTIVITEE */}
           <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
            <Box  onSubmit={(e) => {
                e.preventDefault(); // empêche le rechargement de la page
                handleAdd();        // Entrée ajoute l'activité
              }}
               component="form" sx={{ '& > :not(style)': { m: 1,  width: '29ch' } }} noValidate autoComplete="off" >
               <TextField  id="filled-basic" label="Ajouter une activitée" variant="filled" value={text} onChange={(e)=>{ setText(e.target.value)}}/>
            </Box>

             <Stack  direction="row">
                <Button sx={{  backgroundColor: "#2c852f", color: "white", borderRadius: "8px", px: 3, m:1, fontSize:"18px", fontWeight: "bold",  textTransform: "none", // enlève les MAJUSCULES automatiques
                  "&:hover": { backgroundColor: "#1d5b20" }, }}
                  variant="contained" onClick={handleAdd}>Ajouter</Button>
             </Stack>
          </div>
          

          </>
    )
    
}