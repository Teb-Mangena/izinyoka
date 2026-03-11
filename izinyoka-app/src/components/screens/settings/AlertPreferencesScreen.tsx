import React, { useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../themes/ThemedView';
import ThemedText from '../../themes/ThemedText';

const AlertPreferencesScreen = () => {
  // State for toggles
  const [preferences, setPreferences] = useState({
    pushNotifications: true,
    emailAlerts: false,
    securityAlerts: true,
    marketingEmails: false,
    orderUpdates: true,
  });

  // Reusable component for a preference row
  const PreferenceItem = ({ 
    label, 
    description, 
    value, 
    onValueChange, 
    icon 
  }: { 
    label: string, 
    description: string, 
    value: boolean, 
    onValueChange: (val: boolean) => void,
    icon: keyof typeof Ionicons.prototype.shapes // Simple icon type
  }) => (
    <View className="flex-row items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
      <View className="flex-1 pr-4 flex-row items-start">
        <View className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg mr-3 mt-1">
          <Ionicons name={icon as any} size={20} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <ThemedText className="text-base font-semibold">{label}</ThemedText>
          <ThemedText className="text-xs opacity-50 leading-4 mt-0.5">{description}</ThemedText>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <ThemedView className="flex-1">
      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View className="pt-8 pb-4">
          <ThemedText className="text-2xl font-bold">Alert Settings</ThemedText>
          <ThemedText className="opacity-60 mt-1">Control how and when we contact you.</ThemedText>
        </View>

        {/* General Notifications Section */}
        <View className="mt-6">
          <ThemedText className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Channel Preferences</ThemedText>
          <View className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl px-4 border border-slate-100 dark:border-slate-800">
            <PreferenceItem
              icon="notifications-outline"
              label="Push Notifications"
              description="Receive instant alerts on your device for important updates."
              value={preferences.pushNotifications}
              onValueChange={(val) => setPreferences({ ...preferences, pushNotifications: val })}
            />
            <PreferenceItem
              icon="mail-outline"
              label="Email Notifications"
              description="Get detailed reports and summaries delivered to your inbox."
              value={preferences.emailAlerts}
              onValueChange={(val) => setPreferences({ ...preferences, emailAlerts: val })}
            />
          </View>
        </View>

        {/* Activity Notifications Section */}
        <View className="mt-8">
          <ThemedText className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Activity Alerts</ThemedText>
          <View className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl px-4 border border-slate-100 dark:border-slate-800">
            <PreferenceItem
              icon="shield-checkmark-outline"
              label="Security Alerts"
              description="Critical alerts regarding login attempts and password changes."
              value={preferences.securityAlerts}
              onValueChange={(val) => setPreferences({ ...preferences, securityAlerts: val })}
            />
             <PreferenceItem
              icon="cart-outline"
              label="Order Updates"
              description="Real-time tracking and delivery status for your purchases."
              value={preferences.orderUpdates}
              onValueChange={(val) => setPreferences({ ...preferences, orderUpdates: val })}
            />
            <PreferenceItem
              icon="megaphone-outline"
              label="News & Marketing"
              description="Special offers, new features, and personalized recommendations."
              value={preferences.marketingEmails}
              onValueChange={(val) => setPreferences({ ...preferences, marketingEmails: val })}
            />
          </View>
        </View>

        <View className="py-10">
            <ThemedText className="text-center text-xs opacity-40">
                You can change these settings at any time. Changes take effect immediately.
            </ThemedText>
        </View>

      </ScrollView>
    </ThemedView>
  );
};

export default AlertPreferencesScreen;