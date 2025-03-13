document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = form.querySelector('input[name="email"]');
  const usernameInput = form.querySelector('input[name="username"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const reasonInput = form.querySelector('textarea[name="reason"]');
  const confirmationCheckbox = form.querySelector('input[name="confirmation"]');

  // Function to show alert messages
  function showAlert(message, type, redirectUrl = null) {
    swal({
      title: type === 'success' ? "Success!" : "Error!",
      text: message,
      icon: type,
      button: "OK",
    }).then(() => {
      if (type === 'success' && redirectUrl) {
        window.location.href = redirectUrl;
      }
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Basic validation
    if (!emailInput.value || !usernameInput.value || !passwordInput.value || !confirmationCheckbox.checked) {
      showAlert("All fields must be filled out, and you must agree to the terms.", 'error');
      return;
    }

    const formData = {
      email: emailInput.value,
      username: usernameInput.value,
      password: passwordInput.value,
      reason: reasonInput.value || null
    };

    fetch('https://requestaccountdeletion-tfxf5ks7wa-de.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.status === 201) {
        showAlert("If the username and password are correct, your data will be deleted within 30 business days.", 'success', './edushooterHome.html');
      } else if (response.status === 500) {
        showAlert("An error has occurred. Please try again later.", 'error');
      } else {
        showAlert("Unexpected response. Please try again.", 'error');
      }
    })
    .catch(error => {
      showAlert("An error has occurred. Please try again later.", 'error');
    });
  });
});
