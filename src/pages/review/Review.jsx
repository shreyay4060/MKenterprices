// your imports remain unchanged
import React, { useState, useCallback } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";

export default function Review() {
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    message: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [cropModal, setCropModal] = useState(false);
  const [srcImage, setSrcImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const navigate = useNavigate();
  const messageMaxLength = 250;

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB");
      return;
    }
    const url = URL.createObjectURL(file);
    setSrcImage(url);
    setCropModal(true);
  };

  const applyCrop = useCallback(async () => {
    try {
      const { base64 } = await getCroppedImg(srcImage, croppedAreaPixels);
      setReviewData((prev) => ({ ...prev, image: base64 }));
      URL.revokeObjectURL(srcImage);
    } catch (err) {
      console.error(err);
      toast.error("Failed to crop image");
    } finally {
      setCropModal(false);
    }
  }, [srcImage, croppedAreaPixels]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > messageMaxLength) return;
    setReviewData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const { name, email, message } = reviewData;
    const newErr = {};
    if (!name.trim()) newErr.name = "Name is required.";
    if (!email.trim()) newErr.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErr.email = "Invalid email format.";
    if (!message.trim()) newErr.message = "Message is required.";
    else if (message.length < 10) newErr.message = "Message must be at least 10 characters.";
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct errors before submitting.");
      return;
    }
    setLoading(true);
    try {
      const review = {
        ...reviewData,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      await addDoc(collection(fireDB, "reviews"), review);
      toast.success("Review submitted successfully!");
      setReviewData({ name: "", email: "", message: "", image: "" });
      navigate("/homePage");
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-47 md:pt-32 text-white bg-gradient-to-br from-black via-slate-900 to-gray-800 px-4 py-10">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={submitReview}
            className="bg-gradient-to-br from-black via-slate-900 to-gray-800 border border-gray-700 p-8 rounded-lg shadow-lg w-full transition-all"
          >
            <h2 className="text-2xl font-bold mb-6 text-yellow-500 text-center">
              Submit Your Review
            </h2>

            <input
              type="text"
              name="name"
              value={reviewData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`w-full mb-2 px-4 py-2 border border-white rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-violet-500"
              }`}
            />
            {errors.name && <p className="text-sm text-red-500 mb-2">{errors.name}</p>}

            <input
              type="email"
              name="email"
              value={reviewData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`w-full mb-2 px-4 py-2 border border-white rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-yellow-500"
              }`}
            />
            {errors.email && <p className="text-sm text-red-500 mb-2">{errors.email}</p>}

            <textarea
              name="message"
              value={reviewData.message}
              onChange={handleChange}
              placeholder="Write your review here..."
              rows="5"
              className={`w-full mb-1 px-4 py-2 border border-white rounded bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.message
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-yellow-500"
              }`}
            />
            <div className="text-sm text-gray-400 mb-2 text-right">
              {reviewData.message.length}/{messageMaxLength}
            </div>
            {errors.message && <p className="text-sm text-red-500 mb-2">{errors.message}</p>}

            <div className="mb-4">
              <label className="block mb-1 text-sm text-white">Upload Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-yellow-600 file:text-white hover:file:bg-yellow-700"
              />
              <small className="block text-gray-400 mt-1">
                Max 2MB, JPG/PNG format only
              </small>
              {reviewData.image && (
                <img
                  src={reviewData.image}
                  alt="Preview"
                  className="mt-2 h-24 rounded border border-gray-500"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold rounded transition duration-200 ${
                loading
                  ? "bg-violet-300 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-700 text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>

      {cropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-11/12 max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-lg"
              onClick={() => setCropModal(false)}
            >
              &times;
            </button>
            <div className="relative h-60 bg-gray-200">
              <Cropper
                image={srcImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="flex items-center mt-4 space-x-4">
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
              />
              <button
                onClick={() => setCropModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={applyCrop}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
