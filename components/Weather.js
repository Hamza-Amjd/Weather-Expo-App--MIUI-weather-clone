import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback,  useEffect, useState } from "react";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SIZES } from "../constants";
import { ScrollView } from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { weatherIcons } from "../constants/theme";
import Clouds from "../assets/images/clouds.jpg";
import Animated,{useAnimatedRef,useAnimatedScrollHandler,useSharedValue,useAnimatedStyle,interpolate, Extrapolate} from 'react-native-reanimated';

const Weather = () => {
  const navigation = useNavigation();
  const [condition, setCondition] = useState(); 
  const [forecasts, setForecasts] = useState([]);
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [locationKey, setLocationKey] = useState(260622);
  const [locationData, setLocationData] = useState([]);

  const fetchConditions = async () => {
    try {
      await axios
        .get(
          `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=YBBbKyRipsAsK6qezf19HZ3MpO81qieb&language=en-us&details=true`
        )
        .then((response) => {
          const conditions = response.data[0];
          setCondition(conditions);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchHourlyforecast = async () => {
    try {
      await axios
        .get(
          `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=YBBbKyRipsAsK6qezf19HZ3MpO81qieb&language=en-us&details=false&metric=false`
        )
        .then((response) => {
          const forcast = response.data;
          setHourlyForecasts(forcast);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const fetchforecast = async () => {
    try {
      await axios
        .get(
          `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=YBBbKyRipsAsK6qezf19HZ3MpO81qieb&language=en-us&details=true&metric=false`
        )
        .then((response) => {
          const forcasts = response.data;
          setForecasts(forcasts.DailyForecasts);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function getDirection(heading) {
    let directions = [
      "North",
      "North-East",
      "East",
      "South-East",
      "South",
      "South-West",
      "West",
      "North-West",
    ];
    let index = Math.round(heading / 8 / 5, 625);
    return directions[index];
  }
  function fahrenheitToCelsius(val) {
    return Math.round((val - 32) / 1.8);
  }
  const fetchLocation = async () => {
    try {
      console.log(locationKey)
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/${locationKey}?apikey=YBBbKyRipsAsK6qezf19HZ3MpO81qieb&language=en-us&details=false`
      );
      const location = response.data;
      setLocationData(location);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToday = (date) => {
    let day = new Date(date).getDay();

    const presentday = new Date().getDay();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    switch (day) {
      case presentday:
        return "Today";
        break;
      case (presentday + 1) % 7:
        return "Tomorrow";
        break;

      default:
        return days[day];
    }
  };
  const handleTime = (Time) => {
    const date = new Date(Time);
    return date.getHours() + ":" + date.getMinutes();
  };
  const getLocation = async () => {
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") return;
    let currentLocation = Location.getCurrentPositionAsync();
    console.log(currentLocation);
  };
  const fetchData=()=>{
    fetchLocation();
    fetchConditions();
    fetchforecast();
    fetchHourlyforecast();
  }
  useEffect(() => {
    // fetchData()
  }, [locationKey]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData()
    setRefreshing(false);
    
  }, []);
  const translateY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((e)=>{
  })
  const reanimatedStyle = useAnimatedStyle(()=>{
    return {
    }
  },[])
  
  return (
    <ImageBackground
      style={styles.background}
      source={Clouds}
    >
      <View style={styles.appbar}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("LocationScreen",{setLocationKey})
          }
        >
          <Entypo name="plus" size={35} color="white" />
        </TouchableOpacity>
        <Text style={styles.location}>{locationData?.LocalizedName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Ionicons
            name="settings-outline"
            size={30}
            color="white"
            style={{ top: 5 }}
          />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >

        <Animated.View style={[{ justifyContent: "center", alignItems: "center",opacity:1},reanimatedStyle]}>
          <Text style={styles.temp}>
            {Math.round(condition?.Temperature.Metric.Value)}°
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.maintxt(20)}>{condition?.WeatherText}</Text>
            <Text style={styles.maintxt(18)}>
              {Math.round(condition?.Temperature.Metric.Value) + 3}° /
              {Math.round(condition?.Temperature.Metric.Value) - 3}°
            </Text>
          </View>

          <View style={styles.airquality}>
            <Ionicons
              name="leaf"
              size={15}
              color="white"
              style={{ padding: 5, paddingRight: -7 }}
            />
            <Text style={styles.maintxt(14)}>AQI 47</Text>
          </View>
        </Animated.View>

        <View style={styles.forecastdetail(290, "97%")}>
          <View
            style={{
              padding: SIZES.large,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <FontAwesome5
                name="calendar-alt"
                size={10}
                color="white"
                style={{
                  backgroundColor: "rgba(1,1,1,0.2)",
                  padding: 7,
                  borderRadius: 25,
                }}
              />
              <Text style={styles.dimtxt}> 5-Day forecast</Text>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Text style={{ color: "rgba(252, 252, 252,0.7)" }}>
                More details
              </Text>
              <MaterialIcons
                name="arrow-right"
                size={20}
                color="rgba(252, 252, 252,0.7)"
                style={{ top: 5 }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {forecasts?.map((item) => (
              <View
                key={item.Date}
                style={{
                  paddingHorizontal: SIZES.xLarge,
                  paddingVertical: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ width: 30, height: 30}}
                    source={weatherIcons[condition?.WeatherText]}
                  />
                  <Text style={styles.detailstext}>
                    {" "}
                    {handleToday(item.Date)} 
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: 700, fontSize: 16 }}
                  >
                    {fahrenheitToCelsius(item.Temperature.Maximum.Value)}°/
                    {fahrenheitToCelsius(item.Temperature.Minimum.Value)}°
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("ForecastScreen", { forecasts })}
          >
            <Text style={styles.maintxt(20)}>5 Days Forecast</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.forecastdetail(230, "97%")}>
            <View style={{ flexDirection: "row", padding: 15 }}>
              <AntDesign
                name="clockcircle"
                size={10}
                color="white"
                style={{
                  backgroundColor: "rgba(1,1,1,0.2)",
                  padding: 7,
                  borderRadius: 25,
                }}
              />
              <Text style={styles.dimtxt}> 24-Hours Forecast</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {hourlyForecasts?.map((item) => (
                <View
                  key={item.DateTime}
                  style={{
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: 20,
                        paddingBottom: 70,
                        paddingLeft:5
                      }}
                    >
                      {fahrenheitToCelsius(item.Temperature.Value)}°
                    </Text>
                    <Image
                    style={{ width: 30, height: 30, bottom: 5 }}
                    source={weatherIcons[condition?.WeatherText]}
                  />
                    <Text style={{ color: "white", fontSize: 12 }}>
                      {" "}
                      {new Date(item.DateTime).getHours() +
                        ":" +
                        new Date(item.DateTime).getMinutes()}
                      {"0"}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <View style={styles.details(130, "97%")}>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    top: 10,
                  }}
                >
                  <View>
                    <Text style={styles.maintxt(18)}>
                      {getDirection(condition?.Wind.Direction.Degrees)}
                    </Text>
                    <Text style={styles.maintxt(20)}>
                      {condition?.Wind.Speed.Metric.Value} km/h
                    </Text>
                  </View>
                  <Ionicons
                    name="ios-compass-outline"
                    size={80}
                    color="white"
                  />
                </View>
              </View>
              <View style={styles.details(130, "97%")}>
                <View style={{justifyContent:"space-evenly",alignItems:"center",flexDirection:"row"}}>
                  <View>  
                    <Text style={styles.dimtxt}>
                      {handleTime(forecasts[0]?.Sun.Rise)} Sunrise
                    </Text>
                    <Text style={styles.dimtxt}>
                      {handleTime(forecasts[0]?.Sun.Set)} Sunset
                    </Text>
                  </View>
                  <Image
                    style={{ width: 90, height: 90}}
                    source={require('../assets/images/sunpath.png')}
                  />
                </View>
              </View>
            </View>
            <View style={styles.details(270, "47%")}>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>Humidity</Text>
                <Text style={styles.maintxt(16)}>
                  {condition?.RelativeHumidity}%
                </Text>
              </View>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>Feels Like</Text>
                <Text style={styles.maintxt(16)}>
                  {Math.round(condition?.RealFeelTemperature.Metric.Value)}°
                </Text>
              </View>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>UV</Text>
                <Text style={styles.maintxt(16)}>{condition?.UVIndex}</Text>
              </View>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>Pressure</Text>
                <Text style={styles.maintxt(16)}>
                  {condition?.Pressure.Metric.Value} mbar
                </Text>
              </View>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>Chance of Rain</Text>
                <Text style={styles.maintxt(16)}>
                  {forecasts[0]?.Day.RainProbability}%
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.details(100, "97%")}></View>s */}
        </View>
      </Animated.ScrollView>
    </ImageBackground>
  );
};

export default Weather;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  appbar: {
    top: 30,
    padding: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  temp: {
    marginTop: 110,
    fontWeight: "500",
    fontSize: 120,
    color: "white",
    left: 20,
  },
  location: {
    fontFamily: "bold",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    top: 10,
  },
  maintxt: (fontsize) => ({
    fontFamily: "medium",
    fontSize: fontsize,
    fontWeight: 800,
    color: "white",
    padding: 5,
    alignSelf: "center",
  }),
  dimtxt: {
    fontFamily: "medium",
    fontSize: 16,
    color: "rgba(252, 252, 252,0.7)",
    top: 3,
  },
  airquality: {
    borderColor: "white",
    borderRadius: SIZES.medium,
    flexDirection: "row",
    backgroundColor: "rgba(245, 247, 247, 0.7)",
    marginBottom: 120,
  },
  forecastdetail: (height, width) => ({
    height: height,
    width: width,
    borderRadius: 20,
    backgroundColor: "rgba(88, 89, 89, 0.5)",
    margin: 5,
  }),
  details: (height, width) => ({
    height: height,
    width: width,
    borderRadius: 20,
    backgroundColor: "rgba(88, 89, 89, 0.5)",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  }),
  detailstext: {
    fontFamily: "medium",
    fontSize: 20,
    color: "white",
  },
  btn: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: "rgba(1,1,1,0.2)",
    margin: 5,
    bottom: 5,
  },
  humidity: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    borderColor: "white",
    width: "97%",
    paddingVertical: 7,
  },
});
