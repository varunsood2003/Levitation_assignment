import React, { useState } from "react";
import axios from "axios";

const MultiStepForm = ({ auth }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState(null);
  const [multiFiles, setMultiFiles] = useState([]);
  const [geolocationStatus, setGeolocationStatus] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressLine1Change = (e) => {
    setAddressLine1(e.target.value);
  };

  const handleAddressLine2Change = (e) => {
    setAddressLine2(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleMultiFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMultiFiles(files);
  };

  const handleGeolocationStatus = () => {
    setGeolocationStatus("Capturing geolocation...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setGeolocationStatus(`Geolocation captured: ${latitude}, ${longitude}`);
      },
      (error) => {
        setGeolocationStatus("Geolocation capture failed");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone_number", phone);
      formData.append("address_1", addressLine1);
      formData.append("address_2", addressLine2);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("pincode", pincode);
      formData.append("country", country);
      formData.append("geolocation", geolocationStatus);
      formData.append("single_file", file);
      multiFiles.forEach((multiFile) =>
        formData.append("multi_ups1", multiFile)
      );
      console.log(auth);
      const authToken = auth;
      const response = await axios.post(
        "https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data.success) {
        setSubmissionStatus("Form submitted successfully");
      } else {
        setSubmissionStatus("Form submission failed");
      }
    } catch (error) {
      setSubmissionStatus("Form submission failed");
      console.error(error.message);
    }
  };

  return (
    <div className="  flex flex-col items-center justify-center pt-20 pb-10">
      <h1 className="text-4xl">Multi-Step Form</h1>
      <div className="mt-4">
        <p className="mb-2">Step {step} of 5</p>
        <progress className="w-full" value={step} max={5} />
      </div>
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-6">
        {step === 1 && (
          <div>
            <h2>Step 1: Basic Details</h2>
            <form className="mt-4" onSubmit={handleNextStep}>
              <div className="mb-4">
                <label className=" block mb-2">Name:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md"
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Step 2: Address</h2>
            <form className="mt-4" onSubmit={handleNextStep}>
              <div className="mb-4">
                <label className="block mb-2">Address Line 1:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="text"
                  value={addressLine1}
                  onChange={handleAddressLine1Change}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address Line 2:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="text"
                  value={addressLine2}
                  onChange={handleAddressLine2Change}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">City:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">State:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="text"
                  value={state}
                  onChange={handleStateChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Pincode:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="text"
                  value={pincode}
                  onChange={handlePincodeChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Country:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="text"
                  value={country}
                  onChange={handleCountryChange}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  type="button"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2>Step 3: File Upload</h2>
            <form className="mt-4" onSubmit={handleNextStep}>
              <div className="mb-4">
                <label className="block mb-2">File Upload (PNG/PDF):</label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="file"
                  accept=".png,.pdf"
                  onChange={handleFileChange}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  type="button"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 4 && (
          <div>
            <h2>Step 4: Multi File Upload</h2>
            <form className="mt-4" onSubmit={handleNextStep}>
              <div className="mb-4">
                <label className="block mb-2">
                  Multi File Upload (PNG/PDF):
                </label>
                <input
                  className="w-full px-4 py-2 border rounded-md"
                  type="file"
                  accept=".png,.pdf"
                  multiple
                  onChange={handleMultiFileChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Geolocation Status:</label>
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  type="button"
                  onClick={handleGeolocationStatus}
                >
                  Capture Geolocation
                </button>
                {geolocationStatus && (
                  <p className="mt-2">{geolocationStatus}</p>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  type="button"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}
        {step === 5 && (
          <div>
            <h2>Step 5: Status</h2>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name:</label>
                <p>{name}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email:</label>
                <p>{email}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone:</label>
                <p>{phone}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address Line 1:</label>
                <p>{addressLine1}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Address Line 2:</label>
                <p>{addressLine2}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">City:</label>
                <p>{city}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">State:</label>
                <p>{state}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Pincode:</label>
                <p>{pincode}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Country:</label>
                <p>{country}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">File:</label>
                <p>{file?.name}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Multi Files:</label>
                {multiFiles.map((multiFile, index) => (
                  <p key={index}>{multiFile.name}</p>
                ))}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Geolocation Status:</label>
                <p>{geolocationStatus}</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Submission Status:</label>
                {submissionStatus && <p>{submissionStatus}</p>}
              </div>
              <div className="flex justify-between ">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  type="button"
                  onClick={handlePrevStep}
                >
                  Previous
                </button>
                <button
                  className="px-4  py-2 text-white bg-blue-500 rounded-md"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
