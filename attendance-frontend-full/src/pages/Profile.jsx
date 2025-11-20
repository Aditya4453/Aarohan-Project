// Profile placeholder
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { userAPI } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await userAPI.getProfile();
      setProfile(res.data);
    } catch (err) {
      console.error("Error loading profile:", err);
      // Fallback to user from context
      const userData = localStorage.getItem('user');
      if (userData) {
        setProfile(JSON.parse(userData));
      }
    }
  };

  if (!profile) {
    return (
      <Layout>
        <div className="text-center p-8">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white p-8 shadow-md rounded-lg w-full md:w-1/2">
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">{profile.name}</h2>
        </div>
        
        <div className="space-y-4 border-t pt-6">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-600">{profile.email}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="font-semibold text-gray-700">Role:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              profile.role === 'teacher' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {profile.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : 'N/A'}
            </span>
          </div>
          {profile.id && (
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-gray-700">User ID:</span>
              <span className="text-gray-600">#{profile.id}</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
