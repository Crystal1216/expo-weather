import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const weatherOptions = {
  Thunderstorm: {
    iconName: "weather-hurricane",
    gradient: ["#1F1C2C", "##928DAB"],
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#373B44", "#4286f4"],
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#70e1f5", "#FAFFD1"],
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#636FA4", "#E8CBC0"],
    title: "Cloudy",
    subtitle: "zzz",
  },
  Haze: {
    iconName: "weather-hazy",
    gradient: ["#4DA0B0", "#D39D38"],
  },
  None: {
    iconName: "cloud-question",
    gradient: ["#B993D6", "#8CA6DB"],
    title: "None",
    subtitle: "fail to get weather information",
  },
};

export default function Weather({ temp, country, condition }) {
  return (
    <LinearGradient
      colors={
        weatherOptions[condition]
          ? weatherOptions[condition].gradient
          : weatherOptions["None"].gradient
      }
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.halfContainer}>
        <MaterialCommunityIcons
          size={120}
          name={
            weatherOptions[condition]
              ? weatherOptions[condition].iconName
              : weatherOptions["None"].iconName
          }
          color="white"
        />
        <Text style={styles.temp}>{temp}℃</Text>
        <Text style={styles.country}>{country}</Text>
      </View>
      <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
        <Text style={styles.title}>
          {weatherOptions[condition]
            ? weatherOptions[condition].title
            : weatherOptions["None"].title}
        </Text>
        <Text style={styles.subtitle}>
          {weatherOptions[condition]
            ? weatherOptions[condition].subtitle
            : weatherOptions["None"].subtitle}
        </Text>
      </View>
    </LinearGradient>
  );
}

Weather.proptype = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Mist",
    "Smoke",
    "Dust",
  ]).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 40,
    color: "white",
  },
  country: {
    color: "white",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontWeight: "600",
    fontSize: 24,
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
});
