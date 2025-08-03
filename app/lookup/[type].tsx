// app/lookup/[type].tsx

import axios from 'axios';
import Constants from 'expo-constants';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const API_BASE = (() => {
  if (__DEV__) {
    const debugHost = Constants.manifest?.debuggerHost;
    const host = debugHost?.split(':')[0] ?? 'localhost';
    return `http://${host}:3000`;
  }
  return 'https://api.yourdomain.com';
})();

type Section = {
  title: string;
  description: string;
};

export default function Lookup() {
  const { type } = useLocalSearchParams<{ type: 'ipc' | 'crpc' }>();
  const [bns, setBns] = useState('');
  const [section, setSection] = useState<Section | null>(null);

  const doLookup = async () => {
    Keyboard.dismiss();
    const code = bns.trim();
    if (!code) {
      Alert.alert('Input required', 'Please enter a BNS code.');
      return;
    }
    try {
      const resp = await axios.get<Section>(
        `${API_BASE}/lookup/${type}/${encodeURIComponent(code)}`
      );
      setSection(resp.data);
    } catch {
      Alert.alert(
        'Not Found',
        `No ${type?.toUpperCase()} mapping for BNS ${code}`
      );
      setSection(null);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/ALDHC_background.png')}
      style={styles.background}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>{type?.toUpperCase()} Lookup</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter BNS code"
          placeholderTextColor="#ccc"
          value={bns}
          onChangeText={setBns}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={doLookup}>
          <Text style={styles.buttonText}>Convert</Text>
        </TouchableOpacity>

        {section && (() => {
          const parts = section.title.split(/:\s*/);
          const codeLabel = parts[0];
          const subject = parts[1] ?? '';

          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                <Text style={styles.bold}>BNS {bns}:</Text>
                <Text style={styles.regular}> {subject}</Text>
              </Text>
              <Text style={styles.cardTitle}>
                <Text style={styles.bold}>{codeLabel}:</Text>
              </Text>
              <Text style={styles.cardDesc}>
                {section.description}
              </Text>
            </View>
          );
        })()}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width,
    height,
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#333',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ff5a5f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,             // Android shadow
    shadowColor: '#000',      // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  regular: {
    fontWeight: '400',
  },
  cardDesc: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginTop: 8,
  },
});
