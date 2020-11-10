import { makeStyles } from '@material-ui/core/styles';

export const styles = makeStyles((theme) => ({
  drawer: {
    paddingRight: '100px',
    paddingTop: '30px',
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawerButton: {
    border: 'none',
    backgroundColor: 'transparent !important',
  },
}));