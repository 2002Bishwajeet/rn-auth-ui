import { appwritePink } from '@/constants/Colors';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
export default function Loader() {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size='large' color={appwritePink} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
