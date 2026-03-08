import { Image } from "expo-image";
import { useRouter } from "expo-router";
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

import Spacer from "@/src/components/themes/Spacer";
import ThemedButton from "@/src/components/themes/ThemedButton";
import ThemedIcon from "@/src/components/themes/ThemedIcon";
import ThemedLoader from "@/src/components/themes/ThemedLoader";
import ThemedText from "@/src/components/themes/ThemedText";
import ThemedTextInput from "@/src/components/themes/ThemedTextInput";
import ThemedView from "@/src/components/themes/ThemedView";
import { useAuthStore } from "@/src/store/useAuthStore";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSecure, setIsSecure] = useState(true);
  const router = useRouter();

  const {Login} = useAuthStore();

  const handleSecurePass = () => {
    setIsSecure(!isSecure);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please ensure that all fields are filled");
      return;
    }

    setIsLoading(true);
    try {
      Login({email, password});
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView safe={true} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            className="flex-1"
          >
            {/* Main Content Wrapper */}
            <View className="flex-1 pt-4 pb-8">
              {/* 1. BRANDING HEADER */}
              <View className="items-center">
                <View className="bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-4">
                  <ThemedText className="text-primary font-bold text-xs uppercase tracking-[3px]">
                    South Africa • Utility Support
                  </ThemedText>
                </View>

                <ThemedText
                  title={true}
                  className="text-3xl font-black text-primary uppercase tracking-tighter"
                >
                  Izinyoka{" "}
                  <ThemedText className="text-warning">Tracker</ThemedText>
                </ThemedText>
                <View className="h-1 w-12 bg-warning mt-1 rounded-full" />
              </View>

              {/* 2. ILLUSTRATION SECTION */}
              <View className="items-center justify-center relative my-10">
                <View className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <View className="p-4 rounded-full border border-primary/5 bg-uiBackground/50">
                  <Image
                    source={require("@/assets/images/elec-bro.png")}
                    style={{ height: 180, width: 180 }}
                    contentFit="contain"
                  />
                </View>
              </View>

              {/* 3. INPUTS & ACTIONS */}
              <View className="flex-1">
                <View className="mb-6 items-center">
                  <ThemedText className="text-2xl font-bold text-center leading-tight">
                    Report Illegal Connections{"\n"}
                    <ThemedText className="text-primary italic">
                      Securely & Seamlessly
                    </ThemedText>
                  </ThemedText>
                </View>

                <View className="flex-col gap-4 mx-5">
                  <ThemedText
                    title={true}
                    className="text-lg font-bold text-center"
                  >
                    Log in to your account
                  </ThemedText>

                  <ThemedTextInput
                    placeholder="Enter your email"
                    className="rounded-2xl"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    value={email}
                    onChangeText={setEmail}
                  />

                  <View className="justify-center">
                    <ThemedTextInput
                      placeholder="Enter your password"
                      className="rounded-2xl"
                      autoCapitalize="none"
                      autoComplete="password"
                      secureTextEntry={isSecure}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={handleSecurePass}
                      className="absolute right-5"
                    >
                      <ThemedIcon
                        name={isSecure ? "eye-outline" : "eye-off-outline"}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  <ThemedButton
                    className="flex-row items-center justify-center gap-3 bg-primary py-4 rounded-2xl active:opacity-80"
                    onPress={handleLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ThemedLoader size={"small"} />
                    ) : (
                      <>
                        <ThemedIcon name="log-in-outline" size={22} />
                        <ThemedText className="font-bold text-base text-white">
                          Log in
                        </ThemedText>
                      </>
                    )}
                  </ThemedButton>
                </View>

                {/* FOOTER LINKS */}
                <View className="mt-8">
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/register")}
                    className="self-center"
                  >
                    <ThemedText className="text-muted-foreground">
                      Don{"'"}t have an account?{" "}
                      <ThemedText className="text-primary font-bold">
                        Sign up
                      </ThemedText>
                    </ThemedText>
                  </TouchableOpacity>

                  <ThemedText className="text-center mt-6 text-[10px] text-muted-foreground px-10 uppercase tracking-tight">
                    By continuing, you agree to report accurately and respect
                    municipal bylaws.
                  </ThemedText>

                  <Spacer height={15} />
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default Signin;
