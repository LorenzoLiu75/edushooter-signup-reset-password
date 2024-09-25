document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const displayName = document.getElementById("displayName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  // Periksa apakah password dan confirm password cocok
  if (password !== passwordConfirm) {
    swal("Error", "Passwords do not match!", "error");
    return;
  }

  // Validasi password: minimal 6 karakter, 1 huruf kapital, 1 angka, dan 1 simbol
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

  if (!passwordRegex.test(password)) {
    swal("Error", "Password harus minimal 6 karakter, mengandung 1 huruf kapital, 1 angka, dan 1 simbol!", "error");
    return;
  }

  // Membuat body request JSON
  const requestBody = {
    email: email,
    password: password,
    display_name: displayName,
  };

  try {
    const response = await fetch("https://createuser-tfxf5ks7wa-de.a.run.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Memproses respons API
    if (response.status === 201) {
      swal("Success", "User berhasil dibuat!", "success");
    } else if (response.status === 403) {
      swal("Error", "Email sudah terdaftar!", "error");
    } else {
      swal("Error", "Terjadi kesalahan. Coba lagi nanti!", "error");
    }
  } catch (error) {
    swal("Error", "Terjadi kesalahan: " + error.message, "error");
  }
});