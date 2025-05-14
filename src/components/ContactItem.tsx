import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

interface Props {
  name: string;
  isFavorite: boolean;
  onStarPress: () => void;
  message?: string;
  showFullMessage?: boolean;
  toggleShowMessage?: () => void;
}

const ContactItem = ({
  name,
  isFavorite,
  onStarPress,
  message,
  showFullMessage,
  toggleShowMessage,
}: Props) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <View style={styles.contactItem}>
      <View style={styles.initialItems}>
        <Text>{initials}</Text>
      </View>

      <View style={styles.container}>
        <Text>{name}</Text>
        {isFavorite && message && (
          <>
            <Text numberOfLines={showFullMessage ? 10 : 2}>{message}</Text>

            {message.length > 60 && (
              <TouchableOpacity onPress={toggleShowMessage}>
                <Text style={styles.textLink}>
                  {showFullMessage ? 'Show Less' : 'Show More'}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <TouchableOpacity onPress={onStarPress}>
        <Icon
          name={isFavorite ? 'star' : 'star-border'}
          size={24}
          color={isFavorite ? 'gold' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ContactItem;
