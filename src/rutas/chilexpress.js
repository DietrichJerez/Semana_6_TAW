const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get("/seguimiento/:ot", async (req, res) => {
  const ot = req.params.ot;
  const autenticacion = {
    "Ocp-Apim-Subscription-Key": process.env.CHILEXPRESS_PK
  }
  const datos = {
    reference: "27699451457",
    transportOrderNumber: ot,
    rut: process.env.RUT,
    showTrackingEvents: 1
  }
  axios.post("http://testservices.wschilexpress.com/transport-orders/api/v1.0/tracking", datos, { headers: autenticacion }).then((response) => {
    const respuesta = {
      status: response.data.statusCode,
      message: response.data.statusDescription,
      data: []
    }
    if (response.data.statusCode === 0) {
      respuesta.data = response.data.data;
      res.json(respuesta);
    }
    res.json(respuesta);
  }).catch((error) => {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    }
  });

});

module.exports = router;