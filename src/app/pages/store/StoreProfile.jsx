import { useState } from "react";
import { Edit, Save, X, MapPin, Phone, Mail, Building } from "lucide-react";

export default function StoreProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    storeName: "Green Haven Plant Store",
    email: "contact@greenhaven.com",
    phone: "+1 (555) 123-4567",
    location: "123 Garden Street, Plant City, CA 90210",
    about: "Premium plant store specializing in indoor plants, outdoor plants, and complete gardening solutions. We provide expert advice and quality products for all your gardening needs.",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.storeName.trim()) {
      newErrors.storeName = "Store name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone format";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      showToast("Profile updated successfully.");
      setIsEditing(false);
    } else {
      showToast("Update failed. Please check highlighted fields.");
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Profile</h1>
        <p className="text-gray-600">Manage your store information</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* Store Logo & Name Header */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-4xl">
            🏪
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className={`text-2xl font-bold w-full px-3 py-2 border rounded-lg ${
                  errors.storeName ? "border-red-500" : "border-gray-300"
                }`}
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{formData.storeName}</h2>
            )}
            {errors.storeName && <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>}
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            {isEditing ? (
              <>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </>
            ) : (
              <p className="text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">{formData.email}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4" />
              Phone
            </label>
            {isEditing ? (
              <>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </>
            ) : (
              <p className="text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">{formData.phone}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </>
            ) : (
              <p className="text-gray-900 px-4 py-2 bg-gray-50 rounded-lg">{formData.location}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4" />
              About Store
            </label>
            {isEditing ? (
              <textarea
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700 px-4 py-2 bg-gray-50 rounded-lg leading-relaxed">{formData.about}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setIsEditing(false);
                setErrors({});
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50 ${
          toast.includes("failed") ? "bg-red-600 text-white" : "bg-gray-900 text-white"
        }`}>
          {toast}
        </div>
      )}
    </div>
  );
}
