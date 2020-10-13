const mainListItems = (
  <div>

    <ListItemLink to="/covidrecord" primary="Données du Covid" icon={<DashboardIcon />} />
    <ListItemLink to="/recentorders" primary="Orders" icon={<ShoppingCartIcon />} />
    <ListItemLink to="/users" primary="Utilisateurs" icon={<DashboardIcon />} />
    <ListItemLink to="/charts" primary="Diagrammes" icon={<BarChartIcon />} />
    <ListItemLink to="/admin" primary="Administration" icon={<LayersIcon />} />
    
  </div>
);

const secondaryListItems = (
  <div>
    <ListSubheader inset> Saved reports </ListSubheader>
        <ListItemLink to="/dead_url"  icon={<AssignmentIcon />} primary={"Current month" }/>
        <ListItemLink to="/dead_url"  icon={<AssignmentIcon />} primary={"LastQuarter"} />
        <ListItemLink to="/dead_url"  icon={<AssignmentIcon />} primary={"Year-end sale"} />
  </div>
);

