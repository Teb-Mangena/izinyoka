import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useReportStore } from "../../store/useReportStore";
import PageLoader from "../../components/PageLoader";
import {
  MapPin,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft,
  Edit,
  Trash2,
} from "lucide-react";

function ReportDetails() {
  const { loading, getAReport, report } = useReportStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAReport(id);
    }
  }, [getAReport, id]);

  if (loading) return <PageLoader />;

  if (!report) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-6">
            The report you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Link
            to="/all-reports"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  // Helper for status badge
  const getStatusBadge = (status: string) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "verified":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Verified
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/all-reports"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reports
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header with Title and Status */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <h1 className="text-2xl font-bold text-gray-900">{report.title}</h1>
              {getStatusBadge(report.status)}
            </div>
          </div>

          {/* Image Section */}
          <div className="border-b border-gray-100">
            {report.image?.secure_url ? (
              <div className="aspect-video bg-gray-100">
                <img
                  src={report.image.secure_url}
                  alt={report.title}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-500">No image uploaded</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{report.description}</p>
            </div>

            {/* Location & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{report.location}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Submitted</h3>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{formatDate(report.createdAt)}</span>
                </div>
              </div>
            </div>

            {/* AI Verification Feedback */}
            {report.AIVerified && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">AI Verification</h3>
                <div
                  className={`p-4 rounded-md ${
                    report.AIVerified.verified
                      ? "bg-green-50 border border-green-200"
                      : "bg-yellow-50 border border-yellow-200"
                  }`}
                >
                  <div className="flex items-start">
                    {report.AIVerified.verified ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {report.AIVerified.verified ? "Verified by AI" : "Flagged by AI"}
                      </p>
                      <p className="text-gray-700 mt-1">
                        {report.AIVerified.feedback || "No additional feedback provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Optional: Last Updated */}
            {report.updatedAt !== report.createdAt && (
              <div className="text-xs text-gray-400 mt-2">
                Last updated: {formatDate(report.updatedAt)}
              </div>
            )}

            {/* Action Buttons (if needed) */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetails;