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