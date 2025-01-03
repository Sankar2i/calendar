import { useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Tooltip } from "react-tooltip";
import { format, addDays, addWeeks, addMonths, isValid } from "date-fns";

const CalendarView = ({ companies }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const calculateNextDate = useMemo(
    () =>
      (periodicity, baseDate = new Date()) => {
        try {
          if (!isValid(new Date(baseDate))) {
            throw new Error("Invalid base date");
          }

          const match = periodicity.match(
            /(\d+)\s+(day|days|week|weeks|month|months)/
          );
          if (!match) {
            throw new Error(`Invalid periodicity format: ${periodicity}`);
          }

          const amount = parseInt(match[1], 10);
          const unit = match[2].toLowerCase();

          let nextDate = new Date(baseDate);

          switch (unit) {
            case "day":
            case "days":
              nextDate = addDays(nextDate, amount);
              break;
            case "week":
            case "weeks":
              nextDate = addWeeks(nextDate, amount);
              break;
            case "month":
            case "months":
              nextDate = addMonths(nextDate, amount);
              break;
            default:
              throw new Error(`Unsupported time unit: ${unit}`);
          }

          return isValid(nextDate) ? format(nextDate, "yyyy-MM-dd") : null;
        } catch (error) {
          console.error("Error calculating next date:", error);
          setErrorMessage(
            `Error calculating date for periodicity: ${periodicity}`
          );
          return null;
        }
      },
    []
  );

  const events = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    return companies
      .map((company) => {
        const nextDate = calculateNextDate(company.periodicity);
        if (!nextDate) return null;

        const isOverdue = nextDate < today;
        const isToday = nextDate === today;

        return {
          id: company.id,
          title: company.name,
          start: nextDate,
          end: nextDate,
          allDay: true,
          backgroundColor: isOverdue
            ? "#EF4444"
            : isToday
            ? "#F59E0B"
            : "#3B82F6",
          borderColor: isOverdue ? "#DC2626" : isToday ? "#D97706" : "#2563EB",
          textColor: "#FFFFFF",
          extendedProps: {
            company: company,
            type: company.nextCommunicationType || "Scheduled Communication",
            notes: company.comments || "No additional notes.",
            status: isOverdue ? "overdue" : isToday ? "due" : "upcoming",
          },
        };
      })
      .filter(Boolean);
  }, [companies, calculateNextDate]);

  const handleEventClick = (clickInfo) => {
    const { event } = clickInfo;
    setSelectedEvent({
      title: event.title,
      date: event.startStr,
      type: event.extendedProps.type,
      notes: event.extendedProps.notes,
      status: event.extendedProps.status,
      company: event.extendedProps.company,
    });
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {errorMessage}
          <button
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => setErrorMessage("")}
          >
            &times;
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
          aspectRatio={1.8}
          eventClick={handleEventClick}
          eventContent={(eventInfo) => (
            <div
              data-tooltip-id={`tooltip-${eventInfo.event.id}`}
              className="p-1 truncate"
            >
              {eventInfo.event.title}
              <Tooltip
                id={`tooltip-${eventInfo.event.id}`}
                place="top"
                className="max-w-xs"
              >
                <div className="p-2">
                  <p className="font-bold">{eventInfo.event.title}</p>
                  <p>{eventInfo.event.extendedProps.type}</p>
                  <p>{format(new Date(eventInfo.event.start), "PPP")}</p>
                </div>
              </Tooltip>
            </div>
          )}
        />
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{selectedEvent.title}</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {format(new Date(selectedEvent.date), "PPP")}
                </p>
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {selectedEvent.type}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={
                      selectedEvent.status === "overdue"
                        ? "text-red-600"
                        : selectedEvent.status === "due"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }
                  >
                    {selectedEvent.status.charAt(0).toUpperCase() +
                      selectedEvent.status.slice(1)}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Notes:</span>{" "}
                  {selectedEvent.notes}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
