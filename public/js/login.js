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
            document.location.replace('/home');    //correct this redirect
        } else {
            alert(login.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();  
    
    if (email && password) {
        const login = await fetch('api/users/login', {
            method: 'POST',
            body: json.stringify(
                {
                    name,
                    email, 
                    password,
                }),
            headers: {'Content-type': 'application/json'},
        });
        if (login.ok) {
            document.location.replace('/home');    //correct this redirect
        } else {
            alert(login.statusText);
        }
    }
};


document.querySelector('.log-form').addEventListener ('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);