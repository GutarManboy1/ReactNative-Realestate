import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { categories } from "@/constants/data";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedFilter, setSelectedFilter] = useState<string>(
    params.filter || "All",
  );

  const handleFilterChange = (filter: string) => {
    if (selectedFilter === filter) {
      setSelectedFilter("All");
      router.setParams({ filter: "All" });
    } else {
      setSelectedFilter(filter);
      router.setParams({ filter: filter });
    }
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          className={`flex flex-col items-start mr-4 mb-3 px-4 py-2 rounded-full ${selectedFilter === item.category ? "bg-primary-300" : "bg-primary-100 border border-primary-200"}`}
          key={index}
          onPress={() => handleFilterChange(item.category)}
        >
          <Text
            className={`text-sm font-rubik-medium ${selectedFilter === item.category ? "text-white" : "text-primary-300"}`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
