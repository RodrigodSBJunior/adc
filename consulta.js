// Função para selecionar o tipo de consulta
function selecionarTipo(tipo) {
    // Remover seleção de todos os botões
    document.querySelectorAll('.tipo-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Remover seleção de todos os cards
    document.querySelectorAll('.tipo-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Adicionar seleção ao botão clicado
    document.querySelector(`#${tipo} .tipo-button`).classList.add('selected');
    
    // Adicionar seleção ao card
    document.querySelector(`#${tipo}`).classList.add('selected');
    
    // Redirecionar para a próxima etapa com base no tipo selecionado
    if (tipo === 'presencial') {
        document.querySelector(`#${tipo} .tipo-button`).textContent = 'Selecionado';
    } else {
        document.querySelector(`#${tipo} .tipo-button`).textContent = 'Selecionado';
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Pré-selecionar consulta presencial
    selecionarTipo('presencial');
});