import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const message = `MK ENTERPRISES and Management Service — Powered by Mr. Mukund © ${year} | Reliable Staffing | Facility Management | Logistics | Admin Outsourcing | Contact: mukund@gmail.com`;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black py-2 overflow-hidden z-50">
      <div className="whitespace-nowrap flex animate-marquee">
        {/* Repeat message several times for seamless loop */}
        <span className="text-yellow-400 text-sm font-medium px-8">{message}</span>
        <span className="text-yellow-400 text-sm font-medium px-8">{message}</span>
        <span className="text-yellow-400 text-sm font-medium px-8">{message}</span>
        <span className="text-yellow-400 text-sm font-medium px-8">{message}</span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </footer>
  );
}
