

Env["CovidRecords"] = (function(){

    const columns = [
      { id: 'id', label: 'Id', minWidth: 70 },
      { 
        id: 'ref_date', 
        label: 'Date', 
        minWidth: 170,
        align: 'right',
        format: (value) => DATE_FORMATTER.short(value)
      },
      { id: 'new_case', label: 'Cas détecté', minWidth: 170 },
      { id: 'new_healed', label: 'Cas guéris', minWidth: 170 },
      { id: 'new_deceased', label: 'Cas de décès', minWidth: 170 },
      { id: 'nb_sample', label: 'Nb échantillons', minWidth: 170 },
      { 
        id: 'created_at', 
        label: 'Créé le', 
        minWidth: 270,
        align: 'right',
        format: (value) => value.toLocaleDateString('fr-FR')
      }
    ];   

    const  useStyles = makeStyles({
          root: {
            width: '100%',
          },
          container: {
            maxHeight: 440,
          },
      });


    const rows = covid_data_records


    function createData(name, code, population, size) {
      const density = population / size;
      return { name, code, population, size, density };
    }    

  return { columns, rows, useStyles }
})();







  function CovidRecords() {
      const env = Env["CovidRecords"] 
      const classes = env.useStyles();
      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      return (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Title> Enregistrements des indicateurs journalier du Covid-19 </Title>
            <Table size="small" stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {env.columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {env.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {env.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={env.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        );
      }

