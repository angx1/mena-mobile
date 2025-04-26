import React from "react";
import { View, Text, Pressable, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTabBar(props: BottomTabBarProps) {
  if (!props) return null;

  const { state, descriptors, navigation } = props;
  const insets = useSafeAreaInsets();

  const iconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    index: "ellipse-outline",
    trips: "paper-plane-outline",
    settings: "settings-outline",
  };

  const focusedIconMap: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    index: "ellipse",
    trips: "paper-plane",
    settings: "settings",
  };

  return (
    <View
      className="absolute bottom-0 left-0 right-0 flex-row rounded-3xl mx-20 h-16 items-center overflow-hidden"
      style={{
        bottom: insets.bottom,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const iconName = isFocused
          ? focusedIconMap[route.name] || "ellipse"
          : iconMap[route.name] || "ellipse-outline";

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center h-full"
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#FFFFFF" : "#CCCCCC"}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
