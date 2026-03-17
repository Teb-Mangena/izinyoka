import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";

// --- Components & Config ---
import { axiosInstance } from "@/src/config/axios";
import ThemedButton from "@/src/components/themes/ThemedButton";
import ThemedIcon from "@/src/components/themes/ThemedIcon";
import ThemedLoader from "@/src/components/themes/ThemedLoader";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedTextInput from "@/src/components/themes/ThemedTextInput";
import ThemedView from "@/src/components/themes/ThemedView";

const MediaUploads = () => {
  // 1. FORM STATE
  const [image, setImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });

  // 2. API LOGIC (The Mutation)
  const createReportMutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("location", formData.location);
      data.append("description", formData.description);

      if (image) {
        // We cast to 'any' because React Native FormData handles URIs differently than Web
        data.append("image", {
          uri: image,
          type: "image/jpeg",
          name: "report.jpg",
        } as any);
      }

      const res = await axiosInstance.post("/reports", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Success", "Report submitted successfully.");
      resetForm();
    },
    onError: (error: any) => {
      Alert.alert("Error", error?.message || "Failed to submit.");
    },
  });

  // 3. IMAGE HANDLING LOGIC
  const handleImagePick = async (mode: 'camera' | 'library') => {
    const isCamera = mode === 'camera';
    
    // Check Permissions
    const permission = isCamera 
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission denied", `We need access to your ${mode} to continue.`);
      return;
    }

    // Launch Picker
    const result = isCamera 
      ? await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.8 })
      : await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert("Select Evidence Photo", "Choose a source", [
      { text: "Cancel", style: "cancel" },
      { text: "Camera", onPress: () => handleImagePick('camera') },
      { text: "Gallery", onPress: () => handleImagePick('library') },

    ]);
  };

  // 4. HELPER FUNCTIONS
  const resetForm = () => {
    setImage(null);
    setFormData({ title: "", location: "", description: "" });
  };

  const handleSubmit = () => {
    if (!image || !formData.title || !formData.location) {
      return Alert.alert("Missing Info", "Please fill in all required fields.");
    }
    createReportMutation.mutate();
  };

  // 5. RENDER
  return (
    <ThemedView safe className="flex-1">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            className="px-6" 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 pt-4 pb-10">
              
              {/* Header */}
              <HeaderSection />

              {/* Image Uploader */}
              <TouchableOpacity
                onPress={showImageOptions}
                activeOpacity={0.8}
                className="w-full h-56 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 items-center justify-center overflow-hidden mb-6"
              >
                {image ? (
                  <View className="w-full h-full">
                    <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                    <View className="absolute bottom-3 right-3 bg-black/50 p-2 rounded-full">
                      <ThemedIcon name="camera-outline" size={20} />
                    </View>
                  </View>
                ) : (
                  <UploadPlaceholder />
                )}
              </TouchableOpacity>

              {/* Form Inputs */}
              <View className="gap-4">
                <InputField 
                  label="Issue Title" 
                  placeholder="e.g. Exposed wires" 
                  value={formData.title} 
                  onChange={(val:string) => setFormData({...formData, title: val})} 
                />

                <InputField 
                  label="Location / Landmark" 
                  placeholder="e.g. Corner of 5th St" 
                  value={formData.location} 
                  onChange={(val:string) => setFormData({...formData, location: val})}
                  icon="location-outline"
                />

                <InputField 
                  label="Additional Details (Optional)" 
                  placeholder="Describe what you see..." 
                  value={formData.description} 
                  onChange={(val:string) => setFormData({...formData, description: val})}
                  multiline
                />

                <ThemedButton
                  onPress={handleSubmit}
                  disabled={createReportMutation.isPending}
                  className="bg-primary py-4 rounded-2xl flex-row items-center justify-center gap-3 mt-4"
                >
                  {createReportMutation.isPending ? (
                    <ThemedLoader size="small" />
                  ) : (
                    <>
                      <ThemedIcon name="paper-plane-outline" size={20} />
                      <ThemedText className="text-white font-bold text-lg">Submit Report</ThemedText>
                    </>
                  )}
                </ThemedButton>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

// --- SUB-COMPONENTS (Keep the main file clean) ---

const HeaderSection = () => (
  <View className="mb-6">
    <ThemedText title className="text-2xl font-black text-primary">
      NEW <ThemedText className="text-warning">REPORT</ThemedText>
    </ThemedText>
    <ThemedText className="text-muted-foreground">Provide clear evidence of the connection.</ThemedText>
  </View>
);

const UploadPlaceholder = () => (
  <View className="items-center">
    <View className="bg-primary/10 p-4 rounded-full mb-2">
      <ThemedIcon name="cloud-upload-outline" size={40} className="text-primary" />
    </View>
    <ThemedText className="font-bold text-primary">Upload Evidence Photo</ThemedText>
    <ThemedText className="text-xs text-muted-foreground mt-1">Tap to browse gallery</ThemedText>
  </View>
);

const InputField = ({ label, icon, onChange, ...props }: any) => (
  <View>
    <ThemedText className="mb-2 ml-1 font-semibold text-sm">{label}</ThemedText>
    <View className="flex-row items-center">
      <ThemedTextInput 
        className={`rounded-2xl flex-1 ${props.multiline ? "h-24 pt-4" : ""}`} 
        onChangeText={onChange}
        {...props} 
      />
      {icon && (
        <TouchableOpacity className="absolute right-4">
          <ThemedIcon name={icon} size={20} className="text-primary" />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default MediaUploads;