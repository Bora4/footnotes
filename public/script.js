fetch('/users/get-auth').then(response => response.json()).then(data => {
  if (data.isAuthenticated) {
    login = document.getElementById('login');
    createThread = document.getElementById('create-thread');
    login.textContent = 'Logout';
    login.addEventListener('click', () => {
      fetch('/users/logout', {
        method: 'POST',
      })
        .then(response => {
          if (response.ok) {
            window.location.href = 'index.html';
            window.alert('Logout successful');
          } else {
            console.error('Failed to log out');
          }
        })
        .catch(error => {
          console.error('Error during logout:', error);
        });
    });
    if(createThread){
      createThread.textContent = 'Create a new thread';
      createThread.href = '/create_thread.html';
    }
  } else {
    login.textContent = 'Login';
  }
}).catch(error => {
  console.error('Error fetching session data: ', error);
});