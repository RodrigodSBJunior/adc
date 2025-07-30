document.addEventListener('DOMContentLoaded', function() {
    // Elementos das abas
    const tabFuturas = document.getElementById('tab-futuras');
    const tabPassadas = document.getElementById('tab-passadas');
    const consultasFuturas = document.getElementById('consultas-futuras');
    const consultasPassadas = document.getElementById('consultas-passadas');
    const tituloPagina = document.getElementById('titulo-pagina');
    
    // Verificar parâmetros da URL para definir a aba ativa
    const urlParams = new URLSearchParams(window.location.search);
    const tipoConsulta = urlParams.get('tipo');
    
    if (tipoConsulta === 'passadas') {
        // Mostrar aba de consultas passadas
        tabFuturas.classList.remove('active');
        tabPassadas.classList.add('active');
        consultasFuturas.classList.add('hidden');
        consultasPassadas.classList.remove('hidden');
        tituloPagina.textContent = 'Histórico de Consultas';
    }
    
    // Event listeners para as abas
    tabFuturas.addEventListener('click', function() {
        tabFuturas.classList.add('active');
        tabPassadas.classList.remove('active');
        consultasFuturas.classList.remove('hidden');
        consultasPassadas.classList.add('hidden');
        tituloPagina.textContent = 'Consultas Futuras';
        // Atualizar a URL sem recarregar a página
        history.pushState(null, '', 'myconsultas.html?tipo=futuras');
    });
    
    tabPassadas.addEventListener('click', function() {
        tabPassadas.classList.add('active');
        tabFuturas.classList.remove('active');
        consultasPassadas.classList.remove('hidden');
        consultasFuturas.classList.add('hidden');
        tituloPagina.textContent = 'Histórico de Consultas';
        // Atualizar a URL sem recarregar a página
        history.pushState(null, '', 'myconsultas.html?tipo=passadas');
    });
    
    // Funcionalidade para os botões de ação
    const botoesRemarcar = document.querySelectorAll('.btn-remarcar');
    const botoesCancelar = document.querySelectorAll('.btn-cancelar');
    const botoesAvaliar = document.querySelectorAll('.btn-avaliar');
    
    botoesRemarcar.forEach(function(botao) {
        botao.addEventListener('click', function() {
            alert('Você será redirecionado para a página de reagendamento.');
            window.location.href = 'consulta.html';
        });
    });
    
    botoesCancelar.forEach(function(botao) {
        botao.addEventListener('click', function() {
            const confirmar = confirm('Tem certeza que deseja cancelar esta consulta?');
            if (confirmar) {
                alert('Consulta cancelada com sucesso!');
                // Aqui você pode adicionar código para remover o card ou atualizar a página
                botao.closest('.consulta-card').remove();
            }
        });
    });
    
    botoesAvaliar.forEach(function(botao) {
        botao.addEventListener('click', function() {
            alert('Obrigado por avaliar sua consulta!');
            botao.textContent = 'Avaliado';
            botao.disabled = true;
        });
    });
});