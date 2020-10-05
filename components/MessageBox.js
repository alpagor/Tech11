// Import lit-html
import { html, render } from "./node_modules/lit-html/lit-html"
import "./AddressElement"

// Define a template
const messageBox = (plz, city, street, number) => html`
    <div id="myModal" class="popup">
        <div class="caption">
        <p>${plz.value}</p>
        <p>${city.value}</p>
        <p>${street.value}</p>
        <p>${number.value}</p>
        </div>
    </div>
`
const messageBox = () => html`<button @click=${clickHandler}>info</button>`;

const clickHandler = {
    // handleEvent method is required.
    handleEvent(e) { 
      console.log('clicked!');
    },
    // event listener objects can also define zero or more of the event 
    // listener options: capture, passive, and once.
    capture: true,
  };

render(messageBox(plz.value, city.value, street.value, number.value), document.body)
