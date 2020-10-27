import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  container: {
    paddingTop: '120px'
  },
  button: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 120,
    left: 'auto',
    position: 'fixed',
    zIndex: 100
  },
  paper: {
    textAlign: 'center',
    marginBottom: '50px',
  }
})
)