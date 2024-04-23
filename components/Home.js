import { StatusBar, StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import SplashScreen from "react-native-splash-screen";
import Weather from "./Weather";
import ForecastScreen from "./ForecastScreen";
import LocationScreen from "./LocationScreen";
import SettingsScreen from "./SettingsScreen";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";


export default function Home() {
  const [fontsloaded] = useFonts({
    bold: require("../assets/fonts/DMSans-Bold.ttf"),
    medium: require("../assets/fonts/DMSans-Medium.ttf"),
    regular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsloaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsloaded]);
  if (!fontsloaded) {
    return null;
  }
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="transparent"/>
        <Stack.Navigator>
        
          <Stack.Screen
            name="Weather"
            component={Weather}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForecastScreen"
            component={ForecastScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LocationScreen"
            component={LocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
