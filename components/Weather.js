import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../constants";
import { ScrollView } from "react-native";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";
import * as Location from "expo-location";

const Weather = () => {
  const [data, setData] = useState({
    current_observation: {
      astronomy: { sunrise: "5:35 AM", sunset: "6:33 PM" },
      atmosphere: { humidity: 85, pressure: 1001, visibility: 1.99 },
      condition: { temperature: 76, text: "Fair" },
      pubDate: 1693011351,
      wind: { chill: 78, direction: "NNE", speed: 10 },
    },
    forecasts: [
      {
        code: 31,
        date: 1693065600,
        day: "Sat",
        high: 92,
        low: 78,
        text: "Clear",
      },
      {
        code: 34,
        date: 1693152000,
        day: "Sun",
        high: 94,
        low: 75,
        text: "Mostly Sunny",
      },
      {
        code: 30,
        date: 1693238400,
        day: "Mon",
        high: 93,
        low: 77,
        text: "Partly Cloudy",
      },
      {
        code: 4,
        date: 1693324800,
        day: "Tue",
        high: 96,
        low: 80,
        text: "Thunderstorms",
      },
      {
        code: 32,
        date: 1693411200,
        day: "Wed",
        high: 98,
        low: 81,
        text: "Sunny",
      },
      {
        code: 36,
        date: 1693497600,
        day: "Thu",
        high: 102,
        low: 82,
        text: "Hot",
      },
      {
        code: 36,
        date: 1693584000,
        day: "Fri",
        high: 105,
        low: 84,
        text: "Hot",
      },
      {
        code: 36,
        date: 1693670400,
        day: "Sat",
        high: 104,
        low: 83,
        text: "Hot",
      },
      {
        code: 36,
        date: 1693756800,
        day: "Sun",
        high: 103,
        low: 81,
        text: "Hot",
      },
      {
        code: 4,
        date: 1693843200,
        day: "Mon",
        high: 101,
        low: 79,
        text: "Thunderstorms",
      },
      {
        code: 4,
        date: 1693929600,
        day: "Tue",
        high: 97,
        low: 78,
        text: "Thunderstorms",
      },
    ],
    location: {
      city: "Lahore",
      country: "Pakistan",
      lat: 31.54991,
      long: 74.327301,
      timezone_id: "Asia/Karachi",
      woeid: 2211177,
    },
  });
  const [condition, setCondition] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [location, setLocation] = useState([]);
  
  const fetchConditions = async () => {
    
    try {
      
      const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/259794?apikey=YBBbKyRipsAsK6qezf19HZ3MpO81qieb&language=en-us&details=true`).then((response)=>{

        setCondition(JSON.stringify(response.data));
        console.log(condition)
        console.log(condition[0]?.Temperature)
      })

    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchLocation = async () => {
    
    try {
      const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=YBBbKyRipsAsK6qezf19HZ3MpO81qieb&q=lahore&language=en-us&details=false&offset=1`);
      // setData(response.data);
      console.log(response.json);
      setLocation(response.data[0])
      
      
      setCondition(data?.current_observation.condition);
      setForecasts(data?.forecasts);
    } catch (error) {
      console.log(error);
    }
  };
  const handleToday = (day) => {
    const date = new Date();
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    switch (day) {
      case days[date.getDay()]:
        return "Today";
        break;
      case days[(date.getDay() + 1)%7]:
        return "Tomorrow";
        break;

      default:
        return day;
    }
  };
  const getLocation=async()=>{
    let {status} = await Location.getForegroundPermissionsAsync()
    if(status !== 'granted')return;
    let currentLocation=Location.getCurrentPositionAsync()
    console.log(currentLocation)
  }
  useEffect(() => {
    // setCondition(data?.current_observation.condition);
    // setForecasts(data?.forecasts);
    // getLocation()
    // fetchdata()
    fetchConditions()
    console.log(location?.key)
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/clouds.jpg")}
    >
      <View style={styles.appbar}>
        <TouchableOpacity>
          <Entypo name="plus" size={40} color="white" />
        </TouchableOpacity>
        <Text style={styles.location}>Baghbanpura</Text>
        <TouchableOpacity>
          <Ionicons
            name="settings-outline"
            size={30}
            color="white"
            style={{ top: 5 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.temp}>{}°</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.maintxt(20)}>{condition?.text}</Text>
            <Text style={styles.maintxt(20)}>
              {condition?.temperature - 5}° /{condition?.temperature + 5}°
            </Text>
          </View>
          <View style={styles.airquality}>
            <Ionicons
              name="leaf"
              size={15}
              color="white"
              style={{ padding: 5 ,paddingRight:-7}}
            />
            <Text style={styles.maintxt(14)}>AQI 47</Text>
          </View>
        </View>
        <View style={styles.forecastdetail(290, "97%")}>
          <View
            style={{
              padding: SIZES.large,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Text style={styles.detailstext}>5 Days forecast</Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Text style={{ color: "white" }}>More details</Text>
              <MaterialIcons
                name="arrow-right"
                size={20}
                color="white"
                style={{ top: 5 }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={{}}>
            {forecasts?.map((item) => (
              <View
              key={item.date}
                style={{
                  paddingHorizontal: SIZES.xLarge,
                  paddingVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <WeatherIcon />
                  <Text style={styles.detailstext}>
                    {handleToday(item.day)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    {item.high}° /{item.low}°{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.maintxt(20)}>5 Days Forecast</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.details(230, "97%")}></View>
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
                  <Text style={styles.maintxt(20)}>
                    {data?.current_observation.wind.speed}km/h
                  </Text>
                  <Ionicons
                    name="ios-compass-outline"
                    size={90}
                    color="white"
                  />
                </View>
              </View>
              <View style={styles.details(130, "97%")}>
                <ImageBackground
                  style={{ left: 20, flex: 1, justifyContent: "center" }}
                  source={require("../assets/images/sunpath.png")}
                >
                  <Text style={styles.dimtxt}>
                    {data?.current_observation.astronomy.sunrise} Sunrise
                  </Text>
                  <Text style={styles.dimtxt}>
                    {data?.current_observation.astronomy.sunset} Sunset
                  </Text>
                </ImageBackground>
              </View>
            </View>
            <View style={styles.details(270, "47%")}>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>Humidity</Text>
                <Text style={styles.maintxt(16)}>
                  {data?.current_observation.atmosphere.humidity}%
                </Text>
              </View>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>Feels Like</Text>
                <Text style={styles.maintxt(16)}>
                  {condition?.temperature}°
                </Text>
              </View>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>UV</Text>
                <Text style={styles.maintxt(16)}>
                  {data?.current_observation.atmosphere.visibility}%
                </Text>
              </View>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>Pressure</Text>
                <Text style={styles.maintxt(16)}>
                    {data?.current_observation.atmosphere.pressure}mbar
                </Text>
              </View>
              <View style={styles.humidity}>
                <Text style={styles.maintxt(16)}>Chance of Rain</Text>
                <Text style={styles.maintxt(16)}>
                  {data?.current_observation.atmosphere.humidity}%
                </Text>
              </View>
            </View>
          </View>
            <View style={styles.details(100, "97%")}></View>
        </View>
      </ScrollView>
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
    padding: SIZES.large,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  temp: {
    marginTop: 130,
    fontFamily: "bold",
    fontSize: 100,
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
    color: "white",
    padding: 5,
    alignSelf: "center",
  }),
  dimtxt: {
    fontFamily: "medium",
    fontSize: 14,
    color: "rgba(252, 252, 252,0.7)",
    padding: 5,
    right: 40,
  },
  airquality: {
    borderColor: "white",
    borderRadius: SIZES.medium,
    flexDirection: "row",
    backgroundColor: "rgba(245, 247, 247, 0.7)",
  },
  forecastdetail: (height, width) => ({
    top: 130,
    height: height,
    width: width,
    borderRadius: 20,
    backgroundColor: "rgba(114, 216, 219, 0.4)",
    margin: 5,
  }),
  details: (height, width) => ({
    top: 130,
    height: height,
    width: width,
    borderRadius: 20,
    backgroundColor: "rgba(114, 216, 219, 0.4)",
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
    backgroundColor: "rgba(114, 216, 219,0.4)",
    margin: 5,
    bottom: 5,
  },
  humidity: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    borderColor: "white",
    width: "97%",
    paddingVertical:7
  },
});
