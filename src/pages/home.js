import React from 'react';

function Home() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 text-center px-3">
      {/* ชื่อร้าน */}
      <h1 className="mb-3 fw-light" style={{ fontSize: '3rem', letterSpacing: '0.1em' }}>
        Salon Booking
      </h1>

      {/* คำโปรย */}
      <p className="text-secondary mb-5" style={{ fontSize: '1.25rem', maxWidth: '500px' }}>
        จองคิวร้านเสริมสวยง่าย ๆ ในไม่กี่คลิก ด้วยบริการมืออาชีพและบรรยากาศผ่อนคลาย
      </p>

      {/* ปุ่มจองคิว */}
      <a href="/booking" className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
        เริ่มจองคิว
      </a>
    </div>
  );
}

export default Home;
