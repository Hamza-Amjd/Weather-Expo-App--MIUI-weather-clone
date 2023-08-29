import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import SplashScreen from "react-native-splash-screen";
import { AntDesign, Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../constants";
import { ScrollView } from "react-native";
import axios from "axios";
import Weather from "./Weather";

const Home = () => {
  
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
 
  
  
  return (
    <Weather/>
  );
};

export default Home;

const styles = StyleSheet.create({
  
});
