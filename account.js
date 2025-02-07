// Profile Image Upload
document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all nav items and sections
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked nav item
        item.classList.add('active');
        
        // Show corresponding section
        const sectionId = item.getAttribute('href').substring(1);
        document.getElementById(sectionId).classList.add('active');
    });
});

// Chat functionality
function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = 'message sent';
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <p>${message}</p>
            <span class="message-time">${time}</span>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.value = '';
    }
}

document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
});

// New Listing Modal
function openNewListingModal() {
    const modal = document.getElementById('newListingModal');
    modal.classList.add('active');
}

function closeNewListingModal() {
    const modal = document.getElementById('newListingModal');
    modal.classList.remove('active');
}

document.getElementById('newListingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Handle form submission here
    const formData = {
        title: document.getElementById('listingTitle').value,
        price: document.getElementById('listingPrice').value,
        description: document.getElementById('listingDescription').value,
        images: document.getElementById('listingImages').files
    };
    console.log('New listing:', formData);
    closeNewListingModal();
});

// Password Change Modal
function openPasswordModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.add('active');
}

function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    modal.classList.remove('active');
}

document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }
    
    // Handle password change here
    console.log('Password change:', { currentPassword, newPassword });
    closePasswordModal();
});

// Handle logout
document.querySelector('.logout').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        // Add your logout logic here
        console.log('Logging out...');
    }
});