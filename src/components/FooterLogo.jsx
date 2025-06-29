import React from 'react'

export default function FooterLogo() {
  return (
    <div className='bg-transparent border-t  mt-15  text-white'>
       <div className='flex justify-center text-3xl mt-10 font-bold text-yellow-500 mb-7'>
         <span >Our team ✈️</span>
        </div>
      <div className='flex justify-between '>
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
    </div>
  )
}
