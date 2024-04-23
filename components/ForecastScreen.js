import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SIZES } from '../constants';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { weatherIcons } from '../constants/theme';

export default function ForecastScreen() {
  const route = useRoute();
  const { forecasts } = route.params;
  const handleToday = (date) => {
    let day=new Date(date).getDay()

    const presentday = new Date().getDay();
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    switch (day) {
      case (presentday):
        return "Today";
        break;
      case (presentday + 1) % 7:
        return "Tomorrow";
        break;

      default:
        return days[day]
    }
  };
  function fahrenheitToCelsius(val){
    return Math.round((val - 32) / 1.8);
  }
  useEffect(() => {
  }, [])
  const navigation=useNavigation()
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.bar}>
          <TouchableOpacity style={{paddingBottom:15}}
            onPress={() => {
              navigation.goBack();
            }}
            >
            <Ionicons name="arrow-back" size={30} color='white'/>
          </TouchableOpacity>
          <Text style={styles.maintxt(34)}>
                    5-Days Forecast
                  </Text>
          </View>
        <View style={styles.forecastdetail(290, "97%")}>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
            {forecasts?.map((item) => (
              <View
                key={item.Date}
                style={{
                  paddingHorizontal: SIZES.medium,
                  paddingVertical: 12,
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius:20,
                  backgroundColor:handleToday(item.Date)=="Today"?'rgba(247,247,247,0.1)':'#000000'
                }}
              >
                <View style={{alignItems:'center'}}>
                  <Text style={styles.text}>
                    {handleToday(item.Date)}
                  </Text>
                  <Text style={{color:'white',paddingBottom:20,fontSize:12}}>
                    {new Date(item.Date).getDate()+"/"+new Date(item.Date).getMonth()}
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, bottom: 5 }}
                    source={weatherIcons[item.Day.IconPhrase]}
                  />
                <Text style={{ color: "white" ,fontWeight:700 ,fontSize:16,paddingTop:30}}>
                    {fahrenheitToCelsius(item.Temperature.Maximum.Value)}°</Text>
                </View>
                <View style={{alignItems:'center'}}>
                  <Text style={{ color: "white" ,fontWeight:700 ,fontSize:16,paddingBottom:30}}>
                    {fahrenheitToCelsius(item.Temperature.Minimum.Value)}°
                  </Text>
                  <Image
                    style={{ width: 30, height: 30, bottom: 5 }}
                    source={weatherIcons[item?.Night.IconPhrase]}
                  />
                  <Text style={styles.maintxt(14)}>
                    {item.Day.Wind.Speed.Value} {item.Day.Wind.Speed.Unit}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical:50,
        backgroundColor:'#000000'
    },
    bar: {
        padding:15,
      },
    text:{
        color:'white',
        fontFamily:'medium',
        fontSize:14,
    },
    forecastdetail: (height, width) => ({
        flex:0.7,
        height: height,
        width: width,
        borderRadius: 20,
        backgroundColor: "rgba(1,1,1, 0.2)",
        margin: 5,
      }),
      maintxt: (fontsize) => ({
        fontFamily: "medium",
        fontSize: fontsize,
        fontWeight:600,
        color: "white",
        padding: 5,
      }),
})