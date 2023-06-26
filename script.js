let myLibrary = [];
let titolo, autore, pagine, letto, continua = 2;
let str;
let aperto = 0;
const form = document.querySelector('form');



function Book (titolo, autore, pagine, letto) {
    
    this.titolo= titolo
    this.autore = autore
    this.pagine= pagine
    this.letto= letto
    
  }

  function addBookToLibrary (libro) {
    myLibrary.push(libro);
  }



const modale = document.getElementById("modale");

// Get the button that opens the modal
const open = document.getElementById("open");



// When the user clicks the button, open the modal 
open.onclick = function() {
  if (aperto === 0) {
    modale.style.display = "flex";
    aperto = 1;
  } else {
    modale.style.display = 'none';
    aperto = 0;
  }
}

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

  const formData = new FormData(form);
  // 2: store form data in object
  const oggettoDallEvento = formDataToObject(formData);

  let valori = Object.values(oggettoDallEvento);

  const libro = new Book (valori[0], valori[1], valori[2] , valori[3]);

  console.log (libro);

});
























/*while (continua != 1) {

  titolo = prompt('mi dici il titolo?');
  autore= prompt ("mi dici l'autore? ");
  pagine= prompt('quante pagine ha?');
  letto= prompt('hai letto il libro?', 'si o no');

  const libro = new Book (titolo, autore, pagine, letto);
  
  addBookToLibrary(libro);
    continua= prompt ('per terminare inserire 1');
}


    str = JSON.stringify(myLibrary); // (Optional) beautiful indented output.
    console.log(str);
*/