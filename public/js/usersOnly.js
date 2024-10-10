fetch('/users/get-auth')
  .then(response => response.json())
  .then(data => {
    if (!data.isAuthenticated) {
      console.error('Please login to view this page');
      alert('Please login to view this page');
      window.location.href = '/index.html';
    }
  })
  .catch(error => {
    console.error('Error fetching session data: ', error);
  });
