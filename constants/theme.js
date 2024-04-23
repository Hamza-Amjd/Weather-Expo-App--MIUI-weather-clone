const COLORS = {
  primary: "#312651",
  secondary: "#444262",
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};
const weatherIcons={
  "Sunny": require("../assets/weatherIcons/1-s.png"),
  "Mostly sunny": require("../assets/weatherIcons/2-s.png"),
  "Partly sunny": require("../assets/weatherIcons/3-s.png"),
  "Intermittent clouds": require("../assets/weatherIcons/4-s.png"),
  "Hazy sunshine": require("../assets/weatherIcons/5-s.png"),
  "Mostly cloudy": require("../assets/weatherIcons/6-s.png"),
  "Cloudy": require("../assets/weatherIcons/7-s.png"),
  "Dreary (Overcast)": require("../assets/weatherIcons/8-s.png"),
  "Fog": require("../assets/weatherIcons/11-s.png"),
  "Showers": require("../assets/weatherIcons/12-s.png"),
  "Mostly cloudy w/ showers": require("../assets/weatherIcons/13-s.png"),
  "Partly sunny w/ showers": require("../assets/weatherIcons/14-s.png"),
  "T-Storms": require("../assets/weatherIcons/15-s.png"),
  "Mostly cloudy w/ t-storms": require("../assets/weatherIcons/16-s.png"),
  "Partly sunny w/ t-storms": require("../assets/weatherIcons/17-s.png"),
  "Rain": require("../assets/weatherIcons/18-s.png"),
  "Flurries": require("../assets/weatherIcons/19-s.png"),
  "Mostly cloudy w/ flurries": require("../assets/weatherIcons/20-s.png"),
  "Partly sunny w/ flurries ": require("../assets/weatherIcons/21-s.png"),
  "Snow": require("../assets/weatherIcons/22-s.png"),
  "Mostly cloudy w/ snow": require("../assets/weatherIcons/23-s.png"),
  "Ice": require("../assets/weatherIcons/24-s.png"),
  "Sleet": require("../assets/weatherIcons/25-s.png"),
  "Freezing rain": require("../assets/weatherIcons/26-s.png"),
  "Rain and snow": require("../assets/weatherIcons/29-s.png"),
  "Hot": require("../assets/weatherIcons/30-s.png"),
  "Cold": require("../assets/weatherIcons/31-s.png"),
  "Windy": require("../assets/weatherIcons/32-s.png"),
  "Clear": require("../assets/weatherIcons/33-s.png"),
  "Mostly clear": require("../assets/weatherIcons/34-s.png"),
  "Partly cloudy": require("../assets/weatherIcons/35-s.png"),
  "Intermittent clouds": require("../assets/weatherIcons/36-s.png"),
  "Hazy moonlight": require("../assets/weatherIcons/37-s.png"),
  "Mostly cloudy": require("../assets/weatherIcons/38-s.png"),
  "Partly cloudy w/ showers": require("../assets/weatherIcons/39-s.png"),
  "Mostly cloudy w/ showers": require("../assets/weatherIcons/40-s.png"),
  "Partly cloudy w/ t-storms": require("../assets/weatherIcons/41-s.png"),
  "Mostly cloudy w/ t-storms": require("../assets/weatherIcons/42-s.png"),
  "Mostly cloudy w/ flurries": require("../assets/weatherIcons/43-s.png"),
  "Mostly cloudy w/ snow": require("../assets/weatherIcons/44-s.png"),

}
export { COLORS, FONT, SIZES, SHADOWS,weatherIcons };
