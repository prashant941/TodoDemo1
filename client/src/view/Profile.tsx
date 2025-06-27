import React from "react";

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24">
          <img
            className="w-full h-full object-cover rounded-full border-2 border-blue-500"
            src="https://i.pravatar.cc/100"
            alt="User avatar"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">johndoe@example.com</p>
          <p className="mt-1 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            Admin
          </p>
        </div>

        <div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
