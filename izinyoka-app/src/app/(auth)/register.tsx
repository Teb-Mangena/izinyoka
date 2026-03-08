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

import { isValidEmail } from "@/src/utils/emailChecker";
import { isStrongPassword } from "@/src/utils/passwordChecker";
import { useAuthStore } from "@/src/store/useAuthStore";

const Register = () => {
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);

  const { Signup,loading } = useAuthStore();

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !name || !surname) {
      Alert.alert(
        "Required Fields",
        "Please fill in all details to create your account."
      );
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Invalid email", "Please ensure that the email is correct");
      return;
    }
    if (!isStrongPassword(password)) {
      Alert.alert(
        "Password not strong enough",
        "Password must have at least 6 characters, uppercase, number, and symbol."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    Signup({ name, surname, email, password });

    console.log("User created", { name, surname, email, password })

  };

  return (
    <ThemedView safe={true} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 px-6 pt-6 pb-12">
              {/* HEADER */}
              <View className="items-center mb-8">
                <ThemedView className="bg-warning/10 px-3 py-1 rounded-full border border-warning/20 mb-3">
                  <ThemedText className="text-warning font-bold text-[10px] uppercase tracking-widest">
                    Create Official Account
                  </ThemedText>
                </ThemedView>
                <ThemedText
                  title
                  className="text-2xl font-black text-primary uppercase"
                >
                  Join <ThemedText className="text-warning">Tracker</ThemedText>
                </ThemedText>
                <ThemedText className="text-muted-foreground text-center mt-2">
                  Register to start reporting utility issues in your community.
                </ThemedText>
              </View>

              {/* FORM */}
              <View className="gap-y-4">
                <View>
                  <ThemedText className="mb-2 ml-1 font-semibold text-sm">
                    First Name
                  </ThemedText>
                  <ThemedTextInput
                    placeholder="John"
                    className="rounded-2xl"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View>
                  <ThemedText className="mb-2 ml-1 font-semibold text-sm">
                    Surname
                  </ThemedText>
                  <ThemedTextInput
                    placeholder="Doe"
                    className="rounded-2xl"
                    value={surname}
                    onChangeText={setSurname}
                  />
                </View>

                <View>
                  <ThemedText className="mb-2 ml-1 font-semibold text-sm">
                    Email Address
                  </ThemedText>
                  <ThemedTextInput
                    placeholder="name@example.com"
                    className="rounded-2xl"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View>
                  <ThemedText className="mb-2 ml-1 font-semibold text-sm">
                    Password
                  </ThemedText>
                  <View className="justify-center">
                    <ThemedTextInput
                      placeholder="Create a strong password"
                      className="rounded-2xl"
                      secureTextEntry={isSecure}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setIsSecure(!isSecure)}
                      className="absolute right-5"
                    >
                      <ThemedIcon
                        name={isSecure ? "eye-outline" : "eye-off-outline"}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <ThemedText className="mb-2 ml-1 font-semibold text-sm">
                    Confirm Password
                  </ThemedText>
                  <ThemedTextInput
                    placeholder="Repeat password"
                    className="rounded-2xl"
                    secureTextEntry={isSecure}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>
              </View>

              {/* BUTTONS */}
              <View className="mt-10">
                <ThemedButton
                  onPress={handleRegister}
                  disabled={loading}
                  className="bg-primary py-4 rounded-2xl items-center shadow-sm"
                >
                  {loading ? (
                    <ThemedLoader size="small" />
                  ) : (
                    <ThemedText className="text-white font-bold text-lg">
                      Create Account
                    </ThemedText>
                  )}
                </ThemedButton>

                <TouchableOpacity
                  onPress={() => router.back()}
                  className="mt-6 self-center"
                >
                  <ThemedText className="text-muted-foreground">
                    Already have an account?{" "}
                    <ThemedText className="text-primary font-bold">
                      Log In
                    </ThemedText>
                  </ThemedText>
                </TouchableOpacity>

                <Spacer height={15} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default Register;
