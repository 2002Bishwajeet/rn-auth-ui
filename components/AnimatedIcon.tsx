import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import AppwriteIcon from "./AppwriteIcon";
import { appwritePink } from "@/constants/Colors";

export default function AnimatedIcon() {
  const appwrite = useThemeColor({}, "appwrite");
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const boxSize = useSharedValue({
    height: 0,
    width: 0,
  });

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      // X Degree should rotate maximum +-30 degrees

      const x = e.x - boxSize.value.width / 2;
      const y = e.y - boxSize.value.height / 2;
      rotateX.value = interpolate(
        y,
        [-boxSize.value.height / 2, boxSize.value.height / 2],
        [-30, 30],
        Extrapolation.CLAMP
      );
      // Y Degree should rotate maximum +-10 degrees
      rotateY.value = interpolate(
        x,
        [-boxSize.value.width / 2, boxSize.value.width / 2],
        [-25, 25],
        Extrapolation.CLAMP
      );
    })
    .onEnd(() => {
      rotateX.value = withSpring(0);
      rotateY.value = withSpring(0);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      //   { perspective: -1000 },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        onLayout={(e) => {
          boxSize.value = {
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
          };
        }}
        style={[
          styles.box,
          animatedStyles,
          {
            backgroundColor: appwrite,
            // transform: [
            //   { rotateX: `0deg` },
            //   { rotateY: `-20deg` },
            // ],
          },
        ]}
      >
        <AppwriteIcon />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 64,
    borderRadius: 25,
    zIndex: 12,
    elevation: 12,
    shadowColor: appwritePink,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    shadowOpacity: 0.8,
  },
});
