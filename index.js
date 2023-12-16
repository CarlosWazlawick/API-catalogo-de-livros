const express = require('express');
const fs = require('fs');
const cors = require('cors');
const dados = require('./dados.json') || { Livros: [] };

function salvarDados() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dados, null, 2));
}

const server = express();

server.use(cors()); 
server.use(express.json());

server.get('/', (req, res) => {
    return res.json({ mensagem: "Nossa API está funcionando" });
});

server.get('/livros', (req, res) => {
    return res.json(dados.Livros);
});

server.post('/livros', (req, res) => {
    const novoLivro = req.body;

    if (!novoLivro.titulo || !novoLivro.autor || !novoLivro.anoPublicacao || !novoLivro.genero) {
        return res.status(400).json({ mensagem: "Informações incompletas." });
    } else {
        novoLivro.id = dados.Livros.length + 1;
        dados.Livros.push(novoLivro);
        salvarDados();
        return res.status(201).json({ mensagem: "Livro cadastrado com sucesso." });
    }
});

server.put('/livros/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    const livroIndex = dados.Livros.findIndex(livro => livro.id === livroId);

    if (livroIndex === -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado." });
    } else {
        const novosDados = req.body;
        Object.assign(dados.Livros[livroIndex], novosDados);
        salvarDados();
        return res.json({ mensagem: "Livro atualizado com sucesso.", livro: dados.Livros[livroIndex] });
    }
});

server.delete('/livros/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    dados.Livros = dados.Livros.filter(livro => livro.id !== livroId);
    salvarDados();
    return res.json({ mensagem: "Livro excluído com sucesso." });
});

server.get('/livros/autor/:autor', (req, res) => {
    const autorConsulta = req.params.autor.toLowerCase();
    const livrosDoAutor = dados.Livros.filter(livro => livro.autor.toLowerCase().includes(autorConsulta));
    return res.json(livrosDoAutor);
});

server.get('/livros/genero/:genero', (req, res) => {
    const generoConsulta = req.params.genero.toLowerCase();
    const livrosPorGenero = dados.Livros.filter(livro => livro.genero.toLowerCase() === generoConsulta);
    return res.json(livrosPorGenero);
});

server.get('/livros/pesquisa/:termo', (req, res) => {
    const termoConsulta = req.params.termo.toLowerCase();
    const livrosEncontrados = dados.Livros.filter(livro => {
        const tituloLowerCase = livro.titulo.toLowerCase();
        const autorLowerCase = livro.autor.toLowerCase();
        return tituloLowerCase.includes(termoConsulta) || autorLowerCase.includes(termoConsulta);
    });
    return res.json(livrosEncontrados);
});

server.get('/livros/ordenar/:criterio', (req, res) => {
    const criterioOrdenacao = req.params.criterio.toLowerCase();
    let livrosOrdenados = [];

    switch (criterioOrdenacao) {
        case 'titulo':
            livrosOrdenados = dados.Livros.sort((a, b) => a.titulo.localeCompare(b.titulo));
            break;
        case 'autor':
            livrosOrdenados = dados.Livros.sort((a, b) => a.autor.localeCompare(b.autor));
            break;
        case 'ano':
            livrosOrdenados = dados.Livros.sort((a, b) => a.anoPublicacao - b.anoPublicacao);
            break;
        case 'genero':
            livrosOrdenados = dados.Livros.sort((a, b) => a.genero.localeCompare(b.genero));
            break;
        default:
            return res.status(400).json({ mensagem: "Critério de ordenação inválido." });
    }

    return res.json(livrosOrdenados);
});

server.get('/livros/stats', (req, res) => {
    const totalLivros = dados.Livros.length;

    const estatisticasPorAutor = {};
    const estatisticasPorGenero = {};
    const estatisticasPorAno = {};

    dados.Livros.forEach(livro => {
        const autor = livro.autor;
        estatisticasPorAutor[autor] = (estatisticasPorAutor[autor] || 0) + 1;

        const genero = livro.genero;
        estatisticasPorGenero[genero] = (estatisticasPorGenero[genero] || 0) + 1;

        const ano = livro.anoPublicacao;
        estatisticasPorAno[ano] = (estatisticasPorAno[ano] || 0) + 1;
    });

    const estatisticas = {
        totalLivros: totalLivros,
        estatisticasPorAutor: estatisticasPorAutor,
        estatisticasPorGenero: estatisticasPorGenero,
        estatisticasPorAno: estatisticasPorAno,
    };

    return res.json(estatisticas);
});

server.post('/livros/comentarios/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    const comentario = req.body.comentario;

    const livroIndex = dados.Livros.findIndex(livro => livro.id === livroId);

    if (livroIndex === -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado." });
    } else {
        if (!dados.Livros[livroIndex].comentarios) {
            dados.Livros[livroIndex].comentarios = [];
        }
        dados.Livros[livroIndex].comentarios.push(comentario);
        salvarDados();
        return res.json({ mensagem: "Comentário adicionado com sucesso.", livro: dados.Livros[livroIndex] });
    }
});

server.get('/livros/comentarios/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    const livroIndex = dados.Livros.findIndex(livro => livro.id === livroId);

    if (livroIndex === -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado." });
    } else {
        const comentarios = dados.Livros[livroIndex].comentarios || [];
        return res.json({ comentarios });
    }
});

server.post('/livros/avaliacoes/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    const avaliacao = parseFloat(req.body.avaliacao);

    const livroIndex = dados.Livros.findIndex(livro => livro.id === livroId);

    if (livroIndex === -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado." });
    } else {
        if (!dados.Livros[livroIndex].avaliacoes) {
            dados.Livros[livroIndex].avaliacoes = [];
        }
        dados.Livros[livroIndex].avaliacoes.push(avaliacao);
        salvarDados();
        return res.json({ mensagem: "Avaliação adicionada com sucesso.", livro: dados.Livros[livroIndex] });
    }
});

server.get('/livros/media-avaliacoes/:id', (req, res) => {
    const livroId = parseInt(req.params.id);
    const livroIndex = dados.Livros.findIndex(livro => livro.id === livroId);

    if (livroIndex === -1) {
        return res.status(404).json({ mensagem: "Livro não encontrado." });
    } else {
        const avaliacoes = dados.Livros[livroIndex].avaliacoes || [];
        const mediaAvaliacoes = avaliacoes.length > 0 ? avaliacoes.reduce((a, b) => a + b) / avaliacoes.length : 0;
        return res.json({ mediaAvaliacoes });
    }
});

server.get('/livros/recomendacoes', (req, res) => {
    const livrosRecomendados = dados.Livros.slice(0, 3);
    return res.json(livrosRecomendados);
});

server.get('/livros/pesquisa/:termo', (req, res) => {
    const termoConsulta = req.params.termo.toLowerCase();
    const livrosEncontrados = dados.Livros.filter(livro => {
        const tituloLowerCase = livro.titulo.toLowerCase();
        const autorLowerCase = livro.autor.toLowerCase();
        return tituloLowerCase.includes(termoConsulta) || autorLowerCase.includes(termoConsulta);
    });
    return res.json(livrosEncontrados);
});

server.listen(3000, () => {
    console.log("Servidor está funcionando");
});