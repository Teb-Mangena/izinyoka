interface ReportImage {
  public_id: string;
  secure_url: string;
}

interface AIVerifiedReview {
  feedback: string;
  verified: string;
}

export interface Report {
  _id: string;
  title: string;
  description?: string;
  location: string;
  image: ReportImage;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status?: string;
  AIVerified: AIVerifiedReview;
}