// Ensure the menu toggle button works
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Registration form submission
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/register', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            this.reset(); // Reset the form
        })
        .catch(error => console.error('Error:', error));
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/login', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data === 'Login successful') {
                window.location.reload(); // Reload the page after successful login
            }
        })
        .catch(error => console.error('Error:', error));
});

// Appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/appointments', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            this.reset(); // Reset the form
            loadAppointments(); // Reload the appointments list
        })
        .catch(error => console.error('Error:', error));
});

// Function to load appointments
function loadAppointments() {
    fetch('/appointments')
        .then(response => response.json())
        .then(data => {
            const appointmentsList = document.getElementById('appointmentsList');
            appointmentsList.innerHTML = '';
            data.forEach(appointment => {
                const div = document.createElement('div');
                div.innerText = `Appointment with Doctor ID ${appointment.doctor_id} on ${appointment.appointment_date} at ${appointment.appointment_time} - Status: ${appointment.status}`;
                appointmentsList.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load appointments on page load
document.addEventListener('DOMContentLoaded', loadAppointments);

// Doctor Management (Admin)
document.getElementById('doctorForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/doctors', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            this.reset(); // Reset the form
            loadDoctors(); // Reload the doctors list
        })
        .catch(error => console.error('Error:', error));
});

// Function to load doctors
function loadDoctors() {
    fetch('/doctors')
        .then(response => response.json())
        .then(data => {
            const doctorsList = document.getElementById('doctorsList');
            doctorsList.innerHTML = '';
            data.forEach(doctor => {
                const div = document.createElement('div');
                div.innerText = `Dr. ${doctor.first_name} ${doctor.last_name} - Specialization: ${doctor.specialization}`;
                doctorsList.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load doctors on page load
document.addEventListener('DOMContentLoaded', loadDoctors);
