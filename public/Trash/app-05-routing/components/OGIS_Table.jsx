
function Ogis_Table( props ) {

  const env = Env["EnhancedTable"] ;
  const { metadata, visualAttrib, rest_api_get } = props;

  const visibleColumns = metadata.headCells.filter(function(col){ return col.isVisible });



  const classes = env.useStyles();
  const [order, setOrder] = React.useState(  metadata.defaults.order );
  const [orderBy, setOrderBy] = React.useState( metadata.defaults.orderField  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch( rest_api_get)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.rows);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])





  const handleRequestSort = (event, property) => {

      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);

  };

  const handleSelectAllClick = (event) => {
      if (event.target.checked) {
          const newSelecteds = items.map((n) => n.emp_id);
          setSelected(newSelecteds);
          return;
      }
      setSelected([]);
  };

  const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];

      if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);

      } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));

      } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));

      } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
              selected.slice(0, selectedIndex),
              selected.slice(selectedIndex + 1),
          );
      }

      setSelected(newSelected);

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Ogis_TableToolbar 
            numSelected={selected.length} 
            visualAttrib={visualAttrib} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby={"tableTitle"}
            size={dense ? 'small' : 'medium'}
            aria-label={"enhanced table"}
          >
            <Ogis_TableHead
                headCells={visibleColumns}
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={items.length}
            />

            <TableBody>
              {stableSort( items, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.emp_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.emp_id)}
                      role={"checkbox"}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </TableCell>

                        {
                            visibleColumns.map(( col, index) => (
                                <TableCell align={col.numeric ? 'right' : 'left'} key={index} >  {row[col.id]} </TableCell>
                            ))
                        }
                      </TableRow>
                  );
                })}
              { emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25 , { label:"Tous les lignes", value: -1 }]}
          component={"div"}
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

      </Paper>

      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label={"Dense padding"}
      />

    </div>
  );
}