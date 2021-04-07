

function descendingComparator(a, b, orderBy) {

    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0 ;
}

function getComparator(order, orderBy) {

  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);

}

function stableSort(array, comparator) {

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}



Env["Table-Header"] = (function(){

    const headCells = Env["EnhancedTable"].dataSource.headCells


    const useToolbarStyles = makeStyles((theme) => ({
      root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
      },
      highlight:
        theme.palette.type === 'light'
          ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
          : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
            },
      title: {
        flex: '1 1 100%',
      },
    }));

    return { useToolbarStyles, headCells }

})()



function Ogis_TableHead(props) {
 
  //const env = Env["Table-Header"];
  const { headCells, classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        { headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


Ogis_TableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



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


