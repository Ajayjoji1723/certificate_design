const mongoose = require('mongoose');



const CertificateSchema = new mongoose.Schema({
    content: [],
    background: String,
    qrCode: String,
  });
  
  const Certificate = mongoose.model('Certificate', CertificateSchema);

  module.exports = Certificate;