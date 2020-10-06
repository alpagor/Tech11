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
              <div class="form_container">
                  <li>
                      <label for="plz" id="plz_label">PLZ</label>
                      <input type="text" id="plz" name ="plz" required />
                  </li>
                  <li>
                      <label for="stadt">Stadt</label>
                      <input type="text" id="stadt" name ="stadt" required />
                  </li>
                  <li>
                      <label for="straße">Straße</label>
                      <input type="text" list="straße" name ="straße" id="straße_input"/>
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
                  <button type="submit" id="info">INFO</button>
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
    this.straße_input = shadowRoot.querySelector("#straße_input")
    this.hausnummer = shadowRoot.querySelector("#hausnummer")
    this.form = shadowRoot.querySelector("#contact_form")
    this.dataContainer = shadowRoot.querySelector("#results_display")
  }

  // The connectedCallback () method is called every time you insert a custom element on the page.
  // WebComponent logic
  connectedCallback() {
    const fetchData = () => {
      let plzValue = this.plz.value
      console.log("PLZvalue :>> ", plzValue)

      if (plzValue.length > 4) {
        fetch(
          `https://cors-anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("Fetched_data :>> ", data)
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
      } else if (plzValue.length == "") {
        this.stadt.value = ""
        this.hausnummer.value = ""
        let datalistOpts = this.straße.children.length
        for (var i = 0; i < datalistOpts; i++) {
          this.straße.children[0].remove()
        }
        this.straße_input.value = ""
      }
    }

    this.plz.addEventListener("keyup", fetchData)

    const formToJSON = (elements) =>
      [].reduce.call(
        elements,
        (data, element) => {
          data[element.name] = element.value
          //console.log("DATA_OBJ_LITERAL :>> ", data)
          console.log("JSON_stringify :>> ", JSON.stringify(data))
          return data
        },
        {}
      )

    const handleFormSubmit = (e) => {
      // Stop the form from submitting since we’re handling that with FETCH.
      e.preventDefault()

      // The HTMLFormElement property elements returns an HTMLFormControlsCollection listing
      // all the form controls contained in the <form> element.
      // console.log('FORM_ELEMENTS:>> ', form.elements)

      // Call our function to get the form data obj.
      const dataObj = formToJSON(this.form.elements) // why doesn't save the data obj in the const?
      console.log("TypeOf_DATAOBJ :>> ", typeof dataObj)
      console.log("DATA_in_HandleSubmit :>> ", dataObj)
      // Demo only: print the form data onscreen as a formatted JSON object.

      // Use `JSON.stringify()` to make the output valid, human-readable JSON.
      // this.dataContainer.textContent = JSON.stringify(data, null, "  ")
      this.dataContainer.textContent = JSON.stringify(dataObj, null, "  ")
      // console.log("DATA CONTAINER_text :>> ", this.dataContainer.textContent)
      // const dataObj = {} :>> print "{}" on the dataContainer line 131 works
      // ...this is where we’d actually do something with the form data...
    }
    this.form.addEventListener("submit", handleFormSubmit)
  }

  // disconnectedCallback() {
  //
  // }
}

// we indicate to the browser that there is an association between the name of the tag
// and the class that implements its functionality

customElements.define("address-element", AddressElement)
