import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as Location from 'expo-location';
import { MapPin } from 'lucide-react-native';
import { Region } from 'react-native-maps';
import AddressInput from 'modules/address/components/AddressInput';
import MapComponent from 'modules/address/components/Map';
import LocationButton from 'modules/address/components/LocationButton';

export default function AddressScreen() {
  const [address, setAddress] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);
  const [region, setRegion] = useState<Region>({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markers, setMarkers] = useState<any[]>([]);

  // Request location permissions on component mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Location permission is required to use this feature');
        setShowError(true);
        return;
      }

      // Get initial location on mount
      getCurrentLocation();
    })();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoadingLocation(true);
      setErrorMessage(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMessage('Location permission is required to use this feature');
        setShowError(true);
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setRegion(newRegion);

      // Get address from coordinates
      const addressResponse = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressResponse && addressResponse.length > 0) {
        const addr = addressResponse[0];
        const formattedAddress = `${addr.name || ''} ${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''} ${addr.postalCode || ''}`;
        setAddress(formattedAddress.trim());

        // Add marker for the current location
        setMarkers([
          {
            id: '1',
            coordinate: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            title: 'Your Location',
            description: formattedAddress,
          },
        ]);
      }
    } catch (error) {
      setErrorMessage('Unable to get your current location');
      setShowError(true);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
  };

  const handleSelectAddress = async (selectedAddress: string) => {
    try {
      // Geocode the address to get coordinates
      const geocoded = await Location.geocodeAsync(selectedAddress);

      if (geocoded && geocoded.length > 0) {
        const { latitude, longitude } = geocoded[0];

        // Update region to center on selected address
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });

        // Add marker for the selected address
        setMarkers([
          {
            id: '1',
            coordinate: {
              latitude,
              longitude,
            },
            title: 'Selected Location',
            description: selectedAddress,
          },
        ]);
      }
    } catch (error) {
      setErrorMessage('Unable to locate this address');
      setShowError(true);
    }
  };

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const dismissError = () => {
    setShowError(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.addressInputContainer}>
            <AddressInput
              value={address}
              onChangeText={handleAddressChange}
              onSelectAddress={handleSelectAddress}
              placeholder="Enter delivery address..."
            />
          </View>

          <View style={styles.mapContainer}>
            <MapComponent region={region} onRegionChange={handleRegionChange} markers={markers} />
            <LocationButton onPress={getCurrentLocation} isLoading={loadingLocation} />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
              <MapPin size={18} color="#0A84FF" style={styles.infoIcon} />
              <Text style={styles.infoTitle}>Delivery Location</Text>
            </View>
            <Text style={styles.infoAddress}>
              {address || 'Select or enter an address for delivery'}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  addressInputContainer: {
    padding: 16,
    paddingBottom: 8,
    zIndex: 100,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
  },
  infoContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#F8F8FA',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0A84FF',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  infoAddress: {
    fontSize: 15,
    color: '#3C3C43',
    paddingLeft: 26,
  },
});
