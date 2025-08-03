document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const calendario = document.getElementById('calendario');
    const mesAtual = document.getElementById('mes-atual');
    const mesAnterior = document.getElementById('mes-anterior');
    const mesProximo = document.getElementById('mes-proximo');
    const horariosGrid = document.getElementById('horarios-grid');
    const dataSelecionada = document.getElementById('data-selecionada');
    
    // Data atual
    let dataAtual = new Date();
    let mesAtivo = dataAtual.getMonth();
    let anoAtivo = dataAtual.getFullYear();
    let diaSelecionado = null;
    
    // Nomes dos meses
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    // Nomes dos dias da semana
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    // Horários disponíveis (exemplo)
    const horariosDisponiveis = {
        '2023-06-10': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        '2023-06-11': ['08:00', '09:00', '10:00', '14:00', '16:00', '17:00'],
        '2023-06-12': ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
        '2023-06-13': ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
        '2023-06-14': ['10:00', '11:00', '14:00'],
        '2023-06-17': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
        '2023-06-18': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'],
        '2023-06-19': ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
        '2023-06-20': ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    };
    
    // Adicionar horários para o mês atual
    const mesAtualStr = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const anoAtualStr = String(dataAtual.getFullYear());
    
    // Adicionar horários para os próximos 10 dias
    for (let i = 0; i < 10; i++) {
        const data = new Date();
        data.setDate(data.getDate() + i);
        if (data.getDay() !== 0 && data.getDay() !== 6) { // Excluir fins de semana
            const dataStr = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
            const horarios = [];
            // Gerar horários aleatórios
            for (let h = 8; h <= 17; h++) {
                if (Math.random() > 0.3) { // 70% de chance de ter o horário disponível
                    horarios.push(`${String(h).padStart(2, '0')}:00`);
                }
            }
            horariosDisponiveis[dataStr] = horarios;
        }
    }
    
    // Inicializar calendário
    function inicializarCalendario() {
        atualizarMesAno();
        renderizarCalendario();
        
        // Event listeners para navegação do mês
        mesAnterior.addEventListener('click', function() {
            mesAtivo--;
            if (mesAtivo < 0) {
                mesAtivo = 11;
                anoAtivo--;
            }
            atualizarMesAno();
            renderizarCalendario();
        });
        
        mesProximo.addEventListener('click', function() {
            mesAtivo++;
            if (mesAtivo > 11) {
                mesAtivo = 0;
                anoAtivo++;
            }
            atualizarMesAno();
            renderizarCalendario();
        });
    }
    
    // Atualizar o texto do mês e ano
    function atualizarMesAno() {
        mesAtual.textContent = `${meses[mesAtivo]} ${anoAtivo}`;
    }
    
    // Renderizar o calendário
    function renderizarCalendario() {
        calendario.innerHTML = '';
        
        // Adicionar cabeçalho dos dias da semana
        diasSemana.forEach(function(dia) {
            const diaSemanaEl = document.createElement('div');
            diaSemanaEl.className = 'dia-semana';
            diaSemanaEl.textContent = dia;
            calendario.appendChild(diaSemanaEl);
        });
        
        // Obter o primeiro dia do mês
        const primeiroDia = new Date(anoAtivo, mesAtivo, 1);
        const ultimoDia = new Date(anoAtivo, mesAtivo + 1, 0);
        
        // Obter o dia da semana do primeiro dia (0 = Domingo, 6 = Sábado)
        const primeiroDiaSemana = primeiroDia.getDay();
        
        // Adicionar dias do mês anterior
        const ultimoDiaMesAnterior = new Date(anoAtivo, mesAtivo, 0).getDate();
        for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
            const dia = ultimoDiaMesAnterior - i;
            const diaEl = document.createElement('div');
            diaEl.className = 'dia outro-mes';
            diaEl.textContent = dia;
            calendario.appendChild(diaEl);
        }
        
        // Adicionar dias do mês atual
        const hoje = new Date();
        for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
            const diaEl = document.createElement('div');
            diaEl.className = 'dia';
            diaEl.textContent = dia;
            diaEl.setAttribute('data-dia', dia);
            
            // Verificar se é hoje
            if (hoje.getDate() === dia && hoje.getMonth() === mesAtivo && hoje.getFullYear() === anoAtivo) {
                diaEl.classList.add('hoje');
            }
            
            // Verificar se tem horários disponíveis
            const dataFormatada = `${anoAtivo}-${String(mesAtivo + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
            
            // Tornar todos os dias clicáveis para demonstração
            diaEl.addEventListener('click', function() {
                selecionarDia(dia, dataFormatada);
            });
            
            calendario.appendChild(diaEl);
        }
        
        // Adicionar dias do próximo mês para completar a grade
        const totalCelulas = 42; // 6 linhas x 7 colunas
        const diasAdicionados = primeiroDiaSemana + ultimoDia.getDate();
        const diasRestantes = totalCelulas - diasAdicionados;
        
        for (let dia = 1; dia <= diasRestantes; dia++) {
            const diaEl = document.createElement('div');
            diaEl.className = 'dia outro-mes';
            diaEl.textContent = dia;
            calendario.appendChild(diaEl);
        }
    }
    
    // Selecionar um dia e mostrar horários disponíveis
    function selecionarDia(dia, dataFormatada) {
        // Remover seleção anterior
        const diasSelecionados = document.querySelectorAll('.dia.selecionado');
        diasSelecionados.forEach(function(el) {
            el.classList.remove('selecionado');
        });
        
        // Adicionar seleção ao dia clicado
        const diaEl = document.querySelector(`.dia[data-dia="${dia}"]`);
        if (diaEl) {
            diaEl.classList.add('selecionado');
        }
        
        // Atualizar dia selecionado
        diaSelecionado = dia;
        
        // Atualizar texto da data selecionada
        const dataObj = new Date(anoAtivo, mesAtivo, dia);
        const diaSemana = diasSemana[dataObj.getDay()];
        dataSelecionada.textContent = `${diaSemana}, ${dia} de ${meses[mesAtivo]} de ${anoAtivo}`;
        
        // Mostrar horários disponíveis
        mostrarHorarios(dataFormatada);
    }
    
    // Mostrar horários disponíveis para o dia selecionado
    function mostrarHorarios(dataFormatada) {
        horariosGrid.innerHTML = '';
        
        // Desabilitar o botão de agendamento até que um horário seja selecionado
        const botaoAgendar = document.getElementById('botao-agendar');
        botaoAgendar.disabled = true;
        
        // Gerar horários aleatórios para demonstração
        let horarios = horariosDisponiveis[dataFormatada];
        if (!horarios) {
            horarios = [];
            // Gerar entre 0 e 8 horários aleatórios
            const numHorarios = Math.floor(Math.random() * 9);
            for (let i = 0; i < numHorarios; i++) {
                const hora = Math.floor(Math.random() * 10) + 8; // Entre 8h e 17h
                horarios.push(`${String(hora).padStart(2, '0')}:00`);
            }
            // Ordenar horários
            horarios.sort();
        }
        
        if (horarios.length === 0) {
            const mensagem = document.createElement('p');
            mensagem.textContent = 'Não há horários disponíveis para esta data.';
            mensagem.style.gridColumn = '1 / -1';
            mensagem.style.textAlign = 'center';
            horariosGrid.appendChild(mensagem);
            return;
        }
        
        horarios.forEach(function(horario) {
            const horarioEl = document.createElement('div');
            horarioEl.className = 'horario';
            horarioEl.textContent = horario;
            
            horarioEl.addEventListener('click', function() {
                // Remover seleção anterior
                const horariosSelecionados = document.querySelectorAll('.horario.selecionado');
                horariosSelecionados.forEach(function(el) {
                    el.classList.remove('selecionado');
                });
                
                // Adicionar seleção ao horário clicado
                horarioEl.classList.add('selecionado');
                
                // Habilitar o botão de agendamento
                const botaoAgendar = document.getElementById('botao-agendar');
                botaoAgendar.disabled = false;
                botaoAgendar.onclick = function() {
                    // Esconder calendário e mostrar mensagem de sucesso
                    const calendarioSection = document.getElementById('calendario-section');
                    const mensagemSucesso = document.getElementById('mensagem-sucesso');
                    
                    if (calendarioSection && mensagemSucesso) {
                        calendarioSection.style.display = 'none';
                        mensagemSucesso.style.display = 'block';
                    }
                };
            });
            
            horariosGrid.appendChild(horarioEl);
        });
    }
    
    // Inicializar o calendário
    inicializarCalendario();
});