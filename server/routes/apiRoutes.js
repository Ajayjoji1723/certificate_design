const express = require('express');
const Certificate = require('../models/CertificateSchema');
const QRCode = require('qrcode');


const router = express.Router();


router.get('/hello', (req,res)=>{
    res.send('helo world')
})

// QR Code generation endpoint
router.post('/generate-qr', async (req, res) => {
  try {
    const { certificateData } = req.body;
      const { elements, background } = certificateData;

      // Prepare certificate content for the QR code
      const certificateContent = elements.map((element) => {
          if (element.type === 'text') {
              return { 
                  type: 'text', 
                  content: element.content, 
                  color: element.color, 
                  fontSize: element.fontSize,
                  fontFamily: element.fontFamily,
                  fontWeight: element.fontWeight,
                  fontStyle: element.fontStyle,
                  x: element.x,
                  y: element.y
              };
          } else if (element.type === 'logo' || element.type === 'signature' || element.type === 'background') {
              return { 
                  type: element.type, 
                  src: element.src,
                  x: element.x,
                  y: element.y,
                  width: element.width,
                  height: element.height
              };
          }
          return element;
      });

      const certificateData1 = {
          content: certificateContent,
          background,
      };

      // Generate QR code with the certificate content
      QRCode.toDataURL(JSON.stringify(certificateData1), async (err, url) => {
          if (err) {
              return res.status(500).json({ error: 'Failed to generate QR code' });
          }

          // Save certificate and QR code in the database
          const newCertificate = new Certificate({
              content: certificateContent,
              background: background,
              qrCode: url,
          });

          await newCertificate.save();

          res.json({ qrCode: url, certificateId: newCertificate._id });
      });
  } catch (error) {
      res.status(500).json({ error: 'Failed to generate QR code' });
  }
});



module.exports = router;