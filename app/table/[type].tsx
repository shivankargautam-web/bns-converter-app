// app/table/[type].tsx
import { useSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const API_BASE = 'http://192.168.0.103:3000';

export default function Table() {
  const { type } = useSearchParams<{ type: 'ipc' | 'crpc' }>();
  const [data, setData] = useState<{ key: string; code: string }[]>([]);

  useEffect(() => {
    axios.get(`${API_BASE}/table/${type}`)
      .then(resp => {
        const list = Object.entries(resp.data).map(
          ([bns, title]) => ({ key: bns, code: title })
        );
        setData(list);
      });
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={({ item }) => (
        <Text style={styles.row}>
          {item.key} → {item.code}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  row: { paddingVertical:8, borderBottomWidth:1, borderColor:'#eee' },
});
