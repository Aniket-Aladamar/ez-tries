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

document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === '' || password === '') {
        alert('Please fill in all fields.');
        return;
    }

    try {
        let users = await fetchUserData();
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert('Login successful!');
            window.location.href = './Homepage/index.html';
        } else {
            alert('Login failed: Invalid email or password');
        }
    } catch (error) {
        alert('Login failed.');
    }
});
