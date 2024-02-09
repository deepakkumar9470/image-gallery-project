import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../api/apiUrl";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  const submitImage = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      const formData = new FormData();
      formData.append("myfile", file);

      const result = await axios.post(`${url}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
      setIsSubmitted(false);
    } catch (error) {
      console.log(error);
      // setIsSubmitted(false)
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="w-full  h-[100vh] flex items-center flex-col  my-10 py-10 bg-mainBg">
      <h2 className="text-4xl text-white font-bold mb-6">Image Gallery</h2>

      <form
        onSubmit={submitImage}
        className="flex items-center justify-center flex-col w-full p-5 md:p-0 gap-4 md:w-[500px] h-[250px] bg-lightBg rounded-md px-10 mt-10 py-5"
      >
        <label
          className="text-4xl mr-5 font-bold text-ellipsis 
        cursor-pointer text-white"
          htmlFor="file"
        >
          Upload Image here
        </label>

        <input
          type="file"
          id="file"
          accept="image/*"
          className="w-[600px] hidden"
          onChange={onInputChange}
        ></input>
        <button
          disabled={isSubmitted ? true : false}
          className="flex items-center gap-2 bg-mainBg border-2-gray-400 hover:bg-gray-700 
        transition-all duration-150 rounded-md text-white px-6 py-3 text-lg font-bold cursor-pointer"
          type="submit"
        >
          {isSubmitted ? (
            <>
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden 
                 !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
