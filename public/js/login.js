const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const login = await fetch('api/users/login', {
            method: 'POST',
            body: json.stringify(
                {
                    email, 
                    password
                }),
            headers: {'Content-type': 'application/json'},
        });
        if (login.ok) {
            alert('You are now logged in!')
            document.location.replace('/home');    //correct this redirect
        } else {
            alert(login.statusText);
        }
    }
};

document.querySelector('.login-form').addEventListener ('submit', loginFormHandler);