import express from "express";
import { routPlayer } from "./jogadores/newPlayer.js";

const app = express()

app.use(express.json());
app.use(routPlayer)

app.listen(3333, () => console.log('servidor rodando ...'))