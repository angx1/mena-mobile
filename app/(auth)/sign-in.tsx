import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
  }

  function handleSignUp() {
    router.push("/sign-up");
  }

  return (
    <View className="flex items-center w-full">
      <View className="w-[80%]">
        <Text className="mb-2">email</Text>
        <TextInput
          className="p-4 border border-gray-300 rounded-md text-base w-full h-fit"
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
        />
      </View>

      <View className="mt-5 w-[80%]">
        <Text className="mb-2">password</Text>
        <TextInput
          className="p-4 border border-gray-300 rounded-md text-base w-full h-fit"
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
      <View className="flex gap-3 items-center w-[80%] mt-8">
        <Pressable
          className="border bg-black rounded-3xl items-center p-3 w-full"
          onPress={handleSignIn}
        >
          <Text className="text-base text-white">Sign In</Text>
        </Pressable>
        <Pressable
          className="border rounded-3xl items-center p-3 w-full"
          onPress={handleSignUp}
        >
          <Text className="text-base">Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}
