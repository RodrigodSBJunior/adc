document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-cadastro');
    const inputs = form.querySelectorAll('input, select');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const emailInput = document.getElementById('email');
    const confirmarEmailInput = document.getElementById('confirmar-email');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');

    // Máscara para CPF
    cpfInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    // Máscara para telefone
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
        e.target.value = value;
    });

    // Efeitos visuais nos inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Validação do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const errors = [];

        // Validar campos obrigatórios
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                errors.push(`O campo ${input.previousElementSibling.textContent.replace(' *', '')} é obrigatório`);
                isValid = false;
            }
        });

        // Validar emails
        if (emailInput.value && confirmarEmailInput.value && emailInput.value !== confirmarEmailInput.value) {
            errors.push('Os emails não coincidem');
            isValid = false;
        }

        // Validar senhas
        if (senhaInput.value && confirmarSenhaInput.value && senhaInput.value !== confirmarSenhaInput.value) {
            errors.push('As senhas não coincidem');
            isValid = false;
        }

        // Validar força da senha
        if (senhaInput.value && senhaInput.value.length < 6) {
            errors.push('A senha deve ter pelo menos 6 caracteres');
            isValid = false;
        }

        // Validar CPF básico
        if (cpfInput.value) {
            const cpf = cpfInput.value.replace(/\D/g, '');
            if (cpf.length !== 11) {
                errors.push('CPF deve ter 11 dígitos');
                isValid = false;
            }
        }

        // Validar email
        if (emailInput.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                errors.push('Email inválido');
                isValid = false;
            }
        }

        if (isValid) {
            window.location.href = 'areaprofissional.html';
        } else {
            alert('Erros encontrados:\n' + errors.join('\n'));
        }
    });
});