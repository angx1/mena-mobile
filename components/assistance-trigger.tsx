import React, { useState, useRef } from "react";
import {
  View,
  Pressable,
  Modal,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GenerationsScreen from "../app/(tabs)/generations";

export default function AssistanceTrigger() {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setModalVisible] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: pan }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveY > 300) {
          // Adjust the threshold as needed
          closeModal();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <>
      <View
        className="absolute rounded-2xl h-[55px] w-[15%] justify-center overflow-hidden z-10"
        style={{
          bottom: insets.bottom + 10,
          left: 30,
        }}
      >
        <View
          className="flex-1 items-center justify-center"
          style={{ backgroundColor: "rgb(221, 221, 221)" }}
        >
          <Pressable
            onPress={handlePress}
            className="flex-1 w-full items-center justify-center"
          >
            <Ionicons name="ellipse-outline" size={24} color="#FFF" />
          </Pressable>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY: pan }] }]}
          {...panResponder.panHandlers}
        >
          <GenerationsScreen />
          <Pressable onPress={closeModal} style={styles.closeButton}>
            <Ionicons name="close-circle" size={30} color="#333" />
          </Pressable>
        </Animated.View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 50,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
});
