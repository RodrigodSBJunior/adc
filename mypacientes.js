document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const statusFilter = document.getElementById('statusFilter');
    const pacientesList = document.getElementById('pacientesList');

    // Dados simulados dos pacientes
    const pacientesData = [
        {
            id: 1,
            nome: 'Maria Silva',
            idade: 32,
            foto: 'psicologa.png',
            status: 'ativo',
            telefone: '(11) 99999-1111',
            email: 'maria.silva@email.com',
            ultimaConsulta: '15/01/2025',
            proximaConsulta: '22/01/2025',
            observacoes: 'Paciente com ansiedade generalizada'
        },
        {
            id: 2,
            nome: 'João Santos',
            idade: 28,
            foto: 'psicologa.png',
            status: 'ativo',
            telefone: '(11) 99999-2222',
            email: 'joao.santos@email.com',
            ultimaConsulta: '16/01/2025',
            proximaConsulta: '23/01/2025',
            observacoes: 'Terapia cognitivo-comportamental'
        },
        {
            id: 3,
            nome: 'Ana Paula',
            idade: 45,
            foto: 'psicologa.png',
            status: 'ativo',
            telefone: '(11) 99999-3333',
            email: 'ana.paula@email.com',
            ultimaConsulta: '17/01/2025',
            proximaConsulta: '24/01/2025',
            observacoes: 'Tratamento para depressão'
        },
        {
            id: 4,
            nome: 'Carlos Oliveira',
            idade: 38,
            foto: 'psicologa.png',
            status: 'ativo',
            telefone: '(11) 99999-4444',
            email: 'carlos.oliveira@email.com',
            ultimaConsulta: '18/01/2025',
            proximaConsulta: '25/01/2025',
            observacoes: 'Avaliação neuropsicológica'
        },
        {
            id: 5,
            nome: 'Lucia Ferreira',
            idade: 29,
            foto: 'psicologa.png',
            status: 'ativo',
            telefone: '(11) 99999-5555',
            email: 'lucia.ferreira@email.com',
            ultimaConsulta: '19/01/2025',
            proximaConsulta: '26/01/2025',
            observacoes: 'Terapia de casal'
        },
        {
            id: 6,
            nome: 'Pedro Costa',
            idade: 35,
            foto: 'psicologa.png',
            status: 'inativo',
            telefone: '(11) 99999-6666',
            email: 'pedro.costa@email.com',
            ultimaConsulta: '10/12/2024',
            proximaConsulta: '-',
            observacoes: 'Tratamento finalizado'
        },
        {
            id: 7,
            nome: 'Fernanda Lima',
            idade: 26,
            foto: 'psicologa.png',
            status: 'ativo',
            telefone: '(11) 99999-7777',
            email: 'fernanda.lima@email.com',
            ultimaConsulta: '20/01/2025',
            proximaConsulta: '27/01/2025',
            observacoes: 'Primeira consulta realizada'
        },
        {
            id: 8,
            nome: 'Roberto Alves',
            idade: 42,
            foto: 'psicologa.png',
            status: 'ativo',
            telefone: '(11) 99999-8888',
            email: 'roberto.alves@email.com',
            ultimaConsulta: '21/01/2025',
            proximaConsulta: '28/01/2025',
            observacoes: 'Síndrome do pânico'
        },
        {
            id: 9,
            nome: 'Carla Mendes',
            idade: 31,
            foto: 'psicologa.png',
            status: 'ativo',
            telefone: '(11) 99999-9999',
            email: 'carla.mendes@email.com',
            ultimaConsulta: '22/01/2025',
            proximaConsulta: '29/01/2025',
            observacoes: 'Transtorno de ansiedade social'
        },
        {
            id: 10,
            nome: 'Eduardo Silva',
            idade: 39,
            foto: 'psicologa.png',
            status: 'inativo',
            telefone: '(11) 99999-0000',
            email: 'eduardo.silva@email.com',
            ultimaConsulta: '15/11/2024',
            proximaConsulta: '-',
            observacoes: 'Mudou de cidade'
        }
    ];

    let pacientesFiltrados = [...pacientesData];

    // Renderizar pacientes
    function renderPacientes(pacientes) {
        if (pacientes.length === 0) {
            pacientesList.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666; grid-column: 1 / -1;">
                    <i class="icon-users" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
                    <p>Nenhum paciente encontrado</p>
                </div>
            `;
            return;
        }

        pacientesList.innerHTML = pacientes.map(paciente => `
            <div class="paciente-card">
                <div class="paciente-header">
                    <img src="${paciente.foto}" alt="${paciente.nome}" class="paciente-foto">
                    <div class="paciente-info">
                        <h3>${paciente.nome}</h3>
                        <div class="idade">${paciente.idade} anos</div>
                        <span class="paciente-status status-${paciente.status}">
                            ${paciente.status}
                        </span>
                    </div>
                </div>
                
                <div class="paciente-details">
                    <p><strong>Telefone:</strong> ${paciente.telefone}</p>
                    <p><strong>Email:</strong> ${paciente.email}</p>
                    <p><strong>Última Consulta:</strong> ${paciente.ultimaConsulta}</p>
                    <p><strong>Próxima Consulta:</strong> ${paciente.proximaConsulta}</p>
                    <p><strong>Observações:</strong> ${paciente.observacoes}</p>
                </div>
                
                <div class="paciente-actions">
                    <button class="btn-contato" onclick="contatarPaciente(${paciente.id})">
                        Contatar
                    </button>
                    <a href="prontuario.html?id=${paciente.id}" class="btn-prontuario">
                        Ver Prontuário
                    </a>
                </div>
            </div>
        `).join('');
    }

    // Filtrar pacientes
    function filtrarPacientes() {
        const searchTerm = searchInput.value.toLowerCase();
        const statusFiltro = statusFilter.value;

        pacientesFiltrados = pacientesData.filter(paciente => {
            const matchesSearch = paciente.nome.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFiltro || paciente.status === statusFiltro;
            
            return matchesSearch && matchesStatus;
        });

        renderPacientes(pacientesFiltrados);
    }

    // Event listeners
    searchInput.addEventListener('input', filtrarPacientes);
    searchBtn.addEventListener('click', filtrarPacientes);
    statusFilter.addEventListener('change', filtrarPacientes);

    // Função global para contatar paciente
    window.contatarPaciente = function(id) {
        const paciente = pacientesData.find(p => p.id === id);
        if (paciente) {
            const whatsappUrl = `https://wa.me/55${paciente.telefone.replace(/\D/g, '')}?text=Olá ${paciente.nome}, aqui é a Dra. Mayra da ADC Psicologia.`;
            window.open(whatsappUrl, '_blank');
        }
    };

    // Renderizar pacientes inicialmente
    renderPacientes(pacientesData);
});