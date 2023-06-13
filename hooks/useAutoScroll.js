import { useState, useRef, useEffect } from "react";

const useAutoScroll = () => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [momentumScrolling, setMomentumScrolling] = useState(false);
  const [flatListRef, setFlatListRef] = useState(null);
  const [isAutoScroll, setIsAutoScroll] = useState(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [firstScroll, setFirstScroll] = useState(true);
  const previousOffset = useRef(0);
  const activeInterval = useRef();
  const scrollSpeed = useRef(1);

  const setRefForAutoScroll = (ref) => {
    setFlatListRef(ref);
  };

  // const startScroll = () => {
  //   console.log("start scroll triggered");
  //   activeInterval.current = setInterval(() => {
  //     try {
  //       setCurrentPosition((prevPosition) => {
  //         const newPosition = prevPosition + scrollSpeed.current;
  //         if (flatListRef.current) {
  //           flatListRef.current.scrollToOffset({
  //             offset: newPosition,
  //             animated: false,
  //           });
  //         }

  //         return newPosition;
  //       });
  //     } catch (error) {
  //       console.log("error in start scroll", error);
  //       clearScrolling();
  //     }
  //   }, 30);
  // };

  const startScroll = () => {
    // console.log("start scroll triggered");

    const scroll = () => {
      try {
        setCurrentPosition((prevPosition) => {
          const newPosition = prevPosition + scrollSpeed.current;
          if (flatListRef.current) {
            flatListRef.current.scrollToOffset({
              offset: newPosition,
              animated: true,
            });
          }

          return newPosition;
        });

        // Schedule the next scroll update
        activeInterval.current = requestAnimationFrame(scroll);
      } catch (error) {
        console.log("error in start scroll", error);
        clearScrolling();
      }
    };

    // Start the recursive scroll function
    activeInterval.current = requestAnimationFrame(scroll);
  };

  const setInitialScrollSpeed = (initialSpeed) => {
    scrollSpeed.current = initialSpeed;
  };

  const clearScrolling = () => {
    // console.log("<==========clear scrolling triggered=============>");
    if (activeInterval.current) {
      cancelAnimationFrame(activeInterval.current);
      activeInterval.current = null;
    }
  };

  const increaseAutoScrollSpeed = () => {
    if (scrollSpeed.current < 3.25) {
      scrollSpeed.current = scrollSpeed.current + 0.25;
      // console.log("scroll speed", scrollSpeed.current);
    }
  };

  const decreaseAutoScrollSpeed = () => {
    if (scrollSpeed.current > 0.25) {
      scrollSpeed.current = scrollSpeed.current - 0.25;
      // console.log("scroll speed", scrollSpeed.current);
    }
  };

  // useEffect(() => {
  //   if (flatListRef) {
  //     console.log(flatListRef.current);
  //     setCurrentPosition(flatListRef.current?.contentOffset.y);
  //   }
  // }, [flatListRef]);

  useEffect(() => {
    return () => {
      clearScrolling();
    };
  }, []);

  const onMomentumScrollBegin = () => {
    // console.log("omsb");
    setMomentumScrolling(true);
    clearScrolling();
  };

  const onMomentumScrollEnd = (event) => {
    if (momentumScrolling) {
      setMomentumScrolling(false);
      setCurrentPosition(event.nativeEvent.contentOffset.y);
      if (isAutoScroll) {
        startScroll();
      }
    }
  };

  const onScrollBegin = () => {
    setIsScrolling(true);
    clearScrolling();
  };

  const onScroll = (event) => {
    if (firstScroll) {
      setFirstScroll(false);
      return;
    }

    let currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset < 200) {
      // console.log("Current Offset", currentOffset);
      setIsScrollingUp(false);
      return;
    }

    if (currentOffset > previousOffset.current) {
      if (!isScrollingUp) {
        console.log("Scrolling Up");
        setIsScrollingUp(true);
      }
    } else {
      if (isScrollingUp) {
        console.log("Scrolling Down");
        setIsScrollingUp(false);
      }
    }
    if (currentOffset - previousOffset.current > 30) {
      previousOffset.current = currentOffset;
    } else if (previousOffset.current - currentOffset > 30) {
      previousOffset.current = currentOffset;
    }
  };

  const onScrollEnd = (event) => {
    setIsScrolling(false);
    setCurrentPosition(event.nativeEvent.contentOffset.y);
    if (isAutoScroll) {
      startScroll();
    }
  };

  const onTouchBegin = () => {
    clearScrolling();
  };

  const onTouchEnd = (event) => {
    if (!isScrolling && isAutoScroll) {
      startScroll();
    }
  };

  return {
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
  };
};

export default useAutoScroll;
