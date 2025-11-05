import express from "express";
import { usuariosRouter } from "./routes/usuarios_router.js";
import { saludosRouter } from "./routes/saludos_router.js";
import { errorMiddleware } from "./middlewares/error_middleware.js";
import { ErrorRecursoNoEncontrado } from "./utils/errors.js";

const app = express();

app.use("/saludos", saludosRouter);
app.use("/usuarios", usuariosRouter);

// Puerto
const port = 3000;

app.all("/{*ruta}", (req, res) => {
    const ruta = `http://localhost:${port}/${req.params.ruta}`;
    throw new ErrorRecursoNoEncontrado(`Página ruta ${ruta}, no encontrada`);
});

// Middleware de Manejo de Errores Personalizado
// Debe ser el último middleware agregado y debe tener la firma o signature de cuatro argumentos: (err, req, res, next)
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});