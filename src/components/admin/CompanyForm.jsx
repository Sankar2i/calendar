import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { toast } from "react-toastify";

const periodicityOptions = [
  "1 day",
  "2 days",
  "3 days",
  "1 week",
  "2 weeks",
  "3 weeks",
  "1 month",
  "2 months",
  "3 months",
];

export default function CompanyForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useAdmin();

  const isEditing = location.state?.isEditing || false;
  const initialCompany = location.state?.company || {
    name: "",
    location: "",
    linkedIn: "",
    emails: "",
    phone: "",
    comments: "",
    periodicity: "2 weeks",
  };

  const [company, setCompany] = useState(initialCompany);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!company.name.trim()) newErrors.name = "Name is required";
    if (!company.location.trim()) newErrors.location = "Location is required";
    if (company.linkedIn && !company.linkedIn.includes("linkedin.com")) {
      newErrors.linkedIn = "Invalid LinkedIn URL";
    }
    if (
      company.emails &&
      !company.emails
        .split(",")
        .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    ) {
      newErrors.emails = "Invalid email format";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isEditing) {
        dispatch({ type: "UPDATE_COMPANY", payload: company });
        toast.success("Company updated successfully");
      } else {
        dispatch({ type: "ADD_COMPANY", payload: company });
        toast.success("Company added successfully");
      }
      navigate("/admin");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Company" : "Add Company"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Company Name *
          </label>
          <input
            type="text"
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            type="text"
            value={company.location}
            onChange={(e) =>
              setCompany({ ...company, location: e.target.value })
            }
            className={`w-full p-2 border rounded ${
              errors.location ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            LinkedIn Profile
          </label>
          <input
            type="text"
            value={company.linkedIn}
            onChange={(e) =>
              setCompany({ ...company, linkedIn: e.target.value })
            }
            className={`w-full p-2 border rounded ${
              errors.linkedIn ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.linkedIn && (
            <p className="text-red-500 text-sm mt-1">{errors.linkedIn}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email Addresses (comma-separated)
          </label>
          <input
            type="text"
            value={company.emails}
            onChange={(e) => setCompany({ ...company, emails: e.target.value })}
            className={`w-full p-2 border rounded ${
              errors.emails ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.emails && (
            <p className="text-red-500 text-sm mt-1">{errors.emails}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Numbers (comma-separated)
          </label>
          <input
            type="text"
            value={company.phone}
            onChange={(e) => setCompany({ ...company, phone: e.target.value })}
            className="w-full p-2 border rounded border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Communication Periodicity *
          </label>
          <select
            value={company.periodicity}
            onChange={(e) =>
              setCompany({ ...company, periodicity: e.target.value })
            }
            className="w-full p-2 border rounded border-gray-300"
          >
            {periodicityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Comments</label>
          <textarea
            value={company.comments}
            onChange={(e) =>
              setCompany({ ...company, comments: e.target.value })
            }
            className="w-full p-2 border rounded border-gray-300 h-32"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? "Save Changes" : "Add Company"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
