import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  // runOnJS ya no es necesario aquí si no desmontamos
} from "react-native-reanimated";
import ActionBar from "@/components/action-bar";
import AssistantTrigger from "@/components/assistant-trigger";

// La interfaz ActionBarProps parece no usarse aquí, considera eliminarla si no es necesaria
// interface ActionBarProps {
//   onActionsVisibleChange?: (isVisible: boolean) => void;
// }

export default function BottomActions() {
  const [actionsVisible, setActionsVisible] = useState(false);
  // showAssistanceTrigger controla la lógica de visibilidad/interactividad
  const [showAssistanceTrigger, setShowAssistanceTrigger] = useState(true);
  // Eliminamos isTriggerRendered y finishHide

  const opacity = useSharedValue(1);

  const handleActionsVisibleChange = (isVisible: boolean) => {
    setActionsVisible(isVisible);
    // La lógica principal: mostrar el trigger cuando las acciones NO están visibles
    setShowAssistanceTrigger(!isVisible);
  };

  // Ya no necesitamos finishHide
  // const finishHide = () => {
  //   setIsTriggerRendered(false);
  // };

  useEffect(() => {
    // Simplemente animamos la opacidad basada en showAssistanceTrigger
    if (showAssistanceTrigger) {
      // Ya no necesitamos setIsTriggerRendered(true);
      opacity.value = withTiming(1, { duration: 120 });
    } else {
      // Eliminamos la lógica de runOnJS(finishHide)
      opacity.value = withTiming(0, { duration: 120 });
    }
    // La dependencia de opacity no es necesaria aquí, ya que solo leemos/escribimos
  }, [showAssistanceTrigger]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    // Considera si este View contenedor es necesario o si los componentes pueden estar directamente
    // en el componente padre (_layout.tsx) para simplificar la jerarquía.
    // Por ahora lo mantenemos.
    <View>
      {/* ActionBar debe tener zIndex: 2 internamente */}
      <ActionBar onActionsVisibleChange={handleActionsVisibleChange} />
      {/* Renderizamos AssistanceTrigger siempre, controlando con opacidad y pointerEvents */}
      {/* Asegúrate que ActionBar tenga zIndex: 2 y este Animated.View zIndex: 1 */}
      <Animated.View
        // Eliminamos backgroundColor: "red"
        style={[animatedStyle, { zIndex: 2 }]}
        // pointerEvents controla si se puede interactuar con el trigger
        pointerEvents={showAssistanceTrigger ? "auto" : "none"}
      >
        <AssistantTrigger />
      </Animated.View>
    </View>
  );
}
