import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";

interface SettingsItemProps {
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}
const SettingsItem = ({
  title,
  icon,
  onPress,
  textStyle,
  showArrow = true,
}) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text
        className={`text-lg font-rubik-medium mt-2 text-black-300 ${textStyle}`}
      >
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const [name, setName] = useState("Gutar Manboy");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [draftName, setDraftName] = useState(name);

  const openEditModal = () => {
    setDraftName(name);
    setEditModalVisible(true);
  };

  const handleSave = () => {
    if (!draftName.trim()) {
      Alert.alert("Invalid Name", "Name cannot be empty.");
      return;
    }
    setName(draftName.trim());
    setEditModalVisible(false);
  };

  const handleCancel = () => {
    setEditModalVisible(false);
  };

  const handleLogout = async () => {
    const result = await logout();

    if (result ){
      // Handle successful logout, e.g., navigate to login screen
      Alert.alert("Logout Successful", "You have been logged out successfully.");
    } else {
      // Handle logout failure, e.g., show an error message
      Alert.alert("Logout Failed", "Failed to log out.");
    }
  };
  return (
    <SafeAreaView className="bg-white h-full ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center mt-5">
            <Image source={images.avatar} className="size-40 rounded-full" />
            <TouchableOpacity
              className="absolute bottom-11 right-2"
              onPress={openEditModal}
            >
              <Image source={icons.edit} className="size-8" />
            </TouchableOpacity>
            <Text className="text-2xl font-rubik-medium mt-3">{name}</Text>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-red-500"
            onPress={handleLogout}
            showArrow={false}
          />
        </View>

      </ScrollView>

      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={handleCancel}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end"
        >
          <View className="bg-white rounded-t-3xl px-7 pt-6 pb-10">
            <Text className="text-xl font-rubik-bold mb-6">Edit Profile</Text>

            <Text className="text-sm font-rubik-medium text-black-300 mb-1">
              Full Name
            </Text>
            <TextInput
              value={draftName}
              onChangeText={setDraftName}
              placeholder="Enter your name"
              className="border border-primary-200 rounded-xl px-4 py-3 text-base font-rubik text-black-300 mb-6"
              autoFocus
            />

            <View className="flex flex-row gap-3">
              <TouchableOpacity
                onPress={handleCancel}
                className="flex-1 border border-primary-200 rounded-xl py-3 items-center"
              >
                <Text className="text-base font-rubik-medium text-black-300">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="flex-1 bg-primary-300 rounded-xl py-3 items-center"
              >
                <Text className="text-base font-rubik-medium text-white">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
