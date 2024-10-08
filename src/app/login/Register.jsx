"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/loader/Loader";
import apiInstance from "@/helpers/api";

const RegisterModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = new FormData(e.target);
    setLoading(true);

    try {
        const payload = {
            name: data.get('name'),
            userName: data.get('username'),
            mobileNumber: data.get('phoneNumber'),
            email: data.get('email'),
            city : data.get('city')
        }

        const {status} = await apiInstance.registration(payload)

        if (status === 200) {
            toast.success("Thank you for Registering, Our team will Contact you soon!");
            setTimeout(() => onClose(), 2000);
        }

    } catch (err) {
        console.log(err)
        toast.error(err.response.data.error || "Registration Failed !")
    }

    setLoading(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-[92%] ml-4 mr-4 md:w-full h-full flex items-center  justify-center md:mx-0 ${
        isOpen
          ? "visible opacity-100 z-10 backdrop-blur-sm"
          : "invisible opacity-0 "
      } transition duration-300 ease-linear`}
    >
      {loading ? (
        <div className="backdrop-blur-sm z-10 absolute">
          <Loader />
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="Name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="name"
                className="mt-1 p-2 w-full border-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border-2 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-1 p-2 w-full border-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                pattern="[6789][0-9]{9}"
                title="Please enter valid phone number"
                className="mt-1 p-2 w-full border-2 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#7AC143] text-white px-4 py-2 rounded"
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              onClick={onClose}
              className="bg-[whitesmoke] border-2 ml-3 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterModal;
