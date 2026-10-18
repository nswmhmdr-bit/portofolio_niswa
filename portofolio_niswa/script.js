const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Membuka dan menutup menu pada layar HP.
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

// Setelah memilih menu, menu HP akan tertutup kembali.
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

// Tahun footer mengikuti tahun saat ini.
document.getElementById("year").textContent = new Date().getFullYear();

const proofModal = document.getElementById("proofModal");
const proofTitle = document.getElementById("proofTitle");
const proofSubtitle = document.getElementById("proofSubtitle");
const proofImages = document.getElementById("proofImages");

let previousFocus = null;

function openProof(item) {
  previousFocus = item;

  proofTitle.textContent = item.dataset.title;
  proofSubtitle.textContent = item.dataset.subtitle || "";

  proofImages.replaceChildren();

  const photos = (item.dataset.photos || "")
    .split("|")
    .map(name => name.trim())
    .filter(Boolean);

  photos.forEach(name => {
    const img = document.createElement("img");

    // Foto berada di folder yang sama dengan index.html
    img.src = name;
    img.alt = "Bukti " + (item.dataset.title || "pencapaian");

    img.onerror = () => {
      const error = document.createElement("p");
      error.className = "proof-error";
      error.textContent =
        'Foto "' + name +
        '" tidak ditemukan. Periksa nama dan ekstensi file.';
      img.replaceWith(error);
    };

    proofImages.appendChild(img);
  });

  proofModal.classList.add("is-open");
  proofModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("proof-open");
  proofModal.querySelector(".proof-close").focus();
}

function closeProof() {
  if (!proofModal.classList.contains("is-open")) return;

  proofModal.classList.remove("is-open");
  proofModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("proof-open");

  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll(".achievement-clickable")
  .forEach(item => {
    item.addEventListener("click", () => openProof(item));

    item.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProof(item);
      }
    });
  });

proofModal.querySelectorAll("[data-close-proof]")
  .forEach(button => {
    button.addEventListener("click", closeProof);
  });

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeProof();
});