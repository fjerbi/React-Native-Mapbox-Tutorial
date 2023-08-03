import React from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {storesData} from '../data/stores';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

interface StoreData {
  id: string;
  name: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  description: string;
}

type RootStackParamList = {
  Home: undefined;
  StoreLocation: {store: StoreData};
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const StoreCard: React.FC<{item: StoreData}> = ({item}) => (
  <View style={styles.card}>
    <ImageBackground
      source={{uri: item.imageUrl}}
      style={styles.imageBackground}>
      <View style={styles.cardContent}>
        <Text style={styles.storeName}>{item.name}</Text>
      </View>
    </ImageBackground>
  </View>
);

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const handleStorePress = (item: StoreData) => {
    navigation.navigate('StoreLocation', {store: item});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={storesData}
        renderItem={({item}: {item: StoreData}) => (
          <TouchableOpacity onPress={() => handleStorePress(item)}>
            <StoreCard item={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  card: {
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  cardContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default Home;
