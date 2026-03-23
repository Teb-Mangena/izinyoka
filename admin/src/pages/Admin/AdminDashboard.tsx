import { useEffect } from "react";
import {
  FileText,
  CheckCircle,
  Clock,
  Users,
  Eye,
  Check,
  XCircle,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "../../store/useAuthStore";
import { useReportStore } from "../../store/useReportStore";

type ChartEntry = {
  day: string;
  count: number;
};

function AdminDashboard() {
  const { adminGetUsers, users } = useAuthStore();
  const { getAllReports, reports: reps } = useReportStore();

  useEffect(() => {
    adminGetUsers();
    getAllReports();
  }, [adminGetUsers, getAllReports]);

  const PendingStatus = reps.filter((s) => s.status === "pending");
  const VerifiedStatus = reps.filter((s) => s.status === "verified");

  console.log(PendingStatus);

  const stats = {
    totalReports: reps.length,
    pendingReview: PendingStatus.length,
    verified: VerifiedStatus.length,
    users: users.length,
  };

  const reports = reps.slice(0, 5);
  const pendingReports = reps.slice(0, 10);

  // Get start of current week (Monday)
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday as start
  startOfWeek.setHours(0, 0, 0, 0);

  // Filter reports to only those created this week
  const reportsThisWeek = reps.filter((report) => {
    const created = new Date(report.createdAt);
    return created >= startOfWeek && created <= now;
  });

  // Count by weekday
  const countsByDay: Record<string, number> = reportsThisWeek.reduce(
    (acc, report) => {
      const day = new Date(report.createdAt).toLocaleDateString("en-US", {
        weekday: "short",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Build chart data in weekday order
  const weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const chartData: ChartEntry[] = weekdays.map((day) => ({
    day,
    count: countsByDay[day] || 0,
  }));

  const maxCount = Math.max(...chartData.map((d) => d.count));

  const getStatusBadge = (status: string) => {
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
          <p className="text-gray-600 mt-1">
            Overview of reports and system activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <Link to="/all-reports">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Reports
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.totalReports}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <Link to="/pending-reports">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Pending Review
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.pendingReview}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <Link to="/verified-reports">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Verified Reports
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.verified}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <Link to="/user-management">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <Users className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Users</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {stats.users}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Chart and Recent Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Chart */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Reports This Week
              </h2>
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
                  <span className="ml-4 text-sm text-gray-700">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports Table */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Reports
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <Filter className="h-4 w-4 mr-1" /> Filter
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report._id.slice(-5)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {report.location}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getStatusBadge(report.status)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {report.createdAt}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button
                          className="text-blue-600 hover:text-blue-800 mr-2"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-800 mr-2"
                          title="Verify"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link
                to="/all-reports"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all reports →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
          <div className="flex-col py-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Pending Reports
            </h2>
            <p className="text-sm text-slate-500">
              Only showing first {pendingReports.length} reports
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingReports
              .filter((r) => r.status === "pending")
              .map((report) => (
                <div
                  key={report._id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-center"
                >
                  <div className="flex-col space-y-1.5">
                    <p className="font-semibold text-gray-900 uppercase">
                      {report.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      #{report._id.slice(-4)} • {report.location}
                    </p>
                    <p
                      className={`text-xs mt-1 ${report.AIVerified?.verified ? "text-green-600" : "text-red-500"}`}
                    >
                      {report.AIVerified?.verified
                        ? "AI-Verified"
                        : "Not AI-Verified"}
                    </p>

                    <p className="text-xs text-green-600 mt-1">
                      {getStatusBadge(report.status)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                      Verify
                    </button>
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                      Reject
                    </button>
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
