
function Ogis_Table( props ) {

  const env = Env["EnhancedTable"] ;
  const { dataSource, visualAttrib } = props

  const classes = env.useStyles();
  const [order, setOrder] = React.useState(  dataSource.defaults.order );
  const [orderBy, setOrderBy] = React.useState( dataSource.defaults.orderField  );
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {

      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);

  };

  const handleSelectAllClick = (event) => {
      if (event.target.checked) {
          const newSelecteds = dataSource.rows.map((n) => n.id);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataSource.rows.length - page * rowsPerPage);

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
                headCells={dataSource.headCells}
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={dataSource.rows.length}
            />

            <TableBody>
              {stableSort( dataSource.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
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
                            dataSource.headCells.map(( col, index) => (
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
          count={dataSource.rows.length}
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