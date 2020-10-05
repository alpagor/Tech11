// Create Component HTML markup
const template = document.createElement("template")

template.innerHTML = `
<head>
  <link rel="stylesheet" type="text/css" href="../styles.css"> 
</head>


  <div class="container">
  <form class="contact_form" id="contact_form">
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
                      <input type="text" list="straße" />
                      <datalist id="straße">
                      </datalist>
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
                  <button type="submit" id="info" onClick="{() => this.handleFormSubmit()}">Info</button>
              </li>
          </ul>
      </div>
  </form>
</div>
<div class="results">
  <h2 class="results__heading">Form Data</h2>
  <pre class="results__display-wrapper"><code class="results__display"></code></pre>
</div>`

// Javascript logic of the component
class AddressElement extends HTMLElement {
  constructor() {
    super()
    //creating the shadow DOM
    //this is a reference to the custom element itself
    const shadow = this.attachShadow({ mode: "open" })
    //we must clone the template tag so it can be processed
    const shadowMarkup = template.content.cloneNode(true)
    shadow.appendChild(shadowMarkup)
  }

  handleEvent(e) {
    e.preventDefault()
    if (e.type === "keyup") this.fetchData()
  }

  fetchData() {
    let shadowRoot = this.shadowRoot
    let plz = shadowRoot.querySelector("#plz")
    let plzValue = plz.value
    console.log("PLZvalue :>> ", plzValue)

    const stadt = shadowRoot.querySelector("#stadt")
    const straße = shadowRoot.querySelector("#straße")

    if (!plz.value.length == 0) {
      fetch(
        `https://cors-anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE`
      )
        .then((res) => res.json())
        .then((data) => {
          let city = data.rows[0].city
          console.log("este es la var city :>>", city)
          // assign the value of the variable city to the object "stadt"
          stadt.value = city
          let streets = data.rows.map((x) => x.street)
          console.log("este es la var streets :>>", streets)
          // create and populate datalist
          streets.forEach((element) => {
            let option = document.createElement("option")
            option.value = element
            straße.appendChild(option)
          })
        })
        .catch((err) => console.log(err))
    } else {
      stadt.value = ""
    }
  }

  handleFormSubmit = () => {
    // Stop the form from submitting since we’re handling that with AJAX.
    // e.preventDefault()
    // TODO: Call our function to get the form data.
    const data = console.log("aquí saldrán los datos JSON")
    // Demo only: print the form data onscreen as a formatted JSON object.
    const dataContainer = document.getElementsByClassName("results__display")
    // Use `JSON.stringify()` to make the output valid, human-readable JSON.
    dataContainer.textContent = JSON.stringify(data, null, "  ")
    // ...this is where we’d actually do something with the form data...
  }

  // The connectedCallback () method is called every time you insert a custom element on the page.
  connectedCallback() {
    let shadowRoot = this.shadowRoot
    let plz = shadowRoot.querySelector("#plz")
    plz.addEventListener("keyup", this)

    console.log("object this :>> ", this)

    // this.button = this.shadowRoot.querySelector("button")
    // this.button.addEventListener("click", () => this.sendMessage())

  /*
  We find the form element using its class name, then attach the `handleFormSubmit()` function to the
  `submit` event.
 */
    const button = shadowRoot.querySelector(".contact_form")
    console.log("form element :>> ", button)
    button.addEventListener("submit", this.handleFormSubmit);
    // const handleChange = () => {
    //   let plzValue = plz.value
    //   console.log("PLZvalue :>> ", plzValue)

    //   const stadt = shadowRoot.querySelector("#stadt")

    //   if(!plz.value.length == 0) {
    //           fetch(
    //     `https://cors-anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE`
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       let city = data.rows[0].city
    //       // assign the value of the variable city to the object "stadt"
    //       stadt.value = `${city}`
    //       console.log("este es la var city :>>", city)})
    //     .catch((err) => console.log(err))
    //   }
    //   else {
    //     stadt.value = "";
    //   }
  }

  // disconnectedCallback() {
  //   plz.removeEvenetListener("keyup", this)
  // }
}

// we indicate to the browser that there is an association between the name of the tag
// and the class that implements its functionality

customElements.define("address-element", AddressElement)
