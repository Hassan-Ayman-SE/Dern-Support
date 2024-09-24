import React, { useState } from 'react';
import { useReports } from '../../hooks/useReports';
import { FaDownload } from 'react-icons/fa';
import generatePDFReprots from "../../helpers/pdfGeneratorReports"
import Loading from '../../components/Loading';
import NotFound from '../NotFound';

const ReportsList = () => {
  const { data, error, isLoading } = useReports();
  const [selectedTechnician, setSelectedTechnician] = useState('');

  if (isLoading) return <Loading />;
  if (error) return <NotFound />;

  const technicianNames = data.reportDetails
    ? Array.from(new Set(data.reportDetails.map(report => report.technicianname)))
    : [];

  const filteredReports = data.reportDetails.filter(report =>
    selectedTechnician ? report.technicianname === selectedTechnician : true
  );

  const handleDownloadReport = async () => {
    const reportTable = document.querySelector('.overflow-x-auto');
    await generatePDFReprots([reportTable]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
        Technician Reports
      </h1>

      <div className="mb-6">
        <label htmlFor="technician-filter" className="block text-lg font-medium text-gray-700 mb-2">
          Filter by Technician
        </label>
        <select
          id="technician-filter"
          value={selectedTechnician}
          onChange={(e) => setSelectedTechnician(e.target.value)}
          className="border rounded-md p-2 w-full max-w-xs bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Technicians</option>
          {technicianNames.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-2 border-b text-left text-sm font-medium">Report ID</th>
              <th className="py-3 px-2 border-b text-left text-sm font-medium">Comment</th>
              <th className="py-3 px-2 border-b text-left text-sm font-medium">Customer</th>
              <th className="py-3 px-2 border-b text-left text-sm font-medium">Technician</th>
              <th className="py-3 px-2 border-b text-left text-sm font-medium">Spare Part</th>
              <th className="py-3 px-2 border-b text-left text-sm font-medium">Quantity</th>
              <th className="py-3 px-2 border-b text-left text-sm font-medium">Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors">
                  <td className="py-2 px-2 border-b text-sm">{report.reportid}</td>
                  <td className="py-2 px-2 border-b text-sm">{report.reportcomment}</td>
                  <td className="py-2 px-2 border-b text-sm">{report.customername}</td>
                  <td className="py-2 px-2 border-b text-sm">{report.technicianname}</td>
                  <td className="py-2 px-2 border-b text-sm">{report.sparename}</td>
                  <td className="py-2 px-2 border-b text-sm">{report.sparequantity}</td>
                  <td className="py-2 px-2 border-b text-sm">{report.spareprice}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-2 text-center text-gray-600 text-sm">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleDownloadReport}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FaDownload className="inline mr-2" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default ReportsList;
