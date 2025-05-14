import React, {useState} from 'react';
import {View, FlatList, Switch, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../store';
import ContactItem from '../components/ContactItem';
import FavoriteModal from '../modals/FavoriteModal';
import {addFavorite, removeFavorite} from '../store/favoritesSlice';
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
        <Text>Show favorite Only</Text>
        <Switch
          style={styles.switch}
          value={showOnlyFavorite}
          onValueChange={setShowOnlyFavorite}
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
