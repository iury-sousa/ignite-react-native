import React from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const WIDTH = Dimensions.get("window").width;

export function AnimationExemplo() {
  const animation = useSharedValue(0);
  const animationStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.ease,
          }),
        },
      ],
    };
  });

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Animated.View style={[styles.box, animationStyles]} />
      <Button title="Mover" onPress={handleAnimationPosition} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: "red",
  },
});
