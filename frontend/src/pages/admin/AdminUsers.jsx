import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/adminServices.js";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
      toast.success("User deleted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            All Users
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {users.length} total users
          </p>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-400 transition w-full md:w-48"
        />
      </div>

      {/* MOBILE — Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((u) => (
          <div
            key={u._id}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text-white font-bold text-sm flex items-center justify-center shrink-0">
                {u.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{u.name}</p>
                <p className="text-xs text-gray-400 font-mono">{u.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold uppercase
                  ${
                    u.role === "admin"
                      ? "bg-red-50 text-red-500"
                      : u.role === "instructor"
                        ? "bg-blue-50 text-blue-500"
                        : "bg-emerald-50 text-emerald-500"
                  }`}
                  >
                    {u.role}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(u.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(u._id)}
              className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition flex-shrink-0"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* DESKTOP — Table */}
      <div className="hidden md:block bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr
                  key={u._id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                        {u.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                    ${
                      u.role === "admin"
                        ? "bg-red-50 text-red-500"
                        : u.role === "instructor"
                          ? "bg-blue-50 text-blue-500"
                          : "bg-emerald-50 text-emerald-500"
                    }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-400">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-bold rounded-lg hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
