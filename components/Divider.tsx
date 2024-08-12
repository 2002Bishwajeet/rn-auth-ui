import { DimensionValue, View, ViewStyle, Text, StyleSheet } from 'react-native';

const gray = '#d1d5dbAA';

export const Divider = ({
  text,
  width,
  color,
  style,
}: {
  text?: string;
  width?: DimensionValue;
  color?: string;
  style?: ViewStyle;
}) => {
  if (!text) {
    return (
      <View
        style={{
          height: width || 1,
          backgroundColor: color || gray,
          ...style,
        }}
      />
    );
  }
  return (
    <View style={style || styles.default}>
      <View
        style={{
          flex: 1,
          height: width || 1,
          backgroundColor: color || gray,
        }}
      />
      <Text style={{ marginHorizontal: 10, color: gray }}>{text}</Text>
      <View
        style={{
          flex: 1,
          height: width || 1,
          backgroundColor: color || gray,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
