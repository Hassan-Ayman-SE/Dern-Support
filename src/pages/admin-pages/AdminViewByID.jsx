import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Loading from "../../components/Loading";
import { requestStatus } from '../../utils/Constants';

export default function AdminViewByID() {
  const [isEditing, setIsEditing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || {});
  console.log(user);

  if (!user) {
    navigate("/support-requests/getAll");
    return <Loading />;
  }

  const handleAddToService = () => {
    const newService = {
      id: user.customerid,
      title: user.title,
      description: user.issuedescription,
      cost: user.actualcost,
      image: user.image,
      date: user.createddate,
    };
    navigate("/AddNewService", { state: { service: newService } });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <>
      <div className="p-10 bg-slate-300 h-full w-full flex gap-5">
        <div className="h-full w-9/12 mx-auto my-16 p-0 bg-white rounded-lg">
          <div className="mt-8">
            <div className="flex flex-col mt-8">
              <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Name
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Status
                        </th>
                        <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                          Maintenance Time
                        </th>
                        <th className="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium leading-5 text-gray-900">
                                {user?.name}
                              </div>
                              <div className="text-sm leading-5 text-gray-500">
                                {user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 text-xs font-semibold leading-5 text-white rounded-full
                                                    ${user?.status === requestStatus.completed
                                ? "bg-green-500"
                                : user?.status === requestStatus.inProgress
                                  ? "bg-blue-400"
                                  : "bg-yellow-400"
                              }
                                                    `}
                          >
                            {user?.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap text-center">
                          {user?.maintenancetime ? `${user?.maintenancetime} Hours` : "-"}
                        </td>
                        <td>
                          {user?.status === requestStatus.completed && (
                            <button
                              onClick={handleAddToService}
                              className="mt-1 px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            >
                              Add To Service
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="mt-3 lg:max-w-full lg:flex mx-auto h-full w-4/5 my-10 p-1 bg-white rounded-lg flex-col">
              <div className="flex-none overflow-hidden text-center rounded-t lg:w-full">
                <img
                  src={`http://localhost:3005/image/${user.image}`}
                  alt={user.title}
                  className="h-48 w-full object-cover rounded-t lg:h-auto lg:rounded-t-lg lg:rounded-none"
                />
              </div>
              <div className="flex flex-col justify-between p-4 leading-normal bg-white border border-gray-200 rounded-b lg:rounded-none">
                <div className="mb-8">
                  <div className="mb-2 text-xl font-bold text-gray-900">
                    {user.title}
                  </div>
                  <p className="text-base text-gray-700">
                    {user.issuedescription}
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-8">
            <div className="p-6 bg-white rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-gray-700 capitalize mx-auto max-w-4xl">
                Edit The Information
              </h2>
              <form onSubmit={handleSave} className="mx-auto max-w-4xl">
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label className="text-gray-700" htmlFor="cost">
                      Cost
                    </label>
                    <input
                      id="cost"
                      name="cost"
                      value={user?.actualcost}
                      onChange={handleChange}
                      className={`w-full mt-2 p-3 border rounded-md ${!isEditing
                        ? "focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        : "bg-gray-100 cursor-not-allowed read-only:bg-gray-100"
                        }`}
                      type="text"
                      readOnly={isEditing}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="text-gray-700" htmlFor="date">
                        Time
                      </label>
                      <input
                        id="date"
                        name="date"
                        value={user?.maintenancetime}
                        onChange={handleChange}
                        className={`w-full mt-2 p-3 border rounded-md ${!isEditing
                          ? "focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                          : "bg-gray-100 cursor-not-allowed"
                          }`}
                        type="text"
                        readOnly={isEditing}
                      />
                    </div>
                    <div className="mt-8">
                      {isEditing ? (
                        <span
                          className="cursor-pointer px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                          onClick={handleEdit}
                        >
                          Edit
                        </span>
                      ) : (
                        <button
                          type="submit"
                          className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
