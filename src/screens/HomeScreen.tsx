import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Switch,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Contacts from 'react-native-contacts';

import {RootState} from '../store';
import ContactItem from '../components/ContactItem';
import FavoriteModal from '../modals/FavoriteModal';
import {addFavorite, removeFavorite} from '../store/favoritesSlice';
import {setContacts} from '../store/contactsSlice';
import styles from './styles';

const HomeScreen = () => {
  const contacts = useSelector((state: RootState) => state.contacts.list);
  const favorite = useSelector((state: RootState) => state.favorite.list);
  const dispatch = useDispatch();

  const [showOnlyFavorite, setShowOnlyFavorite] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [showFullMessages, setShowFullMessages] = useState<{
    [id: string]: boolean;
  }>({});

  useEffect(() => {
    requestPermissionAndLoad();
  }, []);

  const requestPermissionAndLoad = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Contacts permission denied');
        return;
      }

      Contacts.getAll()
        .then(contact => {
          const formatted = contact.map(c => ({
            id: c.recordID,
            name: `${c.givenName || ''} ${c.familyName || ''}`.trim(),
          }));
          dispatch(setContacts(formatted));
        })
        .catch(err => {
          console.warn('Failed to load contacts:', err);
        });
    }
  };

  const toggleShowMessage = (id: string) => {
    setShowFullMessages(prev => ({...prev, [id]: !prev[id]}));
  };

  const toggleFavorite = (contact: {id: string; name: string}) => {
    const isFavorite = favorite.some(fav => fav.id === contact.id);
    if (isFavorite) {
      dispatch(removeFavorite(contact.id));
    } else {
      setSelectedContact(contact);
    }
  };

  const handleSubmitFavorite = (message: string, gender: string) => {
    if (selectedContact) {
      dispatch(
        addFavorite({
          id: selectedContact.id,
          message,
          gender,
        }),
      );
      setSelectedContact(null);
    }
  };

  const displayedContacts = showOnlyFavorite
    ? contacts.filter(c => favorite.find(f => f.id === c.id))
    : contacts;

  return (
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={styles.textStatus}>Show favorite Only</Text>
        <Switch
          style={styles.switch}
          value={showOnlyFavorite}
          onValueChange={setShowOnlyFavorite}
          trackColor={{false: '#ccc', true: '#4CAF50'}}
          thumbColor={showOnlyFavorite ? '#ffffff' : '#f4f3f4'}
        />
      </View>

      <FlatList
        data={displayedContacts}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          const fav = favorite.find(f => f.id === item.id);
          return (
            <ContactItem
              name={item.name}
              isFavorite={!!fav}
              message={fav?.message}
              showFullMessage={showFullMessages[item.id]}
              toggleShowMessage={() => toggleShowMessage(item.id)}
              onStarPress={() => toggleFavorite(item)}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.lineSeparator} />}
      />

      {selectedContact && (
        <FavoriteModal
          visible={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          onSubmit={handleSubmitFavorite}
          firstName={selectedContact.name.split(' ')[0]}
        />
      )}
    </View>
  );
};

export default HomeScreen;
