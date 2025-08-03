function marcarPresenca(tipo) {
    const statusDiv = document.getElementById('presenca-status');
    
    if (tipo === 'presente') {
        statusDiv.textContent = 'Paciente marcado como PRESENTE';
        statusDiv.className = 'presenca-status presente';
    } else if (tipo === 'falta') {
        statusDiv.textContent = 'Paciente marcado como FALTA';
        statusDiv.className = 'presenca-status falta';
    }
    
    // Simular salvamento
    setTimeout(() => {
        statusDiv.textContent += ' - Salvo com sucesso!';
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    // Botão salvar observações
    const btnSalvarObs = document.querySelector('.btn-salvar-obs');
    const textarea = document.querySelector('.observacoes-textarea');
    
    btnSalvarObs.addEventListener('click', function() {
        if (textarea.value.trim()) {
            const originalText = btnSalvarObs.textContent;
            btnSalvarObs.textContent = 'Salvando...';
            btnSalvarObs.disabled = true;
            
            setTimeout(() => {
                btnSalvarObs.textContent = 'Salvo!';
                setTimeout(() => {
                    btnSalvarObs.textContent = originalText;
                    btnSalvarObs.disabled = false;
                }, 1000);
            }, 1000);
        } else {
            alert('Digite uma observação antes de salvar.');
        }
    });
    
    // Botões de ação
    document.querySelector('.btn-prontuario-detalhes').addEventListener('click', function() {
        window.location.href = 'prontuario-completo.html';
    });
    
    document.querySelector('.btn-historico').addEventListener('click', function() {
        window.location.href = 'historico-consultas.html';
    });
    
    document.querySelector('.btn-anotacoes').addEventListener('click', function() {
        window.location.href = 'anotacoes.html';
    });
});