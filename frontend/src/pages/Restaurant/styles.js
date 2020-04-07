import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    paddingTop: '100px',
    justifyContent: 'center',
  },
  linkArrow: {
    cursor: 'pointer',
  },
  paper: {
    borderRadius: 0,
    minWidth: '70vw',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  contentWrapper: {
    minWidth: '300px',
    minHeight: '300px',
  },
  commentField: {
    width: '100%',
  },
  dateAndRating: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    display: 'flex',
    marginTop: '30px',
    justifyContent: 'flex-end',
  },
}));