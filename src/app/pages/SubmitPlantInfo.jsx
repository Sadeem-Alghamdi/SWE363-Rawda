import { useState } from "react";
import { Button } from "../components/ui/Button";
import { UploadCloud, CheckCircle } from "lucide-react";

export default function SubmitPlantInfo() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    commonName: "",
    scientificName: "",
    plantType: "",
    zone: "",
    light: "",
    water: "",
    soil: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.commonName.trim()) newErrors.commonName = "Common name is required.";
    if (!formData.plantType) newErrors.plantType = "Please select a plant type.";
    if (!formData.light) newErrors.light = "Please select a light requirement.";
    if (!formData.water) newErrors.water = "Please select a water requirement.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      showToast("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-500">
        <CheckCircle className="text-green-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
        <p className="text-gray-500 mb-6 text-center">Your plant information has been submitted for review.</p>
        <Button onClick={() => { setSubmitted(false); setFormData({ commonName: "", scientificName: "", plantType: "", zone: "", light: "", water: "", soil: "", description: "" }); }} className="bg-[#4CAF50] text-white">
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Submit Plant Information</h1>
        <p className="text-gray-500 mt-1">Help expand the Rawda plant database.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Common Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={formData.commonName}
              onChange={(e) => handleChange("commonName", e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 ${errors.commonName ? "border-red-500" : "border-gray-200"}`}
              placeholder="e.g. Snake Plant"
            />
            {errors.commonName && <p className="text-red-500 text-sm">{errors.commonName}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Scientific Name</label>
            <input
              type="text"
              value={formData.scientificName}
              onChange={(e) => handleChange("scientificName", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500"
              placeholder="e.g. Sansevieria trifasciata"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Plant Type <span className="text-red-500">*</span></label>
            <select
              value={formData.plantType}
              onChange={(e) => handleChange("plantType", e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 bg-white ${errors.plantType ? "border-red-500" : "border-gray-200"}`}
            >
              <option value="">Select...</option>
              <option>Succulent</option>
              <option>Tree</option>
              <option>Shrub</option>
              <option>Flower</option>
              <option>Vegetable</option>
            </select>
            {errors.plantType && <p className="text-red-500 text-sm">{errors.plantType}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Hardiness Zone</label>
            <input
              type="text"
              value={formData.zone}
              onChange={(e) => handleChange("zone", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500"
              placeholder="e.g. 9-11"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900">Care Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Light <span className="text-red-500">*</span></label>
              <select
                value={formData.light}
                onChange={(e) => handleChange("light", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 bg-white ${errors.light ? "border-red-500" : "border-gray-200"}`}
              >
                <option value="">Select...</option>
                <option>Full Sun</option>
                <option>Partial Shade</option>
                <option>Full Shade</option>
              </select>
              {errors.light && <p className="text-red-500 text-sm">{errors.light}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Water <span className="text-red-500">*</span></label>
              <select
                value={formData.water}
                onChange={(e) => handleChange("water", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 bg-white ${errors.water ? "border-red-500" : "border-gray-200"}`}
              >
                <option value="">Select...</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              {errors.water && <p className="text-red-500 text-sm">{errors.water}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Soil</label>
              <select
                value={formData.soil}
                onChange={(e) => handleChange("soil", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 bg-white"
              >
                <option value="">Select...</option>
                <option>Sandy</option>
                <option>Loamy</option>
                <option>Clay</option>
                <option>Well-draining</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description & Notes</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 min-h-[150px]"
            placeholder="Add any special care instructions, history, or unique features..."
          />
        </div>

        <label className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer group flex flex-col items-center">
          <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
            <UploadCloud className="text-green-500" />
          </div>
          <p className="text-gray-900 font-medium mb-1">Upload Plant Images</p>
          <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
          <input type="file" accept="image/*" multiple className="hidden" />
        </label>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit} className="bg-[#4CAF50] text-white px-8">
            Submit Plant Info
          </Button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}