import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from '../../components/Loading';
import { usesSpportRequestsGetAll } from "../../hooks/adminDashboard";
import { requestStatus } from '../../utils/Constants';

const AdminViewAllRequests = () => {
  const [filterRequest, setFilterRequest] = useState("all");

  const { data, isLoading, error } = usesSpportRequestsGetAll();
  const headers = ["Name", "Title", "Status", "Maintenance Time", "Actions"];

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>There is an error</p>;
  }

  const filteredRequest = (filterRequest === "all"
    ? data
    : data?.filter((request) => request?.status === filterRequest)
  )?.filter((request) => request?.requesttype === "NewRequest");

  return (
    <>
      <div className="flex justify-center mx-auto">
        <div className="flex flex-col mt-8 max-w-6xl w-full">
          {/* Filter by Request Section */}
          <div className="mb-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <label className="font-semibold text-lg text-customBlueDark">Filter by Request:</label>
            <select
              value={filterRequest}
              onChange={(e) => setFilterRequest(e.target.value)}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customTeal"
            >
              <option value="all">All Requests</option>
              <option value={requestStatus.pending}>{requestStatus.pending}</option>
              <option value={requestStatus.completed}>{requestStatus.completed}</option>
              <option value={requestStatus.inProgress}>{requestStatus.inProgress}</option>
            </select>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle border-b border-gray-200 shadow-md sm:rounded-lg">
              <table className="min-w-full bg-gradient-to-r from-customBlueLightBg to-customTeal rounded-lg overflow-hidden">
                <thead className="bg-customBlueDark text-customWhite">
                  <tr>
                    {headers?.map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-xs font-semibold leading-4 tracking-wider text-left text-customWhite uppercase border-b border-gray-300"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-customWhite">
                  {filteredRequest?.map((u) => (
                    <tr key={u?.id} className="hover:bg-customBlueLightBg">
                      <td className="px-6 py-4 border-b border-gray-300 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-customBlueDark">{u?.name}</div>
                            <div className="text-sm text-gray-500">{u?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-gray-300 whitespace-nowrap">
                        <div className="text-sm text-customBlueDarker w-36 truncate">{u?.title || 'N/A'}</div>
                      </td>

                      <td className="px-6 py-4 border-b border-gray-300 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 text-xs font-semibold leading-5 text-white rounded-full
                          ${u?.status === requestStatus.completed
                              ? "bg-green-500"
                              : u?.status === requestStatus.inProgress
                                ? "bg-blue-400"
                                : "bg-yellow-400"}
                        `}
                        >
                          {u?.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 border-b border-gray-300 whitespace-nowrap text-center">
                        {u?.maintenancetime ? `${u?.maintenancetime} Hours` : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right border-b border-gray-300 whitespace-nowrap">
                        <Link
                          to={`/support-requests/getAll/${u?.id}`}
                          state={{ user: u }}
                          className="text-customCyan hover:text-customTeal"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );

};

export default AdminViewAllRequests;
