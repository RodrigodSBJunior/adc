document.addEventListener('DOMContentLoaded', function() {
    // Gerenciamento das abas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');
            
            // Mostrar o conteúdo correspondente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Funcionalidade de edição para dados pessoais
    const btnEditarPessoais = document.getElementById('btn-editar-pessoais');
    const btnSalvarPessoais = document.getElementById('btn-salvar-pessoais');
    const btnCancelarPessoais = document.getElementById('btn-cancelar-pessoais');
    const formDadosPessoais = document.getElementById('form-dados-pessoais');
    
    btnEditarPessoais.addEventListener('click', function() {
        // Habilitar campos para edição
        const inputs = formDadosPessoais.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.id !== 'cpf' && input.id !== 'rg') {
                input.disabled = false;
                input.style.backgroundColor = 'white';
            }
        });
        
        // Mostrar botões de salvar e cancelar
        btnEditarPessoais.style.display = 'none';
        btnSalvarPessoais.style.display = 'inline-block';
        btnCancelarPessoais.style.display = 'inline-block';
    });
    
    btnCancelarPessoais.addEventListener('click', function() {
        // Desabilitar campos e restaurar valores originais
        const inputs = formDadosPessoais.querySelectorAll('input');
        inputs.forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = '#f5f5f5';
            input.value = input.defaultValue;
        });
        
        // Esconder botões de salvar e cancelar
        btnEditarPessoais.style.display = 'inline-block';
        btnSalvarPessoais.style.display = 'none';
        btnCancelarPessoais.style.display = 'none';
    });
    
    formDadosPessoais.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você adicionaria o código para enviar os dados para o servidor
        // Como é apenas uma demonstração, vamos apenas mostrar uma mensagem de sucesso
        
        // Desabilitar campos
        const inputs = formDadosPessoais.querySelectorAll('input');
        inputs.forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = '#f5f5f5';
            input.defaultValue = input.value; // Atualizar valor padrão
        });
        
        // Esconder botões de salvar e cancelar
        btnEditarPessoais.style.display = 'inline-block';
        btnSalvarPessoais.style.display = 'none';
        btnCancelarPessoais.style.display = 'none';
        
        // Mostrar mensagem de sucesso
        alert('Dados pessoais atualizados com sucesso!');
    });
    
    // Funcionalidade de edição para dados médicos
    const btnEditarMedicos = document.getElementById('btn-editar-medicos');
    const btnSalvarMedicos = document.getElementById('btn-salvar-medicos');
    const btnCancelarMedicos = document.getElementById('btn-cancelar-medicos');
    const formDadosMedicos = document.getElementById('form-dados-medicos');
    
    btnEditarMedicos.addEventListener('click', function() {
        // Habilitar campos para edição
        const inputs = formDadosMedicos.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.disabled = false;
            input.style.backgroundColor = 'white';
        });
        
        // Mostrar botões de salvar e cancelar
        btnEditarMedicos.style.display = 'none';
        btnSalvarMedicos.style.display = 'inline-block';
        btnCancelarMedicos.style.display = 'inline-block';
    });
    
    btnCancelarMedicos.addEventListener('click', function() {
        // Desabilitar campos e restaurar valores originais
        const inputs = formDadosMedicos.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = '#f5f5f5';
            input.value = input.defaultValue;
        });
        
        // Esconder botões de salvar e cancelar
        btnEditarMedicos.style.display = 'inline-block';
        btnSalvarMedicos.style.display = 'none';
        btnCancelarMedicos.style.display = 'none';
    });
    
    formDadosMedicos.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aqui você adicionaria o código para enviar os dados para o servidor
        // Como é apenas uma demonstração, vamos apenas mostrar uma mensagem de sucesso
        
        // Desabilitar campos
        const inputs = formDadosMedicos.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.disabled = true;
            input.style.backgroundColor = '#f5f5f5';
            input.defaultValue = input.value; // Atualizar valor padrão
        });
        
        // Esconder botões de salvar e cancelar
        btnEditarMedicos.style.display = 'inline-block';
        btnSalvarMedicos.style.display = 'none';
        btnCancelarMedicos.style.display = 'none';
        
        // Mostrar mensagem de sucesso
        alert('Dados médicos atualizados com sucesso!');
    });
    
    // Validação do formulário de segurança
    const formSeguranca = document.getElementById('form-seguranca');
    
    formSeguranca.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const senhaAtual = document.getElementById('senha-atual').value;
        const novaSenha = document.getElementById('nova-senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        
        if (!senhaAtual) {
            alert('Por favor, digite sua senha atual.');
            return;
        }
        
        if (!novaSenha) {
            alert('Por favor, digite uma nova senha.');
            return;
        }
        
        if (novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }
        
        // Validar requisitos da senha
        const temOitoCaracteres = novaSenha.length >= 8;
        const temMaiuscula = /[A-Z]/.test(novaSenha);
        const temNumero = /[0-9]/.test(novaSenha);
        const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(novaSenha);
        
        if (!temOitoCaracteres || !temMaiuscula || !temNumero || !temEspecial) {
            alert('A nova senha não atende aos requisitos de segurança.');
            return;
        }
        
        // Aqui você adicionaria o código para enviar os dados para o servidor
        // Como é apenas uma demonstração, vamos apenas mostrar uma mensagem de sucesso
        
        // Limpar campos
        formSeguranca.reset();
        
        // Mostrar mensagem de sucesso
        alert('Senha alterada com sucesso!');
    });
});