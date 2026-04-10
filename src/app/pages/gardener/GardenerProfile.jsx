import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

export default function GardenerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "John Gardener",
    email: "john.gardener@example.com",
    phone: "+1 (555) 123-4567",
    password: "",
    confirmPassword: "",
    notifications: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
  };

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation (only if changing password)
    if (formData.password) {
      if (!validatePassword(formData.password)) {
        newErrors.password = "Password must be at least 8 characters with uppercase, lowercase, and number";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save changes (mock)
    setIsEditing(false);
    showToast("Profile updated successfully.");
    
    // Clear password fields
    setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/gardener"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="w-24 h-24 bg-[#4CAF50] rounded-full flex items-center justify-center text-white text-3xl font-semibold">
            {formData.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{formData.name}</h3>
            <p className="text-gray-600 mb-3">Home Gardener</p>
            {isEditing && (
              <button className="text-sm text-[#4CAF50] hover:text-[#45a049] font-medium">
                Change Photo
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                !isEditing ? "bg-gray-50 text-gray-600" : ""
              }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                !isEditing ? "bg-gray-50 text-gray-600 border-gray-300" : errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                !isEditing ? "bg-gray-50 text-gray-600 border-gray-300" : errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {isEditing && (
            <>
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password (leave blank to keep current)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter new password"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                      errors.password ? "border-red-500" : "border-gray-300"
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  placeholder="Confirm new password"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </>
          )}

          {/* Notifications */}
          <div className="pt-6 border-t border-gray-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.notifications}
                onChange={(e) => handleInputChange("notifications", e.target.checked)}
                disabled={!isEditing}
                className={`mt-1 w-5 h-5 text-[#4CAF50] border-gray-300 rounded focus:ring-[#4CAF50] ${
                  !isEditing ? "opacity-60" : ""
                }`}
              />
              <div>
                <span className="font-medium text-gray-900">Email Notifications</span>
                <p className="text-sm text-gray-600">Receive updates about your plants, questions, and services</p>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-6">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setErrors({});
                  // Reset form (in real app, fetch from server)
                }}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
          <Link
            to="/gardener/delete-account"
            className="inline-flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Delete Account
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
