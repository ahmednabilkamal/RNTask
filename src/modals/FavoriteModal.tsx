import React from 'react';
import {Modal, View, TextInput, Text, Button, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import styles from './styles';
import {baseUrl} from '../utils/baseUrl';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (message: string, gender: string) => void;
  firstName: string;
}

const validationSchema = Yup.object().shape({
  message: Yup.string()
    .required('Required')
    .max(200, 'Too long')
    .matches(/^[a-zA-Z0-9\s]+$/, 'No special characters'),
});

const FavoriteModal = ({visible, onClose, onSubmit, firstName}: Props) => {
  return (
    <Modal visible={visible} transparent>
      <Formik
        initialValues={{message: ''}}
        validationSchema={validationSchema}
        onSubmit={async values => {
          try {
            const res = await axios.get(baseUrl + `${firstName}`);
            onSubmit(values.message, res.data.gender || 'unknown');
            onClose();
          } catch (error) {
            Alert.alert('Error', 'Could not fetch gender');
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={styles.modal}>
            <TextInput
              placeholder="Enter message"
              onChangeText={handleChange('message')}
              onBlur={handleBlur('message')}
              value={values.message}
              style={styles.input}
            />
            {errors.message && (
              <Text style={styles.errorMessage}>{errors.message}</Text>
            )}
            <Button title="Submit" onPress={handleSubmit as any} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default FavoriteModal;
