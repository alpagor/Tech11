// Import lit-html
import { html, render } from "./node_modules/lit-html/lit-html"

// falta crear la interpolación...como? guardando en una variable "labels"
// las labels y como "value" onChange?

// Define a template
const myTemplate = html` <head>
    <link rel="stylesheet" type="text/css" href="../styles.css" />
  </head>

  <div class="container">
    <form class="contact_form" action="#" id="contact_form">
      <div>
        <ul>
          <li>
            <h2>Adresse</h2>
          </li>
          <div class="container">
            <li>
              <label for="plz">PLZ</label>
              <input type="text" id="plz" required />
            </li>
            <li>
              <label for="stadt">Stadt</label>
              <input type="text" id="stadt" required />
            </li>
            <li>
              <label for="straße">Straße</label>
              <input type="text" id="straße" required />
            </li>
            <li>
              <label for="hausnummer">Hausnummer</label>
              <input type="text" id="hausnummer" required />
            </li>
            <li>
              <label for="land">Land</label>
              <input type="text" id="land" value="de" required />
            </li>
          </div>
          <li>
            <button type="submit" id="info">Info</button>
          </li>
        </ul>
      </div>
    </form>
  </div>`

const url = `https://cors-
  anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?autocomplete=plz&plz_city=ort`

const jsonData = fetch(url)
  .then((res) => res.json())
  .catch((err) => console.log(err))

console.log(data)

// Render the template to the document
// Agregamos nuestro template al cuerpo de nuestro documento
render(myTemplate, document.body)
