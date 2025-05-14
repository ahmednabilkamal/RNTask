import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader: React.FC = () => {
  return <ActivityIndicator animating={true} color="green" size="small" />;
};

export default Loader;
