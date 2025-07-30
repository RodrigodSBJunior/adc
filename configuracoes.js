document.addEventListener('DOMContentLoaded', function() {
    // Botões de tema
    const themeButtons = document.querySelectorAll('.theme-button');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Aplicar tema
            const theme = this.getAttribute('data-theme');
            document.body.className = theme;
        });
    });
    
    // Botões de tamanho de fonte
    const fontSizeButtons = document.querySelectorAll('.font-size-button');
    
    fontSizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            fontSizeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Aplicar tamanho de fonte
            const fontSize = this.getAttribute('data-size');
            document.documentElement.setAttribute('data-font-size', fontSize);
        });
    });
    
    // Botão de excluir conta
    const btnExcluirConta = document.querySelector('.btn-danger');
    
    btnExcluirConta.addEventListener('click', function() {
        const confirmacao = confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');
        
        if (confirmacao) {
            alert('Sua solicitação de exclusão de conta foi enviada. Entraremos em contato para confirmar.');
        }
    });
    
    // Botão de salvar alterações
    const btnSalvar = document.querySelector('.btn-salvar');
    
    btnSalvar.addEventListener('click', function() {
        // Aqui você adicionaria o código para salvar as configurações
        // Como é apenas uma demonstração, vamos apenas mostrar uma mensagem de sucesso
        alert('Configurações salvas com sucesso!');
    });
    
    // Botão de restaurar padrões
    const btnRestaurar = document.querySelector('.btn-cancelar');
    
    btnRestaurar.addEventListener('click', function() {
        const confirmacao = confirm('Tem certeza que deseja restaurar todas as configurações para os valores padrão?');
        
        if (confirmacao) {
            // Restaurar switches
            document.querySelectorAll('.switch input').forEach(input => {
                input.checked = true;
            });
            
            // Restaurar tema
            themeButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.theme-button[data-theme="light"]').classList.add('active');
            document.body.className = 'light';
            
            // Restaurar tamanho de fonte
            fontSizeButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.font-size-button[data-size="medium"]').classList.add('active');
            document.documentElement.setAttribute('data-font-size', 'medium');
            
            // Restaurar idioma
            document.querySelector('.config-select').value = 'pt-br';
            
            alert('Configurações restauradas para os valores padrão.');
        }
    });
});