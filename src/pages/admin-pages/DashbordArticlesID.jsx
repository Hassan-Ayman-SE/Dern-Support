import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  useUpdateArticle,
  useGetAllArticles,
  useDeleteArticle,
} from "../../hooks/adminDashboard";

export default function DashbordArticlesID() {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state?.articles;
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(info?.description || "");
  const { refetch } = useGetAllArticles();
  const updateArticleMutation = useUpdateArticle();
  const deleteArticleMutation = useDeleteArticle();

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const updatedArticle = {
          id: info?.id,
          title: info?.title,
          description,
          image: info?.image,
        };

        await updateArticleMutation?.mutateAsync(updatedArticle);

        Swal.fire("Success!", "Your article has been updated.", "success");

        refetch();
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an issue updating your article.",
          "error"
        );
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });
    refetch();

    if (result.isConfirmed) {
      try {
        deleteArticleMutation?.mutateAsync(info?.id);
        Swal.fire("Deleted!", "Your article has been deleted.", "success");
        refetch();
        navigate("/dashbord/article");
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an issue deleting your article.",
          "error"
        );
        return;
      }
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex justify-center items-center w-full mt-5 mb-10">
          <form className="w-9/12">
            <div className="mb-2 text-lg">
              <h1>{info?.title}</h1>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Article Image
              </label>
              {info?.image && (
                <img
                  src={`http://localhost:3005/image/${info?.image
                    }`}
                  alt="Article"
                  className="w-1/2 h-96 rounded-lg p-0"
                />
              )}
            </div>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                <label htmlFor="editor" className="sr-only">
                  Article
                </label>
                <textarea
                  id="editor"
                  className="block p-2.5 w-full h-72 text-sm text-gray-900 bg-white rounded-lg border border-gray-300
                                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-auto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="flex">
              <button
                type="button"
                onClick={handleEditToggle}
                className="inline-flex items-center px-5 py-2.5 mr-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg focus:ring-4 focus:ring-yellow-200 dark:focus:ring-yellow-900 hover:bg-yellow-600"
              >
                {isEditing ? "Save" : "Edit"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
