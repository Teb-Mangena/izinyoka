import { useState, useEffect } from "react";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Users, 
  Eye, 
  Check, 
  XCircle,
  TrendingUp,
  Filter
} from "lucide-react";
import { Link } from "react-router";

function AdminDashboard() {
  // Mock data for stats
  const [stats, setStats] = useState({
    totalReports: 245,
    pendingReview: 32,
    verified: 178,
    users: 1240,
  });

  // Mock data for recent reports
  const [reports, setReports] = useState([
    { id: "REP-001", location: "Makhanda, Eastern Cape", status: "pending", date: "2025-03-20" },
    { id: "REP-002", location: "Port Elizabeth, Eastern Cape", status: "verified", date: "2025-03-19" },
    { id: "REP-003", location: "East London, Eastern Cape", status: "pending", date: "2025-03-18" },
    { id: "REP-004", location: "Queenstown, Eastern Cape", status: "verified", date: "2025-03-17" },
    { id: "REP-005", location: "Grahamstown, Eastern Cape", status: "rejected", date: "2025-03-16" },
  ]);

  // Mock chart data (reports per day)
  const chartData = [
    { day: "Mon", count: 12 },
    { day: "Tue", count: 19 },
    { day: "Wed", count: 15 },
    { day: "Thu", count: 27 },
    { day: "Fri", count: 24 },
    { day: "Sat", count: 10 },
    { day: "Sun", count: 8 },
  ];

  const maxCount = Math.max(...chartData.map(d => d.count));

  // Simulate data loading
  useEffect(() => {
    // In a real app, you would fetch data from API here
    console.log("Admin dashboard loaded");
  }, []);

  const getStatusBadge = (status) => {
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of reports and system activity</p>
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
                <p className="text-2xl font-semibold text-gray-900">{stats.totalReports}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingReview}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Verified Reports</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.verified}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Users</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.users}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Recent Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Reports This Week</h2>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {chartData.map((item) => (
                <div key={item.day} className="flex items-center">
                  <span className="w-12 text-sm text-gray-600">{item.day}</span>
                  <div className="flex-1 ml-4">
                    <div
                      className="bg-blue-600 h-8 rounded-md"
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-4 text-sm text-gray-700">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports Table */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Reports</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <Filter className="h-4 w-4 mr-1" /> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{report.location}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{getStatusBadge(report.status)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-2" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 mr-2" title="Verify">
                          <Check className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800" title="Reject">
                          <XCircle className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link to="/all-reports" className="text-sm text-blue-600 hover:text-blue-800">View all reports →</Link>
            </div>
          </div>
        </div>

        {/* Optional Additional Section: Pending Reports Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pending Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.filter(r => r.status === "pending").map(report => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{report.id}</p>
                  <p className="text-sm text-gray-500">{report.location}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">Verify</button>
                  <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;