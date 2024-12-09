import express from "express";
import { routPlayer } from "./jogadores/newPlayer.js";
import { routGetPlayer } from "./jogadores/getplayer.js";
import { routEditPlayer } from "./jogadores/editplayer.js";
import { routDeletePlayer } from "./jogadores/deleteplayer.js";

const app = express()

app.use(express.json());
app.use(routPlayer)
app.use(routGetPlayer)
app.use(routEditPlayer)
app.use(routDeletePlayer)

app.listen(3333, () => console.log('servidor rodando ...'))