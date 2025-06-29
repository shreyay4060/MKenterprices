import React from 'react'

export default function FooterLogo() {
  return (
    <div className='bg-gradient-to-r mt-15 from-[#010320] via-[#010e50] to-[#021b57] text-white'>
      <div className='flex justify-evenly'>
        <div>
             <img
            src="/images/logo.jpg"
            alt="MK Enterprises Logo"
            width="80"
            height="80"
            className="rounded-full border border-yellow-400"
          />
          <br />
          <span className='flex justify-center w-full'>Lotus Events and Productions</span>
        </div>
        <div>
             <img
            src="/images/logo.jpg"
            alt="MK Enterprises Logo"
            width="80"
            height="80"
            className="rounded-full border border-yellow-400"
            />
            <br />
            <span>Lotus Events and Productions</span>
        </div>
        <div>
             <img
            src="/images/logo.jpg"
            alt="MK Enterprises Logo"
            width="80"
            height="80"
            className="rounded-full border border-yellow-400"
            />
            <br />
            <span>Lotus Events and Productions</span>
        </div>
      </div>
    </div>
  )
}
