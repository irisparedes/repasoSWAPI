'use strict';

const field = document.querySelector('.search__field');
const btn = document.querySelector('.search__button');
const results = document.querySelector('.result__list');
const total = document.querySelector('.results__total');

const api = 'https://swapi.co/api/people/?search=';


const getTerm = () => {
  const term =field.value;
  const url = api + term;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      results.innerHTML = '';
      total.innerHTML = `El número total de resultados es ${data.results.length}`;
      for (let i=0; i<data.results.length;i++) {
        //results.innerHTML += `<li class="results__item">${data.results[i].name}</li>`;
        const newItem = document.createElement('li');
        newItem.classList.add('results__item');
        const subtitle = document.createElement('h2');
        subtitle.classList.add('results__name');
        const year = document.createElement('p');
        year.classList.add('results__year');
        const films = document.createElement('p');
        films.classList.add('results__films');
      
        
        // Creo contenidos
        const newContent = document.createTextNode(data.results[i].name);
        const newContentYear = document.createTextNode(data.results[i].birth_year);
        const newContentFilms = document.createTextNode(data.results[i].films.length);
        
        year.appendChild(newContentYear);
        subtitle.appendChild(newContent);
        films.appendChild(newContentFilms);                

        // Compongo el LI con todos sus elementos    
        newItem.appendChild(subtitle);
        newItem.appendChild(year);
        newItem.appendChild(films);

        fetch(data.results[i].homeworld)
          .then(res => res.json())
          .then(newData => {
            const nameElement = document.createElement('h3');

            const newContentHomeworldName = document.createTextNode(newData.name);
            nameElement.appendChild(newContentHomeworldName);
            newItem.appendChild(nameElement);
            results.appendChild(newItem);
          });
        
        



      }
    });
};


btn.addEventListener('click', getTerm);