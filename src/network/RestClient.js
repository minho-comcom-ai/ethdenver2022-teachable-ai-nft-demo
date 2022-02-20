const StatusCode = require('./StatusCode');

const fetchAndGetResult = async (url, options) => {
    const responseJson = await fetch(url, options).then((response) => {
        switch (response.status) {
            case StatusCode.OK:
            case StatusCode.CREATED:
            case StatusCode.ACCEPTED:
            case StatusCode.NON_AUTHORITATIVE_INFORMATION:
            case StatusCode.NO_CONTENT:
            case StatusCode.RESET_CONTENT:
            case StatusCode.PARTIAL_CONTENT:
                return response.json();
            case StatusCode.UNAUTHORIZED:
                alert('Please sign in');
                window.location = '/';
                throw new Error('Unauthorized');
                return;
            default:
                console.error(
                    `[RestClient] ${url}, status: ${response.status}, statusText: ${response.statusText}`
                );
                throw new Error(
                    response.statusText || 'Unknown error occurred.'
                );
                return;
        }
    });

    return responseJson;
};

const RestClient = {
    // GET
    sendGetRequest: function (url) {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return fetchAndGetResult(url, options);
    },
    // GET with params
    sendGetRequestWithParams: function (url, params) {
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        return fetchAndGetResult(url, options);
    },
    // POST
    sendPostRequest: function (url, params) {
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        };

        return fetchAndGetResult(url, options);
    },
};

export default RestClient;
