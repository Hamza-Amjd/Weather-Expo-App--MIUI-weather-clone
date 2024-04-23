import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Entypo, EvilIcons, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

export default function LocationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [searchpress, setsearchpress] = useState(false);
  const [searchKey, setSearchKey] = useState();
  const [searchResults, setSearchResults] = useState();
  const fetchSearch = async () => {
    try {
      await axios
        .get(
          `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=YBBbKyRipsAsK6qezf19HZ3MpO81qieb&q=${searchKey}&language=en-us&details=false`
        )
        .then((response) => {
          const results = response.data;
          setSearchResults(results);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!searchpress && (
        <View style={styles.bar}>
          <TouchableOpacity
            style={{ paddingBottom: 15 }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.maintxt(34)}>Manage cities</Text>
        </View>
      )}

      <View style={styles.searchbar}>
        {!searchpress && (
          <EvilIcons name={"search"} color="rgba(247,247,247,0.2)" size={30} />
        )}
        <TextInput
          style={{ flex: 1, color: "white" }}
          placeholder="Enter location"
          placeholderTextColor={"rgba(247,247,247,0.2)"}
          value={searchKey}
          onChangeText={setSearchKey}
          onFocus={() => setsearchpress(true)}
          onBlur={() => {fetchSearch();setsearchpress(false)}}
          cursorColor={COLORS.gray}
          inputMode="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {/* {!searchpress && (<View style={styles.locationitem}>
        
          <Text style={styles.locationtxt}>{location?.LocalizedName}<Ionicons name="ios-location-sharp" size={20} color="white" /></Text>
          <Text style={styles.parameters}></Text>
      </View>)} */}
      <ScrollView>
        {searchResults?.map((item, index) => (
          <View
            key={index}
            style={{
              padding: 20,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <Text style={styles.text}>{item.EnglishName}</Text>
              <Text style={{ color: COLORS.gray2 }}>
                {item.AdministrativeArea.EnglishName},{" "}
                {item.Country.EnglishName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {console.log(item);route.params.setLocationKey(item.Key)}}
            >
              <Entypo name="plus" size={25} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  locationitem:{
    height: 90,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "rgba(7, 242, 187,0.9)",
    marginVertical:20,
    padding:10
  },
  text: {
    color: "white",
    fontFamily: "medium",
    fontSize: 14,
  },
  locationtxt: {
    fontFamily: "bold",
    fontSize: 20,
    color: "white",
    top: 10,
  },
  parameters: {
    fontFamily: "bold",
    fontSize: 20,
    color: "white",
    top: 10,
  },
  maintxt: (fontsize) => ({
    fontFamily: "medium",
    fontSize: fontsize,
    fontWeight: 600,
    color: "white",
    padding: 5,
  }),
  searchbar: {
    flexDirection: "row",
    height: 45,
    width: "93%",
    alignSelf: "center",
    borderRadius: 30,
    backgroundColor: "rgba(247,247,247,0.2)",
    padding: 10,
    marginHorizontal: 10,
  },
  searchIcon: {
    backgroundColor: COLORS.gray,
    paddingLeft: 10,
    margin: 7,
  },
  searchInput: {
    flex: 0.9,
    paddingLeft: 5,
  },
});
