// Create Component HTML markup
const template = document.createElement("template")

template.innerHTML = `
<head>
  <link rel="stylesheet" type="text/css" href="../styles.css"> 
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
                      
                      <select id="straße" required>
                      </select>
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

  handleEvent(e){
    if(e.type === "keyup")
    this.fetchData();
  }

  

  fetchData(){
    let shadowRoot = this.shadowRoot
    let plz = shadowRoot.querySelector("#plz")
    let plzValue = plz.value
      console.log("PLZvalue :>> ", plzValue)

      const stadt = shadowRoot.querySelector("#stadt")
      const straße = shadowRoot.querySelector("#straße")

      if(!plz.value.length == 0) {
              fetch(
        `https://cors-anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE`
      )
        .then((res) => res.json())
        .then((data) => {
          let city = data.rows[0].city
          console.log("este es la var city :>>", city)
          // assign the value of the variable city to the object "stadt"
          stadt.value = city;
          let streets = data.rows.map((x) => x.street);
          for (let i = 0; i < streets.length; i++){
            straße.options[i] = new Option(streets[i])
          }
          console.log("este es la var streets :>>", streets)
          })
        .catch((err) => console.log(err))
      }
      else {
        stadt.value = "";
      }
  }

  // The connectedCallback () method is called every time you insert a custom element on the page.
  connectedCallback() {

    let shadowRoot = this.shadowRoot
    let plz = shadowRoot.querySelector("#plz")
    plz.addEventListener("keyup", this)
   
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
