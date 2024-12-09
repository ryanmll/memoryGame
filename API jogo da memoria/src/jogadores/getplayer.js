import { Router } from "express";
import { conn } from "../data/DbConecction.js";

const routGetPlayer = Router();

routGetPlayer.get("/players/list", (req, res) => {

    

    conn.query("SELECT * FROM login", (err, result) => {

        if (err) {
            return res.json(err.message)
        }

        res.json(result)
    })
})

export { routGetPlayer }