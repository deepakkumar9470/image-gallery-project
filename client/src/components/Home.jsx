import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { url } from "../api/apiUrl";

const Home = () => {
  const [allImage, setAllImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImage = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`${url}/get-image`);
      setAllImage(result.data.img);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${url}/delete/${id}`);
      getImage();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
      {allImage?.length > 0 ? (
        allImage?.map((data) => {
          return (
            <div
              key={data._id}
              className="w-full md:w-[400px] md:h-[300px] px-10 py-5 mt-5 relative mb-0 pb-0"
            >
              <img
                src={
                  data?.image
                    ? `/images/${data.image}`
                    : "https://images.pexels.com/photos/707344/pexels-photo-707344.jpeg?auto=compress&cs=tinysrgb&w=600"
                }
                className="w-full h-full rounded-md cursor-pointer object-cover hover:scale-105 transition-all duration-75"
              />
              <button
                className="absolute right-6 top-3 bg-bg border-myborder text-white 
            px-4 py-2 rounded-full cursor-pointer text-sm font-bold"
                onClick={() => handleDelete(data?._id)}
              >
                X
              </button>
            </div>
          );
        })
      ) : (
        <p className="text-3xl text-white text-center font-bold mt-10">
          No image data available , please upload first
        </p>
      )}
    </div>
  );
};

export default Home;
