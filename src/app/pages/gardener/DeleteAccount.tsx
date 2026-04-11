import { useState } from "react";
import { ArrowLeft, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteRequest = () => {
    setError("");
    
    if (!password) {
      setError("Please enter your password to confirm");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would delete the account and logout
      navigate("/gardener/account-deleted");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/gardener/profile"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Profile</span>
      </Link>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Delete Account</h1>
        </div>
        <p className="text-gray-600">This action cannot be undone</p>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-red-900 mb-3">⚠️ Warning: Permanent Data Deletion</h3>
        <p className="text-red-800 mb-4">
          Deleting your account will permanently remove:
        </p>
        <ul className="space-y-2 text-red-800 mb-4">
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1">•</span>
            <span>Your profile information and account settings</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1">•</span>
            <span>All your saved plants and plant care history</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1">•</span>
            <span>Your questions, answers, and forum activity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1">•</span>
            <span>Saved guides and bookmarked content</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 mt-1">•</span>
            <span>Service booking history and reviews</span>
          </li>
        </ul>
        <p className="text-red-900 font-medium">
          This action is irreversible. Your data cannot be recovered once deleted.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Account Deletion</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your password to confirm <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <div className="text-sm">
              <span className="font-medium text-gray-900">I understand this action is permanent</span>
              <p className="text-gray-600">I acknowledge that all my data will be permanently deleted and cannot be recovered.</p>
            </div>
          </label>
        </div>

        <div className="flex gap-3">
          <Link
            to="/gardener/profile"
            className="flex-1 px-6 py-3 border border-gray-300 text-center rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </Link>
          <button
            onClick={handleDeleteRequest}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Final Confirmation</h3>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you absolutely sure you want to delete your account? This action cannot be undone, and all your data will be permanently lost.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
