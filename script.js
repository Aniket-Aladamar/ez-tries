const file = './data.json';

async function fetchUserData() {
    try {
        let response = await fetch(file);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (fullName === '' || email === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    try {
        let users = await fetchUserData();
        users.push({ fullName, email, password, rememberMe });

        console.log('New user added successfully.');
        console.log('Updated Users:', JSON.stringify(users, null, 2));

        alert('Sign up successful!');
    } catch (error) {
        alert('Sign up failed.');
    }
});
