import { useState } from "react";
import { Plus, Edit, Calendar } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  dateRange: string;
  status: "Active" | "Paused";
}

export default function Services() {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pricePerDay: "",
    startDate: "",
    endDate: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      title: "7-Day Plant Care Service",
      description: "Complete plant care while you're away",
      pricePerDay: 25,
      dateRange: "Mar 1 - Mar 31, 2026",
      status: "Active",
    },
    {
      id: "2",
      title: "14-Day Plant Care Service",
      description: "Extended care for longer trips",
      pricePerDay: 22,
      dateRange: "Mar 1 - Mar 31, 2026",
      status: "Active",
    },
  ]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.pricePerDay || parseFloat(formData.pricePerDay) <= 0) {
      errors.pricePerDay = "Price must be a positive number";
    }
    if (!formData.startDate || !formData.endDate) {
      errors.dateRange = "Please select valid dates.";
    } else if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      errors.dateRange = "End date must be after start date.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newService: Service = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      pricePerDay: parseFloat(formData.pricePerDay),
      dateRange: `${formData.startDate} - ${formData.endDate}`,
      status: "Active",
    };

    setServices((prev) => [...prev, newService]);
    showToast("Service published successfully.");
    setShowModal(false);
    setFormData({ title: "", description: "", pricePerDay: "", startDate: "", endDate: "" });
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plant Care Services</h1>
          <p className="text-gray-600">Manage your temporary plant care offerings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-orange-500 transition-all">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  service.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                }`}
              >
                {service.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">{service.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4" />
              <span>{service.dateRange}</span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-2xl font-bold text-orange-600">${service.pricePerDay}</p>
                <p className="text-xs text-gray-500">per day</p>
              </div>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Service</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formErrors.title ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.pricePerDay}
                  onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formErrors.pricePerDay ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.pricePerDay && <p className="text-red-500 text-sm mt-1">{formErrors.pricePerDay}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              {formErrors.dateRange && <p className="text-red-500 text-sm">{formErrors.dateRange}</p>}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setFormErrors({});
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Publish Service
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
