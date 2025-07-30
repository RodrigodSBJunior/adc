document.addEventListener('DOMContentLoaded', function() {
    // Botões de filtro
    const botoesFiltro = document.querySelectorAll('.filtro-opcoes button');
    const notificacoes = document.querySelectorAll('.notificacao-item');
    
    // Adicionar evento de clique aos botões de filtro
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remover classe ativo de todos os botões
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            
            // Adicionar classe ativo ao botão clicado
            this.classList.add('ativo');
            
            // Filtrar notificações
            const filtro = this.textContent.trim();
            
            notificacoes.forEach(notificacao => {
                if (filtro === 'Todas') {
                    notificacao.style.display = 'flex';
                } else if (filtro === 'Não lidas' && notificacao.classList.contains('nao-lida')) {
                    notificacao.style.display = 'flex';
                } else if (filtro === 'Importantes' && notificacao.querySelector('.notificacao-icone.importante')) {
                    notificacao.style.display = 'flex';
                } else {
                    notificacao.style.display = 'none';
                }
            });
            
            // Verificar se há notificações visíveis
            verificarNotificacoesVisiveis();
        });
    });
    
    // Botão para marcar todas como lidas
    const botaoMarcarTodas = document.querySelector('.marcar-todas');
    botaoMarcarTodas.addEventListener('click', function() {
        const notificacoesNaoLidas = document.querySelectorAll('.notificacao-item.nao-lida');
        
        notificacoesNaoLidas.forEach(notificacao => {
            notificacao.classList.remove('nao-lida');
            
            // Remover botão "Marcar como lida"
            const botaoMarcarLida = notificacao.querySelector('.marcar-lida');
            if (botaoMarcarLida) {
                botaoMarcarLida.remove();
            }
        });
    });
    
    // Botões para marcar como lida
    const botoesMarcarLida = document.querySelectorAll('.marcar-lida');
    botoesMarcarLida.forEach(botao => {
        botao.addEventListener('click', function() {
            const notificacao = this.closest('.notificacao-item');
            notificacao.classList.remove('nao-lida');
            this.remove();
        });
    });
    
    // Botões para excluir
    const botoesExcluir = document.querySelectorAll('.excluir');
    botoesExcluir.forEach(botao => {
        botao.addEventListener('click', function() {
            const notificacao = this.closest('.notificacao-item');
            
            // Adicionar classe para animação de saída
            notificacao.style.opacity = '0';
            notificacao.style.transform = 'translateX(100px)';
            notificacao.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Remover após a animação
            setTimeout(() => {
                notificacao.remove();
                verificarNotificacoesVisiveis();
            }, 300);
        });
    });
    
    // Função para verificar se há notificações visíveis
    function verificarNotificacoesVisiveis() {
        const container = document.querySelector('.notificacoes-container');
        const notificacoesVisiveis = Array.from(notificacoes).filter(n => n.style.display !== 'none');
        
        if (notificacoesVisiveis.length === 0) {
            // Se não houver notificações visíveis, mostrar mensagem
            if (!document.querySelector('.sem-notificacoes')) {
                const mensagem = document.createElement('div');
                mensagem.className = 'sem-notificacoes';
                mensagem.innerHTML = '<i class="icon-bell"></i><p>Não há notificações para exibir</p>';
                container.appendChild(mensagem);
            }
        } else {
            // Se houver notificações, remover mensagem
            const mensagem = document.querySelector('.sem-notificacoes');
            if (mensagem) {
                mensagem.remove();
            }
        }
    }
});