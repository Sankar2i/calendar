import { useState } from "react";
import { useAdmin } from "../../context/AdminContext";

const MethodForm = () => {
  const { state, dispatch } = useAdmin();
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: state.communicationMethods.length + 1,
    mandatory: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMethod.name || !newMethod.description) {
      alert("Name and Description are required.");
      return;
    }

    dispatch({
      type: "ADD_COMMUNICATION_METHOD",
      payload: newMethod,
    });

    setNewMethod({
      name: "",
      description: "",
      sequence: state.communicationMethods.length + 2,
      mandatory: false,
    });
  };

  return (
    <div className="mt-8">
      <h3 className="font-bold mb-4">Add New Communication Method</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            value={newMethod.name}
            onChange={(e) =>
              setNewMethod({ ...newMethod, name: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description:</label>
          <input
            type="text"
            value={newMethod.description}
            onChange={(e) =>
              setNewMethod({ ...newMethod, description: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newMethod.mandatory}
              onChange={(e) =>
                setNewMethod({ ...newMethod, mandatory: e.target.checked })
              }
              className="mr-2"
            />
            Mandatory
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Method
        </button>
      </form>
    </div>
  );
};

export default MethodForm;
