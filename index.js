document.addEventListener("DOMContentLoaded", function () {
  // Typing Animation
  const messages = [
    "Cinta adalah tentang memahami dan menghargai satu sama lain...",
    "Hal kecil yang kita lakukan bisa berarti besar bagi pasangan...",
    "Setiap hari adalah kesempatan baru untuk membuat pasangan tersenyum...",
    "Cinta sejati terlihat dari perhatian pada hal-hal kecil...",
    "Kebahagiaan hubungan dibangun dari momen-momen sederhana...",
    "Kenangan indah tercipta dari perhatian yang tulus...",
  ];

  const typed = new Typed(".typing-text", {
    strings: messages,
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    showCursor: true,
    cursorChar: "❤",
    shuffle: true,
  });

  // Form Submission
  const form = document.getElementById("myForm");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
      name: document.getElementById("name").value,
      jenis: document.getElementById("jenis").value,
      hal: document.getElementById("hal").value,
      penjelasan: document.getElementById("penjelasan").value,
      timestamp: new Date().toISOString(),
    };

    try {
      // Kirim data ke API
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Gagal menyimpan data");

      // Tampilkan notifikasi sukses
      alert(`Terima kasih! Catatan telah tersimpan dengan baik. 💖`);
      form.reset();

      // Animasi
      const card = document.querySelector(".form-card");
      card.classList.add("animate__animated", "animate__pulse");
      setTimeout(() => {
        card.classList.remove("animate__animated", "animate__pulse");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    }
  });
});
