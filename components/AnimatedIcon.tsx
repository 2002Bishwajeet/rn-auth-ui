import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import AppwriteIcon from './Icons/AppwriteIcon';
import { appwritePink, reactBlue } from '@/constants/Colors';
import { useState } from 'react';
import ReactIcon from './Icons/ReactIcon';

export default function AnimatedIcon() {
  const appwrite = useThemeColor({}, 'appwrite');
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  const offsetWidth = useSharedValue(0);
  const offsetHeight = useSharedValue(0);
  const isPanning = useSharedValue(false);
  const [rotate, setRotate] = useState(false);
  const boxSize = useSharedValue({
    height: 0,
    width: 0,
  });

  const { sensor } = useAnimatedSensor(SensorType.GYROSCOPE);

  const pan = Gesture.Pan()
    .onStart(() => {
      isPanning.value = true;
    })
    .onUpdate(e => {
      // X Degree should rotate maximum +-30 degrees
      const x = e.x - boxSize.value.width / 2;
      const y = e.y - boxSize.value.height / 2;
      rotateX.value = interpolate(
        y,
        [-boxSize.value.height / 2, boxSize.value.height / 2],
        [-20, 20],
        Extrapolation.CLAMP,
      );
      // Y Degree should rotate maximum +-10 degrees
      rotateY.value = interpolate(
        x,
        [-boxSize.value.width / 2, boxSize.value.width / 2],
        [-25, 25],
        Extrapolation.CLAMP,
      );

      offsetHeight.value = interpolate(
        e.translationY,
        [-boxSize.value.height, boxSize.value.height],
        [-25, 25],
        Extrapolation.CLAMP,
      );
      offsetWidth.value = interpolate(
        e.translationX,
        [-boxSize.value.width, boxSize.value.width],
        [-25, 25],
        Extrapolation.CLAMP,
      );
    })
    .onEnd(() => {
      rotateX.value = withSpring(0);
      rotateY.value = withSpring(0);
      offsetHeight.value = withSpring(0);
      offsetWidth.value = withSpring(0);
      isPanning.value = false;
    });

  const tap = Gesture.Tap().onEnd(() => {
    rotateY.value = withSpring(rotateY.value + 180);
    runOnJS(setRotate)(!rotate);
  });

  const composed = Gesture.Race(pan, tap);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { rotateX: `${rotateX.value}deg` },
      { rotateY: `${rotateY.value}deg` },
      { perspective: -1000 },
    ],
    shadowOffset: {
      width: offsetWidth.value,
      height: offsetHeight.value,
    },
  }));

  const gyroscopeStyles = useAnimatedStyle(() => {
    if (isPanning.value) {
      return {};
    }
    const { x, y } = sensor.value;

    return {
      shadowOffset: {
        width: withSpring(interpolate(y, [-2, 2], [-10, 10])),
        height: withSpring(interpolate(x, [-2, 2], [-10, 10])),
      },
      transform: [
        { rotateX: withSpring(`${interpolate(x, [-1, 1], [-10, 10])}deg`) },
        { rotateY: withSpring(`${interpolate(y, [-1, 1], [-5, 5])}deg`) },
      ],
    };
  });

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        onLayout={e => {
          boxSize.value = {
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
          };
        }}
        style={[
          styles.box,
          animatedStyles,
          gyroscopeStyles,
          {
            backgroundColor: appwrite,
            shadowColor: rotate ? reactBlue : appwritePink,
          },
        ]}
      >
        {rotate ? <ReactIcon /> : <AppwriteIcon />}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  box: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 64,
    borderRadius: 25,
    zIndex: 12,
    elevation: 25,
    shadowColor: appwritePink,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    shadowOpacity: 0.8,
  },
});
