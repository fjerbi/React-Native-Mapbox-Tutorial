import React, {useEffect, useState} from 'react';
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
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

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
  const [userLocation, setuserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [nearbyStores, setnearbyStores] = useState<StoreData[]>([]);
  const [showAllStores, setshowAllStores] = useState(false);
  const [selectedDistance, setselectedDistance] = useState<number>(20);
  const handleStorePress = (item: StoreData) => {
    navigation.navigate('StoreLocation', {store: item});
  };
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setuserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const handleNearbyPress = () => {
    if (userLocation) {
      // Calculate the distance between the user and each store

      const nearbyStores = storesData.filter(store => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          store.latitude,
          store.longitude,
        );
        return distance <= selectedDistance; // Filter stores within 20 km
      });
      setnearbyStores(nearbyStores);
      setshowAllStores(false);
    }
  };

  const handleAllPress = () => {
    setnearbyStores([]); // clear the nearbystores state
    setshowAllStores(true); // show all stores
  };

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    //calculate distance between two coordinates using the haversine formula
    const R = 6371; // Radius of the Earth in km;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleNearbyPress} style={styles.button}>
          <Icon name="location-sharp" size={20} color="white" />
          <Text style={styles.buttonTextNearby}>Nearby</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={handleAllPress} style={styles.button}>
          <Icon name="globe-outline" size={20} color="white" />
          <Text style={styles.buttonTextAll}>All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sliderContainer}>
        <Text style={styles.distanceText}>Distance : {selectedDistance}</Text>
        <Slider
          style={styles.slider}
          minimumValue={20}
          maximumValue={60}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={selectedDistance}
          onValueChange={value => setselectedDistance(value)}
        />
      </View>
      <FlatList
        data={showAllStores ? storesData : nearbyStores}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B6777',
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  buttonTextNearby: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  divider: {
    height: 2,
    backgroundColor: '#bbb',
    flex: 0.2,
  },
  buttonTextAll: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  sliderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  distanceText: {
    fontSize: 16,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    marginBottom: 5,
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
