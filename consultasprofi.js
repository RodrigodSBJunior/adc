document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('mes-anterior');
    const nextBtn = document.getElementById('mes-proximo');
    const mesAtual = document.getElementById('mes-atual');
    const calendario = document.getElementById('calendario');
    const selectedDateEl = document.getElementById('selectedDate');
    const consultasList = document.getElementById('consultasList');

    let currentDate = new Date();
    let selectedDate = null;
    
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Dados simulados de consultas
    const consultasData = {
        '2025-01-15': [
            {
                id: 1,
                paciente: 'Maria Silva',
                foto: 'psicologa.png',
                tipo: 'online',
                horario: '09:00',
                observacoes: 'Primeira consulta'
            },
            {
                id: 2,
                paciente: 'João Santos',
                foto: 'psicologa.png',
                tipo: 'presencial',
                horario: '14:30',
                observacoes: 'Consulta de retorno'
            }
        ],
        '2025-01-16': [
            {
                id: 3,
                paciente: 'Ana Paula',
                foto: 'psicologa.png',
                tipo: 'online',
                horario: '10:00',
                observacoes: 'Terapia cognitiva'
            }
        ],
        '2025-01-17': [
            {
                id: 6,
                paciente: 'Pedro Costa',
                foto: 'psicologa.png',
                tipo: 'presencial',
                horario: '08:30',
                observacoes: 'Consulta inicial'
            }
        ],
        '2025-01-20': [
            {
                id: 4,
                paciente: 'Carlos Oliveira',
                foto: 'psicologa.png',
                tipo: 'presencial',
                horario: '15:00',
                observacoes: 'Avaliação psicológica'
            },
            {
                id: 5,
                paciente: 'Lucia Ferreira',
                foto: 'psicologa.png',
                tipo: 'online',
                horario: '16:30',
                observacoes: 'Sessão de acompanhamento'
            }
        ],
        '2025-01-22': [
            {
                id: 7,
                paciente: 'Fernanda Lima',
                foto: 'psicologa.png',
                tipo: 'online',
                horario: '11:00',
                observacoes: 'Terapia de casal'
            }
        ],
        '2025-01-23': [
            {
                id: 8,
                paciente: 'Roberto Alves',
                foto: 'psicologa.png',
                tipo: 'presencial',
                horario: '13:30',
                observacoes: 'Consulta de seguimento'
            },
            {
                id: 9,
                paciente: 'Carla Mendes',
                foto: 'psicologa.png',
                tipo: 'online',
                horario: '17:00',
                observacoes: 'Primeira sessão'
            }
        ],
        '2025-01-24': [
            {
                id: 10,
                paciente: 'Eduardo Silva',
                foto: 'psicologa.png',
                tipo: 'presencial',
                horario: '09:30',
                observacoes: 'Avaliação neuropsicológica'
            }
        ]
    };

    // Inicializar calendário
    function initCalendar() {
        updateCalendar();
    }

    // Atualizar calendário
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        mesAtual.textContent = `${meses[month]} ${year}`;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        calendario.innerHTML = '';
        
        // Adicionar cabeçalhos dos dias da semana
        diasSemana.forEach(dia => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'dia-semana';
            dayHeader.textContent = dia;
            calendario.appendChild(dayHeader);
        });
        
        // Adicionar dias do mês
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const dayEl = document.createElement('div');
            dayEl.className = 'dia';
            dayEl.textContent = date.getDate();
            
            if (date.getMonth() !== month) {
                dayEl.classList.add('outro-mes');
            }
            
            // Verificar se é hoje
            const hoje = new Date();
            if (date.toDateString() === hoje.toDateString()) {
                dayEl.classList.add('hoje');
            }
            
            // Verificar se tem consultas
            const dateStr = formatDate(date);
            if (consultasData[dateStr]) {
                dayEl.classList.add('has-consulta');
            }
            
            // Adicionar evento de clique
            dayEl.addEventListener('click', () => selectDate(date, dayEl));
            
            calendario.appendChild(dayEl);
        }
    }

    // Selecionar data
    function selectDate(date, dayEl) {
        // Remover seleção anterior
        document.querySelectorAll('.dia.selecionado').forEach(el => {
            el.classList.remove('selecionado');
        });
        
        // Adicionar nova seleção
        dayEl.classList.add('selecionado');
        selectedDate = date;
        
        // Atualizar header
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        selectedDateEl.textContent = date.toLocaleDateString('pt-BR', options);
        
        // Mostrar consultas
        showConsultas(date);
    }

    // Mostrar consultas do dia
    function showConsultas(date) {
        const dateStr = formatDate(date);
        const consultas = consultasData[dateStr] || [];
        
        if (consultas.length === 0) {
            consultasList.innerHTML = `
                <div class="no-selection">
                    <i class="icon-calendar"></i>
                    <p>Nenhuma consulta agendada para este dia</p>
                </div>
            `;
            return;
        }
        
        consultasList.innerHTML = consultas.map(consulta => `
            <div class="consulta-card">
                <div class="consulta-header">
                    <img src="${consulta.foto}" alt="${consulta.paciente}" class="paciente-foto">
                    <div class="paciente-info">
                        <h4>${consulta.paciente}</h4>
                        <span class="consulta-tipo tipo-${consulta.tipo}">
                            ${consulta.tipo === 'online' ? '💻 Online' : '🏥 Presencial'}
                        </span>
                    </div>
                </div>
                <div class="consulta-details">
                    <div class="consulta-horario">${consulta.horario}</div>
                    <a href="prontuario.html?id=${consulta.id}" class="btn-prontuario">
                        Ver Prontuário
                    </a>
                </div>
                <div class="consulta-observacoes">
                    <small>${consulta.observacoes}</small>
                </div>
            </div>
        `).join('');
    }

    // Formatar data para string
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });
    
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Inicializar
    initCalendar();
});