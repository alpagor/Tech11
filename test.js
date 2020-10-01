    // API
    const cors_api_host = 'cors-anywhere.herokuapp.com';
    const cors_api_url =  'https://' + cors_api_host + '/';
    const postdireckt_url = 'www.postdirekt.de/plzserver/PlzAjaxServlet?finda=city&city=${plzValue}&lang=de_DE';
    const api_url = cors_api_url + postdireckt_url;