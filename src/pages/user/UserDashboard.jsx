import React, { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { doc, updateDoc, getDocs, collection, query, where } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage"; // Custom util to get cropped blob from canvas

export default function UserDashboard() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("users")));
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(user?.profileImage || null);
  const [cropModal, setCropModal] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCropImageSrc(reader.result);
      setCropModal(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getUserDocId = async () => {
    const q = query(collection(fireDB, "user"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    const docData = querySnapshot.docs[0];
    return docData?.id;
  };

  const handleSaveCroppedImage = async () => {
    try {
      const croppedImg = await getCroppedImg(cropImageSrc, croppedAreaPixels);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result;
        setSelectedImage(base64data);
        setPreview(base64data);

        const userId = await getUserDocId();
        if (!userId) throw new Error("User not found in Firestore");
        const userRef = doc(fireDB, "user", userId);
        await updateDoc(userRef, { profileImage: base64data });

        const updatedUser = { ...user, profileImage: base64data };
        localStorage.setItem("users", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setCropModal(false);
        toast.success("Profile image updated successfully");
      };
      reader.readAsDataURL(croppedImg);
    } catch (error) {
      console.error(error);
      toast.error("Failed to crop or update profile image");
    }
  };

  const handleRemoveImage = async () => {
    try {
      const userId = await getUserDocId();
      if (!userId) throw new Error("User not found in Firestore");
      const userRef = doc(fireDB, "user", userId);
      await updateDoc(userRef, { profileImage: null });

      const updatedUser = { ...user, profileImage: null };
      localStorage.setItem("users", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setPreview(null);
      toast.success("Profile image removed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove profile image");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen lg:pt-30 pt-50 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold text-yellow-400">Welcome, {user.name}!</h1>
            <p className="text-gray-300 mt-2 text-base tracking-wide">Your personalized dashboard</p>
          </motion.div>

          <motion.div
            className="bg-gray-900 border border-violet-700 p-8 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-center">
              <img
                src={preview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="User"
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-yellow-400 shadow-lg mx-auto"
              />
              <div className="mt-4 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-sm text-gray-300 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-700 file:text-white hover:file:bg-violet-800"
                />
                {preview && (
                  <button
                    onClick={handleRemoveImage}
                    className="block w-full mt-2 text-sm text-red-400 hover:underline"
                  >
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4 text-base sm:text-lg text-left">
              <h2 className="text-2xl font-bold text-violet-300">{user.name}</h2>
              <p><span className="text-yellow-400 font-semibold">Name:</span> {user.name}</p>
              <p><span className="text-yellow-400 font-semibold">Email:</span> {user.email}</p>
              <p><span className="text-yellow-400 font-semibold">Role:</span> {user.role}</p>
              <p><span className="text-yellow-400 font-semibold">Joined:</span> {user.date}</p>
            </div>
          </motion.div>
        </div>

        {cropModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <div className="bg-white p-4 rounded-lg shadow-2xl w-[90%] max-w-lg">
              <div className="relative h-64 bg-gray-200">
                <Cropper
                  image={cropImageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setCropModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCroppedImage}
                  className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Save Image
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
