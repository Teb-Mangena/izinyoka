import { useState } from 'react';
import { ScrollView, TouchableOpacity, TextInput, Image, View, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '@/src/store/useAuthStore';
import * as ImagePicker from "expo-image-picker";

import ThemedView from '../../themes/ThemedView';
import ThemedText from '../../themes/ThemedText';

const PersonalInfo = () => {
  const { user, editProfileImage, loading } = useAuthStore();

  const backupImg = require("../../../../assets/images/backup-img.png");

  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
  });

  // Decide which image source to use
  const profileImageSource = user?.profilePic?.secure_url 
    ? { uri: user.profilePic.secure_url } 
    : backupImg;

  const handleUpdate = () => {
    // Logic for updating name/surname would go here
    console.log('Updating text data:', formData);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required", "Allow access to your photos to change your profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    const getMimeType = (uri: string) => {
      const extension = uri.split('.').pop()?.toLowerCase();
      switch (extension) {
        case 'jpg':
        case 'jpeg':
          return 'image/jpeg';
        case 'png':
          return 'image/png';
        case 'gif':
          return 'image/gif';
        case 'webp':
          return 'image/webp';
        default:
          return 'image/jpeg';
      }
    };


    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];

    await editProfileImage({
      uri: asset.uri,
      imageType: getMimeType(asset.uri),
      fileName: asset.fileName || "profile.jpg",
    });
    }
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <View className="items-center py-8">
          <View className="relative">
            <Image
              source={profileImageSource}
              className="w-32 h-32 rounded-full border-4 border-blue-500/20 bg-slate-200"
            />
            
            <TouchableOpacity 
              onPress={pickImage}
              disabled={loading}
              activeOpacity={0.7}
              className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white dark:border-slate-900"
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Ionicons name="camera" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
          
          <ThemedText className="mt-4 text-xl font-bold">{user?.name} {user?.surname}</ThemedText>
          <ThemedText className="text-slate-500 text-sm">Role: {user?.role || 'User'}</ThemedText>
        </View>

        <View className="px-6 space-y-6">
          <View>
            <ThemedText className="mb-2 ml-1 font-semibold opacity-70">First Name</ThemedText>
            <TextInput
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter name"
              className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
          </View>

          <View>
            <ThemedText className="mb-2 ml-1 font-semibold opacity-70">Surname</ThemedText>
            <TextInput
              value={formData.surname}
              onChangeText={(text) => setFormData({ ...formData, surname: text })}
              placeholder="Enter surname"
              className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
          </View>

          <View>
            <ThemedText className="mb-2 ml-1 font-semibold opacity-70">Email Address</ThemedText>
            <TextInput
              value={formData.email}
              editable={false}
              className="bg-slate-200/50 dark:bg-slate-800/50 p-4 rounded-2xl text-slate-500 border border-slate-200 dark:border-slate-700"
            />
          </View>
        </View>

        <View className="px-6 mt-10">
          <TouchableOpacity 
            onPress={handleUpdate}
            activeOpacity={0.8}
            className="bg-blue-600 p-4 rounded-2xl items-center shadow-lg shadow-blue-400"
          >
            <ThemedText className="text-white font-bold text-lg">Save Changes</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default PersonalInfo;