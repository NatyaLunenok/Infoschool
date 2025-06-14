// import RefreshToken from './RefreshToken';

// async function FetchWithAuth(url, options = {}) {
//    let accessToken = localStorage.getItem('accessToken');
//    const isFormData = options.body instanceof FormData;

//    options.headers = {
//      ...(options.headers || {}),
//      'Authorization': `Bearer ${accessToken}`,
//    };
 
//    if (!isFormData) {
//      options.headers['Content-Type'] = 'application/json';
//    }

//    let response = await fetch(url, options);
 
//    if (response.status === 401) {
//      accessToken = await RefreshToken();
//      if (!accessToken) return null;
//     localStorage.setItem('accessToken', accessToken); 
//      options.headers['Authorization'] = `Bearer ${accessToken}`;
//      response = await fetch(url, options);
//    }
 
//    return response;
//  }

// export default FetchWithAuth;



// FetchWithAuth.js
// import RefreshToken from './RefreshToken';

// async function FetchWithAuth(url, options = {}) {
//     let accessToken = localStorage.getItem('accessToken');
//     const isFormData = options.body instanceof FormData;

//     options.headers = {
//         ...(options.headers || {}),
//         'Authorization': `Bearer ${accessToken}`,
//     };

//     if (!isFormData) {
//         options.headers['Content-Type'] = 'application/json';
//     }

//     let response = await fetch(url, options);

//     if (response.status === 401) {
//         accessToken = await RefreshToken();
//         if (!accessToken) {
//             // Refresh token failed, or user not logged in.  Return null or handle as needed.
//             return null;
//         }
//         localStorage.setItem('accessToken', accessToken);
//         options.headers['Authorization'] = `Bearer ${accessToken}`;

//         // Make the request again with the new access token
//         response = await fetch(url, options);
//     }

//     // Check if the response is ok (status in the range 200-299)
//     if (!response.ok) {
//         console.error('FetchWithAuth: HTTP error!', response.status, response.statusText);
//         try {
//             const errorBody = await response.json();
//             console.error('FetchWithAuth: Error body:', errorBody);
//         } catch (e) {
//             console.error('FetchWithAuth: Could not parse error body as JSON.');
//         }
//         throw new Error(`FetchWithAuth: HTTP error! Status: ${response.status}`);
//     }

//     try {
//         // Attempt to parse the response as JSON
//         const data = await response.json();
//         return data; // Return the parsed JSON data
//     } catch (e) {
//         // If parsing as JSON fails, it might be a non-JSON response (e.g., text)
//         console.warn('FetchWithAuth: Could not parse response as JSON, returning text.');
//         const text = await response.text();
//         return text; // Return the text response
//     }
// }

// export default FetchWithAuth;


import RefreshToken from './RefreshToken';

async function FetchWithAuth(url, options = {}) {
    let accessToken = localStorage.getItem('accessToken');
    const isFormData = options.body instanceof FormData;

    options.headers = {
        ...(options.headers || {}),
        'Authorization': `Bearer ${accessToken}`, // Исправленный заголовок
    };

    if (!isFormData) {
        options.headers['Content-Type'] = 'application/json';
    }

    let response = await fetch(url, options);

    if (response.status === 401) {
        accessToken = await RefreshToken();
        if (!accessToken) {
            // Refresh token failed, or user not logged in.  Return null or handle as needed.
            return null;
        }
        localStorage.setItem('accessToken', accessToken);
        options.headers['Authorization'] = `Bearer ${accessToken}`;

        // Make the request again with the new access token
        response = await fetch(url, options);
    }

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
        console.error('FetchWithAuth: HTTP error!', response.status, response.statusText); // Оставьте логирование статуса
        throw new Error(`FetchWithAuth: HTTP error! Status: ${response.status}`); //  Бросаем исключение
    }

    return response; // Return the response object
}

export default FetchWithAuth;
