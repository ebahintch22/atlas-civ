

function preventDefault(event) {
  event.preventDefault();
}

const useStyles_deposit = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function Deposits() {
  const classes = useStyles_deposit();
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
          $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}