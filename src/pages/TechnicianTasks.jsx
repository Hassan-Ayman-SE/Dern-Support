import React, { useState, useCallback, useEffect } from "react";
import {
  useAssignedRequests,
  useTechnicianCreatedDate,
  useTechnicianName,
} from "../hooks/technicianHooks";
import { Filters, requestStatus } from "../utils/Constants";
import ReportModal from "../components/modals/ReportModal";
import Loading from "../components/Loading";
import LogoutButton from "../components/LogoutButton";
import Swal from "sweetalert2";
import NotificationComponent from "../components/NotificationComponent";

const headers = [
  "Title",
  "Description",
  "Request Type",
  "Status",
  "Created Date",
];

const TechnicianTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filters, setFilters] = useState(new Set());

  const { data: assignedRequests, isLoading, error } = useAssignedRequests();
  const {
    data: technicianCreatedDate,
    isLoading: isCreatedDateLoading,
    error: createdDateError,
  } = useTechnicianCreatedDate();
  const { data: name, isNameLoading, isNameError } = useTechnicianName();
  const currentDate = new Date();

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  );

  useEffect(() => {
    if (assignedRequests && technicianCreatedDate) {
      const filtered = assignedRequests.filter((request) => {
        const requestDate = new Date(request.createddate);
        const matchesStatus = filters.size ? filters.has(request.status) : true;
        const matchesDate =
          requestDate.getFullYear() === selectedYear &&
          requestDate.getMonth() + 1 === selectedMonth;

        return matchesStatus && matchesDate;
      });

      setFilteredRequests(filtered);
    }
  }, [
    assignedRequests,
    technicianCreatedDate,
    selectedYear,
    selectedMonth,
    filters,
  ]);

  const truncateDescription = (description, length = 70) => {
    if (!description) {
      return { truncated: "", shouldShowReadMore: false };
    }

    if (description.length <= length) {
      return { truncated: description, shouldShowReadMore: false };
    }

    return {
      truncated: description.slice(0, length) + "...",
      shouldShowReadMore: true,
    };
  };

  const handleFilterChange = useCallback(
    (event) => {
      setFilters((previousFilters) => {
        const newFilters = new Set(previousFilters);

        if (event.target.checked) {
          newFilters.add(event.target.value);
        } else {
          newFilters.delete(event.target.value);
        }

        return newFilters;
      });
    },
    [setFilters]
  );

  const toggleModal = (request) => {
    setSelectedIssue(request);
    setIsModalOpen(!isModalOpen);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="mx-auto text-2xl font-bold">{error.message}</div>;
  }

  if (createdDateError) {
    return (
      <div className="mx-auto text-2xl font-bold">
        {createdDateError.message}
      </div>
    );
  }

  const createdYear = new Date(technicianCreatedDate).getFullYear();
  const createdMonth = new Date(technicianCreatedDate).getMonth() + 1;

  const yearRange = Array.from(
    { length: currentDate.getFullYear() - createdYear + 1 },
    (_, i) => createdYear + i
  );

  const isLessThanOneYear =
    currentDate.getFullYear() === createdYear &&
    currentDate.getMonth() + 1 < createdMonth;
  const monthRange = isLessThanOneYear
    ? Array.from(
      { length: currentDate.getMonth() + 1 - createdMonth + 1 },
      (_, i) => createdMonth + i
    )
    : Array.from({ length: 12 }, (_, i) => i + 1);



  return (
    <>
      {isModalOpen && (
        <ReportModal
          request={selectedIssue}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
      <header className="w-full p-4 bg-gray-800 text-white flex justom justify-between">
        {/* Header content goes here */}
        <h1 className="text-xl my-auto">
          {isNameLoading ? <Loading /> : isNameError ? "Error" : name}
        </h1>
        <div className="flex items-center space-x-4">
          <NotificationComponent />
          <LogoutButton />
        </div>
      </header>
      <div className="p-10 bg-slate-300 grow flex gap-5">
        <section
          className="bg-slate-200 border border-black p-2 sticky w-fit h-fit"
          aria-labelledby="filters-header"
        >
          <div>Filters:</div>
          <ul>
            {Filters.map((category) => (
              <li key={category} className="mb-1.5">
                <label className="inline-flex items-center gap-2 whitespace-nowrap">
                  <input
                    onChange={handleFilterChange}
                    type="checkbox"
                    value={category}
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
          <div>
            <label>
              Year:
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {yearRange.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Month:
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {monthRange.map((month) => (
                  <option key={month} value={month}>
                    {new Date(0, month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>
        <table className=" w-full h-fit bg-white border rounded-lg overflow-hidden ">
          <thead className="bg-blue-100">
            <tr>
              {headers.map((header) => (
                <th key={header} className="table-header">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => {
              const {
                description,
                status,
                createddate,
                requestType,
                title,
                id,
                image,
              } = request;
              const { truncated, shouldShowReadMore } =
                truncateDescription(description);

              const fields = [
                title,
                <>
                  {truncated}
                  {shouldShowReadMore && (
                    <button
                      className="text-blue-500 ml-2"
                      onClick={() =>
                        Swal.fire({
                          title: `<strong>${title}</strong>`,
                          html: `
                          <img src="http://localhost:3005/image/${image}" alt="${title}" style="width: 100%; max-height: 200px; object-fit: cover; margin-bottom: 15px;" />
                     ${description}
                        `,
                          showCloseButton: true
                        })
                      }
                    >
                      Read More
                    </button>

                  )}
                </>,
                requestType == 'NewRequest' ? "New request" : "Service",
                <button
                  key={id}
                  disabled={status === requestStatus.completed}
                  onClick={() => toggleModal(request)}
                  className={`inline-block px-2 py-1 rounded-full text-white ${request.reportId
                    ? "bg-gray-400"
                    : status === requestStatus.completed
                      ? "bg-green-500"
                      : status === requestStatus.inProgress
                        ? "bg-blue-400"
                        : "bg-yellow-400"
                    }`}
                >
                  {status}
                </button>,
                new Date(createddate).toLocaleDateString(),
              ];
              return (
                <tr key={request.id} className=" border-gray-300 text-center ">
                  {fields.map((field, index) => (
                    <td key={index} className="p-4">
                      {field}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TechnicianTasks;
