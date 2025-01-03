import React from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const CommunicationGrids = ({ companies, today, highlightOverrides }) => {
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "do MMMM");
    } catch (error) {
      return dateString;
    }
  };

  const overdueCompanies = companies.filter(
    (c) => c.periodicity < today && !highlightOverrides[c.id]
  );
  const dueTodayCompanies = companies.filter(
    (c) => c.periodicity === today && !highlightOverrides[c.id]
  );

  return (
    <div className="space-y-6">
      {/* Overdue Communications Grid */}
      <div className="bg-red-50 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-red-700">
            Overdue Communications
          </h3>
          {overdueCompanies.length > 0 && (
            <Badge variant="destructive">{overdueCompanies.length}</Badge>
          )}
        </div>

        {overdueCompanies.length > 0 ? (
          <div className="grid gap-4">
            {overdueCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div className="space-y-1">
                  <h4 className="font-semibold">{company.name}</h4>
                  <p className="text-sm text-gray-600">
                    Last communication:{" "}
                    {company.lastFiveCommunications?.[0]?.type || "None"}
                    {company.lastFiveCommunications?.[0]?.date &&
                      ` (${formatDate(
                        company.lastFiveCommunications[0].date
                      )})`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-medium">
                    Overdue since {formatDate(company.periodicity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No overdue communications</p>
        )}
      </div>

      {/* Today's Communications Grid */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-yellow-700">
            Today's Communications
          </h3>
          {dueTodayCompanies.length > 0 && (
            <Badge variant="warning" className="bg-yellow-500">
              {dueTodayCompanies.length}
            </Badge>
          )}
        </div>

        {dueTodayCompanies.length > 0 ? (
          <div className="grid gap-4">
            {dueTodayCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div className="space-y-1">
                  <h4 className="font-semibold">{company.name}</h4>
                  <p className="text-sm text-gray-600">
                    Last communication:{" "}
                    {company.lastFiveCommunications?.[0]?.type || "None"}
                    {company.lastFiveCommunications?.[0]?.date &&
                      ` (${formatDate(
                        company.lastFiveCommunications[0].date
                      )})`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-600 font-medium">Due today</p>
                  <p className="text-sm text-gray-600">
                    Next: {company.nextCommunicationType || "Any method"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No communications due today</p>
        )}
      </div>
    </div>
  );
};

export default CommunicationGrids;
