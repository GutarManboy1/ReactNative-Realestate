import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import { facilities as facilityData } from "@/constants/data";
import { properties } from "@/app/lib/seed";
import type { Review } from "@/app/lib/seed";

const { width } = Dimensions.get("window");

const facilityIconMap = facilityData.reduce(
  (acc, f) => ({ ...acc, [f.title]: f.icon }),
  {} as Record<string, any>,
);

const ReviewCard = ({ review }: { review: Review }) => (
  <View className="bg-primary-100 rounded-2xl p-4 mb-3">
    <View className="flex flex-row items-center justify-between mb-2">
      <View className="flex flex-row items-center gap-3">
        <Image
          source={{ uri: review.avatar }}
          className="size-11 rounded-full"
        />
        <Text className="text-base font-rubik-medium text-black-300">
          {review.name}
        </Text>
      </View>
      <View className="flex flex-row items-center gap-1">
        <Image source={icons.star} className="size-4" />
        <Text className="text-xs font-rubik-bold text-primary-300">
          {review.rating.toFixed(1)}
        </Text>
      </View>
    </View>
    <Text className="text-sm font-rubik text-black-200 leading-5">
      {review.review}
    </Text>
  </View>
);

export default function Property() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const insets = useSafeAreaInsets();

  const property = properties.find((p) => p.$id === id);

  if (!property) {
    return (
      <View
        className="flex-1 bg-white justify-center items-center px-5"
        style={{ paddingTop: insets.top }}
      >
        <Text className="text-black-300 font-rubik-medium text-lg mb-4">
          Property not found
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary-300 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-rubik-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero Image */}
        <View>
          <Image
            source={{ uri: property.image }}
            style={{ width, height: 320 }}
            resizeMode="cover"
          />
          {/* Overlay header buttons */}
          <View
            className="absolute left-0 right-0 flex flex-row items-center justify-between px-5"
            style={{ top: insets.top + 8 }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white rounded-full size-11 justify-center items-center shadow-sm"
            >
              <Image source={icons.backArrow} className="size-5" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLiked(!liked)}
              className="bg-white rounded-full size-11 justify-center items-center shadow-sm"
            >
              <Image
                source={icons.heart}
                className="size-5"
                tintColor={liked ? "#f75555" : "#191d31"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-5 mt-5">
          {/* Title, type badge, rating */}
          <View className="flex flex-row items-start justify-between">
            <View className="flex-1 mr-3">
              <Text className="text-2xl font-rubik-extrabold text-black-300">
                {property.name}
              </Text>
              <View className="flex flex-row mt-2">
                <View className="bg-primary-100 px-3 py-1 rounded-full">
                  <Text className="text-xs font-rubik-medium text-primary-300">
                    {property.type}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row items-center bg-primary-100 px-3 py-2 rounded-full">
              <Image source={icons.star} className="size-5" />
              <Text className="text-sm font-rubik-bold text-primary-300 ml-1">
                {property.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Address */}
          <View className="flex flex-row items-center mt-4 gap-2">
            <Image
              source={icons.location}
              className="size-5"
              tintColor="#8c8e98"
            />
            <Text className="text-sm font-rubik text-black-200 flex-1">
              {property.address}
            </Text>
          </View>

          {/* Stats: beds / baths / area */}
          <View className="flex flex-row items-center justify-between mt-5 bg-accent-100 border border-primary-200 rounded-2xl px-6 py-4">
            <View className="flex flex-col items-center gap-1.5">
              <Image
                source={icons.bed}
                className="size-6"
                tintColor="#0061ff"
              />
              <Text className="text-xs font-rubik text-black-200">
                {property.bedrooms} Beds
              </Text>
            </View>
            <View className="w-px h-10 bg-primary-200" />
            <View className="flex flex-col items-center gap-1.5">
              <Image
                source={icons.bath}
                className="size-6"
                tintColor="#0061ff"
              />
              <Text className="text-xs font-rubik text-black-200">
                {property.bathrooms} Baths
              </Text>
            </View>
            <View className="w-px h-10 bg-primary-200" />
            <View className="flex flex-col items-center gap-1.5">
              <Image
                source={icons.area}
                className="size-6"
                tintColor="#0061ff"
              />
              <Text className="text-xs font-rubik text-black-200">
                {property.area.toLocaleString()} sqm
              </Text>
            </View>
          </View>

          {/* Overview / Description */}
          <View className="mt-7">
            <Text className="text-xl font-rubik-bold text-black-300 mb-2">
              Overview
            </Text>
            <Text className="text-sm font-rubik text-black-200 leading-6">
              {property.description}
            </Text>
          </View>

          {/* Gallery */}
          {property.gallery.length > 0 && (
            <View className="mt-7">
              <Text className="text-xl font-rubik-bold text-black-300 mb-3">
                Gallery
              </Text>
              <FlatList
                data={property.gallery}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.$id}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="w-28 h-20 rounded-xl"
                    resizeMode="cover"
                  />
                )}
              />
            </View>
          )}

          {/* Facilities */}
          {property.facilities.length > 0 && (
            <View className="mt-7">
              <Text className="text-xl font-rubik-bold text-black-300 mb-3">
                Facilities
              </Text>
              <View className="flex flex-row flex-wrap gap-3">
                {property.facilities.map((facility) => {
                  const icon = facilityIconMap[facility];
                  return (
                    <View
                      key={facility}
                      className="flex flex-col items-center gap-2 bg-primary-100 rounded-2xl px-4 py-3 min-w-[72px]"
                    >
                      {icon && (
                        <Image
                          source={icon}
                          className="size-6"
                          tintColor="#0061ff"
                        />
                      )}
                      <Text className="text-xs font-rubik-medium text-black-300 text-center">
                        {facility}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* Agent */}
          <View className="mt-7">
            <Text className="text-xl font-rubik-bold text-black-300 mb-3">
              Agent
            </Text>
            <View className="flex flex-row items-center bg-primary-100 rounded-2xl p-4">
              <Image
                source={{ uri: property.agent.avatar }}
                className="size-14 rounded-full"
              />
              <View className="flex-1 ml-3">
                <Text className="text-base font-rubik-bold text-black-300">
                  {property.agent.name}
                </Text>
                <Text className="text-xs font-rubik text-black-200 mt-0.5">
                  {property.agent.email}
                </Text>
              </View>
              <View className="flex flex-row gap-2">
                <TouchableOpacity className="bg-white rounded-full size-10 justify-center items-center shadow-sm">
                  <Image
                    source={icons.chat}
                    className="size-5"
                    tintColor="#0061ff"
                  />
                </TouchableOpacity>
                <TouchableOpacity className="bg-primary-300 rounded-full size-10 justify-center items-center">
                  <Image
                    source={icons.phone}
                    className="size-5"
                    tintColor="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Reviews */}
          {property.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between mb-3">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Reviews
                </Text>
                <View className="flex flex-row items-center gap-1">
                  <Image source={icons.star} className="size-4" />
                  <Text className="text-sm font-rubik-bold text-primary-300">
                    {property.rating.toFixed(1)}
                  </Text>
                  <Text className="text-xs font-rubik text-black-200 ml-1">
                    ({property.reviews.length} reviews)
                  </Text>
                </View>
              </View>
              {property.reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.$id} review={review} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky bottom bar */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-primary-200 px-5 flex flex-row items-center justify-between"
        style={{ paddingBottom: insets.bottom + 12, paddingTop: 12 }}
      >
        <View>
          <Text className="text-xs font-rubik text-black-200">Price</Text>
          <Text className="text-xl font-rubik-extrabold text-primary-300">
            ¥{property.price.toLocaleString()}
            <Text className="text-sm font-rubik-medium text-black-200">
              {" "}
              /month
            </Text>
          </Text>
        </View>
        <TouchableOpacity className="bg-primary-300 px-10 py-4 rounded-full">
          <Text className="text-white font-rubik-bold text-base">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
