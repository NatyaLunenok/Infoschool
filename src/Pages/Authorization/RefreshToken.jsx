async function RefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    console.warn('No refresh token found in localStorage. User likely not logged in.');
    return null; // Или перенаправить на страницу входа
  }

  try {
    const response = await fetch('http://127.0.0.1:8000/diary/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      // Log the error response from the server to help debug.
      const errorData = await response.json();
      console.error('Failed to refresh token:', errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.access) {
      console.error('No access token received in refresh response:', data);
      throw new Error('No access token received from refresh endpoint');
    }

    localStorage.setItem('accessToken', data.access);

    // Обновляем refreshToken, только если он пришел с сервера
    if (data.refresh) {
      localStorage.setItem('refreshToken', data.refresh);
    }

    console.log('Token refreshed successfully.');
    return data.access;

  } catch (error) {
    console.error('Error refreshing token:', error);
    console.warn('Removing tokens and reloading window.');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    window.location.reload();
    return null;
  }
}

export default RefreshToken;
