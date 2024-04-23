import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import sunny from '../assets/weatherIcons/1-s.png'

const WeatherIcon = ({icon}) => {

  return (
    <Image style={{width:30,height:30,bottom:5}} source={icon}/>
  )
}

export default WeatherIcon

const styles = StyleSheet.create({})