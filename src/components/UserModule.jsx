import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CommunicationGrids from "./user/CommunicationGrids";
import Dashboard from "./user/Dashboard";
import CalendarView from "./user/CalendarView";
import CommunicationModal from "./user/CommunicationModal";

const UserModule = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AdminContext);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCommunication, setNewCommunication] = useState({
    type: "",
    date: "",
    notes: "",
  });
  const [highlightOverrides, setHighlightOverrides] = useState({});

  const handleLogCommunication = () => {
    if (!selectedCompany || !newCommunication.type || !newCommunication.date) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch({
      type: "ADD_COMMUNICATION",
      payload: {
        companyId: selectedCompany.id,
        communication: newCommunication,
      },
    });

    setSelectedCompany(null);
    setLogModalVisible(false);
    setNewCommunication({ type: "", date: "", notes: "" });
    toast.success("Communication logged successfully.");
  };

  const handleOverrideHighlight = (companyId) => {
    setHighlightOverrides({ ...highlightOverrides, [companyId]: true });
    toast.info("Highlight overridden for the company.");
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">User Module</h2>
      <div className="mb-4">
        <button
          onClick={() => navigate("/admin")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Admin
        </button>
      </div>
      <CommunicationGrids
        companies={state.companies}
        today={new Date().toISOString().split("T")[0]}
        highlightOverrides={highlightOverrides}
      />
      <Dashboard
        companies={state.companies}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        setLogModalVisible={setLogModalVisible}
        handleOverrideHighlight={handleOverrideHighlight}
      />

      {logModalVisible && (
        <CommunicationModal
          selectedCompany={selectedCompany}
          newCommunication={newCommunication}
          setNewCommunication={setNewCommunication}
          handleLogCommunication={handleLogCommunication}
          closeModal={() => setLogModalVisible(false)}
        />
      )}
      <CalendarView companies={state.companies} />
    </div>
  );
};

export default UserModule;
