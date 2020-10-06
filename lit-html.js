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





formToJSON = (elements) => {
  [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value;
    return data;
  }, {})
}

handleFormSubmit = (e) => {
  // Stop the form from submitting since we’re handling that with AJAX.
  e.preventDefault()
  // Call our function to get the form data.
  const data = formToJSON(form.elements)
  console.log('DATA :>> ', data);
  // Demo only: print the form data onscreen as a formatted JSON object.
  const dataContainer = this.shadowRoot.querySelector("#results_display")
  // console.log("Aquí muestro datos:>> ", dataContainer)

  // Use `JSON.stringify()` to make the output valid, human-readable JSON.
  dataContainer.textContent = JSON.stringify(data, null, "  ")
  // ...this is where we’d actually do something with the form data...
}

const button = shadowRoot.querySelector(".contact_form")
// console.log("form element :>> ", button)
button.addEventListener("submit", this.handleFormSubmit)

