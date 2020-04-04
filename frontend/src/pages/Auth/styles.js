import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  part: {
    width: '50%',
  },
  form: {
    height: '100vh',
    display: 'flex',
    marginTop: '20vh',
    alignItems: 'center',
    flexDirection: 'column',
  },
  input: {
    width: '50%',
  },
  header: {
    fontSize: '24px',
  },
  border: {
    borderRight: '2px solid black',
  },
  buttonText: {
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
