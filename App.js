import React from "react"
import { StyleSheet, View } from "react-native"
import DisplayWeather from "./displayWeather"
import { WEATHER_API_KEY } from "react-native-dotenv"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
      location: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      location => {
        this.setState({ location })
        this.loadWeather()
      },
      err => {
        console.log(err.message)
      }
    )
  }

  loadWeather() {
    const apikey = WEATHER_API_KEY
    const { latitude, longitude } = this.state.location.coords
    const units = "Imperial"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${units}`
    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({ weather: json }))
      .catch(err => console.log(err.message))
  }

  render() {
    return (
      <View style={styles.container}>
        <DisplayWeather data={this.state.weather} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
