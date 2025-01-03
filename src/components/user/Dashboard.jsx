import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { format } from 'date-fns';
import { toast } from "react-toastify";

const Dashboard = ({
  companies,
  selectedCompany,
  setSelectedCompany,
  setLogModalVisible,
  handleOverrideHighlight,
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [notificationCount, setNotificationCount] = useState(0);

  const today = new Date().toISOString().split('T')[0];
  const overdueCompanies = companies.filter(c => c.periodicity < today);
  const dueTodayCompanies = companies.filter(c => c.periodicity === today);

  useEffect(() => {
    setNotificationCount(overdueCompanies.length + dueTodayCompanies.length);
  }, [overdueCompanies.length, dueTodayCompanies.length]);

  const getHighlightColor = (company) => {
    if (company.periodicity < today) return 'bg-red-100';
    if (company.periodicity === today) return 'bg-yellow-100';
    return '';
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'do MMMM');
    } catch (error) {
      return dateString;
    }
  };

  const handleRowSelect = (companyId) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(companyId)) {
      newSelected.delete(companyId);
    } else {
      newSelected.add(companyId);
    }
    setSelectedRows(newSelected);
  };

  const handleBulkAction = () => {
    if (selectedRows.size === 0) {
      toast.warning("Please select at least one company");
      return;
    }
    const selectedCompanies = companies.filter(c => selectedRows.has(c.id));
    setSelectedCompany(selectedCompanies[0]);
    setLogModalVisible(true);
  };

  // Notification section component
  const NotificationSection = () => (
    <div className="mb-6 space-y-4">
      {overdueCompanies.length > 0 && (
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-bold text-red-700 mb-2">Overdue Communications</h4>
          <div className="grid grid-cols-1 gap-2">
            {overdueCompanies.map(company => (
              <div key={company.id} className="flex justify-between items-center bg-white p-2 rounded">
                <span>{company.name}</span>
                <span className="text-red-600">Overdue since {formatDate(company.periodicity)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {dueTodayCompanies.length > 0 && (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-bold text-yellow-700 mb-2">Today's Communications</h4>
          <div className="grid grid-cols-1 gap-2">
            {dueTodayCompanies.map(company => (
              <div key={company.id} className="flex justify-between items-center bg-white p-2 rounded">
                <span>{company.name}</span>
                <span className="text-yellow-600">Due today</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with notifications */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Dashboard</h3>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <Bell className="w-6 h-6" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2"
              >
                {notificationCount}
              </Badge>
            )}
          </div>
          {selectedRows.size > 0 && (
            <button
              onClick={handleBulkAction}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Log Communication ({selectedRows.size})
            </button>
          )}
        </div>
      </div>

      {/* Notifications Section */}
      <NotificationSection />

      {/* Companies Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b p-4 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(new Set(companies.map(c => c.id)));
                    } else {
                      setSelectedRows(new Set());
                    }
                  }}
                  checked={selectedRows.size === companies.length}
                  className="rounded"
                />
              </th>
              <th className="border-b p-4 text-left">Company</th>
              <th className="border-b p-4 text-left">Last Five Communications</th>
              <th className="border-b p-4 text-left">Next Scheduled</th>
              <th className="border-b p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id} className={`${getHighlightColor(company)} hover:bg-gray-50`}>
                <td className="border-b p-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(company.id)}
                    onChange={() => handleRowSelect(company.id)}
                    className="rounded"
                  />
                </td>
                <td className="border-b p-4">{company.name}</td>
                <td className="border-b p-4">
                  <div className="space-y-2">
                    {company.lastFiveCommunications?.slice(0, 5).map((comm, idx) => (
                      <div
                        key={idx}
                        className="group relative cursor-help p-2 bg-gray-50 rounded"
                      >
                        <span>{comm.type} ({formatDate(comm.date)})</span>
                        {/* Tooltip */}
                        <div className="invisible group-hover:visible absolute left-0 top-full z-10 w-64 p-4 bg-white shadow-lg rounded-lg border mt-2">
                          
                          <p className="text-sm mt-2">{comm.notes || 'No notes'}</p>
                        </div>
                      </div>
                    ))}
                    {(!company.lastFiveCommunications || company.lastFiveCommunications.length === 0) && (
                      <span className="text-gray-500">No previous communications</span>
                    )}
                  </div>
                </td>
                <td className="border-b p-4">
                  {formatDate(company.periodicity)}
                </td>
                <td className="border-b p-4">
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setSelectedCompany(company);
                        setLogModalVisible(true);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Log Communication
                    </button>
                    <button
                      onClick={() => handleOverrideHighlight(company.id)}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Override Highlight
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;