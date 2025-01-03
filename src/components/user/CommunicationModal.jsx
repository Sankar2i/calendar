import { useAdmin } from "../../context/AdminContext";

const CommunicationModal = ({
  selectedCompany,
  newCommunication,
  setNewCommunication,
  handleLogCommunication,
  closeModal,
}) => {
  const { state } = useAdmin();
  const { communicationMethods } = state;

  const isFormValid = () => {
    return (
      newCommunication.type &&
      newCommunication.date &&
      new Date(newCommunication.date) <= new Date()
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">
          Log Communication with {selectedCompany.name}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Type of Communication:
            </label>
            <select
              value={newCommunication.type}
              onChange={(e) =>
                setNewCommunication({
                  ...newCommunication,
                  type: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            >
              <option value="">Select a method</option>
              {communicationMethods.map((method) => (
                <option key={method.id} value={method.name}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Communication:
            </label>
            <input
              type="date"
              value={newCommunication.date}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setNewCommunication({
                  ...newCommunication,
                  date: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes:</label>
            <textarea
              value={newCommunication.notes}
              onChange={(e) =>
                setNewCommunication({
                  ...newCommunication,
                  notes: e.target.value,
                })
              }
              className="w-full border p-2 rounded h-24"
              placeholder="Add any relevant notes about the communication..."
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleLogCommunication}
            disabled={!isFormValid()}
            className={`px-4 py-2 rounded ${
              isFormValid()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
            }`}
          >
            Submit
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationModal;
