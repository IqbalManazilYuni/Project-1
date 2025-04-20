document.addEventListener("DOMContentLoaded", function () {
  // Elemen DOM
  const messagesContainer = document.getElementById("messages-container");
  const filterName = document.getElementById("filter-name");
  const filterType = document.getElementById("filter-type");

  // Fungsi untuk memuat pesan dari API
  async function loadMessages() {
    try {
      const response = await fetch("http://localhost:3000/messages");
      if (!response.ok) throw new Error("Gagal memuat pesan");
      const messages = await response.json();
      displayMessages(messages);
    } catch (error) {
      console.error("Error:", error);
      messagesContainer.innerHTML = `
          <div class="alert alert-danger">
            Gagal memuat pesan. Silakan coba lagi nanti.
          </div>
        `;
    }
  }

  // Fungsi untuk menampilkan pesan
  function displayMessages(messages) {
    // Filter pesan berdasarkan select
    const nameFilter = filterName.value;
    const typeFilter = filterType.value;

    const filteredMessages = messages.filter((message) => {
      return (
        (!nameFilter || message.name === nameFilter) &&
        (!typeFilter || message.jenis === typeFilter)
      );
    });

    if (filteredMessages.length === 0) {
      messagesContainer.innerHTML = `
          <div class="alert alert-info">
            Tidak ada pesan yang ditemukan dengan filter ini.
          </div>
        `;
      return;
    }

    // Buat HTML untuk setiap pesan
    messagesContainer.innerHTML = filteredMessages
      .map(
        (message) => `
        <div class="message-card animate__animated animate__fadeIn">
          <div class="message-header">
            <span class="message-name">
              ${
                message.name === "iqbal" ? "Iqbal Manazil Yuni" : "Aulia Aorama"
              }
            </span>
            <span class="message-type">
              ${getTypeLabel(message.jenis)}
            </span>
          </div>
          <div class="message-hal">${message.hal}</div>
          <div class="message-penjelasan">${message.penjelasan}</div>
        </div>
      `
      )
      .join("");
  }

  // Helper function untuk label jenis
  function getTypeLabel(jenis) {
    const types = {
      suka: "Hal yang Disuka",
      "tidak-suka": "Hal yang Tidak Disuka",
      lainnya: "Catatan Lainnya",
    };
    return types[jenis] || jenis;
  }

  // Event listener untuk filter
  filterName.addEventListener("change", loadMessages);
  filterType.addEventListener("change", loadMessages);

  // Muat pesan saat pertama kali load
  loadMessages();
});
