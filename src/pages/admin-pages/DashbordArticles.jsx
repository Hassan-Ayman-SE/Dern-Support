import React, { useState } from "react";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { useGetAllArticles } from "../../hooks/adminDashboard";

export default function DashboardArticles(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const { data, isLoading, error } = useGetAllArticles();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No articles found.</div>;
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="bg-background-gradient flex justify-center p-10 bg-gray-100">
        <div className="w-full lg:w-9/12 mx-auto p-5 bg-white rounded-lg shadow-lg">
          <div className="space-y-8">
            {currentItems.map((article) => (
              <div key={article.id} className="flex  flex-col gap-5 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                {/* Image Section */}
                <div className="h-48 overflow-hidden rounded-lg" title="Image">
                  <img
                    src={`http://localhost:3005/image/${article.image}`}
                    alt={article.title}
                    className="h-full w-full object-cover rounded-lg"
                  />
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-between">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3">
                      {article.description}
                    </p>
                  </div>

                  {/* Read More Button */}
                  <div className="flex justify-end">
                    {props.flag === "customer" ? null : (
                      <Link
                        to={`/dashboard/article/${article.id}`}
                        state={{ articles: article }}
                        className="inline-block text-blue-600 hover:text-blue-800 bg-blue-50 py-2 px-4 rounded-md transition-colors duration-300"
                      >
                        Read More
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white"}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
