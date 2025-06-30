import React from 'react'
import { useNavigate } from 'react-router'

export default function FooterLogo() {

  // navigation
  const navigate= useNavigate()
  return (
    <div className='bg-transparent border-t  mt-15  text-white'>
       <div className='flex justify-center text-3xl mt-10 font-bold text-yellow-500 mb-8'>
         <span >Our Clients ✈️</span>
        </div>
      <div className='flex justify-between lg:justify-evenly '>
        <div>
             <img
            src="/images/footerLogo1.jpg"
            alt="MK Enterprises Logo"
            width="80"
            height="80"
            className="rounded-full border border-yellow-400"
          />
          <br />
          {/* <span className='flex justify-center w-full'>Lotus Events and Productions</span> */}
        </div>
        <div>
             <img
            src="/images/footerLogo.jpg"
            alt="MK Enterprises Logo"
            width="80"
            height="80"
            className="rounded-full border border-yellow-400"
            />
            <br />
            {/* <span>Lotus Events and Productions</span> */}
        </div>
        <div>
             <img
            src="/images/footerLogo3.jpg"
            alt="MK Enterprises Logo"
            width="85"
            height="80"
            className="rounded-full border border-yellow-400"
            />
            <br />
            {/* <span>Lotus Events and Productions</span> */}
        </div>
      </div>
        <button className='border px-2 py-1 ' onClick={()=>navigate("/clientApplicationForm")}>Apply</button>
    </div>
  )
}
