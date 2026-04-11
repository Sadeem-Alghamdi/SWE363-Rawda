import { useNavigate } from "react-router";
import { Button } from "../components/ui/Button";
import { ArrowLeft, UploadCloud, FileText, Image, Save, X } from "lucide-react";

export default function CreateGuide() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="text-gray-500 hover:text-gray-900 pl-0 hover:bg-transparent"
      >
        <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
      </Button>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create New Guide</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-gray-500 hover:text-gray-900">
                <Save size={18} className="mr-2" /> Save Draft
              </Button>
              <Button className="bg-[#4CAF50] hover:bg-[#43A047] text-white">
                Publish Guide
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="guide-title" className="block text-sm font-medium text-gray-700">Guide Title</label>
              <input 
                id="guide-title"
                type="text" 
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all text-xl font-medium placeholder:text-gray-400"
                placeholder="e.g., How to Prune Tomato Plants for Better Yields"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select 
                  id="category" 
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="Vegetable Gardening">Vegetable Gardening</option>
                  <option value="Indoor Plants">Indoor Plants</option>
                  <option value="Flowers & Ornamentals">Flowers & Ornamentals</option>
                  <option value="Pest Control">Pest Control</option>
                  <option value="Soil Health">Soil Health</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                <select 
                  id="difficulty" 
                  className="w-full p-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all bg-white"
                >
                  <option value="Beginner">Beginner 🌱</option>
                  <option value="Intermediate">Intermediate 🌿</option>
                  <option value="Advanced">Advanced 🌳</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Guide Content</label>
              <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-green-100 focus-within:border-green-500 transition-all">
                <div className="bg-gray-50 border-b border-gray-200 p-2 flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200">
                    <span className="font-bold font-serif">B</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200">
                    <span className="italic font-serif">I</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200">
                    <span className="underline font-serif">U</span>
                  </Button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200">
                    <FileText size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 hover:bg-gray-200">
                    <Image size={16} />
                  </Button>
                </div>
                <textarea 
                  className="w-full min-h-[300px] p-4 resize-y outline-none text-gray-700"
                  placeholder="Start writing your guide here..."
                ></textarea>
              </div>
            </div>

            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className="bg-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 border border-gray-100 shadow-sm group-hover:scale-110 transition-transform">
                <UploadCloud className="text-green-500" />
              </div>
              <p className="text-gray-900 font-medium mb-1">Upload Cover Image</p>
              <p className="text-sm text-gray-500">Drag and drop or click to upload</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}