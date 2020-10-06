// API
const cors_api_host = "cors-anywhere.herokuapp.com"
const cors_api_url = "https://" + cors_api_host + "/"
const postdireckt_url =
  "www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE"
const api_url = cors_api_url + postdireckt_url

// let shadowRoot = this.shadowRoot
// let plz = shadowRoot.querySelector("#plz")
// let plzValue = plz.value
// console.log("PLZvalue :>> ", plzValue)

// const stadt = shadowRoot.querySelector("#stadt")
// const straße = shadowRoot.querySelector("#straße")

// const handleEvent = (e) => {
//   if (e.type === "keyup") this.fetchData()
// }

// fetchData() {

//   let plzValue = this.plz.value
//   console.log("PLZvalue :>> ", plzValue)

//     fetch(
//       `https://cors-anywhere.herokuapp.com/www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         let city = data.rows[0].city
//         console.log("este es la var city :>>", city)
//         // assign the value of the variable city to the object "stadt"
//         this.stadt.value = city
//         let streets = data.rows.map((x) => x.street)
//         console.log("este es la var streets :>>", streets)
//         // create and populate datalist
//         streets.forEach((element) => {
//           let option = document.createElement("option")
//           option.value = element
//           this.straße.appendChild(option)
//         })
//       })
//       .catch((err) => console.log(err))
//     }

// formToJSON = (elements) => {
//   [].reduce.call(elements, (data, element) => {
//     data[element.name] = element.value;
//     console.log('DATA_OBJ :>> ', data);
//     console.log('JSON_stringify :>> ',JSON.stringify(data));
//     return data;
//   }, {})
// }

// handleFormSubmit = (e) => {
//   // Stop the form from submitting since we’re handling that with FETCH.
//   e.preventDefault()

//   // The HTMLFormElement property elements returns an HTMLFormControlsCollection listing
//   // all the form controls contained in the <form> element.
//   // Call our function to get the form data obj.
//   // console.log('FORM_ELEMENTS:>> ', form.elements)

//   const dataObj = this.formToJSON(this.form.elements); // why doesn't save the data obj in the const?
//   // const data = {} print "{}" on the dataContainer
//   console.log('DATA_in_HandleSubmit :>> ', dataObj);
//   // Demo only: print the form data onscreen as a formatted JSON object.
//   const dataContainer = this.shadowRoot.querySelector("#results_display")
//   // console.log('DATA CONTAINER :>> ', dataContainer )
//   // Use `JSON.stringify()` to make the output valid, human-readable JSON.
//   // dataContainer.textContent = JSON.stringify(data, null, "  ")
//   dataContainer.textContent = JSON.stringify(dataObj)
//   console.log('DATA CONTAINER_text :>> ', dataContainer.textContent )
//   // ...this is where we’d actually do something with the form data...
// }
