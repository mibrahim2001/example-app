import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import CounterInput from "react-native-counter-input";

export default function AutoScrollController({
  toggleAutoScroll,
  autoScroll,
  hideAutoScroll,
  increaseSpeed,
  decreaseSpeed,
}) {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#2f3283",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 60,
          //   backgroundColor: "yellow",
          flexDirection: "row",
          paddingHorizontal: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "60%",
            height: "100%",
            // backgroundColor: "red",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={toggleAutoScroll}>
            <AntDesign
              name={autoScroll ? "pause" : "play"}
              size={40}
              color="white"
            />
          </TouchableOpacity>
          <CounterInput
            horizontal={true}
            onChange={(counter) => {
              // console.log("onChange Counter:", counter);
            }}
            style={{
              width: 150,
              height: 30,
              marginLeft: 20,
            }}
            increaseButtonBackgroundColor="#2f3283"
            decreaseButtonBackgroundColor="#576ba6"
            initial={3}
            onIncreasePress={() => {
              console.log("Increase Pressed");
              increaseSpeed();
            }}
            onDecreasePress={decreaseSpeed}
            max={10}
            min={1}
          />
        </View>
        <View
          style={{
            height: "100%",
            width: "40%",
            flexDirection: "row-reverse",
            paddingTop: 5,
          }}
        >
          <TouchableOpacity style={{ marginLeft: 20 }} onPress={hideAutoScroll}>
            <Entypo name="cross" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  timeText: {
    color: "white",
    fontWeight: "600",
  },
  footerIconOuter: {
    backgroundColor: "white",
    padding: 3,
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  tafseerIcon: {
    width: 33,
    height: 33,
  },
});
