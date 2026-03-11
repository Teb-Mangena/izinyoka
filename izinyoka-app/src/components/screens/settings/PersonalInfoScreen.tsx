import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, TextInput, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming Expo, or use your icon library
import { useAuthStore } from '@/src/store/useAuthStore';

import ThemedView from '../../themes/ThemedView';
import ThemedText from '../../themes/ThemedText';

const PersonalInfo = () => {
  const { user } = useAuthStore();

  // Local state to manage form inputs
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    email: user?.email || '',
    profilePic: user?.profilePic || 'https://via.placeholder.com/150',
  });

  const handleUpdate = () => {
    // Logic to call your API or update the store goes here
    console.log('Updated Data:', formData);
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Header / Profile Picture Section */}
        <View className="items-center py-8">
          <View className="relative">
            <Image
              source={{ uri: formData.profilePic }}
              className="w-32 h-32 rounded-full border-4 border-blue-500/20"
            />
            <TouchableOpacity 
              activeOpacity={0.7}
              className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-2 border-white dark:border-slate-900"
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <ThemedText className="mt-4 text-xl font-bold">Edit Profile</ThemedText>
          <ThemedText className="text-slate-500 text-sm">Role: {user?.role || 'User'}</ThemedText>
        </View>

        {/* Form Fields */}
        <View className="px-6 space-y-6">
          
          {/* First Name */}
          <View>
            <ThemedText className="mb-2 ml-1 font-semibold opacity-70">First Name</ThemedText>
            <TextInput
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter name"
              className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
          </View>

          {/* Surname */}
          <View>
            <ThemedText className="mb-2 ml-1 font-semibold opacity-70">Surname</ThemedText>
            <TextInput
              value={formData.surname}
              onChangeText={(text) => setFormData({ ...formData, surname: text })}
              placeholder="Enter surname"
              className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
            />
          </View>

          {/* Email (Read Only or Editable) */}
          <View>
            <ThemedText className="mb-2 ml-1 font-semibold opacity-70">Email Address</ThemedText>
            <TextInput
              value={formData.email}
              editable={false} // Often emails are locked, change to true if needed
              className="bg-slate-200/50 dark:bg-slate-800/50 p-4 rounded-2xl text-slate-500 border border-slate-200 dark:border-slate-700"
            />
          </View>

          {/* Meta Info (Read Only) */}
          <View className="flex-row justify-between px-2 pt-2">
            <ThemedText className="text-xs opacity-40">ID: {user?._id.slice(-8)}</ThemedText>
            <ThemedText className="text-xs opacity-40">Joined: {new Date(user?.createdAt || '').toLocaleDateString()}</ThemedText>
          </View>
        </View>

        {/* Action Button */}
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