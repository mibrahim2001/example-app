import { View, Text, FlatList, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import useAutoScroll from "../hooks/useAutoScroll";
import AutoScrollController from "./AutoScrollController";

const AutoScrollFlatlist = () => {
  const [data, setData] = useState([]);
  const flatListRef = useRef(null);
  const {
    autoScroll,
    currentPosition,
    startScroll,
    clearScrolling,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollBegin,
    onScrollEnd,
    onTouchBegin,
    onTouchEnd,
    setRefForAutoScroll,
    setIsAutoScroll,
    increaseAutoScrollSpeed,
    decreaseAutoScrollSpeed,
    setInitialScrollSpeed,
    onScroll,
    isScrollingUp,
    setIsScrollingUp,
    toggleAutoScroll,
  } = useAutoScroll();

  useEffect(() => {
    const numbersArray = Array.from({ length: 100 }, (_, index) => index + 1);
    setData(numbersArray);

    setRefForAutoScroll(flatListRef);
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemStyle}>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        ref={flatListRef}
        style={styles.flatListStyle}
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.faltListContainerStyle}
        onTouchStart={onTouchBegin}
        onTouchEnd={onTouchEnd}
        onScrollBeginDrag={onScrollBegin}
        onScrollEndDrag={onScrollEnd}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={onScroll}
      />

      <AutoScrollController
        toggleAutoScroll={toggleAutoScroll}
        autoScroll={autoScroll}
        // hideAutoScroll={hideAutoScroll}
        increaseSpeed={increaseAutoScrollSpeed}
        decreaseSpeed={decreaseAutoScrollSpeed}
      />
    </>
  );
};

export default AutoScrollFlatlist;

const styles = StyleSheet.create({
  flatListStyle: {
    width: "100%",
    marginTop: 30,
  },
  faltListContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemStyle: {
    height: 50,
    backgroundColor: "lightblue",
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderRadius: 10,
  },
});
