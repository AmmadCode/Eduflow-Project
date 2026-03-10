import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateProfile, changePassword } from "../../services/userServices";
import { toast } from "react-toastify";

const StudentProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const handleUpdateName = async () => {
    try {
      setNameLoading(true);
      const data = await updateProfile(name);
      setUser(data.user);
      toast.success("Name updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setNameLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setPassLoading(true);
      await changePassword(oldPassword, newPassword);
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Change failed");
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          My Profile
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your account settings
        </p>
      </div>

      {/* Update Name */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-7 mb-5">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-emerald-100 flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400 font-mono mt-1">
              {user?.email}
            </p>
            <span className="inline-block mt-2 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-md uppercase tracking-wide">
              {user?.role}
            </span>
          </div>
        </div>

        <h2 className="font-bold text-gray-900 mb-4">Change Name</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
            placeholder="Your name"
          />
          <button
            onClick={handleUpdateName}
            disabled={nameLoading}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl transition disabled:opacity-50"
          >
            {nameLoading ? "Saving..." : "Save Name"}
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Email: {user?.email} (cannot be changed)
        </p>
      </div>

      {/* Change Password */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 md:p-7">
        <h2 className="font-bold text-gray-900 mb-4">Change Password</h2>
        <div className="space-y-3 w-full md:max-w-md">
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
            placeholder="Current Password"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400 transition"
            placeholder="New Password"
          />
          <button
            onClick={handleChangePassword}
            disabled={passLoading}
            className="w-full sm:w-auto px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold rounded-xl transition disabled:opacity-50"
          >
            {passLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
