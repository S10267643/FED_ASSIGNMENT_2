function toggleModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
  }
document.addEventListener("DOMContentLoaded", function () {
    const authModal = document.getElementById("authModal");
    const accountAccess = document.querySelector(".account-access");
    const closeBtn = document.querySelector(".close-btn");

    // Show modal when clicking "Account"
    accountAccess.addEventListener("click", function () {
        authModal.style.display = "flex";
    });

    // Hide modal when clicking the close button
    closeBtn.addEventListener("click", function () {
        authModal.style.display = "none";
    });

    // Hide modal if user clicks outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === authModal) {
            authModal.style.display = "none";
        }
    });
});
