async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();  
    
    if (username && email && password) {
        const login = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify(
                {
                    username,
                    email, 
                    password
                }),
            headers: {'Content-type': 'application/json'},
        });
        if (login.ok) {
            alert('Account Verified! Logging In!')
            document.location.replace('/');    //correct this redirect
        } else {
            alert(login.statusText);
        }
    }
};



document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);