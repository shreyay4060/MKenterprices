import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { fireDB, storage } from "../firebase/FirebaseConfig"; // ✅ correct relative path

export const uploadAndSaveImage = async (file, userId) => {
  try {
    const imageRef = ref(storage, `profileImages/${userId}/${file.name}`);
    await uploadBytes(imageRef, file);

    const downloadURL = await getDownloadURL(imageRef);

    // Save only the image URL to Firestore
    await setDoc(doc(fireDB, "user", userId), {
      profileImageUrl: downloadURL,
    }, { merge: true });

    console.log("✅ Image uploaded and URL saved to Firestore.");
    return downloadURL;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    throw error;
  }
};
