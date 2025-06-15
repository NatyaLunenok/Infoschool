import RefreshToken from './RefreshToken';

async function FetchWithAuth(url, options = {}) {
    let accessToken = localStorage.getItem('accessToken');
    const isFormData = options.body instanceof FormData;

    options.headers = {
        ...(options.headers || {}),
        'Authorization': `Bearer ${accessToken}`,
    };

    if (!isFormData) {
        options.headers['Content-Type'] = 'application/json';
    }

    let response = await fetch(url, options);

    if (response.status === 401) {
        accessToken = await RefreshToken();
        if (!accessToken) {
            return null;
        }
        localStorage.setItem('accessToken', accessToken);
        options.headers['Authorization'] = `Bearer ${accessToken}`;
        response = await fetch(url, options);
    }

    // Клонируем response перед чтением
    const responseClone = response.clone();

    if (!response.ok) {
        console.error('FetchWithAuth: HTTP error!', response.status, response.statusText);
        try {
            const errorBody = await responseClone.json();
            console.error('FetchWithAuth: Error body:', errorBody);
            throw new Error(errorBody.message || `HTTP error! Status: ${response.status}`);
        } catch (e) {
            const errorText = await responseClone.text();
            throw new Error(errorText || `HTTP error! Status: ${response.status}`);
        }
    }

    try {
        return await responseClone.json();
    } catch (e) {
        return await responseClone.text();
    }
}

export default FetchWithAuth;