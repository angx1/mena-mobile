import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBarProps } from "react-native-tab-view";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, useSegments } from "expo-router";
import CustomTabBar from "@/components/tab-bar";

import IndexScreen from "./index";
import TripsScreen from "./trips";
import SettingsScreen from "./settings";

const renderScene = SceneMap({
  index: IndexScreen,
  trips: TripsScreen,
  settings: SettingsScreen,
});

export default function TabLayout() {
  const layout = useWindowDimensions();
  const router = useRouter();
  const segments = useSegments();
  const insets = useSafeAreaInsets();

  const routes = [
    { key: "index", title: "Home" },
    { key: "trips", title: "Trips" },
    { key: "settings", title: "Settings" },
  ];

  const initialIndex = routes.findIndex(
    (route) => `/(tabs)/${route.key}` === segments.join("/")
  );
  const [index, setIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  const renderTabBar = (props: TabBarProps<any>) => {
    const adaptedState = {
      index: props.navigationState.index,
      routes: props.navigationState.routes.map((route) => ({
        key: route.key,
        name: route.key,
      })),
    };

    const adaptedNavigation = {
      navigate: (routeName: string) => {
        const newIndex = routes.findIndex((r) => r.key === routeName);
        if (newIndex !== -1) {
          setIndex(newIndex);
        }
      },
    };

    const descriptors = props.navigationState.routes.reduce((acc, route) => {
      acc[route.key] = { options: { title: route.title } };
      return acc;
    }, {} as any);

    return (
      <CustomTabBar
        insets={insets}
        state={adaptedState as any}
        navigation={adaptedNavigation as any}
        descriptors={descriptors}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        tabBarPosition="bottom"
        style={{ flex: 1 }}
      />
    </View>
  );
}
