export default () => ({
  root: {
    color: 'grey',
    borderRadius: 0,
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&$focused': {
      backgroundColor: '#fff',
    },
    overflow: 'scroll',
    borderTop: '1px solid black',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
  },
  focused: {},
});
