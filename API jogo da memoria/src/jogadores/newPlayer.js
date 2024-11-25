import { Router } from "express";
import { conn } from "../data/DbConecction.js";

const routPlayer = Router();

routPlayer.post("/player", (req, res) => {
    const { nome } = req.body
    conn.query(`insert into login (nome) values ('${nome}')`, (err, result) => {
        if (err) {
            return res.json({
                Erro: 'Erro na inserção de dados ' + err.message
            });
        } else {
            res.json({
                Sucesso: 'O aluno foi inserido com sucesso no banco de dados'
            })
        }
    }) 
})

export { routPlayer }