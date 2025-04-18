import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1 justify-center items-center">
      <Slot />
    </View>
  );
}
