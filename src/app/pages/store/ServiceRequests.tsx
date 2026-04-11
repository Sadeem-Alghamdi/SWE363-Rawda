import { useState } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";

interface ServiceRequest {
  id: string;
  customerName: string;
  service: string;
  dates: string;
  plantCount: number;
  status: "Pending" | "Accepted" | "Declined" | "Completed";
  address?: string;
  notes?: string;
  contact?: string;
}

export default function ServiceRequests() {
  const [activeTab, setActiveTab] = useState<"Pending" | "Accepted" | "Declined" | "Completed">("Pending");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<"accept" | "reject">("accept");
  const [rejectionNote, setRejectionNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: "1",
      customerName: "Sarah Martinez",
      service: "7-Day Plant Care",
      dates: "Mar 10-17, 2026",
      plantCount: 5,
      status: "Pending",
      address: "123 Main St, Plant City",
      notes: "I have some rare plants that need special care",
      contact: "sarah.m@example.com",
    },
    {
      id: "2",
      customerName: "John Smith",
      service: "14-Day Plant Care",
      dates: "Mar 15-29, 2026",
      plantCount: 8,
      status: "Pending",
      address: "456 Garden Ave, Plant City",
      contact: "john.s@example.com",
    },
    {
      id: "3",
      customerName: "Emma Wilson",
      service: "7-Day Plant Care",
      dates: "Feb 20-27, 2026",
      plantCount: 3,
      status: "Completed",
      address: "789 Green St, Plant City",
    },
  ]);

  const handleViewDetails = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleAction = (request: ServiceRequest, type: "accept" | "reject") => {
    setSelectedRequest(request);
    setActionType(type);
    setShowDetailModal(false);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (selectedRequest) {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id
            ? { ...r, status: actionType === "accept" ? "Accepted" : "Declined" }
            : r
        )
      );
      showToast(actionType === "accept" ? "Request approved successfully." : "Request declined.");
      setShowActionModal(false);
      setSelectedRequest(null);
      setRejectionNote("");
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredRequests = requests.filter((r) => r.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Requests</h1>
        <p className="text-gray-600">Manage incoming plant care requests</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {(["Pending", "Accepted", "Declined", "Completed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab} ({requests.filter((r) => r.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-gray-600">
            No service requests available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Dates</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plants</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{request.customerName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{request.service}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{request.dates}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{request.plantCount} plants</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {request.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleAction(request, "accept")}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction(request, "reject")}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium text-gray-900">{selectedRequest.customerName}</p>
                <p className="text-sm text-gray-600">{selectedRequest.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service</p>
                <p className="font-medium text-gray-900">{selectedRequest.service}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dates</p>
                <p className="font-medium text-gray-900">{selectedRequest.dates}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">{selectedRequest.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Number of Plants</p>
                <p className="font-medium text-gray-900">{selectedRequest.plantCount}</p>
              </div>
              {selectedRequest.notes && (
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-gray-700">{selectedRequest.notes}</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              {selectedRequest.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleAction(selectedRequest, "reject")}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleAction(selectedRequest, "accept")}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Accept
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {actionType === "accept" ? "Accept Request" : "Reject Request"}
            </h3>
            <p className="text-gray-600 mb-4">
              {actionType === "accept"
                ? `Confirm acceptance for ${selectedRequest.customerName}?`
                : `Are you sure you want to reject this request?`}
            </p>
            {actionType === "reject" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason (Optional)</label>
                <textarea
                  value={rejectionNote}
                  onChange={(e) => setRejectionNote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setRejectionNote("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  actionType === "accept" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
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
