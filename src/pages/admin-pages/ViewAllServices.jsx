import React, { useState, useEffect } from "react";
import Modal from "../../components/modals/ServiceModal";
import SuccessModal from "../../components/modals/SuccessModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDeleteService, useSeriveces, useUpdateService } from "../../hooks/useAdminServiceHook";
import Loading from "../../components/Loading";
import NotFound from "../NotFound";
import { Link } from "react-router-dom";

function ViewAllServices() {
  const updateMutation = useUpdateService();
  const deleteMutation = useDeleteService();
  const { data, isLoading, isError, refetch } = useSeriveces();
  const [services, setServices] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [editService, setEditService] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);

  useEffect(() => {
    if (data) {
      setServices(data);
      console.log(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <NotFound />;
  }

  const filteredServices = filterCategory
    ? data.filter((service) => service.category === filterCategory)
    : data;

  const handleDelete = (id) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setDeleteMessage(true);
        refetch(); // Refetch services data after successful deletion
      }
    });
  };

  const handleEdit = (service) => {
    setEditService(service);
  };

  const handleUpdateService = (updatedService) => {
    updateMutation.mutate(updatedService, {
      onSuccess: () => {
        setSuccessMessage(true);
        refetch(); // Refetch services data after successful update
        setEditService(null);
        setTimeout(() => setSuccessMessage(false), 5000);
      }
    });
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center bg-customBlueLightBg py-8">
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-extrabold text-customBlueDarker mb-6 text-center">
            View All Services
          </h1>

          {/* Filter by Category */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4">
            <label className="font-semibold text-lg text-customBlueDark">
              Filter by Category:
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-3 border border-customDarkGray rounded-md focus:outline-none focus:ring-2 focus:ring-customBlueLight"
            >
              <option value="">All Categories</option>
              <option value="software">Software</option>
              <option value="hardware">Hardware</option>
            </select>
          </div>

          {/* Table of Services */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-customWhite shadow-md rounded-lg">
              <thead className="bg-customBlueLight text-customWhite">
                <tr>
                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Title</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Actual Cost</th>
                  <th className="px-6 py-4 text-left">Time (Minutes)</th>
                  <th className="px-6 py-4 text-left">Description</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-customWhite">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="border-t border-customDarkGray hover:bg-customBlueLightBg">
                    <td className="px-6 py-4">{service.id}</td>
                    <td className="px-6 py-4 text-customBlueDarker font-semibold truncate">{service.title}</td>
                    <td className="px-6 py-4">{service.category}</td>
                    <td className="px-6 py-4">${service.actualcost}</td>
                    <td className="px-6 py-4">{service.maintenancetime} minutes</td>
                    <td className="px-6 py-4 truncate">{service.issuedescription}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        className="bg-customBlueDarker text-white px-4 py-2 rounded-lg hover:bg-customBlueDark transition duration-300"
                        onClick={() => handleEdit(service)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-customRed text-black px-4 py-2 rounded-lg hover:bg-customRedDark transition duration-300"
                        onClick={() => handleDelete(service.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Service Modal */}
      {editService && (
        <Modal
          service={editService}
          onClose={() => setEditService(null)}
          onSave={handleUpdateService}
        />
      )}

      {/* Success Message Modal */}
      {successMessage && (
        <SuccessModal
          message="Service updated successfully!"
          onClose={() => setSuccessMessage(false)}
        />
      )}

      {/* Delete Message Modal */}
      {deleteMessage && (
        <SuccessModal
          message="Service deleted successfully!"
          onClose={() => setDeleteMessage(false)}
        />
      )}
    </>
  );

}

export default ViewAllServices;
