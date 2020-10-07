# Tech Challenge tech11

The task describes a fictive story that you should implement in **JavaScript** with ES6 and Web Components. Your solution should run on Chrome and Firefox. Furthermore, your solution should have **no dependencies to any JavaScript library** (only Standard JavaScript / ES6; #useThePlatform).
But of course, as usual when defining rules, there are exceptions : the library lit-html can/should be used).

User Story:

**As application designer, I want a reusable address component with data completion so that I can put this address component on different forms.**



<u>Acceptance Criteria:</u>

 Business requirements (function):

- ​	The address widget must have the following fields: o zip
  - city
  - street
  - houseNumber
  - country (is fix: "de" - Deutschland)
- ​	After entering the zip code, the city should be prefilled


- ​	Based on the zip/city also the streets should be selectable. Only streets from the chosen city should be selectable.


- ​	In the bottom of the widget there should be a button “info”. By clicking the button, a message box 	    		should be displayed where all data of the widget are formatted as JSON. Technical requirements (non-		functional):


- ​	  For city lookup, please reverse engineer the service from https://www.postdirekt.de/plzserver/ Select “Ort” (city) and enter for example “97070” as zip code. Please analyze how to query the data and reuse the JSON REST interface. (https://www.postdirekt.de/plzserver/PlzAjaxServlet)


- Because of CORS, please use: https://cors-anywhere.herokuapp.com/https://www.postdirekt.de/plzserver/PlzAjaxServlet


- ​	 The component must be an ES6 Web Component (see MDN) and should be reusable


- ​	 Provide a test page that contains two time the widget on the same page


## Summary

- [Getting Started](https://github.com/PurpleBooth/a-good-readme-template#getting-started)
- [Built With](https://github.com/PurpleBooth/a-good-readme-template#built-with)
- [Authors](https://github.com/PurpleBooth/a-good-readme-template#authors)



## Getting Started 🚀

### Installing 🔧

After forking and cloning this repository, run the following commands:

```
  cd Tech11
  npm install
```



## Built With 🛠️



## Author ✒️

- **Alberto Pagoria** - [alpagor](https://github.com/alpagor) - 