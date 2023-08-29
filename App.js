
import { StyleSheet, Text,SafeAreaView, StatusBar} from 'react-native';
import Home from './components/Home';

export default function App() {


  return (
    <SafeAreaView style={styles.container}>
      <Home/>
      <StatusBar translucent backgroundColor={'transparent'}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
