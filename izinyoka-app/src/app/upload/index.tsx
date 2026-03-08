import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
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

import ThemedButton from "@/src/components/themes/ThemedButton";
import ThemedIcon from "@/src/components/themes/ThemedIcon";
import ThemedLoader from "@/src/components/themes/ThemedLoader";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedTextInput from "@/src/components/themes/ThemedTextInput";
import ThemedView from "@/src/components/themes/ThemedView";

const MediaUploads = () => {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmitReport = async () => {
    if (!image || !title || !location) {
      Alert.alert(
        "Missing Info",
        "Please provide a photo, title, and location.",
      );
      return;
    }

    setIsSubmitting(true);
    // Simulate API upload
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Success",
        "Report submitted successfully. Thank you for keeping the grid safe!",
      );
      // Reset form
      setImage(null);
      setTitle("");
      setLocation("");
      setDescription("");
    }, 2500);
  };

  return (
    <ThemedView safe={true} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            className="px-6"
          >
            <View className="flex-1 pt-4 pb-10">
              {/* HEADER */}
              <View className="mb-6">
                <ThemedText title className="text-2xl font-black text-primary">
                  NEW <ThemedText className="text-warning">REPORT</ThemedText>
                </ThemedText>
                <ThemedText className="text-muted-foreground">
                  Provide clear evidence of the illegal connection.
                </ThemedText>
              </View>

              {/* MEDIA SECTION */}
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.8}
                className="w-full h-56 rounded-3xl border-2 border-dashed border-primary/20 bg-primary/5 items-center justify-center overflow-hidden mb-6"
              >
                {image ? (
                  <View className="w-full h-full">
                    <Image
                      source={{ uri: image }}
                      style={{ width: "100%", height: "100%" }}
                      contentFit="cover"
                    />
                    <View className="absolute bottom-3 right-3 bg-black/50 p-2 rounded-full">
                      <ThemedIcon name="camera-outline" size={20} />
                    </View>
                  </View>
                ) : (
                  <View className="items-center">
                    <View className="bg-primary/10 p-4 rounded-full mb-2">
                      <ThemedIcon
                        name="cloud-upload-outline"
                        size={40}
                        className="text-primary"
                      />
                    </View>
                    <ThemedText className="font-bold text-primary">
                      Upload Evidence Photo
                    </ThemedText>
                    <ThemedText className="text-xs text-muted-foreground mt-1">
                      Tap to browse gallery
                    </ThemedText>
                  </View>
                )}
              </TouchableOpacity>

              {/* FORM SECTION */}
              <View className="gap-4">
                <View>
                  <ThemedText className="mb-2 ml-1 font-semibold text-sm">
                    Issue Title
                  </ThemedText>
                  <ThemedTextInput
                    placeholder="e.g. Exposed wires on main pole"
                    className="rounded-2xl"
                    value={title}
                    onChangeText={setTitle}
                  />
                </View>

                <View>
                  <ThemedText className="mb-2 ml-1 font-semibold text-sm">
                    Location / Landmark
                  </ThemedText>
                  <View className="flex-row items-center">
                    <ThemedTextInput
                      placeholder="e.g. Corner of 5th & Smith St"
                      className="rounded-2xl flex-1"
                      value={location}
                      onChangeText={setLocation}
                    />
                    <TouchableOpacity className="absolute right-4">
                      <ThemedIcon
                        name="location-outline"
                        size={20}
                        className="text-primary"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <ThemedText className="mb-2 ml-1 font-semibold text-sm">
                    Additional Details (Optional)
                  </ThemedText>
                  <ThemedTextInput
                    placeholder="Describe what you see..."
                    className="rounded-2xl h-24 pt-4"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>

                <ThemedButton
                  onPress={handleSubmitReport}
                  disabled={isSubmitting}
                  className="bg-primary py-4 rounded-2xl flex-row items-center justify-center gap-3 mt-4"
                >
                  {isSubmitting ? (
                    <ThemedLoader size="small" />
                  ) : (
                    <>
                      <ThemedIcon name="paper-plane-outline" size={20} />
                      <ThemedText className="text-white font-bold text-lg">
                        Submit Report
                      </ThemedText>
                    </>
                  )}
                </ThemedButton>

                <ThemedText className="text-center text-[10px] text-muted-foreground uppercase tracking-tighter mt-4">
                  Privacy Note: Your identity remains anonymous to the public.
                </ThemedText>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default MediaUploads;
