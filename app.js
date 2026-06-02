const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

function carregarCursos() {
    const arquivo = path.join(__dirname, 'public', 'cursos.json');

    const dados = fs.readFileSync(arquivo, 'utf8');

    return JSON.parse(dados);
}

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cursos', (req, res) => {
    const cursos = carregarCursos();
    res.render('cursos', { cursos });
});

app.get('/curso/:id', (req, res) => {

    const cursos = carregarCursos();

    const id = parseInt(req.params.id);

    const curso = cursos.find(c => c.id === id);

    if (!curso) {
        return res.status(404).send('Curso não encontrado');
    }

    res.render('curso', { curso });
});

app.listen(3000, () => {
    console.log('Servidor executando em http://localhost:3000');
});