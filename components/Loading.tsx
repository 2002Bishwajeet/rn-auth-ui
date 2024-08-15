import { appwritePink } from '@/constants/Colors';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={appwritePink} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
