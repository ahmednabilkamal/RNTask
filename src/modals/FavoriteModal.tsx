import React, {useState} from 'react';
import {Modal, View, TextInput, Text, Button, Alert} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import styles from './styles';
import {baseUrl} from '../utils/baseUrl';
import Loader from '../common/Loader';

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
  const [loading, setLoading] = useState(false);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Formik
        initialValues={{message: ''}}
        validationSchema={validationSchema}
        onSubmit={async values => {
          try {
            setLoading(true);
            const res = await axios.get(baseUrl + `${firstName}`);
            onSubmit(values.message, res.data.gender || 'unknown');
            onClose();
          } catch (error) {
            Alert.alert('Error', 'Could not fetch gender');
          } finally {
            setLoading(false);
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Enter message"
                placeholderTextColor={'#999'}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                value={values.message}
                style={styles.input}
              />
              {errors.message && (
                <Text style={styles.errorMessage}>{errors.message}</Text>
              )}

              {loading ? (
                <Loader />
              ) : (
                <View style={styles.buttonContainer}>
                  <Button
                    title="Submit"
                    onPress={handleSubmit as any}
                    disabled={loading}
                  />
                  <Button title="Cancel" color="#999" onPress={onClose} />
                </View>
              )}
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
};

export default FavoriteModal;
