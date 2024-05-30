import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvertisement, STATUSES } from "../../redux/Admin/AdminDash";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const advertisements = useSelector((state) => state.ads.data);
  const status = useSelector((state) => state.ads.status);
  const userRole = useSelector(
    (state) => state.userLogin.data && state.userLogin.data.user.role
  );

  useEffect(() => {
    dispatch(fetchAdvertisement());
  }, [dispatch]);
  if (userRole !== "admin") {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-red-600">
          You are not authorized to access this page.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Your Advertisements
      </h2>
      {status === STATUSES.LOADING && <p className="text-center">Loading...</p>}
      {status === STATUSES.ERROR && (
        <p className="text-center text-red-500">Error fetching data</p>
      )}
      {status === STATUSES.IDLE && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10">
          {advertisements?.map((ad) => (
            <div
              key={ad._id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {ad.title}
                </h3>
                <p className="text-gray-600">{ad.description}</p>
                <p className="text-gray-500 text-sm mt-4">
                  Posted on: {new Date(ad.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
