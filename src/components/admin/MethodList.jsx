import { useAdmin } from "../../context/AdminContext";

const MethodList = () => {
  const { state, dispatch } = useAdmin();
  const { communicationMethods } = state;

  const handleDeleteMethod = (id) => {
    dispatch({ type: "DELETE_COMMUNICATION_METHOD", payload: id });
  };

  const handleReorder = (id, direction) => {
    const index = communicationMethods.findIndex((method) => method.id === id);
    if (
      (index === 0 && direction === "up") ||
      (index === communicationMethods.length - 1 && direction === "down")
    )
      return;

    const newMethods = [...communicationMethods];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newMethods[index], newMethods[swapIndex]] = [
      newMethods[swapIndex],
      newMethods[index],
    ];
    newMethods.forEach((method, idx) => (method.sequence = idx + 1));

    dispatch({ type: "REORDER_COMMUNICATION_METHODS", payload: newMethods });
  };

  const toggleMandatory = (id) => {
    const method = communicationMethods.find((m) => m.id === id);
    if (method) {
      dispatch({
        type: "UPDATE_COMMUNICATION_METHOD",
        payload: { ...method, mandatory: !method.mandatory },
      });
    }
  };

  return (
    <div className="mt-8">
      <h3 className="font-bold mb-4">Communication Methods</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Sequence</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Mandatory</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {communicationMethods.map((method) => (
            <tr key={method.id}>
              <td className="border px-4 py-2">{method.sequence}</td>
              <td className="border px-4 py-2">{method.name}</td>
              <td className="border px-4 py-2">{method.description}</td>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  checked={method.mandatory}
                  onChange={() => toggleMandatory(method.id)}
                  className="form-checkbox"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleReorder(method.id, "up")}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  disabled={method.sequence === 1}
                >
                  Up
                </button>
                <button
                  onClick={() => handleReorder(method.id, "down")}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  disabled={method.sequence === communicationMethods.length}
                >
                  Down
                </button>
                <button
                  onClick={() => handleDeleteMethod(method.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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

export default MethodList;
