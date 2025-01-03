import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { toast } from "react-toastify";

const CompanyList = ({ companies }) => {
  const navigate = useNavigate();
  const { dispatch } = useAdmin();

  const handleDeleteCompany = (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      dispatch({ type: "DELETE_COMPANY", payload: id });
      toast.success("Company deleted successfully");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="font-bold mb-2">Companies</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Company Name</th>
            <th className="border px-4 py-2">Company Location</th>
            <th className="border px-4 py-2">LinkedIn Profile</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Comments</th>
            <th className="border px-4 py-2">Periodicity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td className="border px-4 py-2">{company.name}</td>
              <td className="border px-4 py-2">{company.location}</td>
              <td className="border px-4 py-2">{company.linkedIn}</td>
              <td className="border px-4 py-2">{company.emails}</td>
              <td className="border px-4 py-2">{company.phone}</td>
              <td className="border px-4 py-2">{company.comments}</td>
              <td className="border px-4 py-2">{company.periodicity}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() =>
                    navigate("/admin/form", {
                      state: { isEditing: true, company },
                    })
                  }
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCompany(company.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
