import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WeatherIcon = () => {
  return (
    <Image style={{width:30,height:30,bottom:5}} source={require('../assets/images/haze.png')}/>
  )
}

export default WeatherIcon

const styles = StyleSheet.create({})