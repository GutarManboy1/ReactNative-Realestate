import { Text, View, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/app/components/Search";
import { FeaturedCard, Card } from "@/app/components/Cards";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full" />
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-black-200 font-rubik text-xs">
                Welcome back,
              </Text>
              <Text className="text-black-300 font-rubik-medium text-base">
                Gutar Manboy
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-6" />
        </View>
        <Search />
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Featured
            </Text>
            <TouchableOpacity>
              <Text className="text-primary-300 font-rubik-bold text-base">
                See All
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FeaturedCard />
        <Card />
      </View>
    </SafeAreaView>
  );
}
