document.addEventListener('DOMContentLoaded', function() {
    // Sistema de avaliação por estrelas
    const stars = document.querySelectorAll('.star');
    const ratingText = document.querySelector('.rating-text');
    let selectedRating = 0;
    
    // Adicionar eventos para as estrelas
    stars.forEach(star => {
        // Evento ao passar o mouse
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.getAttribute('data-value'));
            highlightStars(value);
            updateRatingText(value);
        });
        
        // Evento ao tirar o mouse
        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
            updateRatingText(selectedRating);
        });
        
        // Evento ao clicar
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            highlightStars(selectedRating);
            updateRatingText(selectedRating);
            
            // Adicionar efeito de pulsação
            stars.forEach(s => s.classList.remove('pulse'));
            setTimeout(() => {
                stars.forEach((s, index) => {
                    if (index < selectedRating) {
                        s.classList.add('pulse');
                    }
                });
            }, 50);
        });
    });
    
    // Função para destacar as estrelas
    function highlightStars(count) {
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'));
            if (value <= count) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    
    // Função para atualizar o texto da avaliação
    function updateRatingText(rating) {
        const texts = [
            'Selecione uma nota',
            'Ruim',
            'Regular',
            'Bom',
            'Muito bom',
            'Excelente'
        ];
        
        ratingText.textContent = rating > 0 ? texts[rating] : texts[0];
    }
    
    // Manipular o envio do formulário
    const form = document.getElementById('form-avaliacao');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const comentario = document.getElementById('comentario').value;
        
        if (selectedRating === 0) {
            alert('Por favor, selecione uma avaliação de 1 a 5 estrelas.');
            return;
        }
        
        if (comentario.trim() === '') {
            alert('Por favor, escreva um comentário sobre sua experiência.');
            return;
        }
        
        // Aqui você adicionaria o código para enviar a avaliação para o servidor
        // Como é apenas uma demonstração, vamos apenas mostrar uma mensagem de sucesso
        alert('Sua avaliação foi enviada com sucesso! Obrigado pelo feedback.');
        
        // Limpar o formulário
        selectedRating = 0;
        highlightStars(0);
        updateRatingText(0);
        form.reset();
    });
});