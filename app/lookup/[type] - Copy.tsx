// app/lookup/[type].tsx

import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import axios from 'axios';

const API_BASE = 'http://192.168.0.103:3000'; // ← update to your backend’s IP

type Section = {
  title: string;
  description: string;
};

export default function Lookup() {
  const { type } = useLocalSearchParams<{ type: 'ipc' | 'crpc' }>();
  const [bns, setBns] = useState('');
  const [section, setSection] = useState<Section | null>(null);

  const doLookup = async () => {
    try {
      const resp = await axios.get<Section>(
        `${API_BASE}/lookup/${type}/${encodeURIComponent(bns.trim())}`
      );
      setSection(resp.data);
    } catch {
      Alert.alert(
        'Not Found',
        `No ${type?.toUpperCase()} mapping for BNS ${bns}`
      );
      setSection(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subheader}>{type?.toUpperCase()} Lookup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter BNS code"
        value={bns}
        onChangeText={setBns}
      />
      <TouchableOpacity style={styles.button} onPress={doLookup}>
        <Text style={styles.buttonText}>Convert</Text>
      </TouchableOpacity>

      {section && (
        <View style={styles.result}>
          {(() => {
            // Split "IPC 300: Murder." into ["IPC 300", "Murder."]
            const parts = section.title.split(/:\s*/);
            const subject = parts[1] || '';

            return (
              <>
                {/* Line 1: BNS + subject */}
                <Text style={[styles.title, styles.bold]}>
                  BNS {bns}: {subject}
                </Text>
                {/* Line 2: full IPC/CrPC label */}
                <Text style={[styles.title, styles.bold]}>
                  {section.title}
                </Text>
              </>
            );
          })()}

          {/* Description */}
          <Text style={styles.description}>
            {section.description}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex:1, padding:20 },
  subheader:    { fontSize:22, marginBottom:12, textAlign:'center' },
  input:        { borderWidth:1, padding:10, marginBottom:12, borderRadius:6 },
  button:       { backgroundColor:'#007AFF', padding:12, borderRadius:6, marginBottom:12 },
  buttonText:   { color:'#fff', textAlign:'center', fontWeight:'600' },
  result:       { marginTop:20, padding:12, backgroundColor:'#f0f0f0', borderRadius:6 },
  title:        { fontSize:18 },
  bold:         { fontWeight:'bold' },
  description:  { fontSize:16, marginTop:8 },
});