import { Router } from "express";
import { conn } from "../data/DbConecction.js";

const routDeletePlayer = Router();

routDeletePlayer.delete("/player/delete", (req, res) => {
    const { id } = req.body;

    conn.query(
        `delete from login where id=${id}`,
        (err, result) => {
            if (err) {
                res.status(500).json({ erro: "Erro ao excluir." });
            } else {
                res.json({
                    mensagem: "Excluido com sucesso",
                });
            }
        }
    );
});

export { routDeletePlayer }