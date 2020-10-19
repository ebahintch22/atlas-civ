
const drawerWidth = 240;

const useStyles_dashboard = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}




function Dashboard() {
  const classes = useStyles_dashboard();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton, open && classes.menuButtonHidden)}> 
                  <MenuIcon /> 
              </IconButton>


              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  {"Atlas Santé Côte d'Ivoire - Tableau de board"}
              </Typography>
              <IconButton color="inherit">
                  <Badge badgeContent={4} color={"secondary"}>
                    <NotificationsIcon />
                  </Badge>
              </IconButton>
          </Toolbar>
      </AppBar>

      <Drawer
          variant="permanent"
          classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
        open={open} >
          <div className={classes.toolbarIcon} >
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
          </div>

          <Divider />
          <List>
               {mainListItems}
          </List>
          <Divider />
          <List>
              {secondaryListItems}
          </List>
      </Drawer>

      <main className={classes.content}>

        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>


          {/* Covid Records Data */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CovidRecords />
              </Paper>
            </Grid>

            {/* Recent Users Record */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <UserRecords />
              </Paper>
            </Grid>


            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders />
                </Paper>
            </Grid>

            {/* Recent Sortable Tables */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <Ogis_Table
                      dataSource={Env["EnhancedTable"].dataSource} 
                      visualAttrib={Env["EnhancedTable"].visualAttrib}
                   />
              </Paper>
            </Grid>


          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>

  );
}

/*   columnDefs, dataSource  */