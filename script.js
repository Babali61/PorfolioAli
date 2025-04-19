let currentLanguage = 'fr';

// Traductions intégrées directement dans le code
const translations = {
    "fr": {
        "title": "Portfolio Ali",
        "jobTitle": "Développeur Web - Javascript",
        "contactButton": "Contact par mail",
        "htmlCssSeoProjects": "Projets Html & Css, SEO",
        "javascriptProjects": "Projets JavaScript",
        "starDensity": "Densité d'étoiles",
        "viewProject": "Voir le projet",
        "projects": {
            "booki": {
                "title": "Booki",
                "description": "Transformation d'une maquette de location de voyage en site web avec HTML & CSS, en mettant en place une structure HTML5 correspondant aux éléments de la maquette et en appliquant un style approprié à la maquette avec CSS3."
            },
            "kanap": {
                "title": "Kanap",
                "description": "Construction d'un site e-commerce en utilisant JavaScript, création d'un plan de test pour l'application, validation des données provenant de sources externes, interaction avec un web service avec JavaScript, gestion des événements en JavaScript."
            },
            "ohmyfood": {
                "title": "Ohmyfood",
                "description": "Dynamiser un site mobile first de répertoire d'avis gastronomiques avec des animations CSS, en fesant le responsive, en utilisant Git pour le versionnage du projet, en mettant en œuvre des effets graphiques CSS avancés et en mettant en place une structure de navigation pour le site."
            },
            "piiquante": {
                "title": "Piiquante",
                "description": "Construction d'une API sécurisée avec Node.js, Express et mongoDB pour une application d'avis gastronomiques, mise en œuvre sécurisée des opérations CRUD, implémentation d'un modèle logique de données, stockage sécurisé des données."
            },
            "laPanthere": {
                "title": "La Panthère",
                "description": "Optimisation du site web d'une agence web en assurant son accessibilité, en optimisant son référencement et en améliorant sa taille et sa vitesse."
            },
            "kasa": {
                "title": "Kasa",
                "description": "Création d'une application web de location immobilière avec React, initialisation de l'application avec Create React App, configuration de la navigation entre les pages de l'application avec React Router et développement des éléments de la maquette Figma d'un site web à l'aide de composants React."
            }
        }
    },
    "en": {
        "title": "Ali's Portfolio",
        "jobTitle": "Web Developer - Javascript",
        "contactButton": "Contact by email",
        "htmlCssSeoProjects": "Html & Css, SEO Projects",
        "javascriptProjects": "JavaScript Projects",
        "starDensity": "Star density",
        "viewProject": "View project",
        "projects": {
            "booki": {
                "title": "Booki",
                "description": "Transforming a travel rental mockup into a website with HTML & CSS, setting up an HTML5 structure matching the mockup elements and applying appropriate styling to the mockup with CSS3."
            },
            "kanap": {
                "title": "Kanap",
                "description": "Building an e-commerce website using JavaScript, creating a test plan for the application, validating data from external sources, interacting with a web service using JavaScript, managing events in JavaScript."
            },
            "ohmyfood": {
                "title": "Ohmyfood",
                "description": "Enhancing a mobile-first restaurant review directory with CSS animations, implementing responsive design, using Git for project versioning, implementing advanced CSS graphical effects, and setting up a navigation structure for the website."
            },
            "piiquante": {
                "title": "Piiquante",
                "description": "Building a secure API with Node.js, Express, and MongoDB for a restaurant review application, implementing secure CRUD operations, implementing a logical data model, and secure data storage."
            },
            "laPanthere": {
                "title": "La Panthère",
                "description": "Optimizing a web agency's website by ensuring its accessibility, optimizing its SEO, and improving its size and speed."
            },
            "kasa": {
                "title": "Kasa",
                "description": "Creating a real estate rental web application with React, initializing the application with Create React App, configuring navigation between application pages with React Router, and developing Figma mockup elements of a website using React components."
            }
        }
    }
};

// Fonction pour mettre à jour le texte selon la langue
function updateLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Mettre à jour le texte des éléments avec l'attribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Mettre à jour le texte du bouton de langue
    const languageButton = document.getElementById('languageToggle');
    languageButton.textContent = lang === 'fr' ? 'EN' : 'FR';

    // Mettre à jour les projets
    updateProjects(translations[lang]);
}

// Fonction pour mettre à jour les projets
function updateProjects(translations) {
    const projects = document.querySelectorAll('.projet');
    projects.forEach(project => {
        const projectId = project.getAttribute('data-project-id');
        if (projectId && translations.projects[projectId]) {
            const title = project.querySelector('.titreProjet');
            const description = project.querySelector('.descriptionProjet');
            const link = project.querySelector('.lienProjet');

            if (title) title.textContent = translations.projects[projectId].title;
            if (description) description.textContent = translations.projects[projectId].description;
            if (link) link.textContent = translations.viewProject;
        }
    });
}

// Gestionnaire d'événement pour le bouton de langue
document.getElementById('languageToggle').addEventListener('click', () => {
    const newLang = currentLanguage === 'fr' ? 'en' : 'fr';
    updateLanguage(newLang);
});

// Charger les données des projets depuis un fichier JSON
fetch('projets.json')
  .then(response => response.json())
  .then(data => {
    // Récupérer les éléments HTML où les projets seront affichés
    const htmlCssSeoProjets = document.getElementById('htmlCssSeoProjets');
    const javascriptProjets = document.getElementById('javascriptProjets');

    // Créer les éléments HTML pour chaque projet et les ajouter à leur parent correspondant
    data.projets.forEach(projet => {
      const divProjet = document.createElement('div');
      divProjet.className = 'projet';
      divProjet.setAttribute('data-project-id', projet.titre.toLowerCase().replace(/\s+/g, ''));

      const h2Titre = document.createElement('h2');
      h2Titre.className = 'titreProjet';
      h2Titre.textContent = projet.titre;
      divProjet.appendChild(h2Titre);

      const h3Date = document.createElement('h3');
      h3Date.className = 'dateProjet';
      h3Date.textContent = projet.date;
      divProjet.appendChild(h3Date);

      const pDescription = document.createElement('p');
      pDescription.className = 'descriptionProjet';
      pDescription.textContent = projet.description;
      divProjet.appendChild(pDescription);

      const aLien = document.createElement('a');
      aLien.className = 'lienProjet';
      aLien.href = projet.lien;
      aLien.textContent = 'Voir le projet';
      divProjet.appendChild(aLien);

      if (projet.type === 'htmlCssSeo') {
        htmlCssSeoProjets.appendChild(divProjet);
      } else if (projet.type === 'javascript') {
        javascriptProjets.appendChild(divProjet);
      }
    });
  });

fetch('https://dummyjson.com/quotes/random')
  .then(res => res.json())
  .then(dataQuotes => {
    document.querySelector('.auteur').textContent = dataQuotes.author
    document.querySelector('.citation').textContent = dataQuotes.quote
  });