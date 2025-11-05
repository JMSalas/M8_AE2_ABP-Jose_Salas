export const redactarSaludo = (req, res) => {
        const { nombre, ...parametrosNoUsados } = req.query;
        const nombreSaludo = nombre || "Invitado";

        return res.status(200).json({
            saludo : `Hola ${nombreSaludo} gracias por usar esta APIRest`,
            parametrosNoUsados : parametrosNoUsados
        }); 
}