export const colorMap = {
  "pastel-green": "#77DD77",
  "pastel-purple": "#B19CD9",
  "pastel-orange": "#FFB347",
  "pastel-red": "#FF6961",
  "pastel-yellow": "#FDFD96",
  "pastel-blue": "#37FDFC",
  black: "black",
  gray: "gray",
  grey: "gray",
  green: "green",
  red: "red"
}

// Local DB helper methods
export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}