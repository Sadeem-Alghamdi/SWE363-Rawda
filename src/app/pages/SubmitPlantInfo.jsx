import { Button } from "../components/ui/Button";
import { UploadCloud, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function SubmitPlantInfo() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in duration-500">
        <CheckCircle className="text-green-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
        <p className="text-gray-500 mb-6 text-center">Your plant information has been submitted for review.</p>
        <Button onClick={() => setSubmitted(false)} className="bg-[#4CAF50] text-white">Submit Another</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Submit Plant Information</h1>
          <p className="text-gray-500 mt-1">Help expand the Rawda plant database.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Common Name</label>
            <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500" placeholder="e.g. Snake Plant" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Scientific Name</label>
            <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500" placeholder="e.g. Sansevieria trifasciata" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Plant Type</label>
            <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 bg-white">
              <option>Select...</option>
              <option>Succulent</option>
              <option>Tree</option>
              <option>Shrub</option>
              <option>Flower</option>
              <option>Vegetable</option>
            </select>
          </div>
           <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Hardiness Zone</label>
            <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500" placeholder="e.g. 9-11" />
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-100 pt-6">
           <h3 className="font-semibold text-gray-900">Care Requirements</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Light</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 bg-white">
                  <option>Select...</option>
                  <option>Full Sun</option>
                  <option>Partial Shade</option>
                  <option>Full Shade</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Water</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 bg-white">
                  <option>Select...</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Soil</label>
                <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 bg-white">
                  <option>Select...</option>
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
          <textarea className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 min-h-[150px]" placeholder="Add any special care instructions, history, or unique features..."></textarea>
        </div>

        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer group">
           <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
             <UploadCloud className="text-green-500" />
           </div>
           <p className="text-gray-900 font-medium mb-1">Upload Plant Images</p>
           <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
        </div>

        <div className="flex justify-end pt-4">
           <Button onClick={() => setSubmitted(true)} className="bg-[#4CAF50] text-white px-8">Submit Plant Info</Button>
        </div>
      </div>
    </div>
  );
}