import React, { useContext } from "react";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UserDetails from "../../components/admin/UserDetails";
import WorkerDetails from "../../components/admin/WorkerDetails";
import ContactDetails from "../../components/admin/ContactDetails";
import "react-tabs/style/react-tabs.css"; // Ensure this is loaded, then override styles below
import WorkInfo from "../work/WorkInfo";
import myContext from "../../context/myContext";

export default function AdminDashboard() {

  // context 
  const context = useContext(myContext);
  const { getAllUser , getAllWork , getAllContactMsg , getAllWorkers} = context;


  const admin = JSON.parse(localStorage.getItem("users"))

  return (
    <Layout>
      <div className="min-h-screen pb-20 pt-[100px] px-4  py-8 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl mt-25 lg:mt-0 font-bold text-yellow-400">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage users, workers, and performance insights
            </p>
          </motion.div>

          {/* Admin Info */}
          <motion.div
            className="bg-gray-900 border border-violet-700 rounded-xl p-6 shadow-xl flex flex-col sm:flex-row items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Admin"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-yellow-400 shadow-md object-cover"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-violet-200">
                {admin.name}
              </h2>
              <p className="text-sm text-gray-300">{admin.role}</p>
              <p className="text-sm text-gray-400 mt-1">Email: {admin.email}</p>
              <p className="text-sm text-gray-400">Joined: {admin.date}</p>
            </div>
          </motion.div>

          {/* Dashboard Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs>
              <TabList className="flex flex-wrap gap-7 justify-center mb-6">
                <Tab className="tab-custom" selectedClassName="tab-selected">
                  <div className="tab-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={40}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <h2 className="text-xl font-bold mt-1">({getAllUser.length})</h2>
                    <p className="text-sm">Users</p>
                  </div>
                </Tab>
                <Tab className="tab-custom" selectedClassName="tab-selected">
                  <div className="tab-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-list-ordered"
                    >
                      <line x1={10} x2={21} y1={6} y2={6} />
                      <line x1={10} x2={21} y1={12} y2={12} />
                      <line x1={10} x2={21} y1={18} y2={18} />
                      <path d="M4 6h1v4" />
                      <path d="M4 10h2" />
                      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                    </svg>
                    <h2 className="text-xl font-bold mt-1">({getAllWorkers.length})</h2>
                    <p className="text-sm">
                      Applicants
                    </p>
                  </div>
                </Tab>
                <Tab className="tab-custom" selectedClassName="tab-selected">
                  <div className="tab-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-list-ordered"
                    >
                      <line x1={10} x2={21} y1={6} y2={6} />
                      <line x1={10} x2={21} y1={12} y2={12} />
                      <line x1={10} x2={21} y1={18} y2={18} />
                      <path d="M4 6h1v4" />
                      <path d="M4 10h2" />
                      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                    </svg>
                    <h2 className="text-xl font-bold mt-1">({getAllWork.length})</h2>
                    <p className="text-sm">Available Work</p>
                  </div>
                </Tab>
                <Tab className="tab-custom" selectedClassName="tab-selected">
                  <div className="tab-box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={50}
                      height={50}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-mail"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>

                    <h2 className="text-xl font-bold mt-1">({getAllContactMsg.length})</h2>
                    <p className="text-sm">Contact Msg</p>
                  </div>
                </Tab>
              </TabList>

              <TabPanel>
                <UserDetails />
              </TabPanel>
              <TabPanel>
                <WorkerDetails />
              </TabPanel>
              <TabPanel>
                <WorkInfo />
              </TabPanel>
              <TabPanel>
                <ContactDetails />
              </TabPanel>
            </Tabs>
          </motion.div>

         
        </div>
      </div>

      {/* Custom tab theme styles */}
      <style>{`
        .tab-custom {
          background-color: #151531;
          border: 1px solid #6708ff;
          color: #ffffff;
          padding: 1rem;
          border-radius: 1rem;
          width: 20%;
          cursor: pointer;
          min-width: 150px;
          text-align: center;
          transition: all 0.3s ease-in-out;
        }
        .tab-custom:hover {
          background-color: #010105;
          color: #f9a8d4;
        }
        .tab-selected {
          background-color: #f8b72a;
          color: #000000;
          border: 1px solid #ffffff;
          transform: scale(1.09);
        }
        .tab-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-weight: 600; 
        }
        .tab-icon {
          margin-bottom: 0.25rem;
          color: #ff133e;
          font-weight: 700;
        }
      `}</style>
    </Layout>
  );
}
