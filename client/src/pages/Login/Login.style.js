import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  container: {
    paddingTop: '120px'
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marignTop: '850px'
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: '30px',
    marginBottom: '15px',
  },
  title: {
    textAlign: 'center',
    marginTop: '30px'
  },
  inputField: {
    width: '15em',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '30px'
  }
}));