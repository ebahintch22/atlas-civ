
function Ogis_TableToolbar (props) {
    const env = Env["Table-Header"];


    const classes = env.useToolbarStyles();
    const { visualAttrib , numSelected } = props;

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color={"inherit"} variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant={"h6"} id="tableTitle" component="div">
            {visualAttrib.title}
          </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
};


Ogis_TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


