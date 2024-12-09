import { Router } from "express";
import { conn } from "../data/DbConecction.js";

const routEditPlayer = Router();

routEditPlayer.put("/player/edit", (req, res) => {
    const { id, nome } = req.body;

    conn.query(
        `UPDATE login SET nome = '${nome}' WHERE id = ${id}`,
        (err, result) => {
            if (err) {
                res.status(500).json({ erro: "Erro ao atualizar o agendamento." + (err.message) });
            } else {
                res.json({
                    mensagem: "Agendamento atualizado com sucesso!",
                });
            }
        }
    );
});

export { routEditPlayer }
