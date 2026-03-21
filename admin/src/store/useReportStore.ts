import { create } from "zustand";
import { axiosInstance } from "../config/axios";

export interface ImageType {
  public_id: string;
  secure_url: string;
}

interface AIDetailsType {
  feedback: string;
  verified: boolean;
}

interface ReportType {
  image: ImageType;
  AIVerified: AIDetailsType;
  _id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ReportState {
  reports: ReportType[];
  report: ReportType | null;
  loading: boolean;

  getAllReports: () => Promise<void>;
  getAReport: (id:string) => Promise<void>;
}

export const useReportStore = create<ReportState>((set) => ({
  reports: [],
  report: null,
  loading: false,

  getAllReports: async () => {
    try {
      set({ loading: true });
      
      const res = await axiosInstance.get('/reports');

      set({ reports: res.data });
    } catch (error) {
      console.log("Error loading all reports", error);
    } finally {
      set({ loading: false });
    }
  },

  getAReport: async (id) => {
    try {
      set({ loading: true });
      
      const res = await axiosInstance.get('/reports/'+id);

      set({ report: res.data });

    } catch (error) {
      console.log("Error getting report", error);
    } finally {
      set({ loading: false });
    }
  },

}));