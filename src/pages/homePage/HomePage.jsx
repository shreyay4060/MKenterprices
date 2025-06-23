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
      <div style={{ marginTop: "-150px" }} id="about">
        <About />
      </div>

      {/* Service */}
      <div id="services" style={{ marginTop: "-150px" }}>
        <Service />
      </div>

      {/* Available workInfo Page */}
      <div id="availableWork" style={{ marginTop: "-150px" }}>
        <AvailableWork />
      </div>

      {/* Contact */}
      <div style={{ paddingTop:"-300px" }} id="contact">
        <Contact />
      </div>
    </Layout>
  );
}
