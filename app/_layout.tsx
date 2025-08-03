// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="lookup/[type]" 
        options={{ title: 'Lookup' }} 
      />
      <Stack.Screen 
        name="table/[type]" 
        options={{ title: 'Table' }} 
      />
    </Stack>
  );
}
