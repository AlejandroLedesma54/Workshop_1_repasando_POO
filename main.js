document.addEventListener('DOMContentLoaded', () => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken && window.location.pathname !== '/dashboard.html') {
        window.location.href = 'dashboard.html'; 
        displayReservations();
    }
    //  if (!sessionToken) {
    //     window.location.href = 'index.html';
    //     return;
    // }
    configureDashboard();
});

function configureDashboard() {
    const userEmail = localStorage.getItem('currentUser');
    const users = getUsers();
    const user = users.find(u => u.email === userEmail);

    if (user.role === 'admin') {
        document.getElementById('admin-dashboard').style.display = 'block';
        displayReservations();
        document.getElementById('regular-user-dashboard').style.display = 'none';
    } else {
        document.getElementById('admin-dashboard').style.display = 'none';
        document.getElementById('regular-user-dashboard').style.display = 'block';
        displayReservations();
    }
}

function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const role = document.getElementById('register-role').value;
    const adminKey = document.getElementById('register-key').value;
    
    if (role === 'admin' && !Admin.validatePassword(adminKey)) {
        alert("Incorrect admin key.");
        return;
    }

    const newUser = role === 'admin' ? new Admin(name, email, password) : new RegularUser(name, email, password);
    saveUser(newUser);
    localStorage.setItem('sessionToken', 'token-' + new Date().getTime());
    localStorage.setItem('currentUser', email);
    alert("User successfully registered. Please log in.");
    hideRegistration();
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('sessionToken', 'token-' + new Date().getTime());
        localStorage.setItem('currentUser', email);
        alert("Login successful. Welcome, " + user.name);
        window.location.href = 'dashboard.html';
    } else {
        alert("Incorrect login details.");
    }
}

function logout() {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function showRegistration() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('registration-form').style.display = 'block';
}

function hideRegistration() {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showAdminKeyField() {
    const role = document.getElementById('register-role').value;
    document.getElementById('register-key').style.display = role === 'admin' ? 'block' : 'none';
}

const incrementCounter = (function() {
    let counter = 0;
    return function() {
        counter++;
        return counter;
    }
})();

function createReservationAdmin() {
    const name = document.getElementById('reservation-name').value;
    const capacity = document.getElementById('reservation-capacity').value;
    const description = document.getElementById('reservation-description').value;
    
    if (!name || capacity <= 0 || !description) {
        alert('Please fill out all fields correctly to create the reservation.');
        return;
    }
    
    const id = incrementCounter();
    const reservation = { id, name, capacity, description };

    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));

    document.getElementById('reservation-name').value = '';
    document.getElementById('reservation-capacity').value = '';
    document.getElementById('reservation-description').value = '';
    displayReservations();
    console.log("Reservation created:", reservation);
}

function editReservationAdmin() {
    const id = prompt("Enter the ID of the reservation you want to edit:");
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const reservation = reservations.find(r => r.id == id);
    
    if (reservation) {
        const newName = prompt("Enter the new name for the reservation:", reservation.name);
        const newDate = prompt("Enter the new date for the reservation (format YYYY-MM-DD):", reservation.date);
        reservation.name = newName;
        reservation.date = newDate;
        localStorage.setItem('reservations', JSON.stringify(reservations));
        console.log("Reservation edited:", reservation);
    } else {
        console.log("Reservation with ID not found:", id);
    }
}

function deleteReservationAdmin() {
    const id = prompt("Enter the ID of the reservation you want to delete:");
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const index = reservations.findIndex(r => r.id == id);
    
    if (index !== -1) {
        reservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        console.log("Reservation deleted with ID:", id);
    } else {
        console.log("Reservation with ID not found:", id);
    }
}

function showReservationForm() {
    document.getElementById('reservation-form').style.display = 'block';
}

function displayReservations() {
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const list = document.getElementById('reservations-list');
    list.innerHTML = ''; 

    reservations.forEach(reservation => {
        const reservationDiv = document.createElement('div');
        reservationDiv.innerHTML = `<strong>${reservation.name}</strong> (Capacity: ${reservation.capacity}) - ${reservation.description}`;
        list.appendChild(reservationDiv);
    });
}

function reserve() {
    const id = prompt("Enter the ID of the reservation you want to take:");
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const index = reservations.findIndex(r => r.id == id);
    
    if (index !== -1) {
        reservations.splice(index, 1);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        console.log("Reservation deleted with ID:", id);
    } else {
        console.log("Reservation with ID not found:", id);
    }
}
