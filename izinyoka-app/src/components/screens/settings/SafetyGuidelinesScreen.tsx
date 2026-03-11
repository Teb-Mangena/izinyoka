import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../themes/ThemedView';
import ThemedText from '../../themes/ThemedText';

const SafetyGuidelinesScreen = () => {
  
  const guidelines = [
    {
      id: 1,
      title: "Keep Communications On-Platform",
      description: "Always use our built-in chat for all interactions. This ensures we can protect you if a dispute arises.",
      icon: "chatbubbles-outline",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Protect Personal Information",
      description: "Never share your password, banking details, or home address in public comments or with unverified users.",
      icon: "shield-half-outline",
      color: "bg-emerald-500"
    },
    {
      id: 3,
      title: "Report Suspicious Activity",
      description: "If something feels off, use the 'Report' button. Our safety team reviews all reports within 24 hours.",
      icon: "flag-outline",
      color: "bg-amber-500"
    },
    {
      id: 4,
      title: "Meet in Public Places",
      description: "If your interaction involves meeting in person, always choose a well-lit, public location and tell a friend.",
      icon: "people-outline",
      color: "bg-purple-500"
    }
  ];

  return (
    <ThemedView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Hero Section */}
        <View className="px-6 pt-10 pb-6 bg-emerald-600 rounded-b-[40px] items-center">
          <View className="bg-white/20 p-4 rounded-full mb-4">
            <Ionicons name="shield-checkmark" size={48} color="white" />
          </View>
          <ThemedText className="text-white text-2xl font-bold">Your Safety Matters</ThemedText>
          <ThemedText className="text-emerald-100 text-center mt-2 leading-5">
            Follow these guidelines to ensure a secure and positive experience for everyone.
          </ThemedText>
        </View>

        {/* Guidelines List */}
        <View className="px-6 mt-8">
          {guidelines.map((item) => (
            <View 
              key={item.id} 
              className="flex-row items-start mb-6 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800"
            >
              <View className={`${item.color} p-3 rounded-2xl mr-4 shadow-sm shadow-black/10`}>
                <Ionicons name={item.icon as any} size={24} color="white" />
              </View>
              <View className="flex-1">
                <ThemedText className="text-lg font-bold mb-1">{item.title}</ThemedText>
                <ThemedText className="opacity-60 leading-5">{item.description}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Support Section */}
        <View className="mx-6 p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl items-center border border-dashed border-slate-300 dark:border-slate-600">
          <ThemedText className="font-semibold text-center mb-1">Still have questions?</ThemedText>
          <ThemedText className="text-xs opacity-50 text-center mb-4">
            Our support team is available 24/7 for safety concerns.
          </ThemedText>
          <TouchableOpacity 
            className="flex-row items-center space-x-2 bg-white dark:bg-slate-700 px-6 py-3 rounded-xl shadow-sm"
            onPress={() => {/* Handle Link */}}
          >
            <Ionicons name="help-buoy-outline" size={18} color="#10b981" />
            <ThemedText className="font-bold text-emerald-600 dark:text-emerald-400">Visit Help Center</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Footer Meta */}
        <ThemedText className="text-center mt-8 text-xs opacity-30">
          Last updated: March 2026
        </ThemedText>

      </ScrollView>
    </ThemedView>
  );
};

export default SafetyGuidelinesScreen;