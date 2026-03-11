import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedView from '../../themes/ThemedView';
import ThemedText from '../../themes/ThemedText';
import { useAuthStore } from '@/src/store/useAuthStore';

const PrivacySecurityScreen = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const { deleteAccount,loading } = useAuthStore();

  // Reusable row for settings
  const SecurityRow = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true, 
    toggleValue = null, 
    onToggle = null,
    isDestructive = false 
  }: any) => (
    <TouchableOpacity 
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-slate-100 dark:border-slate-800"
    >
      <View className={`p-2 rounded-xl mr-4 ${isDestructive ? 'bg-red-50 dark:bg-red-900/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
        <Ionicons name={icon} size={20} color={isDestructive ? '#ef4444' : '#64748b'} />
      </View>
      
      <View className="flex-1">
        <ThemedText className={`text-base font-semibold ${isDestructive ? 'text-red-500' : ''}`}>{title}</ThemedText>
        {subtitle && <ThemedText className="text-xs opacity-50 mt-0.5">{subtitle}</ThemedText>}
      </View>

      {onToggle ? (
        <Switch 
          value={toggleValue} 
          onValueChange={onToggle}
          trackColor={{ false: '#cbd5e1', true: '#10b981' }}
          thumbColor="#fff"
        />
      ) : (
        showArrow && <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
      )}
    </TouchableOpacity>
  );

  const handleDeleteAccount = () => {
    Alert.alert("Warning","Are you sure you want to delete your account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes, Delete", onPress: deleteAccount },
    ])
  }

  return (
    <ThemedView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Top Header */}
        <View className="items-center py-10">
          <View className="bg-blue-600/10 p-5 rounded-full mb-3">
            <Ionicons name="shield-checkmark" size={40} color="#2563eb" />
          </View>
          <ThemedText className="text-2xl font-bold">Privacy & Security</ThemedText>
          <ThemedText className="opacity-50 text-sm">Manage your account protection</ThemedText>
        </View>

        {/* Security Section */}
        <View className="px-6 mb-8">
          <ThemedText className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Security Settings</ThemedText>
          <View className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl px-4 border border-slate-100 dark:border-slate-800">
            <SecurityRow 
              icon="key-outline" 
              title="Change Password" 
              subtitle="Last changed 3 months ago"
              onPress={() => {}} 
            />
            <SecurityRow 
              icon="finger-print-outline" 
              title="Biometric Login" 
              subtitle="Use FaceID or TouchID"
              toggleValue={isBiometricEnabled}
              onToggle={setIsBiometricEnabled}
            />
            <SecurityRow 
              icon="phone-portrait-outline" 
              title="Two-Factor Auth" 
              subtitle="Add an extra layer of security"
              toggleValue={isTwoFactorEnabled}
              onToggle={setIsTwoFactorEnabled}
            />
          </View>
        </View>

        {/* Account Privacy Section */}
        <View className="px-6 mb-8">
          <ThemedText className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ml-1">Data & Privacy</ThemedText>
          <View className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl px-4 border border-slate-100 dark:border-slate-800">
            <SecurityRow 
              icon="eye-off-outline" 
              title="Profile Visibility" 
              subtitle="Control who sees your activity"
              onPress={() => {}} 
            />
            <SecurityRow 
              icon="download-outline" 
              title="Download My Data" 
              subtitle="Get a copy of your info"
              onPress={() => {}} 
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View className="px-6">
          <ThemedText className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2 ml-1">Danger Zone</ThemedText>
          <View className="bg-red-50/30 dark:bg-red-900/10 rounded-3xl px-4 border border-red-100 dark:border-red-900/20">
            <SecurityRow 
              icon="trash-outline" 
              title={loading ? "Deleting your account..." : "Delete Account"} 
              subtitle="Please be patient while accounting is being deleted"
              isDestructive={true}
              disabled={loading}
              onPress={handleDeleteAccount} 
            />
          </View>
        </View>

      </ScrollView>
    </ThemedView>
  );
};

export default PrivacySecurityScreen;