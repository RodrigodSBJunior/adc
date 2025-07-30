document.addEventListener('DOMContentLoaded', function() {
    // Gerar calendário
    gerarCalendario();
    
    // Adicionar eventos aos botões de navegação do calendário
    document.querySelectorAll('.btn-calendar-nav').forEach(btn => {
        btn.addEventListener('click', function() {
            // Aqui você adicionaria a lógica para navegar entre os meses
            alert('Navegação entre meses será implementada');
        });
    });
    
    // Adicionar evento ao botão de adicionar horários
    document.querySelector('.btn-primary').addEventListener('click', function() {
        abrirModalAdicionarHorarios();
    });
    
    // Adicionar eventos aos botões de ação
    document.querySelectorAll('.btn-action').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('i').className;
            
            if (action.includes('file-text')) {
                alert('Visualizar prontuário/detalhes');
            } else if (action.includes('video')) {
                alert('Iniciar videochamada');
            } else if (action.includes('edit')) {
                alert('Editar consulta');
            } else if (action.includes('calendar')) {
                alert('Agendar consulta');
            }
        });
    });
    
    // Adicionar eventos aos botões de paginação
    document.querySelectorAll('.btn-page').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-page').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Aqui você adicionaria a lógica para carregar a página correspondente
        });
    });
    
    // Adicionar evento ao campo de busca
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                buscarPacientes(this.value);
            }
        });
        
        document.querySelector('.btn-search').addEventListener('click', function() {
            buscarPacientes(searchInput.value);
        });
    }
    
    // Adicionar eventos aos filtros
    const filterSelect = document.querySelector('.filter-select');
    const filterDate = document.querySelector('.filter-date');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            filtrarConsultas();
        });
    }
    
    if (filterDate) {
        filterDate.addEventListener('change', function() {
            filtrarConsultas();
        });
    }
});

// Função para gerar o calendário
function gerarCalendario() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;
    
    // Limpar o grid
    calendarGrid.innerHTML = '';
    
    // Dados do mês atual (exemplo: junho 2023)
    const diasNoMes = 30;
    const primeiroDiaSemana = 4; // 0 = Domingo, 4 = Quinta-feira
    
    // Adicionar dias vazios para o início do mês
    for (let i = 0; i < primeiroDiaSemana; i++) {
        const diaVazio = document.createElement('div');
        diaVazio.className = 'calendar-day empty';
        calendarGrid.appendChild(diaVazio);
    }
    
    // Adicionar os dias do mês
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const diaElement = document.createElement('div');
        diaElement.className = 'calendar-day';
        
        // Destacar o dia atual (exemplo: dia 15)
        if (dia === 15) {
            diaElement.classList.add('today');
        }
        
        // Adicionar indicador de consulta para alguns dias
        if ([5, 10, 15, 22, 28].includes(dia)) {
            diaElement.classList.add('has-appointments');
            
            // Número de consultas para o dia
            const numConsultas = Math.floor(Math.random() * 5) + 1;
            
            const diaNumero = document.createElement('div');
            diaNumero.className = 'day-number';
            diaNumero.textContent = dia;
            
            const diaIndicador = document.createElement('div');
            diaIndicador.className = 'day-indicator';
            diaIndicador.textContent = `${numConsultas} consulta${numConsultas > 1 ? 's' : ''}`;
            
            diaElement.appendChild(diaNumero);
            diaElement.appendChild(diaIndicador);
        } else {
            diaElement.textContent = dia;
        }
        
        // Adicionar evento de clique
        diaElement.addEventListener('click', function() {
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            // Aqui você adicionaria a lógica para mostrar as consultas do dia selecionado
        });
        
        calendarGrid.appendChild(diaElement);
    }
    
    // Adicionar estilos CSS para o calendário
    const style = document.createElement('style');
    style.textContent = `
        .calendar-day {
            height: 60px;
            border: 1px solid #ddd;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.3s ease;
            background-color: white;
            position: relative;
        }
        
        .calendar-day:hover {
            background-color: #f5f5f5;
        }
        
        .calendar-day.empty {
            background-color: transparent;
            border: none;
            cursor: default;
        }
        
        .calendar-day.today {
            background-color: #e3f2fd;
            border-color: #0066cc;
            font-weight: bold;
            color: #0066cc;
        }
        
        .calendar-day.selected {
            background-color: #0066cc;
            color: white;
            border-color: #0066cc;
        }
        
        .calendar-day.has-appointments {
            flex-direction: column;
            padding: 5px;
        }
        
        .day-number {
            font-weight: bold;
        }
        
        .day-indicator {
            font-size: 0.7rem;
            color: #0066cc;
            margin-top: 3px;
        }
        
        .calendar-day.selected .day-indicator {
            color: white;
        }
    `;
    document.head.appendChild(style);
}

// Função para abrir modal de adicionar horários
function abrirModalAdicionarHorarios() {
    // Criar o modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Adicionar Horários Disponíveis</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Data:</label>
                    <input type="date" id="data-horario">
                </div>
                <div class="form-group">
                    <label>Horário de Início:</label>
                    <input type="time" id="hora-inicio">
                </div>
                <div class="form-group">
                    <label>Horário de Fim:</label>
                    <input type="time" id="hora-fim">
                </div>
                <div class="form-group">
                    <label>Intervalo entre Consultas (minutos):</label>
                    <select id="intervalo">
                        <option value="30">30 minutos</option>
                        <option value="45">45 minutos</option>
                        <option value="60" selected>60 minutos</option>
                        <option value="90">90 minutos</option>
                        <option value="120">120 minutos</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Repetir:</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" value="1"> Segunda</label>
                        <label><input type="checkbox" value="2"> Terça</label>
                        <label><input type="checkbox" value="3"> Quarta</label>
                        <label><input type="checkbox" value="4"> Quinta</label>
                        <label><input type="checkbox" value="5"> Sexta</label>
                        <label><input type="checkbox" value="6"> Sábado</label>
                        <label><input type="checkbox" value="0"> Domingo</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Repetir até:</label>
                    <input type="date" id="data-fim-repeticao">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary">Cancelar</button>
                <button class="btn-primary">Salvar Horários</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Adicionar estilos CSS para o modal
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .modal-header {
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-header h2 {
            margin: 0;
            font-size: 1.3rem;
        }
        
        .close-modal {
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        .modal-body {
            padding: 20px;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        
        .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .checkbox-group label {
            display: flex;
            align-items: center;
            font-weight: normal;
        }
        
        .checkbox-group input {
            margin-right: 5px;
            width: auto;
        }
        
        .modal-footer {
            padding: 15px 20px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
        
        .btn-secondary {
            background-color: #f5f5f5;
            color: #333;
            border: 1px solid #ddd;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .btn-secondary:hover {
            background-color: #e5e5e5;
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar eventos
    modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.btn-secondary').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.btn-primary').addEventListener('click', function() {
        // Aqui você adicionaria a lógica para salvar os horários
        alert('Horários adicionados com sucesso!');
        document.body.removeChild(modal);
    });
}

// Função para buscar pacientes
function buscarPacientes(termo) {
    if (!termo) {
        alert('Digite um termo para buscar');
        return;
    }
    
    // Aqui você adicionaria a lógica para buscar pacientes
    alert(`Buscando por: ${termo}`);
}

// Função para filtrar consultas
function filtrarConsultas() {
    const paciente = document.querySelector('.filter-select').value;
    const data = document.querySelector('.filter-date').value;
    
    // Aqui você adicionaria a lógica para filtrar consultas
    alert(`Filtrando consultas - Paciente: ${paciente}, Data: ${data || 'Todas'}`);
}