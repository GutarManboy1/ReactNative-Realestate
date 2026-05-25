import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Search from "@/app/components/Search";
import { FeaturedCard, Card } from "@/app/components/Cards";
import Filters from "@/app/components/Filters";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={[1, 2, 3, 4]}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex px-5 gap-5"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Card />}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={images.avatar}
                  className="size-12 rounded-full"
                />
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

              <FlatList
                data={[1, 2, 3, 4]}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <FeaturedCard />}
                keyExtractor={(item) => item.toString()}
                bounces={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>

            <Filters />

            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendations
              </Text>
              <TouchableOpacity>
                <Text className="text-primary-300 font-rubik-bold text-base">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
