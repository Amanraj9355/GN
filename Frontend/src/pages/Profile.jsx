import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/store";
import { Camera, Edit2, Save, X } from "lucide-react";

const Profile = () => {
  const { getUserProfile,updateProfile } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
  const fetchData = async () => {
    const data = await getUserProfile();
    if (data) {
      setUserData(data);
      setFormData(data);
    }
  };
  fetchData();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    updateProfile(formData)
    setUserData(formData);
    setEditMode(false);
  };

  if (!userData) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg animate-pulse">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 overflow-hidden text-black ">
      {/* Header Section */}
      <div className="p-6 md:px-0 relative">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={userData.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm_q0Tl8rn9w5XhHOpWyJIqpj5Kjau7zlDP7UVQ4l-CbxbILWnz9saPVyPkeaqhjujPPc&usqp=CAU"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>
          <div className="text-black">
            <h2 className="text-2xl font-bold">{userData.name}</h2>
            <p className="text-gray-800">{userData.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-6 md:px-0 space-y-4">
        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none transition ${
              !editMode && "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Address Fields */}
        <div>
          <label className="block text-gray-700 font-medium">Street</label>
          <input
            type="text"
            name="address.street"
            value={formData.address?.street || ""}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none transition ${
              !editMode && "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">City</label>
            <input
              type="text"
              name="address.city"
              value={formData.address?.city || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none transition ${
                !editMode && "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Pincode</label>
            <input
              type="text"
              name="address.pincode"
              value={formData.address?.pincode || ""}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none transition ${
                !editMode && "bg-gray-100 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">State</label>
          <input
            type="text"
            name="address.state"
            value={formData.address?.state || ""}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400 outline-none transition ${
              !editMode && "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Last Updated Info */}
        <p className="text-xs text-gray-400 mt-3">
          Last updated: {new Date(userData.updatedAt).toLocaleString()}
        </p>

        {/* Buttons */}
        <div className="flex justify-end mt-4 space-x-3">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="flex items-center gap-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                <X size={18} /> Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Save size={18} /> Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Edit2 size={18} /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
