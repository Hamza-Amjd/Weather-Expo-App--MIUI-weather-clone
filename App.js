
import { StyleSheet, Text,SafeAreaView, StatusBar} from 'react-native';
import ScreensNav from './components/Home';

export default function App() {


  return (
      <SafeAreaView style={styles.container}>
        <ScreensNav/>
        <StatusBar style="light" translucent backgroundColor={'transparent'}/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
