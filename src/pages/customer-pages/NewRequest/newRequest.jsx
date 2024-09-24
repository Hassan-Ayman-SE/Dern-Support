import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestForm from "../../../components/RequestForm";
import Loading from "../../../components/Loading";
import "./newRequest.css";
import axios from "axios";
import { useAuth } from "../../../contexts/auth";
import Modal from "react-modal";
import { FaCheckCircle } from "react-icons/fa"; // For check icon
import {
  usenewRequest,
  useApproveRequest,
} from "../../../hooks/useNewRequestHook";
import { color } from "html2canvas/dist/types/css/types/color";
import { red } from "@mui/material/colors";
// Set the root element for the modal
Modal.setAppElement("#root");

function NewRequest() {
  const newrequestMutation = usenewRequest();
  const approveRequestmutation = useApproveRequest();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [feedback, setFeedback] = useState({
    estimatedCost: 0,
    estimatedTime: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State for feedback modal visibility
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for success modal visibility
  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to handle form submission
  const handleSubmit = async (formData) => {
    setLoading(true); // Set loading to true while processing
    const data = { Category: formData.Category };
    try {
      // Post the form data to the backend
      const response = await newrequestMutation.mutateAsync(data);
      console.log(response);

      setData(formData);

      // Process the response data
      setFeedback({
        estimatedCost: response.EstimatedCost,
        estimatedTime: response.EstimatedTime.split("T")[0],
      });
      setModalMessage(
        "Your request has been submitted successfully. You can track the status of your request by going to the 'My Requests' page."
      );
      setIsModalOpen(true); // Open feedback modal
    } catch (error) {
      console.error("Error submitting request:", error);
      setFeedback({ error: "There was an error submitting your request." });
      setModalMessage(
        "There was an error submitting your request. Please try again later."
      );
      setIsModalOpen(true); // Open feedback modal
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  const handleApprove = async () => {
    setLoading(true); // Set loading to true while processing
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Title", data.Title);
      formDataToSend.append("Description", data.Description);
      formDataToSend.append("Category", data.Category);
      formDataToSend.append("DeviceDeliveryMethod", data.DeviceDeliveryMethod);
      if (data.image) {
        formDataToSend.append("image", data.image);
      }
      console.log(formDataToSend);

      const response = await approveRequestmutation.mutateAsync(formDataToSend);

      setIsModalOpen(false); // Close feedback modal
      setModalMessage(
        "Your request has been successfully approved. You can track the status of your request by going to the 'My Requests' page."
      );
      setIsSuccessModalOpen(true); // Open success modal
    } catch (error) {
      console.error("Error approving request:", error);
      setFeedback({ error: "There was an error approving your request." });
      setModalMessage(
        "There was an error approving your request. Please try again later."
      );
      setIsModalOpen(false); // Close feedback modal
      setIsSuccessModalOpen(true); // Open success modal
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close feedback modal
    setIsSuccessModalOpen(false); // Close success modal
    navigate("/newRequest"); // Navigate back to the newRequest page
  };

  const handleGoToRequests = () => {
    setIsSuccessModalOpen(false); // Close success modal
    navigate("/allRequests"); // Navigate to my-requests page
  };

  return (
    <div className="my-44 new-request-container bg-gradient-to-r from-customBlueLight via-customCyan to-customTeal text-customWhite py-10 px-8 rounded-3xl shadow-lg">
      {loading && <Loading />} {/* Show loading spinner if loading is true */}
      <h2 className="text-3xl font-bold text-customWhite mb-6">
        Submit a New Support Request
      </h2>
      <RequestForm
        onSubmit={handleSubmit}
        loading={loading}
        flag="customer"
        inputStyle="text-black bg-customWhite border border-customBlueLight rounded-md p-2 mb-4"
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        className="modal-content bg-gradient-to-b from-customBlueDark to-customBlueDarker text-customWhite rounded-lg shadow-lg p-6"
        overlayClassName="modal-overlay bg-opacity-50 bg-customDarkGray"
      >
        <div className="modal-header bg-customTeal text-customWhite py-3 px-4 rounded-t-lg">
          <h3 className="text-lg font-semibold">Request Submitted</h3>
        </div>
        <div className="modal-body p-4 text-lg text-customLight">
          {feedback?.error ? (
            <p>{feedback.error}</p>
          ) : (
            <div>
              <p style={{ color: "white" }}>
                Estimated Cost:{" "}
                <span className="font-semibold">{feedback.estimatedCost}</span>
              </p>
              <p style="color: white">
                Estimated Time:{" "}
                <span className="font-semibold">{feedback.estimatedTime}</span>
              </p>
            </div>
          )}
        </div>
        <div className="modal-footer flex justify-between mt-4">
          <button
            onClick={handleApprove}
            className="approve-btn bg-customCyan text-customWhite px-4 py-2 rounded-full hover:bg-customBlueLight transition duration-300"
          >
            Approve Request
          </button>
          <button
            onClick={handleCancel}
            className="cancel-btn bg-customTeal text-customWhite px-4 py-2 rounded-full hover:bg-customBlueLight transition duration-300"
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isSuccessModalOpen}
        onRequestClose={handleCancel}
        className="modal-content success-modal bg-gradient-to-r from-customTeal to-customCyan text-customWhite rounded-lg shadow-lg p-6"
        overlayClassName="modal-overlay bg-opacity-50 bg-customDarkGray"
      >
        <div className="modal-header bg-customTeal text-customWhite py-3 px-4 rounded-t-lg">
          <h3 className="text-lg font-semibold">Success</h3>
        </div>
        <div className="modal-body text-center">
          <FaCheckCircle className="success-icon text-4xl text-customCyan mb-4" />
          <p className="text-lg">{modalMessage}</p>
        </div>
        <div className="modal-footer flex justify-between mt-4">
          <button
            onClick={handleGoToRequests}
            className="go-to-requests-btn bg-customTeal text-customWhite px-4 py-2 rounded-full hover:bg-customBlueLight transition duration-300"
          >
            View
          </button>
          <button
            onClick={handleCancel}
            className="cancel-btn bg-customCyan text-customWhite px-4 py-2 rounded-full hover:bg-customBlueLight transition duration-300"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default NewRequest;
