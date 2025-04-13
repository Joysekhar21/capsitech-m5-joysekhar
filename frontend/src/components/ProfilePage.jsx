import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import SkeletonProfile from "./SkeletonProfile";
import { ChevronLeft } from "lucide-react";
import UpdateAvatar from "./UpdateAvatar";
import { useUser } from "../context/UserContextProvider";
import { CheckboxDemo } from "./CheckboxDemo";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { fetchUser, loading, updateDetails, user, updatePassword } = useUser();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [updateAvatarModal, setUpdateAvatarModal] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [creds, setCreds] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "Test@12345",
  });

  const navigate = useNavigate()

  const handleDetailsUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setShowPwd(false);
    await updateDetails({
      name: creds.name,
      email: creds.email,
      password: creds.password,
    });
    setUpdateLoading(false);
    setEditDetails(false);
  };

  const handleChange = (e) => {
    const input = e.target ;
    setCreds({ ...creds, [input.name]: input.value });
  };

  const [passwords, setPasswords] = useState({
    oldPassword: "Test@12345",
    newPassword: "Test@12345",
  });
  const [editPasswords, setEditPasswords] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    await updatePassword(passwords.oldPassword, passwords.newPassword);
    setUpdateLoading(false);
    setEditPasswords(false);
    setShowPasswords(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("todo-accessToken");
    if (!token) navigate("/");
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.name && !editDetails) {
      setCreds({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        password: "Test@12345",
      });
    }
  }, [user]);

  return (
    <main className="w-full 2xl:p-16 xl:p-16 lg:p-16 md:p-10 p-6">
      <button
        onClick={() => navigate("/home")}
        className="absolute flex items-center gap-2 px-4 py-2 rounded-md text-white bg-black dark:bg-white dark:text-black top-10 2xl:right-20 xl:right-20 lg:right-20 md:right-10 right-10 hover:opacity-90 transition"
      >
        <ChevronLeft size={18} />
        Back to home
      </button>

      <UpdateAvatar
        updateAvatarModal={updateAvatarModal}
        setUpdateAvatarModal={setUpdateAvatarModal}
      />

      {loading ? (
        <SkeletonProfile />
      ) : (
        <>
          <img
            src={user.avatar}
            className="h-32 w-32 rounded-full mb-8 cursor-pointer object-cover"
            alt="avatar"
            onClick={() => setUpdateAvatarModal(true)}
          />

          {/* Update Name & Email */}
          <form onSubmit={handleDetailsUpdate}>
            <h3 className="text-2xl my-4">Update email and name</h3>

            <label htmlFor="profile-name" className="block font-medium mt-2">
              Name
            </label>
            <input
              id="profile-name"
              name="name"
              type="text"
              value={creds.name}
              className="w-[350px] my-2 px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-800"
              disabled={!editDetails}
              onChange={handleChange}
              autoComplete="name"
            />

            <label htmlFor="profile-email" className="block font-medium mt-2">
              Email
            </label>
            <input
              id="profile-email"
              name="email"
              type="text"
              value={creds.email}
              className="w-[350px] my-2 px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-800"
              disabled={!editDetails}
              onChange={handleChange}
              autoComplete="email"
            />

            <label htmlFor="profile-password" className="block font-medium mt-2">
              Password
            </label>
            <input
              id="profile-password"
              name="password"
              type={editDetails && showPwd ? "text" : "password"}
              value={creds.password}
              className="w-[350px] my-2 px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-800"
              disabled={!editDetails}
              onChange={handleChange}
              autoComplete="off"
            />

            <CheckboxDemo
              label="Show password"
              setShowPassword={setShowPwd}
              disabled={!editDetails}
              uniqueId="show-pwd"
            />

            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                disabled={
                  creds.name.length < 1 ||
                  creds.email.length < 4 ||
                  creds.password.length < 8 ||
                  !editDetails ||
                  updateLoading
                }
                className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50 dark:bg-white dark:text-black"
              >
                Update
              </button>

              <button
                type="button"
                onClick={() => {
                  setCreds({
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    password: "",
                  });
                  setEditDetails((prev) => !prev);
                }}
                className="border border-gray-300 px-4 py-2 rounded-md dark:bg-gray-900"
              >
                {editDetails ? "Cancel" : "Edit"}
              </button>
            </div>
          </form>

          {/* Update Password */}
          <form onSubmit={handlePasswordUpdate} className="mt-12">
            <h3 className="text-2xl my-4">Update current password</h3>

            <label htmlFor="current-password" className="block font-medium mt-2">
              Current Password
            </label>
            <input
              id="current-password"
              name="oldPassword"
              type={showPasswords && editPasswords ? "text" : "password"}
              value={passwords.oldPassword}
              className="w-[350px] my-2 px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-800"
              disabled={!editPasswords}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              autoComplete="off"
            />

            <label htmlFor="new-password" className="block font-medium mt-2">
              New Password
            </label>
            <input
              id="new-password"
              name="newPassword"
              type={showPasswords && editPasswords ? "text" : "password"}
              value={passwords.newPassword}
              className="w-[350px] my-2 px-3 py-2 border rounded-md focus:outline-none dark:bg-gray-800"
              disabled={!editPasswords}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              autoComplete="off"
            />

            <CheckboxDemo
              label="Show passwords"
              setShowPassword={setShowPasswords}
              uniqueId="update-password"
              disabled={!editPasswords}
            />

            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                disabled={
                  passwords.oldPassword.length < 8 ||
                  passwords.newPassword.length < 8 ||
                  !editPasswords ||
                  updateLoading
                }
                className="bg-black text-white px-4 py-2 rounded-md disabled:opacity-50 dark:bg-white dark:text-black"
              >
                Update
              </button>

              <button
                type="reset"
                onClick={() => setEditPasswords((prev) => !prev)}
                className="border border-gray-300 px-4 py-2 rounded-md dark:bg-gray-900"
              >
                {editPasswords ? "Cancel" : "Edit"}
              </button>
            </div>
          </form>
        </>
      )}
    </main>
  );
};

export default ProfilePage;
