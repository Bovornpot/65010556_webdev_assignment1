const express = require('express');
const app = express();
const port = 3000;

// Middleware สำหรับจัดการข้อมูลแบบ JSON
app.use(express.json());

// สร้างเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`API Server running on http://localhost:${port}`);
});

// GET /configs/:id endpoint สร้าง Endpoint สำหรับดึงข้อมูลการตั้งค่าDrone
const axios = require('axios');

// ตัวอย่างการดึงข้อมูลจาก Drone Config Server
app.get('/configs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbzwclqJRodyVjzYyY-NTQDb9cWG6Hoc5vGAABVtr5-jPA_ET_2IasrAJK4aeo5XoONiaA/exec');
        const config = response.data; // สมมติว่า response จาก API ภายนอกส่งข้อมูลการตั้งค่ากลับมา
        
        // ปรับแก้ไขค่า max_speed ตามเงื่อนไขที่กำหนด
        if (!config.max_speed) {
            config.max_speed = 100;
        } else if (config.max_speed > 110) {
            config.max_speed = 110;
        }

        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching config data', error });
    }
});


// GET /status/:id endpoint สร้าง Endpoint สำหรับดึงสถานะDrone
app.get('/status/:id', (req, res) => {
  const { id } = req.params;
  const status = {
      condition: 'good'
  };

  res.json(status);
});

// GET /logs endpoint สร้าง Endpoint สำหรับดึงข้อมูลบันทึกของDrone
app.get('/logs', (req, res) => {
  const logs = [
      {
          drone_id: 5,
          drone_name: 'Drone_65010556',
          created: '2024-09-22 07:37:32.111Z',
          light: 'on',
          country: 'Thailand',
          celsius: 45
      },
      {
          drone_id: 5,
          drone_name: 'Drone_65010556',
          created: '2024-09-22 07:37:57.411Z',
          light: 'on',
          country: 'Thailand',
          celsius: 46
      }
  ];

  res.json(logs);
});

// POST /logs endpoint สร้าง Endpoint สำหรับเพิ่มข้อมูลบันทึก
app.post('/logs', (req, res) => {
  const newLog = req.body; // รับข้อมูลใหม่จาก request body
  // สมมุติว่าเพิ่มข้อมูลไปยังฐานข้อมูลแล้ว
  res.status(201).json({ message: 'Log added successfully', log: newLog });
});

