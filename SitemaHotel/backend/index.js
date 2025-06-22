const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const establecimientosRoutes = require("./routes/establecimientos");
app.use("/api/establecimientos", establecimientosRoutes);

// Iniciar servidor
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});

