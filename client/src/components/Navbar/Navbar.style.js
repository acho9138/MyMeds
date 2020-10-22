import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  background: {
    background: 'linear-gradient(98deg, rgba(23,42,70,1) 0%, rgba(33,51,78,1) 11%, rgba(54,70,93,1) 20%, rgba(57,73,96,1) 100%)'
  },
  logo: {
    height: '70px',
    width: '160px'
  },
  links: {
    color: 'white',
    textDecoration: 'none'
  },
}));