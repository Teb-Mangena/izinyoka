import { create } from "zustand";
import { axiosInstance } from "../config/axios";
import axios from "axios";
import toast from "react-hot-toast";

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
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type AuthState = {
  user: User | null;
  users: User[];
  loading: boolean;
  authChecked: boolean;

  checkAuth: () => Promise<void>;
  login: (login: LoginData) => Promise<void>;
  signup: (signup: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  adminGetUsers: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  users: [],
  loading: false,
  authChecked: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/check-auth");
      set({ user: res.data.user });
    } catch (error) {
      set({ user: null });
      console.log("Auth check failed", error);
    } finally {
      set({ authChecked: true });
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/users/login", loginData);
      set({ user: res.data.user });
      toast.success(res.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Unexpected error during login");
      }
    } finally {
      set({ loading: false });
    }
  },

  signup: async (signupData) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/users/signup", signupData);
      set({ user: res.data.user });
      toast.success(res.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Signup failed");
      } else {
        toast.error("Unexpected error during signup");
      }
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/users/logout");
      set({ user: null });
      toast.success(res.data.message);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Logout failed");
      } else {
        toast.error("Unexpected error during logout");
      }
    } finally {
      set({ loading: false });
    }
  },

  adminGetUsers: async () => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get('/users');

      set({ users: res.data });

    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

}));
