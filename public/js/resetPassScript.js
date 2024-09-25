document.getElementById("resetPasswordForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Mencegah form reload halaman

  const email = document.getElementById("email").value;

  // Membuat body request JSON
  const requestBody = {
    email: email,
  };

  try {
    // Kirim data ke API menggunakan fetch
    const response = await fetch("https://attemptresetpassword-tfxf5ks7wa-de.a.run.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Memproses respons API
    if (response.status === 200) {
      swal("Success", "Silahkan cek email anda.", "success");
    } else {
      swal("Error", "Terjadi kesalahan. Coba lagi nanti.", "error");
    }
  } catch (error) {
    swal("Error", "Terjadi kesalahan: " + error.message, "error");
  }
});
