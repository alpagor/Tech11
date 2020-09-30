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

  // The connectedCallback () method is called every time you insert a custom element on the page.
  connectedCallback() {
    //console.log(this)
    let shadowRoot = this.shadowRoot
    let plz = shadowRoot.querySelector("#plz")
    console.log("PLZ :>> ", plz)

    const handleChange = () => {
      let plzValue = plz.value;
      console.log('PLZvalue :>> ', plzValue);
    };

    plz.addEventListener('change', handleChange);

    


  }
}

// plz.addEventListener("change", () => handleChange(plzValue))

// // const url = `https://cors-
// // anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?autocomplete=plz&plz_city=ort`

// const handleChange = (zipCode) => {
//   const jsonData = fetch(`https://cors-
//   anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?autocomplete=plz&plz_plz=${zipCode}`)
//     .then((res) => res.json())
//     .then((data) => {
//       let element = document.getElementById("test")
//       element.innerHTML = `
//       <p>${data.rows.map((x) => x.plz)}</p>
//       <p>${data.rows.map((x) => x.city)}</p>
//       `

//       console.log(data)
//     })
//     .catch((err) => console.log(err))
// }

// we indicate to the browser that there is an association between the name of the tag
// and the class that implements its functionality

customElements.define("address-element", AddressElement)
