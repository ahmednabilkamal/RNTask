import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contactItem: {flexDirection: 'row', alignItems: 'center', padding: 10},
  initialItems: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  textLink: {color: 'blue'},
  container: {flex: 1},
  name: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  message: {
    color: 'grey',
  },
});

export default styles;
