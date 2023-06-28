let myLibrary = [];
let aperto = 0;

const mainContainer = document.getElementById('mainContainer');
const form = document.querySelector('form');
const submitBtn = document.getElementById('add');

let card;  


function removeBookFromLibrary(bookId) {
  myLibrary = myLibrary.filter(book => book.id !== bookId); // Filtra l'array myLibrary rimuovendo il libro corrispondente all'ID
}

function removeCardFromDOM(bookId) {
  const card = document.getElementById(bookId); // Ottieni la card dal DOM utilizzando l'ID del libro
  card.remove(); // Rimuovi la card dal DOM
}

Book.prototype.cambiaLetto = function () {
  if (this.letto === 'Si') {
    this.letto = 'No';
    const lettoOrNot = document.getElementById(`letto_${this.id}`);
    lettoOrNot.textContent = `LETTO: ${this.letto}`;
  } else if( this.letto === 'No') {
    this.letto = 'Si';
    const lettoOrNot = document.getElementById(`letto_${this.id}`);
    lettoOrNot.textContent = `LETTO: ${this.letto}`;
  }
}

function Book (titolo, autore, pagine, letto) {
    
    this.titolo= titolo
    this.autore = autore
    this.pagine= pagine
    this.letto= letto
    
  }

  function addBookToLibrary (libro) {
    myLibrary.push(libro);
  }

/* ------------------------- MODALE -------------------------------*/
const modale = document.getElementById("modale");
// pulsante per aprire il modale
const open = document.getElementById("open");


// quando un utente clicca il pulsante, apre il modale 
open.onclick = function() {
  if (aperto === 0) {

    modale.style.display = "flex";

    setTimeout(function() {
      modale.style.opacity = "1";
    }, 10);

    aperto = 1;
  } else {

    modale.style.opacity = "0";
    
    setTimeout(function() {
      modale.style.display = 'none';
    }, 300);

    aperto = 0;
  }
}
/*------------------------------------------------------------------*/

function formDataToObject(formData) {
  const normalizeValues = (values) => (values.length > 1) ? values : values[0];
  const object = {};

  for (const [key, value] of formData.entries()) {
    object[key] = normalizeValues(formData.getAll(key));
  }

  return object;
};

form.addEventListener('submit', function (event) {

  event.preventDefault();

  const datiForm = new FormData(form);

  // 2: store form data in object
  const storedData = formDataToObject(datiForm);

  let valori = Object.values(storedData);

  const libro = new Book (valori[0], valori[1], valori[2] , valori[3]);

  libro.id= myLibrary.length;

  aggiungiCard(libro);

  addBookToLibrary(libro);

});

function aggiungiCard (libro) {

  const card = document.createElement("div");

  const icone = document.createElement('div')
  icone.classList.add('icone');

  const titolo = document.createElement('span')
  let nodo = document.createTextNode(`TITOLO :  ${libro.titolo} `);
  titolo.appendChild(nodo);
  card.appendChild(titolo);
  
  const autore = document.createElement(`span`);
  nodo = document.createTextNode(`AUTORE :  ${libro.autore} `);
  autore.appendChild(nodo);
  card.appendChild(autore);

  const numeroPagine = document.createElement(`span`);
  nodo = document.createTextNode(`N.PAGINE : ${libro.pagine} `);
  numeroPagine.appendChild(nodo);
  card.appendChild(numeroPagine);

  const lettoOrNot = document.createElement(`span`);
  nodo = document.createTextNode(`LETTO : ${libro.letto} `);
  lettoOrNot.appendChild(nodo);
  lettoOrNot.setAttribute('id', `letto_${libro.id}`);
  card.appendChild(lettoOrNot);

  const btn_read = document.createElement('button')
  nodo = document.createElement('img')
  nodo.src = "./media/read.svg"
  btn_read.appendChild(nodo);
  btn_read.classList.add('read_not');
  btn_read.setAttribute('id', libro.id);

  btn_read.addEventListener('click', function(event) {
    const bookId = parseInt(btn_read.getAttribute('id'));
    libro.cambiaLetto();
  });

  icone.appendChild(btn_read);

  const btn_remove = document.createElement('button')
  nodo = document.createElement('img')
  nodo.src = "./media/book-remove.svg"
  btn_remove.appendChild(nodo);
  btn_remove.classList.add('rimuovi_libro');
  btn_remove.setAttribute('id', libro.id)

  btn_remove.addEventListener('click', function(event) {
    const bookId = parseInt(btn_remove.getAttribute('id'));
    removeBookFromLibrary(bookId);
    removeCardFromDOM(bookId);
  });

  icone.appendChild(btn_remove);

  
  card.appendChild(icone);
  card.classList.add('card');
  card.setAttribute('id', libro.id)

  mainContainer.appendChild(card);
}


