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
                      <input type="text" id="plz" name ="plz" required />
                  </li>
                  <li>
                      <label for="stadt">Stadt</label>
                      <input type="text" id="stadt" name ="stadt" required />
                  </li>
                  <li>
                      <label for="straße">Straße</label>
                      <input type="text" list="straße" name ="straße"/>
                      <datalist id="straße">
                      </datalist>
                  </li>
                  <li>
                      <label for="hausnummer">Hausnummer</label>
                      <input type="text" id="hausnummer" name="hausnummer" required />
                  </li>
                  <li>
                      <label for="land">Land</label>
                      <input type="text" id="land" name="land" value="de" required />
                  </li>
              </div>
              <li>
                  <button type="submit" id="info" onClick="{() => handleFormSubmit()}">Info</button>
              </li>
          </ul>
      </div>
  </form>
</div>
<div class="results">
  <h2 class="results__heading">Form Data</h2>
  <pre class="results__display-wrapper"><code class="results__display" id="results_display"></code></pre>
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

    // public properties
    let shadowRoot = this.shadowRoot
    this.plz = shadowRoot.querySelector("#plz")
    this.stadt = shadowRoot.querySelector("#stadt")
    this.straße = shadowRoot.querySelector("#straße")
    this.form = shadowRoot.querySelector("#contact_form")

    
  }

  handleEvent(e) {
    if (e.type === "keyup") this.fetchData()
  }

  fetchData() {

    let plzValue = this.plz.value
    console.log("PLZvalue :>> ", plzValue)
    
      fetch(
        `https://cors-anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE`
      )
        .then((res) => res.json())
        .then((data) => {
          let city = data.rows[0].city
          console.log("este es la var city :>>", city)
          // assign the value of the variable city to the object "stadt"
          this.stadt.value = city
          let streets = data.rows.map((x) => x.street)
          console.log("este es la var streets :>>", streets)
          // create and populate datalist
          streets.forEach((element) => {
            let option = document.createElement("option")
            option.value = element
            this.straße.appendChild(option)
          })
        })
        .catch((err) => console.log(err))
      }
  

  formToJSON = (elements) => {
    [].reduce.call(elements, (data, element) => {
      data[element.name] = element.value;
      console.log('DATA_OBJ :>> ', data);
      console.log('JSON_stringify :>> ',JSON.stringify(data));
      return data;
    }, {})
  }
  

  handleFormSubmit = (e) => {
    // Stop the form from submitting since we’re handling that with FETCH.
    e.preventDefault()

    // The HTMLFormElement property elements returns an HTMLFormControlsCollection listing 
    // all the form controls contained in the <form> element.
    // Call our function to get the form data obj.
    // console.log('FORM_ELEMENTS:>> ', form.elements)
    
    const dataObj = this.formToJSON(this.form.elements); // why doesn't save the data obj in the const?
    // const data = {} print "{}" on the dataContainer
    console.log('DATA_in_HandleSubmit :>> ', dataObj);
    // Demo only: print the form data onscreen as a formatted JSON object.
    const dataContainer = this.shadowRoot.querySelector("#results_display")
    // console.log('DATA CONTAINER :>> ', dataContainer )
    // Use `JSON.stringify()` to make the output valid, human-readable JSON.
    // dataContainer.textContent = JSON.stringify(data, null, "  ")
    dataContainer.textContent = JSON.stringify(dataObj)
    console.log('DATA CONTAINER_text :>> ', dataContainer.textContent )
    // ...this is where we’d actually do something with the form data...
  }

  // The connectedCallback () method is called every time you insert a custom element on the page.
  connectedCallback() {
    let shadowRoot = this.shadowRoot
    let plz = shadowRoot.querySelector("#plz")
    plz.addEventListener("keyup", this)
    /*
  We find the form element using its class name, then attach the `handleFormSubmit()` function to the
  `submit` event.
 */
    this.form.addEventListener("submit", this.handleFormSubmit)

  }

  // disconnectedCallback() {
  //   plz.removeEvenetListener("keyup", this)
  // }
}

// we indicate to the browser that there is an association between the name of the tag
// and the class that implements its functionality

customElements.define("address-element", AddressElement)
