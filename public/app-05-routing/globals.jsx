const DATE_FORMATTER = (function(){

  const format_short = new window.Intl.DateTimeFormat( "fr-FR" ,
    {
       year : "numeric",
      month : "2-digit",
        day : "2-digit"
    }
  );
  const format_long = new window.Intl.DateTimeFormat( "fr-FR" , 
    {
      weekday : "long",
         year : "numeric",
        month : "2-digit",
          day : "2-digit"
    }
  );
  const format_complete = new window.Intl.DateTimeFormat( "fr-FR" , 
    {
      weekday : "long",
         year : "numeric",
        month : "2-digit",
          day : "2-digit",
          hour: "2-digit",
       minute : "2-digit", 
       second : "2-digit"
   }
  );

  return {
    short: function(in_date){
      return format_short.format( in_date )
    },
    long : function(in_date){
      return format_long.format( in_date )
    },
    complete : function(in_date){
      return format_complete.format( in_date )
    }
  }
})()


       
const  { BrowserRouter, Route, Switch: RouterSwitch, Link: RouterLink } = ReactRouterDOM ;

const {  
    makeStyles,
    CssBaseline,
    Fade,
    Slide,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
    Container,
    Grid,
    Paper,
    Link,
    SvgIcon,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListSubheader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TablePagination,
    TableRow,
    TableSortLabel,
    useTheme,
    lighten,
    Checkbox,
    Tooltip,
    FormControlLabel,
    Switch
} = MaterialUI;

const {
   LineChart, 
   Line, 
   XAxis, 
   YAxis, 
   Label, 
   ResponsiveContainer
} = Recharts;


const Env = {};
const Models = {};


Env["EnhancedTable"] = ( function(){
   

    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
        },
        paper: {
          width: '100%',
          marginBottom: theme.spacing(2),
        },
        table: {
          minWidth: 750,
        },
        visuallyHidden: {
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          top: 20,
          width: 1,
        },
    }));

   /* const visualAttrib = {
       title : "Enregistrements des indicateurs journalier du Covid-19"
    }

    const dataSource = { rows , headCells, defaults }*/

  return {  useStyles }
})()

