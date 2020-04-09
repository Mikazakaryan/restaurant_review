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
  ownerCreateWrapper: {
    display: 'flex',
    marginRight: '20px',
    justifyContent: 'flex-end',
  },
  ownerRoot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  ownerTableWrapper: {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'center',
  },
  replyWrapper: {
    display: 'flex',
    minWidth: '200px',
    justifyContent: 'flex-end',
  },
  subTitles: {
    marginTop: '20px',
  },
}));
