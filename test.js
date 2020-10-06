    // API
    const cors_api_host = 'cors-anywhere.herokuapp.com';
    const cors_api_url =  'https://' + cors_api_host + '/';
    const postdireckt_url = 'www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE';
    const api_url = cors_api_url + postdireckt_url;


        // let shadowRoot = this.shadowRoot
    // let plz = shadowRoot.querySelector("#plz")
    // let plzValue = plz.value
    // console.log("PLZvalue :>> ", plzValue)

    // const stadt = shadowRoot.querySelector("#stadt")
    // const straße = shadowRoot.querySelector("#straße")