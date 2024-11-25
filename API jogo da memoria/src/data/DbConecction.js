import mysql from 'mysql';

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'memory_game'

});
conn.connect((err) => {
    if (err) {
        console.log('erro ao consultar o banco de dados', err)
        return
    }
    console.log('banco de dados conectado ')
})

export { conn }