import { useEffect } from "react";
import { useReportStore } from "../../store/useReportStore";
import PageLoader from "../../components/PageLoader";
import { 
  MapPin, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  MessageSquare,
  Image as ImageIcon 
} from "lucide-react";
import { useNavigate } from "react-router";

function AllReports() {
  const { getAllReports, loading, reports } = useReportStore();
  const navigate = useNavigate();

  useEffect(() => {
    getAllReports();
  }, [getAllReports]);

  if (loading) return <PageLoader />;

  console.log(reports);

  // Helper to get status badge styling
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

  // Helper to format date (if date-fns not installed, use toLocaleDateString)
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Reports</h1>
          <p className="text-gray-600 mt-1">
            View all submitted reports and their AI verification results.
          </p>
        </div>

        {/* Reports Grid */}
        {reports?.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="flex justify-center mb-4">
              <MessageSquare className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500">There are no reports to display at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports?.map((report) => (
              <div key={report._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition border border-gray-100">
                {/* Image */}
                <div className="aspect-video bg-gray-100 relative">
                  {report.image?.secure_url ? (
                    <img
                      src={report.image.secure_url}
                      alt={report.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  {/* Status badge overlay (optional) */}
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(report.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {report.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {report.description}
                  </p>

                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    Posted by : <span className="truncate">{report.userId?.name} {" "} {report.userId?.surname}</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{report.location}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(report.createdAt)}</span>
                  </div>

                  {/* View Details Button */}
                  <div className="mt-4">
                    <button onClick={() => navigate('/report/' + report._id)} className="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllReports;