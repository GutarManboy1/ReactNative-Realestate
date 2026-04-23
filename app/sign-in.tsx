import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";

const Signin = () => {
  const handleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View>
          <Text className="text-base uppercase font-rubik text-black-200 text-center">
            Welcome to Home Mate
          </Text>
          <Text className="text-3xl font-rubik-bold text-center mt-2 text-black-300">
            Let's Find your {"\n"}
            <Text className="text-primary-300">Dream Home</Text>
          </Text>
          <Text className="text-black-200 font-rubik text-center mt-12">
            Login to Home Mate with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Sign in with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
