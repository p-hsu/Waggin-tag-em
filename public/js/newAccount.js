
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
            document.location.replace('/profile');
        } else {
        alert(response.statusText);
        }
    }
};

document.getElementById('create-acct-btn').addEventListener('click', signupFormHandler);
