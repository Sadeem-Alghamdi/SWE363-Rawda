import { useState } from "react";
import { Eye, CheckCircle, Edit, XCircle } from "lucide-react";

interface GuideSubmission {
  id: string;
  title: string;
  submittedBy: string;
  date: string;
  status: "Pending" | "Approved" | "Revision" | "Rejected";
  content?: string;
  references?: string[];
}

export default function ContentApproval() {
  const [selectedGuide, setSelectedGuide] = useState<GuideSubmission | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "revision" | "reject">("approve");
  const [feedbackNote, setFeedbackNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const [guides, setGuides] = useState<GuideSubmission[]>([
    {
      id: "1",
      title: "Complete Guide to Indoor Ferns",
      submittedBy: "Dr. Jane Smith",
      date: "March 1, 2026",
      status: "Pending",
      content: "Ferns are ancient plants that thrive in humid, shaded environments...",
      references: ["Botanical Journal Vol. 12", "Indoor Plant Care Handbook"],
    },
    {
      id: "2",
      title: "Organic Pest Control Methods",
      submittedBy: "John Green",
      date: "Feb 28, 2026",
      status: "Pending",
      content: "Natural pest control is essential for maintaining a healthy garden...",
      references: ["Organic Gardening Magazine", "Sustainable Agriculture Guide"],
    },
    {
      id: "3",
      title: "Succulent Propagation Techniques",
      submittedBy: "Maria Garcia",
      date: "Feb 25, 2026",
      status: "Approved",
    },
  ]);

  const handleViewGuide = (guide: GuideSubmission) => {
    setSelectedGuide(guide);
    setShowDetailModal(true);
  };

  const handleAction = (guide: GuideSubmission, type: "approve" | "revision" | "reject") => {
    setSelectedGuide(guide);
    setActionType(type);
    setShowDetailModal(false);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (selectedGuide) {
      setGuides((prev) =>
        prev.map((g) =>
          g.id === selectedGuide.id
            ? {
                ...g,
                status:
                  actionType === "approve"
                    ? "Approved"
                    : actionType === "revision"
                    ? "Revision"
                    : "Rejected",
              }
            : g
        )
      );
      showToast(
        `Guide ${
          actionType === "approve"
            ? "approved"
            : actionType === "revision"
            ? "marked for revision"
            : "rejected"
        } successfully`
      );
      setShowActionModal(false);
      setSelectedGuide(null);
      setFeedbackNote("");
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const pendingCount = guides.filter((g) => g.status === "Pending").length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Approval</h1>
        <p className="text-gray-600">Review expert-submitted plant guides • {pendingCount} pending</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Submitted By</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guides.map((guide) => (
                <tr key={guide.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{guide.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{guide.submittedBy}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{guide.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        guide.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : guide.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : guide.status === "Revision"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {guide.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewGuide(guide)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {guide.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleAction(guide, "approve")}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction(guide, "revision")}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Request Changes"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleAction(guide, "reject")}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Content Review</h3>
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{selectedGuide.title}</h4>
              <p className="text-sm text-gray-500">
                Submitted by {selectedGuide.submittedBy} • {selectedGuide.date}
              </p>
            </div>
            {selectedGuide.content && (
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-2">Content Preview</h5>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedGuide.content}</p>
                </div>
              </div>
            )}
            {selectedGuide.references && (
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-2">References</h5>
                <ul className="list-disc list-inside space-y-1">
                  {selectedGuide.references.map((ref, index) => (
                    <li key={index} className="text-gray-700">
                      {ref}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              {selectedGuide.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleAction(selectedGuide, "reject")}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedGuide, "revision")}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    Request Changes
                  </button>
                  <button
                    onClick={() => handleAction(selectedGuide, "approve")}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal */}
      {showActionModal && selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {actionType === "approve" ? "Approve Guide" : actionType === "revision" ? "Request Changes" : "Reject Guide"}
            </h3>
            {(actionType === "revision" || actionType === "reject") && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Note {actionType === "revision" ? "(Required)" : "(Optional)"}
                </label>
                <textarea
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  rows={3}
                  placeholder="Provide feedback..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setFeedbackNote("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : actionType === "revision"
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm
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
