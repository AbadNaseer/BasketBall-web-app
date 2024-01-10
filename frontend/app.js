document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const loginSection = document.getElementById('login');
    const signupSection = document.getElementById('signup');
    const teamsSection = document.getElementById('teams');
    const playersSection = document.getElementById('players');
    const createTeamButton = document.getElementById('createTeam');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
  
    document.querySelector('nav').addEventListener('click', function (event) {
      event.preventDefault();
      const sectionId = event.target.getAttribute('data-section');
      showSection(sectionId);
    });
  
    createTeamButton.addEventListener('click', function () {
      // You can add logic for creating a team here
      alert('Create Team button clicked!');
    });
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      loginUser(username, password);
    });
  
    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const newUsername = document.getElementById('newUsername').value;
      const newPassword = document.getElementById('newPassword').value;
      createUser(newUsername, newPassword);
    });
  
    function showSection(sectionId) {
      sections.forEach(section => {
        section.style.display = 'none';
      });
  
      document.getElementById(sectionId).style.display = 'block';
    }
  
    function loginUser(username, password) {
      fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          alert('Login successful!');
          // Additional logic like redirecting to the dashboard can be added here
        })
        .catch(error => {
          console.error('Error:', error);
          alert(error.message || 'An error occurred during login.');
        });
    }
  
    function createUser(newUsername, newPassword) {
      fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          alert('Account created successfully!');
          // Additional logic like redirecting to the dashboard or logging in the user can be added here
        })
        .catch(error => {
          console.error('Error:', error);
          alert(error.message || 'An error occurred during account creation.');
        });
    }
  });
  