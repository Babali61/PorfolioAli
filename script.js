let currentLanguage = 'fr';

// Fonction pour charger les traductions
async function loadTranslations() {
    const response = await fetch('translations.json');
    return await response.json();
}

// Fonction pour mettre à jour le texte selon la langue
async function updateLanguage(lang) {
    const translations = await loadTranslations();
    currentLanguage = lang;
    
    // Mettre à jour l'attribut lang de l'élément html
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