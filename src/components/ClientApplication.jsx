import React from 'react'
import { Link } from 'react-router'

export default function ClientApplication() {
  return (
    <div>
      <div className="mt-20 pt-10 pb-20 bg-gradient-to-br  from-black via-slate-900 to-gray-800">
              <h3 className="text-center text-3xl text-yellow-400 underline mb-9">
                Client Application
              </h3>
              <p className="text-center text-white mb-4">
                If you want to post your own work, please fill out our
                application form.
              </p>
              <div className="flex justify-center">
                <Link
                  to="/clientApplicationForm"
                  className="bg-yellow-500 active:bg-yellow-500 hover:bg-white font-bold hover:text-violet-700 text-black py-2 px-6 rounded-md transition duration-200"
                >
                  Client Application Form
                </Link>
              </div>
            </div>
    </div>
  )
}
