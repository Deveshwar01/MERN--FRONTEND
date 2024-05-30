import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdvertisement, STATUSES } from "../redux/adsAuth";
import { toast } from "react-hot-toast";

const AdvertisementForm = () => {
  const dispatch = useDispatch();
  const adStatus = useSelector((state) => state.adsAuth.status);
  const adMessage = useSelector((state) => state.adsAuth.message);
  const adError = useSelector((state) => state.adsAuth.error);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAdvertisement(formData));
    setFormData({
      title: "",
      image: "",
      description: "",
    });
  };

  useEffect(() => {
    if (adStatus === STATUSES.IDLE && adMessage) {
      toast.success(adMessage);
    } else if (adStatus === STATUSES.ERROR && adError) {
      toast.error(adError);
    }
  }, [adStatus, adMessage, adError]);

  return (
    <>
      <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
        <div className="container h-full p-10">
          <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full max-w-4xl">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* Left Section: Form */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-5">
                      <div className="text-center">
                        <img
                          className="mx-auto w-48"
                          src="https://media.licdn.com/dms/image/D560BAQHJWgsrYrVZEg/company-logo_200_200/0/1706878834323/voiaxis_ltd_logo?e=1724889600&v=beta&t=ZFFUGXcXet-lcl5CGq1v9HwvR5NeSwfrGP8RugimLew"
                          alt="logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Post Your Advertisement
                        </h4>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <label htmlFor="title" className="block text-gray-700">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />

                        <div className="mb-4">
                          <label
                            htmlFor="image"
                            className="block text-gray-700"
                          >
                            Image
                          </label>

                          <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <label
                          htmlFor="description"
                          className="block text-gray-700"
                        >
                          Description:
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
                          rows="5"
                        ></textarea>

                        {/* Submit Button */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            type="submit"
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                            disabled={adStatus === STATUSES.LOADING}
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            {adStatus === STATUSES.LOADING
                              ? "Posting..."
                              : "Post Advertisement"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right Section: Info */}
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-2xl font-semibold">
                        Boost Your Business: Post Your Ad Now and Reach
                        Thousands!
                      </h4>
                      <p className="text-sm leading-6">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdvertisementForm;
