

Env["UserRecords"] = (function(){

    const columns = [
          { id: "uuid", label: "uuid", minWidth: 70 },
          { id: "login", label: "login", minWidth: 70 },
          { id: "firstname", label: "firstname", minWidth: 70 },
          { id: "lastname", label: "lastname", minWidth: 70 },
          { id: "registered", label: "registered", minWidth: 70 },
          { id: "conn_count", label: "conn_count", minWidth: 70 },
          { id: "created_on", label: "created_on", minWidth: 70 },
          { id: "last_conn_started_at", label: "last_conn_started_at", minWidth: 70 },
          { id: "last_conn_ended_at", label: "last_conn_ended_at", minWidth: 70 },
          { id: "online", label: "online", minWidth: 70 },
          { id: "email", label: "email", minWidth: 70 },
          { id: "job", label: "job", minWidth: 70 },
          { id: "new_visitor", label: "new_visitor", minWidth: 70 },
          { id: "ua_browser_name", label: "ua_browser_name", minWidth: 70 },
          { id: "ua_browser_version", label: "ua_browser_version", minWidth: 70 },
          { id: "ua_engine_name", label: "ua_engine_name", minWidth: 70 },
          { id: "ua_engine_version", label: "ua_engine_version", minWidth: 70 },
          { id: "ua_os_name", label: "ua_os_name", minWidth: 70 },
          { id: "ua_os_version", label: "ua_os_version", minWidth: 70 },
          { id: "ua_device_type", label: "ua_device_type", minWidth: 70 },
          { id: "ua_cpu_architecture", label: "ua_cpu_architecture", minWidth: 70 },
          { id: "boot_exit", label: "boot_exit", minWidth: 70 },
          { id: "boot_exit_how", label: "boot_exit_how", minWidth: 70 },
          { id: "boot_exit_why", label: "boot_exit_why", minWidth: 70 },
          { id: "user_type", label: "user_type", minWidth: 70 },
          { id: "user_url", label: "user_url", minWidth: 70 },
          { id: "url_access", label: "url_access", minWidth: 70 }
      ];


    const  useStyles = makeStyles({
          root: {
            width: '100%',
          },
          container: {
            maxHeight: 440,
          },
      });

    const rows = user_data_records
  
    return { columns, rows, useStyles }
})();




  function UserRecords() {
      const env = Env["UserRecords"] 
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
            <Title> Relévés journaliers des indicateurs du Covid-19 </Title>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.uuid}>
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

