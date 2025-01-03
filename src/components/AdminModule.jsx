import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import CompanyList from "./admin/CompanyList";
import MethodList from "./admin/MethodList";
import MethodForm from "./admin/MethodForm";

const AdminModule = () => {
  const navigate = useNavigate();
  const { state } = useAdmin();

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Admin Module</h2>

      <div className="space-y-4">
        <button
          onClick={() =>
            navigate("/admin/form", { state: { isEditing: false } })
          }
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Company
        </button>

        <button
          onClick={() => navigate("/user")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
        >
          Go to User Module
        </button>
      </div>

      <CompanyList companies={state.companies} />
      <MethodList />
      <MethodForm />
    </div>
  );
};

export default AdminModule;
