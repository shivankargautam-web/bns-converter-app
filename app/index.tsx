// app/index.tsx

import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Home() {
  return (
    <ImageBackground
      source={require('../assets/images/allahabad-high-court_2.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>BNS Converter</Text>

        {/* Buttons in one line */}
        <View style={styles.buttonRow}>
          <Link href="/lookup/ipc" style={styles.button}>
            <Text style={styles.buttonText}>BNS → IPC</Text>
          </Link>
          <Link href="/lookup/crpc" style={styles.button}>
            <Text style={styles.buttonText}>BNS → CRPC</Text>
          </Link>
        </View>

        {/* <Link href="/table/ipc" style={styles.link}>
          <Text style={styles.linkText}>View Full IPC Table</Text>
        </Link>

        <Link href="/table/crpc" style={styles.link}>
          <Text style={styles.linkText}>View Full CrPC Table</Text>
        </Link> */}
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
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  button: {
    flex: 1,
    backgroundColor: '#ff5a5f',
    paddingVertical: 14,
    borderRadius: 8,
    // horizontal + vertical centering:
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
},
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
},
  link: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
