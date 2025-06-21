import { useState } from "react";
import Layout from "../../components/layout/Layout";
import About from "../about/About";
import Contact from "../contact/Contact";
import Home from "../home/Home";
import Service from "../service/Service";
import Signup from "../registration/signup";

export default function HomePage() {
 
  return (
    <Layout>
      {/* Homepage */}
      <Home />

      {/* About */}
      <div style={{ marginTop: "-60px" }} id="about">
        <About />
      </div>

      {/* Service */}
      <div style={{ marginTop: "-100px" }} id="services">
        <Service />
      </div>

      {/* Contact */}
      <div style={{ marginTop: "-100px" }} id="contact">
        <Contact />
      </div>


    </Layout>
  );
}
