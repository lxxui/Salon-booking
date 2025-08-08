const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');  // ใช้ mysql2 แบบ promise
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// ตั้งค่าการเชื่อมต่อ MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_user',
  password: '',
  database: 'salon-booking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API รับข้อมูลจองคิว
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      date,
      time,
      services,
      totalPrice,
      status
    } = req.body;

    if (!name || !phone || !date || !time || !services || !totalPrice) {
      return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
    }

    // สร้าง booking_id ง่าย ๆ เช่น timestamp + random (ควรเปลี่ยนให้ดีกว่านี้)
    const booking_id = 'BK' + Date.now();

    // แปลง services เป็น JSON string เก็บใน DB
    const serviceListJson = JSON.stringify(services);

    // ตัวอย่าง query insert
    const sql = `
      INSERT INTO booking (
        booking_id,
        customer_name,
        customer_phone,
        customer_email,
        booking_date,
        booking_time,
        service_list,
        total_price,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const params = [
      booking_id,
      name,
      phone,
      email || null,
      date,
      time,
      serviceListJson,
      totalPrice,
      status || 'pending',
    ];

    const [result] = await pool.execute(sql, params);

    return res.status(201).json({ message: 'จองคิวสำเร็จ', booking_id });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
