import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const buttons = [
    ["C", "DEL", "M", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  function calculator() {
    let lastArr = currentNumber[currentNumber.length - 1];

    if (
      lastArr === "/" ||
      lastArr === "*" ||
      lastArr === "-" ||
      lastArr === "+" ||
      lastArr === "."
    ) {
      setCurrentNumber(currentNumber);
      return;
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      return;
    }
  }

  function handleInput(buttonPressed) {
    if (
      buttonPressed === "+" ||
      buttonPressed === "-" ||
      buttonPressed === "*" ||
      buttonPressed === "/"
    ) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    } else if (
      buttonPressed === 1 ||
      buttonPressed === 2 ||
      buttonPressed === 3 ||
      buttonPressed === 4 ||
      buttonPressed === 5 ||
      buttonPressed === 6 ||
      buttonPressed === 7 ||
      buttonPressed === 8 ||
      buttonPressed === 9 ||
      buttonPressed === 0 ||
      buttonPressed === "."
    ) {
      Vibration.vibrate(35);
    }

    switch (buttonPressed) {
      case "DEL":
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "C":
        Vibration.vibrate(35);
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        Vibration.vibrate(35);
        setLastNumber(currentNumber + "=");
        calculator();
        if (history.length >= 10) {
          setHistory((prevHistory) => prevHistory.slice(1));
        }
        setHistory((prevHistory) => [...prevHistory, currentNumber + "=" + eval(currentNumber)]);
        return;
      case "M":
        Vibration.vibrate(35);
        setShowHistory(!showHistory);
        if (!showHistory) {
          setCurrentHistoryIndex(-1); // Reset chỉ số khi mở lịch sử
        }
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  }

  function handleHistoryNavigation(direction) {
    if (direction === "next" && currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    } else if (direction === "prev" && currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
    },
    results: {
      flex: 2,
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      width: "100%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    resultText: {
      color: "#00b9d6",
      margin: 15,
      fontSize: 40,
    },
    historyText: {
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      marginRight: 10,
    },
    themeButton: {
      position: "absolute",
      top: 30,
      left: 20,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      flex: 4,
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
    },
    button: {
      justifyContent: "center",
      alignItems: "center",
      minWidth: Dimensions.get("window").width / 4 - 10,
      minHeight: Dimensions.get("window").height / 8,
      margin: 5,
      borderRadius: 10,
      backgroundColor: darkMode ? "#303946" : "#fff",
      shadowColor: darkMode ? "#000" : "#000", // Đảm bảo bóng đổ rõ hơn
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.9, // Tăng độ mờ của bóng
      shadowRadius: 10, // Tăng bán kính bóng
    },
    textButton: {
      fontSize: 28,
      color: darkMode ? "#ffffff" : "#000000",
    },
    historyContainer: {
      position: "absolute",
      top: 100,
      right: 10,
      backgroundColor: darkMode ? "#303946" : "#fff",
      padding: 10,
      borderRadius: 10,
      shadowColor: darkMode ? "#000" : "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.9,
      shadowRadius: 10,
      maxHeight: Dimensions.get("window").height / 2,
      width: Dimensions.get("window").width / 2,
      zIndex: 1,
    },
    historyTextItem: {
      color: darkMode ? "#ffffff" : "#000000",
      fontSize: 18,
      marginBottom: 5,
    },
    historyTextItemGray: {
      color: darkMode ? "#7c7c7c" : "#a0a0a0",
      fontSize: 18,
      marginBottom: 5,
    },
    historyNavigationButton: {
      margin: 5,
      padding: 10,
      backgroundColor: darkMode ? "#303946" : "#e5e5e5",
      borderRadius: 5,
      alignItems: "center",
      shadowColor: darkMode ? "#000" : "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
    },
    pressedButton: {
      backgroundColor: darkMode ? "#4a4a4a" : "#e0e0e0",
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkMode ? "light-up" : "moon"}
            size={24}
            color={darkMode ? "white" : "black"}
            onPress={() => setDarkMode(!darkMode)}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row" }}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      typeof button === "number" || button === "."
                        ? darkMode
                          ? "#303946"
                          : "#fff"
                        : darkMode
                        ? "#414853"
                        : "#ededed",
                  },
                ]}
                onPress={() => handleInput(button)}
                activeOpacity={0.7} // Hiệu ứng nhấn rõ ràng hơn
              >
                <Text style={styles.textButton}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      {showHistory && (
        <View style={styles.historyContainer}>
          <TouchableOpacity
            style={styles.historyNavigationButton}
            onPress={() => handleHistoryNavigation("prev")}
          >
            <Text>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.historyNavigationButton}
            onPress={() => handleHistoryNavigation("next")}
          >
            <Text>Next</Text>
          </TouchableOpacity>
          {history.length > 0 && (
            <Text style={styles.historyTextItemGray}>
              {currentHistoryIndex >= 0 && currentHistoryIndex < history.length
                ? history[currentHistoryIndex]
                : ""}
            </Text>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
