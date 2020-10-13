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


function MenuIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
    </SvgIcon>
  );
}
function ChevronLeftIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'  />
    </SvgIcon>
  );
}
function NotificationsIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'  />
    </SvgIcon>
  );
}

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function DashboardIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z'  />
    </SvgIcon>
  );
}
function xxxx(props) {
  return (
    <SvgIcon {...props}>
      <path d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z' />
    </SvgIcon>
  );
}

function ShoppingCartIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z' />
    </SvgIcon>
  );
}
function PeopleIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' />
    </SvgIcon>
  );
}
function BarChartIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M22 6.92l-1.41-1.41-2.85 3.21C15.68 6.4 12.83 5 9.61 5 6.72 5 4.07 6.16 2 8l1.42 1.42C5.12 7.93 7.27 7 9.61 7c2.74 0 5.09 1.26 6.77 3.24l-2.88 3.24-4-4L2 16.99l1.5 1.5 6-6.01 4 4 4.05-4.55c.75 1.35 1.25 2.9 1.44 4.55H21c-.22-2.3-.95-4.39-2.04-6.14L22 6.92z' />
    </SvgIcon>
  );
}
function LayersIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z" />
    </SvgIcon>
  );
}
function AssignmentIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' />
    </SvgIcon>
  );
}


function DeleteIcon(props) {
  return (
    <SvgIcon {...props}>
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
    </SvgIcon>
  );
}

function FilterListIcon(props) {
  return (
    <SvgIcon {...props}>
    <path d="M19 7H22L18 3L14 7H17V21H19M2 17H12V19H2M6 5V7H2V5M2 11H9V13H2V11Z" />
    </SvgIcon>
  );
}



Env["EnhancedTable"] = ( function(){
   
    const headCells = [
      { id: 'id', label: 'Id', minWidth: 70 },
      { 
          id: 'ref_date', 
          label: 'Date', 
          minWidth: 170,
          align: 'right',
          format: (value) => DATE_FORMATTER.short(value)
      },
      { id: 'new_case',       label: 'Cas détecté',     minWidth: 170 , numeric: true },
      { id: 'new_healed',     label: 'Cas guéris',      minWidth: 170 , numeric: true },
      { id: 'new_deceased',   label: 'Cas de décès',    minWidth: 170 , numeric: true },
      { id: 'nb_sample',      label: 'Nb échantillons', minWidth: 170 , numeric: true },
      { 
          id: 'created_at', 
          label: 'Créé le', 
          minWidth: 270,
          align: 'center',
          format: (value) => value.toLocaleDateString('fr-FR')
      }
    ]; 

    const defaults = {
      orderField : "ref_date",
      order : "asc"
    }

    const rows = covid_data_records;

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

    const visualAttrib = {
       title : "Enregistrements des indicateurs journalier du Covid-19"
    }

    const dataSource = { rows , headCells, defaults }

  return { dataSource , useStyles, visualAttrib }
})()

