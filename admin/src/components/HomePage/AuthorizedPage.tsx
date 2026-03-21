import { useState } from "react";
import { Link } from "react-router";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  Eye,
  Trash2,
  Filter
} from "lucide-react";

function AuthorizedPage() {
  // Mock user data (in real app, get from auth context)
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  // Mock reports data for the current user
  const [reports, setReports] = useState([
    {
      id: "REP-001",
      location: "Makhanda, Eastern Cape",
      description: "Suspected illegal connection near the substation",
      status: "pending",
      date: "2025-03-20",
    },
    {
      id: "REP-002",
      location: "Port Elizabeth, Eastern Cape",
      description: "Visible wires crossing the road",
      status: "verified",
      date: "2025-03-18",
    },
    {
      id: "REP-003",
      location: "East London, Eastern Cape",
      description: "Meter tampering observed",
      status: "rejected",
      date: "2025-03-15",
    },
    {
      id: "REP-004",
      location: "Queenstown, Eastern Cape",
      description: "Illegal connection in backyard",
      status: "verified",
      date: "2025-03-12",
    },
    {
      id: "REP-005",
      location: "Grahamstown, Eastern Cape",
      description: "Unusual cable hanging",
      status: "pending",
      date: "2025-03-10",
    },
  ]);

  // Computed stats
  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === "pending").length,
    verified: reports.filter(r => r.status === "verified").length,
    rejected: reports.filter(r => r.status === "rejected").length,
  };

  // Handle delete (mock)
  const handleDelete = (id:string) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports(reports.filter(r => r.id !== id));
    }
  };

  // Get status badge component
  const getStatusBadge = (status:string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </span>
        );
      case "verified":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" /> Verified
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

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
          </div>
          <Link
            to="/report/new"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Report
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Reports</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Verified</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.verified}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <XCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">My Reports</h2>
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <p>You haven't submitted any reports yet.</p>
                      <Link
                        to="/report/new"
                        className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Create your first report
                      </Link>
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{report.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(report.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-3" title="View Details">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {reports.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 text-right">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View all reports →</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthorizedPage;