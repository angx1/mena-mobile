import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { useRouter } from "expo-router";

// Importa el nuevo componente
import BottomActions from "@/components/bottom-actions"; // Asegúrate que la ruta sea correcta

// Ya no necesitas importar ActionBar y AssistanceTrigger directamente aquí
// import ActionBar from "@/components/action-bar";
// import AssistanceTrigger from "@/components/assistance-trigger";

import IndexScreen from "./index";
import TripsScreen from "./trips";
import SettingsScreen from "./settings";

const renderScene = SceneMap({
  index: IndexScreen,
  trips: TripsScreen,
  settings: SettingsScreen,
});

export default function Layout() {
  const layout = useWindowDimensions();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "index", title: "Home" },
    { key: "trips", title: "Trips" },
    { key: "settings", title: "Settings" },
  ]);

  const renderTabBar = () => null;

  // Esta función ya no es necesaria aquí si AssistanceTrigger
  // maneja su propia navegación o si se pasa como prop a BottomActions
  // const handleAssistancePress = () => {
  //   router.navigate("/generations");
  // };

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
        swipeEnabled={true}
      />
      {/* Usa el nuevo componente combinado */}
      <BottomActions />
      {/* Elimina los componentes individuales */}
      {/* <ActionBar /> */}
      {/* <AssistanceTrigger /> */}
    </View>
  );
}
