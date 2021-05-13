const loginFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the login form
    const user_name = document.getElementById('user_name').value.trim();
    const password = document.getElementById('password').value.trim();
    if (user_name && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
          console.log(user_name, password)
        // If successful, redirect the browser to the homepage/dashboard
        // document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  const signupFormHandler = async (event) => {
    event.preventDefault();
    const first_name = document.getElementById('first_name').value.trim();
    const last_name = document.getElementById('last_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const user_name = document.getElementById('user_name').value.trim();

    if (first_name && last_name && email && password && user_name) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, email, password, user_name }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
          console.log(first_name, last_name, email, password, user_name)
        // If successful, redirect the browser to the homepage/dashboard
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('#create-acct-btn')
    .addEventListener('submit', signupFormHandler);
  