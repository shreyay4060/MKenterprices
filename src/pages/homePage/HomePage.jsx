import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import About from "../about/About";
import Contact from "../contact/Contact";
import Home from "../home/Home";
import Service from "../service/Service";
import AvailableWork from "../work/AvailableWork";
import ReviewMsg from "../review/ReviewMsg";
import FooterLogo from "../../components/FooterLogo";

export default function HomePage() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const user = localStorage.getItem("users");
    if (!user) {
      const timeout = setTimeout(() => {
        navigate("/login");
      }, 25000);
      return () => clearTimeout(timeout);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "reviews"));
        const reviewData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(reviewData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);
  const handleShowLess = () => setVisibleCount(3);

  return (
    <Layout>
      <Home />

      {/* <div style={{ marginTop: "-120px" }} id="about">
        <About />
      </div> */}

      {/* <div id="services" style={{ marginTop: "-200px" }}>
        <Service />
      </div> */}

      <div id="availableWork" style={{ marginTop: "-120px" }}>
        <AvailableWork />
      </div>

      <div style={{ marginTop: "-200px" }} id="contact">
        <Contact />
      </div>
      <hr  className="text-white"/>

      <div className=" px-4 pb-25 pt-10 bg-gradient-to-br from-black via-slate-900 to-gray-800">
        <h1 className="text-4xl font-extrabold text-center text-yellow-400 mb-12 drop-shadow-lg">
          What Our Users Say
        </h1>

        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center  text-gray-400 text-lg">No reviews found.</p>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ReviewMsg reviews={reviews.slice(0, visibleCount)} />
            </motion.div>

            <div className="flex  justify-center gap-4 mt-8">
              {visibleCount < reviews.length && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShowMore}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300"
                >
                  Show More
                </motion.button>
              )}
              {visibleCount > 3 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShowLess}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300"
                >
                  Show Less
                </motion.button>
              )}
            </div>
          </>
        )}

        <div className="text-center mt-14">
          <p className="text-white mb-2 text-lg font-light">
            Want to share your own experience?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#facc15", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            className="border border-yellow-500 text-yellow-400 hover:text-black hover:bg-yellow-400 px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300"
            onClick={() => navigate("/review")}
          >
            ✍️ Write a Review
          </motion.button>
        </div>
        <FooterLogo />
      </div>

    </Layout>
  );
}
