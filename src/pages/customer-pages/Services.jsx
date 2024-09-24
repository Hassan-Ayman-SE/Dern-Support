import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSeriveces } from "../../hooks/useAdminServiceHook";
import Loading from "../../components/Loading";
import SearchInput from "../../components/SearchInput";
import Swal from "sweetalert2";


export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useSeriveces();
  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    Swal.fire("Error!", "There was an issue when rendering the page.", "error");
    return null;
  }

  const filteredServices = data?.filter((service) =>
    service?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 my-10 mt-40">
      <div className="mb-16">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search services..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {filteredServices?.map((e) => (
          <div
            key={e?.id}
            className="transform transition-transform hover:scale-105 duration-300"
          >
            <div className="mx-auto bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={`http://localhost:3005/image/${e?.image}`}
                width="375"
                height="200"
                className="rounded-t-lg h-80 object-cover"
                alt={e?.title}
                loading="lazy"
              />
              <div className="p-4">
                <Link
                  to={`/services/${e?.id}`}
                  state={{ readMore: e, to: "/services" }}
                  className="font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors duration-300"
                >
                  {e?.title}
                </Link>
                <span className="text-gray-500 pt-2 font-semibold block">
                  {e?.actualcost}$
                </span>
                <div className="h-28">
                  <span className="line-clamp-4 py-2 text-sm font-light text-gray-700">
                    {e?.issuedescription}
                  </span>
                </div>
                <Link
                  to={`/services/${e?.id}`}
                  state={{ readMore: e }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 mt-4 block text-center"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


}
