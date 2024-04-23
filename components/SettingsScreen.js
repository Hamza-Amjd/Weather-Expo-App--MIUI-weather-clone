import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";

export default function SettingsScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bar}>
        <TouchableOpacity
          style={{ paddingBottom: 10 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.maintxt(34)}>Settings</Text>
        <View style={{ padding: 5 }}>
          <Text style={{ color: COLORS.gray2 }}>Units</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.maintxt(24)}>Temprature</Text>
            <View style={{ flexDirection: "row"}}>
                <Text style={styles.maintxt(22)}>Celcius</Text>
                <MaterialIcons
                name="arrow-right"
                size={30}
                color="rgba(252, 252, 252,0.7)"
                style={{top:5}}
                />
            </View>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 40,
  },
  bar: {
    paddingVertical: 20,
    padding: 15,
  },
  text: {
    color: "white",
    fontFamily: "medium",
    fontSize: 14,
  },
  maintxt: (fontsize) => ({
    fontFamily: "medium",
    fontSize: fontsize,
    fontWeight: 600,
    color: "white",
    paddingVertical: 5,
  }),
});
