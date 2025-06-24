import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import About from "../about/About";
import Contact from "../contact/Contact";
import Home from "../home/Home";
import Service from "../service/Service";
import AvailableWork from "../work/AvailableWork";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("users");
    if (!user) {
      const timeout = setTimeout(() => {
        navigate("/login");
      }, 10000); // 10 seconds delay

      return () => clearTimeout(timeout); // cleanup
    }
  }, [navigate]);

  return (
    <Layout>
      {/* Homepage */}
      <Home />

      {/* About */}
      <div style={{ marginTop: "-120px" }} id="about">
        <About />
      </div>

      {/* Service */}
      <div id="services" style={{ marginTop: "-200px" }}>
        <Service />
      </div>

      {/* Available workInfo Page */}
      <div id="availableWork" style={{ marginTop: "-150px" }}>
        <AvailableWork />
      </div>

      {/* Contact */}
      <div style={{ marginTop: "-200px" }} id="contact">
        <Contact />
      </div>
    </Layout>
  );
}
