import { Link } from "react-router";

export default function AccountDeleted() {
  return (
    <div className="min-h-screen bg-[#E8F5E9] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✓</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">Account Deleted Successfully</h1>
        <p className="text-gray-600 mb-8">
          Your account and all associated data have been permanently deleted. We're sorry to see you go!
        </p>
        <p className="text-sm text-gray-500 mb-6">
          If you change your mind, you're always welcome to create a new account and rejoin the Rawda community.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}


