import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // dimmed overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    paddingVertical: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
    color: 'black',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
    gap: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

export default styles;
