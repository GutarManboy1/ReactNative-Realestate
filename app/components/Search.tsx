import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { use, useState } from "react";
import { useLocalSearchParams, usePathname, router } from "expo-router";
import { useDebouncedCallback } from "use-debounce";
import icons from "@/constants/icons";

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query || "");

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500,
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-6" />
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={handleSearch}
          className="ml-2 text-black-300 text-sm font-rubik flex-1 placeholder:text-primary-300"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-6" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
