import { Button } from "../components/ui/Button";
import { User, Bell, Shield, LogOut } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 bg-white rounded-xl border border-gray-100 p-4 space-y-2 h-fit">
          <button onClick={() => setActiveTab("Profile")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "Profile" ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
             <User size={18} /> Profile
          </button>
          <button onClick={() => setActiveTab("Notifications")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "Notifications" ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
             <Bell size={18} /> Notifications
          </button>
          <button onClick={() => setActiveTab("Security")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === "Security" ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
             <Shield size={18} /> Security
          </button>
          <div className="border-t border-gray-100 my-2 pt-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-6 lg:p-8">
          {activeTab === "Profile" && (
            <div className="space-y-6">
               <h2 className="text-xl font-bold text-gray-900 mb-4">Public Profile</h2>
               <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-md">
                     <img src="https://images.unsplash.com/photo-1762522926157-bcc04bf0b10a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWwlMjBzbWlsaW5nfGVufDF8fHx8MTc3MjMyMDgxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" className="w-full h-full object-cover" alt="Profile" />
                  </div>
                  <div>
                    <Button variant="outline" className="border-gray-200 text-gray-700 mb-2">Change Picture</Button>
                    <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700">Display Name</label>
                   <input type="text" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500" defaultValue="Dr. Sarah" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-700">Email Address</label>
                   <input type="email" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500" defaultValue="sarah@rawda.app" />
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Bio</label>
                 <textarea className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 h-24" defaultValue="Passionate botanist with over 15 years of experience in horticulture. Specialized in urban gardening and sustainable plant care." />
               </div>

               <div className="pt-4 flex justify-end">
                 <Button className="bg-[#4CAF50] text-white">Save Changes</Button>
               </div>
            </div>
          )}

           {activeTab === "Notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                 {[
                   "Email me when someone replies to my answer",
                   "Email me daily summary of pending reviews",
                   "Notify me when I earn a new badge",
                   "Weekly newsletter with gardening tips"
                 ].map((label, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <input type="checkbox" className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500" defaultChecked />
                     <span className="text-gray-700">{label}</span>
                   </div>
                 ))}
              </div>
              <div className="pt-4 flex justify-end">
                 <Button className="bg-[#4CAF50] text-white">Save Preferences</Button>
               </div>
            </div>
          )}
          
          {activeTab === "Security" && (
            <div className="space-y-6">
               <h2 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h2>
               <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                    <input type="password" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500" />
                  </div>
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">New Password</label>
                    <input type="password" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500" />
                  </div>
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input type="password" className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500" />
                  </div>
               </div>
               <div className="pt-4 flex justify-end">
                 <Button className="bg-[#4CAF50] text-white">Update Password</Button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}