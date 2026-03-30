import { useEffect, useState } from "react";
import { useReportStore } from "../../store/useReportStore";
import PageLoader from "../../components/PageLoader";
import {
  MapPin,
  Calendar,
  XCircle,
  Eye,
  Search,
  Filter,
  Image as ImageIcon,
  MessageSquare,
  Trash2,
  RefreshCw
} from "lucide-react";

function RejectedReports() {
  const { getAllReports, reports, loading } = useReportStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  useEffect(() => {
    getAllReports();
  }, [getAllReports]);

  const rejectedReports = reports.filter(
    (report) => report.status === "rejected"
  );

  // Filter by search term (title or description) and location
  const filteredReports = rejectedReports.filter((report) => {
    const matchesSearch =
      searchTerm === "" ||
      report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      filterLocation === "" ||
      report.location?.toLowerCase().includes(filterLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Placeholder actions – you can replace these with your own logic
  const handleViewDetails = (id: string) => {
    console.log("View details for rejected report:", id);
    // TODO: navigate to details page
  };

  const handleDelete = (id: string) => {
    console.log("Delete rejected report with id:", id);
    // TODO: implement delete functionality
  };

  const handleReconsider = (id: string) => {
    console.log("Reconsider report (mark as pending) with id:", id);
    // TODO: implement status update to "pending"
  };

  if (loading) return <PageLoader />;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Rejected Reports</h1>
          <p className="text-gray-600 mt-1">
            Reports that were rejected after review. You can reconsider or permanently delete them.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or description..."
              className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-64">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by location..."
              className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Reports Grid */}
        {filteredReports.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="flex justify-center mb-4">
              <MessageSquare className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rejected reports</h3>
            <p className="text-gray-500">
              {searchTerm || filterLocation
                ? "No reports match your search criteria."
                : "All reports have been processed."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition border border-gray-100"
              >
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
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" /> Rejected
                    </span>
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

                  {/* AI Verification Feedback (if any) */}
                  {report.AIVerified && (
                    <div className="mt-3 p-2 rounded-md text-xs bg-gray-50 text-gray-600 border border-gray-200">
                      <div className="flex items-start">
                        <XCircle className="h-3 w-3 mr-1 mt-0.5 text-red-500 shrink-0" />
                        <span>
                          {report.AIVerified.feedback || "No AI feedback provided."}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleReconsider(report._id)}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Reconsider
                    </button>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewDetails(report._id)}
                      className="p-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
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

export default RejectedReports;