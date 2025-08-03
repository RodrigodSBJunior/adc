document.addEventListener('DOMContentLoaded', function() {
    const filtroDia = document.getElementById('filtroDia');
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroNome = document.getElementById('filtroNome');
    const cards = document.querySelectorAll('.card-paciente');

    function formatarData(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    function filtrarCards() {
        const diaSelecionado = filtroDia.value ? formatarData(filtroDia.value) : '';
        const tipoSelecionado = filtroTipo.value;
        const nomeBusca = filtroNome.value.toLowerCase();

        cards.forEach(card => {
            const nomeCard = card.querySelector('h4').textContent.toLowerCase();
            const tipoCard = card.querySelector('.tipo-consulta').textContent.toLowerCase();
            const dataCard = card.querySelector('.card-info p').textContent.replace('Data: ', '');
            
            const matchDia = !diaSelecionado || dataCard === diaSelecionado;
            const matchTipo = tipoSelecionado === 'todos' || tipoCard === tipoSelecionado;
            const matchNome = nomeCard.includes(nomeBusca);
            
            if (matchDia && matchTipo && matchNome) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filtroDia.addEventListener('change', filtrarCards);
    filtroTipo.addEventListener('change', filtrarCards);
    filtroNome.addEventListener('input', filtrarCards);
});