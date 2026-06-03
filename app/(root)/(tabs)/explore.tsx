import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/app/components/Search";
import { FeaturedCard, Card } from "@/app/components/Cards";
import Filters from "@/app/components/Filters";
import { properties } from "@/app/lib/seed";
import { router } from "expo-router";

export default function Explore() {
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={properties}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex px-5 gap-5"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                className="flex flex-row bg-primary-200 rounded-full size-11 justify-center items-center"
                onPress={() => router.back()}
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Search for your Dream Home</Text>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} Properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
