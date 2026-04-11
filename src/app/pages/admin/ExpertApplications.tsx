import { useState } from "react";
import { Eye, CheckCircle, XCircle, FileText } from "lucide-react";

interface ExpertApplication {
  id: string;
  name: string;
  email: string;
  yearsExperience: number;
  submittedDate: string;
  status: "Pending" | "Approved" | "Rejected";
  bio?: string;
  certificates?: string[];
}

export default function ExpertApplications() {
  const [selectedApplication, setSelectedApplication] = useState<ExpertApplication | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [rejectionNote, setRejectionNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const [applications, setApplications] = useState<ExpertApplication[]>([
    {
      id: "1",
      name: "Dr. James Wilson",
      email: "james.wilson@example.com",
      yearsExperience: 15,
      submittedDate: "Feb 28, 2026",
      status: "Pending",
      bio: "Certified horticulturist with 15 years of experience in botanical gardens and plant care consultation.",
      certificates: ["Horticulture Certificate", "Plant Pathology Diploma"],
    },
    {
      id: "2",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      yearsExperience: 8,
      submittedDate: "Feb 25, 2026",
      status: "Pending",
      bio: "Organic farming specialist with expertise in sustainable gardening practices.",
      certificates: ["Organic Farming Certificate", "Permaculture Design"],
    },
    {
      id: "3",
      name: "Robert Chen",
      email: "robert.chen@example.com",
      yearsExperience: 12,
      submittedDate: "Feb 20, 2026",
      status: "Approved",
    },
    {
      id: "4",
      name: "Linda Brown",
      email: "linda.brown@example.com",
      yearsExperience: 3,
      submittedDate: "Feb 18, 2026",
      status: "Rejected",
    },
  ]);

  const handleViewDetails = (application: ExpertApplication) => {
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const handleAction = (application: ExpertApplication, type: "approve" | "reject") => {
    setSelectedApplication(application);
    setActionType(type);
    setShowDetailModal(false);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (selectedApplication) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedApplication.id
            ? { ...app, status: actionType === "approve" ? "Approved" : "Rejected" }
            : app
        )
      );
      showToast(`Application ${actionType === "approve" ? "approved" : "rejected"} successfully`);
      setShowActionModal(false);
      setSelectedApplication(null);
      setRejectionNote("");
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const pendingCount = applications.filter((app) => app.status === "Pending").length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Expert Applications</h1>
        <p className="text-gray-600">
          Review and approve expert registrations • {pendingCount} pending
        </p>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {applications.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600">No pending expert applications.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Experience</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Submitted</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{application.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{application.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{application.yearsExperience} years</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{application.submittedDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          application.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : application.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(application)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {application.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleAction(application, "approve")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction(application, "reject")}
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
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Application Details</h3>
            
            {/* Profile */}
            <div className="mb-6">
              <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                {selectedApplication.name.charAt(0)}
              </div>
              <h4 className="text-xl font-semibold text-gray-900">{selectedApplication.name}</h4>
              <p className="text-gray-600">{selectedApplication.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {selectedApplication.yearsExperience} years of experience
              </p>
            </div>

            {/* Bio */}
            {selectedApplication.bio && (
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-2">Bio</h5>
                <p className="text-gray-700 leading-relaxed">{selectedApplication.bio}</p>
              </div>
            )}

            {/* Certificates */}
            {selectedApplication.certificates && (
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-3">Certificates & Credentials</h5>
                <div className="space-y-2">
                  {selectedApplication.certificates.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedApplication.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleAction(selectedApplication, "reject")}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedApplication, "approve")}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
      {showActionModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {actionType === "approve" ? "Approve Application" : "Reject Application"}
            </h3>
            <p className="text-gray-600 mb-4">
              {actionType === "approve"
                ? `Approve ${selectedApplication.name} as a gardening expert?`
                : `Reject ${selectedApplication.name}'s application?`}
            </p>
            
            {actionType === "reject" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Note (Optional)
                </label>
                <textarea
                  value={rejectionNote}
                  onChange={(e) => setRejectionNote(e.target.value)}
                  rows={3}
                  placeholder="Provide a reason for rejection..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setRejectionNote("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Confirm {actionType === "approve" ? "Approval" : "Rejection"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
