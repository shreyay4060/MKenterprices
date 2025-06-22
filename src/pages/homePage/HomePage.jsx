import { useState } from "react";
import Layout from "../../components/layout/Layout";
import About from "../about/About";
import Contact from "../contact/Contact";
import Home from "../home/Home";
import Service from "../service/Service";
import AvailableWork from "../work/AvailableWork";

export default function HomePage() {
 
  return (
    <Layout>
      {/* Homepage */}
      <Home />

      {/* About */}
      <div style={{ marginTop: "-30px" }} id="about">
        <About />
      </div>

      {/* Service */}
      <div  id="services">
        <Service />
      </div>

      {/* workInfo Page */}
      <div  id="availableWork">
    <AvailableWork />
      </div>

      {/* Contact */}
      <div style={{ marginTop: "-100px" }} id="contact">
        <Contact />
      </div>


    </Layout>
  );
}
