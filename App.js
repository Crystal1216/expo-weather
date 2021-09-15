import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "b5cc658c2fa0ee42a81b81be46904694";

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  getWeather = async (lat, lon) => {
    const {
      data: {
        main: { temp },
        sys: { country },
        name,
        weather,
      },
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    this.setState({
      isLoading: false,
      temp,
      country: name + ", " + country,
      condition: weather[0].main,
    });
  };
  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      console.log(error);
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, country, condition } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} country={country} condition="None" />
    );
  }
}
