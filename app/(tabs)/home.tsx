import { View, Text, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function Home({ session }: { session: Session }) {
  useEffect(() => {
    if (!session) {
      return () => {
        <Redirect href="/sign-in" />;
      };
    }
  }, [session]);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
  }

  return (
    <View>
      <Text>Email: {session?.user.email}</Text>
      <Pressable
        className="border rounded-3xl items-center p-3 w-full"
        onPress={handleSignOut}
      >
        <Text className="text-base">Sign Out</Text>
      </Pressable>
    </View>
  );
}
