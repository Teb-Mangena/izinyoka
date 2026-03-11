import Toast from "react-native-toast-message";
import { create } from "zustand";
import { axiosInstance } from "../config/axios";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface UserImage {
  public_id: string;
  secure_url: string;
}
interface User {
  _id: string;
  name: string;
  surname: string;
  profilePic: UserImage | null;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type ImageDataTypes = {
  uri: string;
  imageType: string;
  fileName: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  authChecked: boolean;

  checkAuth: () => Promise<void>;

  Login: (login: LoginData) => Promise<void>;

  Signup: (signup: SignupData) => Promise<void>;

  Logout: () => Promise<void>;

  editProfileImage: (ImageDataTypes: ImageDataTypes) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  authChecked: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/check-auth");

      set({ user: res.data.user });
    } catch {
      set({ user: null });
    } finally {
      set({ authChecked: true });
    }
  },

  Login: async (login) => {
    try {
      set({ loading: true });

      const res = await axiosInstance.post("/users/login", login);

      set({ user: res.data.user });

      Toast.show({
        type: "success",
        text1: "User logged!",
        text2: res.data.message || "Logged in successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        const message =
          (error as any)?.response?.data?.message || error.message;

        Toast.show({
          type: "error",
          text1: "Failure",
          text2: message,
        });
      } else {
        console.log("error logging in", error);
      }
    } finally {
      set({ loading: false });
    }
  },

  Signup: async (signup) => {
    try {
      set({ loading: true });

      const res = await axiosInstance.post("/users/signup", signup);

      set({ user: res.data.user });

      Toast.show({
        type: "success",
        text1: "Account created!",
        text2: res.data.message || "Account registered successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        const message =
          (error as any)?.response?.data?.message || error.message;

        Toast.show({
          type: "error",
          text1: "Failure",
          text2: message,
        });
      } else {
        console.log("error signing in", error);
      }
    } finally {
      set({ loading: false });
    }
  },

  Logout: async () => {
    try {
      set({ loading: true });

      const res = await axiosInstance.post("/users/logout");

      set({ user: null });

      Toast.show({
        type: "success",
        text1: "Success!",
        text2: res.data.message || "Logged out successfully.",
      });
    } catch (error) {
      if (error instanceof Error) {
        const message =
          (error as any)?.response?.data?.message || error.message;

        Toast.show({
          type: "error",
          text1: "Failure",
          text2: message,
        });
      } else {
        console.log("error logging out", error);
      }
    } finally {
      set({ loading: false });
    }
  },

  editProfileImage: async (ImageData: ImageDataTypes) => {
    try {
      set({ loading: true });

      console.log(ImageData);

      const formData = new FormData();
      formData.append("image", {
        uri: ImageData.uri,
        type: ImageData.imageType,
        name: ImageData.fileName,
      } as any);

      console.log(formData);

      const res = await axiosInstance.patch(
        "/users/edit-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          timeout: 30000,
        },
      );

      if(res.status === 200){
        Toast.show({
          type: "success",
          text1: "Profile updated!",
          text2: "Your profile picture has been changed.",
        });
      }

      set({ user: res.data });

    } catch (error) {
      console.log("Error editing the image", error);
    } finally {
      set({ loading: false });
    }
  },
}));
