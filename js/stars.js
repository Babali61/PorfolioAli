document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('star-density');
    const valueDisplay = document.querySelector('.star-value');
    const starControl = document.querySelector('.star-control');
    
    // Créer une feuille de style dédiée pour les étoiles fixes
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);

    // Fonction pour basculer l'état actif du contrôle des étoiles
    function toggleStarControl() {
        starControl.classList.toggle('active');
    }

    // Ajouter l'événement de clic sur le contrôle des étoiles
    starControl.addEventListener('click', toggleStarControl);

    // Empêcher la propagation du clic sur le slider
    slider.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    // Fermer le contrôle des étoiles lors du clic en dehors
    document.addEventListener('click', (event) => {
        if (!starControl.contains(event.target)) {
            starControl.classList.remove('active');
        }
    });

    function generateStarGradients(density) {
        const gradients = [];
        const numberOfStars = Math.floor((density / 100) * 10000);

        for (let i = 0; i < numberOfStars; i++) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 1.5 + 1;
            const brightness = Math.random() * 0.5 + 0.5; // Entre 0.5 et 1
            const color = `rgba(0, 217, 255, ${brightness})`;
            gradients.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, ${color} 50%, transparent 50%)`);
        }

        return gradients.join(',');
    }

    function createShootingStar(direction = 'left') {
        // Ajouter les styles CSS pour l'étoile filante
        const style = document.createElement('style');
        const isLeft = direction === 'left';
        // Ajout d'une taille aléatoire
        const size = Math.random() * 2 + 1; // Entre 1 et 3
        // Ajout d'une épaisseur aléatoire
        const thickness = Math.random() * 2 + 1; // Entre 1 et 3
        
        style.textContent = `
            @keyframes shootingStarAnimation${direction} {
                0% {
                    transform: translate(${isLeft ? '-100%' : '100%'}, -100%);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${isLeft ? '100%' : '-100%'}, 100%);
                    opacity: 0;
                }
            }

            .shooting-star-${direction} {
                position: fixed;
                top: 0;
                ${isLeft ? 'left: 0' : 'right: 0'};
                width: ${150 * size}px;
                height: ${thickness}px;
                background: linear-gradient(${isLeft ? '90deg' : '-90deg'}, 
                    rgba(0,217,255,0) 0%, 
                    rgba(0,217,255,0.8) 50%, 
                    rgba(0,217,255,1) 100%);
                box-shadow: 
                    0 0 ${10 * size}px rgba(0,217,255,0.5),
                    0 0 ${20 * size}px rgba(0,217,255,0.3);
                animation: shootingStarAnimation${direction} 2.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
                z-index: 1000;
                transform-origin: center;
                rotate: ${isLeft ? '45deg' : '-45deg'};
            }
        `;
        document.head.appendChild(style);

        // Créer l'élément étoile filante
        const star = document.createElement('div');
        star.className = `shooting-star-${direction}`;
        document.body.appendChild(star);

        // Supprimer l'étoile après l'animation
        setTimeout(() => {
            star.remove();
            style.remove();
        }, 5500);
    }

    function createRandomShootingStar() {
        const direction = Math.random() > 0.5 ? 'left' : 'right';
        createShootingStar(direction);
    }

    function updateStars(density) {
        valueDisplay.textContent = `${density}%`;
        
        const gradients = generateStarGradients(density);
        
        styleElement.textContent = `
            body::after {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${gradients};
                background-size: 200% 200%;
                animation: moveBackground 30s linear infinite;
                opacity: ${0.2 + (density / 100) * 0.3};
                z-index: -1;
            }
        `;
    }

    slider.addEventListener('input', (e) => {
        updateStars(e.target.value);
    });

    // Initialisation
    updateStars(slider.value);

    // Créer une étoile filante après 2 secondes
    setTimeout(() => {
        createShootingStar('left');
        setTimeout(() => {
            createShootingStar('right');
        }, 1500);
    }, 2000);

    // Créer des étoiles filantes aléatoires toutes les 5 secondes
    setInterval(() => {
        createRandomShootingStar();
    }, 10000);

}); 