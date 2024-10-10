fetch('/users/get-auth').then(response => response.json()).then(data => {
  const login = document.getElementById('login');
  const createThread = document.getElementById('create-thread');
  const replyButton = document.getElementById('reply');
  if (data.isAuthenticated) {

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
    if (createThread) {
      createThread.textContent = 'Create a new thread';
      createThread.href = '/create_thread.html';
    }
  } else {
    login.textContent = 'Login';
    if(replyButton){

      replyButton.disabled = true;
      replyButton.style.cursor = 'not-allowed';
      replyButton.title = "You need to be logged in to reply";
    }
    if(createThread){

      createThread.href = 'javascript:void(0)';
      createThread.style.cursor = 'not-allowed';
      createThread.textContent = "You need to be logged in to create a thread";
    }
  }
}).catch(error => {
  console.error('Error fetching session data: ', error);
});