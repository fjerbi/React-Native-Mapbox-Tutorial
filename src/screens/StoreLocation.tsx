import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapboxGL, {Logger} from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation, useRoute} from '@react-navigation/native';
import {APIKEY} from '../utils/key';
import ColorfulCard from '@freakycoder/react-native-colorful-card';
import Icon from 'react-native-vector-icons/FontAwesome5';

Logger.setLogCallback(log => {
  const {message} = log;

  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});
MapboxGL.setAccessToken(APIKEY);
MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false);
MapboxGL.setWellKnownTileServer('Mapbox');
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'auto',
});

const StoreLocation: React.FC = () => {
  const [routeDirections, setRouteDirections] = useState<any | null>(null);
  const [coords, setCoords] = useState<[number, number]>([12.48839, 50.72724]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const {store} = route.params;
  async function getPermissionLocation() {
    try {
      const geo = await Geolocation.getCurrentPosition(
        location =>
          setCoords([location.coords.longitude, location.coords.latitude]),
        err => console.log(err),
        {enableHighAccuracy: true},
      );
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  useEffect(() => {
    getPermissionLocation();
    console.log(store.longitude);
  }, []);

  function makeRouterFeature(coordinates: [number, number][]): any {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  async function createRouterLine(coords: [number, number]): Promise<void> {
    const startCoords = `${coords[0]},${coords[1]}`;
    const endCoords = `${[store.longitude, store.latitude]}`;
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${APIKEY}`;

    try {
      let response = await fetch(url);
      let json = await response.json();

      const data = json.routes.map((data: any) => {
        console.log(data);
        setDistance((data.distance / 1000).toFixed(2));
        setDuration((data.duration / 3600).toFixed(2));
      });

      let coordinates = json['routes'][0]['geometry']['coordinates'];

      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/navigation-night-v1"
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(coords);
        }}>
        <MapboxGL.Camera
          zoomLevel={5}
          centerCoordinate={[12.48839, 50.72724]}
          animationMode={'flyTo'}
          animationDuration={6000}
        />
        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#FA9E14',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        <MapboxGL.UserLocation
          animated={true}
          androidRenderMode={'gps'}
          showsUserHeadingIndicator={true}
        />
      </MapboxGL.MapView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#ffffff" />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.loadingIndicator}
        />
      ) : (
        routeDirections && (
          <View style={styles.cardContainer}>
            <ColorfulCard
              title="Duration"
              value={`${duration} h`}
              footerTitle="Distance"
              footerValue={`${distance} km`}
              iconImageSource={require('../assets/icons/info.png')}
              style={{backgroundColor: '#33495F'}}
              onPress={() => {}}
            />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0 ,0 , 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
  },
  cardContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
});

export default StoreLocation;
