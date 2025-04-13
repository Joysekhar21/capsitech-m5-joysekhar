import { useRef, useState, FormEvent } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContextProvider";

const defaultAvatar = "https://res.cloudinary.com/dtiymmunh/image/upload/v1744533921/blank-profile-picture-973460_1280_gppsom.webp";



export default function UpdateAvatar({
  updateAvatarModal,
  setUpdateAvatarModal,
}) {
  const { updateAvatar, user, removeAvatar } = useUser();
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];

    if (!file) return toast.error("Please select a file");
    if (!["image/jpeg", "image/png"].includes(file.type))
      return toast.error("Only JPG and PNG files are allowed");

    if (file.size > 2 * 1024 * 1024)
      return toast.error("File size should be less than 2MB");

    try {
      setLoading(true);
      await updateAvatar(file);
      toast.success("Avatar updated successfully");
      setUpdateAvatarModal(false);
    } catch (err) {
      toast.error("Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (user.avatar === defaultAvatar) return;
    try {
      setLoading(true);
      await removeAvatar();
      toast.success("Avatar removed");
      setUpdateAvatarModal(false);
    } catch (err) {
      toast.error("Failed to remove avatar");
    } finally {
      setLoading(false);
    }
  };

  if (!updateAvatarModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-[#0a0a0a] p-6 shadow-lg selection:bg-gray-300 dark:selection:bg-slate-800">
        <h2 className="text-xl font-semibold mb-4">Update Avatar</h2>
        
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="image-upload"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Select File
            <p className="block text-xs font-medium text-gray-700 dark:text-gray-300">* File size should be less than 2MB</p>
          </label>
          <input
            id="image-upload"
            type="file"
            ref={fileInput}
            accept="image/jpeg,image/png"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 dark:bg-[#101010] dark:border-gray-600 my-2"
            disabled={loading}
          />

          <div className="flex justify-end gap-2 mt-4 flex-wrap">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => setUpdateAvatarModal(false)}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={user.avatar === defaultAvatar || loading}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600 disabled:opacity-50"
            >
              {loading ? "Removing..." : "Remove Avatar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
