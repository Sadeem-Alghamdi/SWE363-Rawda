import { useState } from "react";
import { Edit, Award, Trash2 } from "lucide-react";

interface BadgeRule {
  id: string;
  name: string;
  requirement: string;
  color: string;
}

interface ExpertBadge {
  id: string;
  expertName: string;
  currentBadge: string;
  badgeColor: string;
  stats: {
    answers: number;
    verified: number;
  };
}

export default function BadgesSystem() {
  const [toast, setToast] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<ExpertBadge | null>(null);

  const [badgeRules] = useState<BadgeRule[]>([
    { id: "1", name: "Beginner", requirement: "5 verified answers", color: "bg-gray-500" },
    { id: "2", name: "Intermediate", requirement: "20 verified answers", color: "bg-blue-500" },
    { id: "3", name: "Advanced", requirement: "50 verified answers", color: "bg-purple-500" },
    { id: "4", name: "Expert", requirement: "100 verified answers", color: "bg-green-500" },
    { id: "5", name: "Master", requirement: "200 verified answers", color: "bg-yellow-500" },
  ]);

  const [experts, setExperts] = useState<ExpertBadge[]>([
    {
      id: "1",
      expertName: "Dr. Jane Smith",
      currentBadge: "Expert",
      badgeColor: "bg-green-500",
      stats: { answers: 145, verified: 128 },
    },
    {
      id: "2",
      expertName: "John Green",
      currentBadge: "Advanced",
      badgeColor: "bg-purple-500",
      stats: { answers: 89, verified: 72 },
    },
    {
      id: "3",
      expertName: "Maria Garcia",
      currentBadge: "Intermediate",
      badgeColor: "bg-blue-500",
      stats: { answers: 45, verified: 38 },
    },
  ]);

  const handleAssignBadge = (expert: ExpertBadge) => {
    setSelectedExpert(expert);
    setShowAssignModal(true);
  };

  const confirmAssignment = (badgeName: string, badgeColor: string) => {
    if (selectedExpert) {
      setExperts((prev) =>
        prev.map((e) =>
          e.id === selectedExpert.id ? { ...e, currentBadge: badgeName, badgeColor } : e
        )
      );
      showToast("Badge assigned successfully");
      setShowAssignModal(false);
      setSelectedExpert(null);
    }
  };

  const removeBadge = (expertId: string) => {
    setExperts((prev) =>
      prev.map((e) =>
        e.id === expertId ? { ...e, currentBadge: "None", badgeColor: "bg-gray-300" } : e
      )
    );
    showToast("Badge removed");
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Badge System</h1>
        <p className="text-gray-600">Manage expert badges and achievement levels</p>
      </div>

      {/* Badge Rules */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Badge Levels & Requirements</h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Edit className="w-4 h-4" />
            Edit Rules
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {badgeRules.map((badge) => (
            <div key={badge.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-900 transition-colors">
              <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center mb-3`}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
              <p className="text-sm text-gray-600">{badge.requirement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Badge Management */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Expert Badge Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expert Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Current Badge</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Answers</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Verified Answers</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {experts.map((expert) => (
                <tr key={expert.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{expert.expertName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 ${expert.badgeColor} rounded-full flex items-center justify-center`}>
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{expert.currentBadge}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{expert.stats.answers}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{expert.stats.verified}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAssignBadge(expert)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Assign Badge"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeBadge(expert.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove Badge"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Badge Modal */}
      {showAssignModal && selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Assign Badge</h3>
            <p className="text-gray-600 mb-4">
              Select a badge for <span className="font-medium">{selectedExpert.expertName}</span>
            </p>
            <div className="space-y-2 mb-6">
              {badgeRules.map((badge) => (
                <button
                  key={badge.id}
                  onClick={() => confirmAssignment(badge.name, badge.color)}
                  className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 ${badge.color} rounded-full flex items-center justify-center`}>
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{badge.name}</div>
                    <div className="text-sm text-gray-600">{badge.requirement}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setShowAssignModal(false);
                setSelectedExpert(null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
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
