import { useState } from "react";
import { Edit, Users, Check } from "lucide-react";



export default function Subscriptions() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toast, setToast] = useState(null);

  const [plans, setPlans] = useState([
    {
      id: "1",
      name: "Free Plan",
      price: "$0",
      features: [
        "Basic plant care assistant",
        "Access to Q&A forum",
        "Limited guide access",
        "5 questions per month",
      ],
      activeUsers: 2140,
    },
    {
      id: "2",
      name: "Pro Plan",
      price: "$9.99/month",
      features: [
        "Unlimited plant care assistant",
        "Priority Q&A forum access",
        "Full guide library access",
        "Unlimited questions",
        "Expert consultation booking",
        "Advanced plant diagnostics",
      ],
      activeUsers: 407,
    },
  ]);

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setShowEditModal(true);
  };

  const savePlanChanges = (e) => {
    e.preventDefault();
    if (selectedPlan) {
      const formData = new FormData(e.currentTarget);
      const newPrice = formData.get("price");
      
      setPlans((prev) =>
        prev.map((p) => (p.id === selectedPlan.id ? { ...p, price: newPrice } : p))
      );
      showToast("Plan updated successfully");
      setShowEditModal(false);
      setSelectedPlan(null);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
        <p className="text-gray-600">Manage pricing and features for subscription plans</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-xl shadow-sm p-6 border-2 border-gray-200 hover:border-gray-900 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-3xl font-bold text-[#4CAF50]">{plan.price}</p>
              </div>
              <button
                onClick={() => handleEditPlan(plan)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit Plan"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span className="font-medium">{plan.activeUsers.toLocaleString()} active users</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit {selectedPlan.name}</h3>
            <form onSubmit={savePlanChanges} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  defaultValue={selectedPlan.price}
                  placeholder="e.g., $9.99/month"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <textarea
                  name="features"
                  defaultValue={selectedPlan.features.join("\n")}
                  rows={6}
                  placeholder="One feature per line"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">One feature per line</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedPlan(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
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


