import { Link } from "react-router";
import { Smartphone, QrCode, Zap, Shield, Users, ArrowRight } from "lucide-react";

function UnauthorizedPage() {

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Izinyoka Tracker
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Help us combat illegal electricity connections. Report, verify, and track incidents with the power of AI.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: App description and features */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Join the fight against <span className="text-blue-600">izinyoka</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Our platform empowers communities to report illegal connections quickly and accurately. 
              Using advanced AI, we verify uploaded images and provide instant feedback. 
              All reports are reviewed by administrators to ensure proper action.
            </p>

            {/* Feature list */}
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 text-blue-600">
                  <Zap className="h-6 w-6" />
                </div>
                <p className="ml-4 text-gray-700">
                  <span className="font-semibold">Report illegal connections</span> - Capture and submit photos of suspected izinyoka.
                </p>
              </div>
              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 text-blue-600">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-4 text-gray-700">
                  <span className="font-semibold">AI verification</span> - Our AI analyzes images to detect anomalies and provides immediate feedback.
                </p>
              </div>
              <div className="flex items-start">
                <div className="shrink-0 h-6 w-6 text-blue-600">
                  <Users className="h-6 w-6" />
                </div>
                <p className="ml-4 text-gray-700">
                  <span className="font-semibold">Admin review</span> - Verified reports are reviewed by administrators for final action.
                </p>
              </div>
            </div>

            {/* Call to action for web users */}
            <div className="mt-10">
              <p className="text-gray-600 mb-4">
                Already have an account? Log in to access your dashboard.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  Log in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/sign-up"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>

          {/* Right column: QR code for mobile app */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Get the mobile app
            </h3>
            <p className="text-gray-600 mb-6">
              Report on the go. Scan the QR code to download.
            </p>

            {/* QR Code Placeholder */}
            <div className="flex justify-center mb-6">
            </div>

            <p className="text-sm text-gray-500 flex items-center justify-center">
              <QrCode className="h-4 w-4 mr-1" />
              Available on Android and iOS
            </p>

            {/* Optional: Store badges (could be images) */}
            <div className="mt-6 flex justify-center space-x-2 text-xs text-gray-400">
              <span className="px-2 py-1 bg-gray-100 rounded">App Store</span>
              <span className="px-2 py-1 bg-gray-100 rounded">Google Play</span>
            </div>
          </div>
        </div>

        {/* Additional info: why unauthorized? */}
        <div className="mt-16 text-center border-t border-gray-200 pt-8">
          <p className="text-gray-500">
            ⚠️ You are seeing this page because you tried to access a protected area. 
            Please log in or download the app to start reporting.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;