import { Router } from "express";
import { redactarSaludo } from "../controlers/saludos_controller.js";

export const saludosRouter = Router();

//Rutas
saludosRouter.route('/')
    .get(redactarSaludo);