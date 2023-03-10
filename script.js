var state = { board: [], jogoAtivo: [], jogosSalvos: [] };

function start () {
    criarBoard();
    novoJogo();
    render();
    console.log(state.board);
    
};

function render(){
    renderBoard();
    renderBotoes();
    renderJogosSalvos();
};

function renderBoard(){
    var divJogo = document.querySelector('#megaSenaBoard');
    divJogo.innerHTML = "";

    var ulNumbers = document.createElement('ul');
    ulNumbers.classList.add('numeros');

    for(var i = 0; i < 60; i++){
        var numeroAtual = state.board[i];

        var liNumber = document.createElement('li');
        liNumber.textContent = numeroAtual;

        liNumber.addEventListener('click', handleNumberClick);
        liNumber.classList.add('numero');

        if(numeroPresente(numeroAtual)){
            liNumber.classList.remove('numero');
            liNumber.classList.add('selecionado');
        }
        ulNumbers.appendChild(liNumber);

        if(jogoCompleto()){
            liNumber.classList.remove('numero');
            liNumber.classList.add('preenchido');
        }
    }

        

    divJogo.appendChild(ulNumbers);
};

function handleNumberClick(evento){
    var valor = Number(evento.currentTarget.textContent);

    if(numeroPresente(valor)){
        removeNumero(valor);
    } else {
        addNumeroJogo(valor);
    }
    
    render();
    console.log(state.jogoAtivo)
}

function renderBotoes(){
    var divBotoes = document.querySelector('#megaSenaBotoes');

}

function renderBotoes(){

    var divBotoes = document.querySelector('#megaSenaBotoes')
    divBotoes.innerHTML = '';
    var botaoNovoJogo = criarNovoJogo();
    divBotoes.appendChild(botaoNovoJogo);
    var botaoJogoAleatorio = criarBotaoJogoAleatorio();
    divBotoes.appendChild(botaoJogoAleatorio);
    var botaoSalvarJogo = criarBotaoSalvarJogo();
    divBotoes.appendChild(botaoSalvarJogo);
}

function criarNovoJogo(){
    var botao = document.createElement('button');
    botao.textContent = 'Novo Jogo';
    botao.addEventListener('click', novoJogo);
    return botao;
}

function criarBotaoJogoAleatorio(){
    var botao = document.createElement('button');
    botao.textContent = 'Jogo Aleat??rio';
    botao.addEventListener('click', jogoAleatorio);
    return botao;
}

function criarBotaoSalvarJogo(){
    var botao = document.createElement('button');
    botao.textContent = 'Salvar Jogo';
    botao.addEventListener('click', salvarJogo);
    botao.disabled = !jogoCompleto();
    return botao;
}

function jogoAleatorio(){
    resetarJogo();

    while(!jogoCompleto()){
        var numeroAleatorio = Math.ceil(Math.random() * 60);
        addNumeroJogo(numeroAleatorio);
    }

    render();
    console.log(state.jogoAtivo)
}

function renderJogosSalvos(jogoAtivo){
    var divSalvos = document.querySelector('#megaSenaJogosSalvos');
    divSalvos.innerHTML = '';
    var h1Salvos = document.createElement('h1');
    h1Salvos.textContent = 'Jogos Salvos';
    

    if(state.jogosSalvos.length === 0) {
        divSalvos.innerHTML = '<p>Nenhum Jogo Salvo</p>'
    } else {
        var ulJogosSalvos = document.createElement('ul');

        for(var i = 0; i < state.jogosSalvos.length; i++) {
            var jogoAtual = state.jogosSalvos[i];
            var liJogo = document.createElement('li');
            liJogo.textContent = jogoAtual.join(' - ');
            ulJogosSalvos.appendChild(liJogo);
            divSalvos.appendChild(h1Salvos);
        }

        divSalvos.appendChild(ulJogosSalvos);
    }
}

function criarBoard(){
    state.board = [];

    for(var i = 1; i <= 60; i++){
        state.board.push(i);
    }
};

start();

function novoJogo(){
    resetarJogo();
    render();
    console.log(state.jogoAtivo);
}

function addNumeroJogo(numeroAdicionado){
    if(numeroAdicionado < 1 || numeroAdicionado > 60){
        console.error('Este n??mero ?? inv??lido,', numeroAdicionado);
        return;
    }
    if(state.jogoAtivo.length >= 6) {
        console.error('O jogo j?? est?? preenchido');
        return;
    }
    if(numeroPresente(numeroAdicionado)) {
        console.error('O n??mero j?? foi preenchido.' , numeroAdicionado);
        return;
    }
    
    state.jogoAtivo.push(numeroAdicionado);
    

}

function numeroPresente(numeroChecado){
    return state.jogoAtivo.includes(numeroChecado);
}

function removeNumero(numeroRemovido){

    if(numeroRemovido < 1 || numeroRemovido > 60){
        console.error('Este n??mero ?? inv??lido,', numeroRemovido);
        return;
    }

    var novoJogo = [ ];

    for(var i = 0; i < state.jogoAtivo.length; i++){
        var numeroAtual = state.jogoAtivo[i];

        if(numeroAtual === numeroRemovido){
            continue;
        }

        novoJogo.push(numeroAtual);
    }

    state.jogoAtivo = novoJogo;
}

function jogoCompleto(){
    return state.jogoAtivo.length === 6;
}

function salvarJogo() {
    if(! jogoCompleto()) {
        console.error('O jogo n??o est?? completo!');
        return;
    };
    console.log(state.jogosSalvos)
    state.jogosSalvos.push(state.jogoAtivo)
    novoJogo();
}

function resetarJogo() {
    state.jogoAtivo = [];
}