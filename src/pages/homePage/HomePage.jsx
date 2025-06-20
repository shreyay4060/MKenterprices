
import Layout from "../../components/layout/Layout";
import About from "../about/About";
import Contact from "../contact/Contact";
import Home from "../home/Home";
import Service from "../service/Service";

export default function HomePage() {
  

  return (
    <Layout>
      {/* homepage */}
      <Home />
      {/* about page */}
      <About />

      {/* service */}
      <Service />

      {/* contact */}
      <Contact />
    </Layout>
  );
}
