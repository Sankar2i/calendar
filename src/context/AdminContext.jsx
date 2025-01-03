import { createContext, useReducer, useContext } from "react";

const initialState = {
  companies: [],
  communicationMethods: [
    {
      id: 1,
      name: "LinkedIn Post",
      description: "Post on LinkedIn",
      sequence: 1,
      mandatory: true,
    },
    {
      id: 2,
      name: "LinkedIn Message",
      description: "Message through LinkedIn",
      sequence: 2,
      mandatory: true,
    },
    {
      id: 3,
      name: "Email",
      description: "Email communication",
      sequence: 3,
      mandatory: true,
    },
    {
      id: 4,
      name: "Phone Call",
      description: "Phone call to the contact",
      sequence: 4,
      mandatory: true,
    },
    {
      id: 5,
      name: "Other",
      description: "Other communication methods",
      sequence: 5,
      mandatory: false,
    },
  ],
  notifications: {
    overdue: [],
    dueToday: [],
    count: 0,
  },
};

function adminReducer(state, action) {
  switch (action.type) {
    case "ADD_COMPANY":
      return {
        ...state,
        companies: [...state.companies, { ...action.payload, id: Date.now() }],
      };
    case "UPDATE_COMPANY":
      return {
        ...state,
        companies: state.companies.map((company) =>
          company.id === action.payload.id ? action.payload : company
        ),
      };
    case "DELETE_COMPANY":
      return {
        ...state,
        companies: state.companies.filter(
          (company) => company.id !== action.payload
        ),
      };
    case "ADD_COMMUNICATION_METHOD":
      return {
        ...state,
        communicationMethods: [
          ...state.communicationMethods,
          { ...action.payload, id: Date.now() },
        ].sort((a, b) => a.sequence - b.sequence),
      };
    case "UPDATE_COMMUNICATION_METHOD":
      return {
        ...state,
        communicationMethods: state.communicationMethods
          .map((method) =>
            method.id === action.payload.id ? action.payload : method
          )
          .sort((a, b) => a.sequence - b.sequence),
      };
    case "DELETE_COMMUNICATION_METHOD":
      return {
        ...state,
        communicationMethods: state.communicationMethods
          .filter((method) => method.id !== action.payload)
          .map((method, index) => ({ ...method, sequence: index + 1 })),
      };
    case "REORDER_COMMUNICATION_METHODS":
      return {
        ...state,
        communicationMethods: action.payload,
      };
    case "ADD_COMMUNICATION":
      const company = state.companies.find(
        (c) => c.id === action.payload.companyId
      );
      if (!company) return state;

      const updatedCompany = {
        ...company,
        lastFiveCommunications: [
          action.payload.communication,
          ...(company.lastFiveCommunications || []).slice(0, 4),
        ],
      };
      return {
        ...state,
        companies: state.companies.map((c) =>
          c.id === action.payload.companyId ? updatedCompany : c
        ),
      };
    case "UPDATE_NOTIFICATIONS":
      return {
        ...state,
        notifications: action.payload,
      };
    default:
      return state;
  }
}

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
