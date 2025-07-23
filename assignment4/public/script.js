document.addEventListener('DOMContentLoaded', () => {
  const responseElement = document.getElementById('response');
  
  // Get all users button
  document.getElementById('get-users').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      responseElement.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      responseElement.textContent = `Error: ${error.message}`;
    }
  });
  
  // Get user by ID button
  document.getElementById('get-user').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users/1');
      const data = await response.json();
      responseElement.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      responseElement.textContent = `Error: ${error.message}`;
    }
  });
  
  // Create user button
  document.getElementById('create-user').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'New User',
          email: 'newuser@example.com'
        })
      });
      const data = await response.json();
      responseElement.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      responseElement.textContent = `Error: ${error.message}`;
    }
  });
});