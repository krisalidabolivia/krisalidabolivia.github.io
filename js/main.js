document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js cargó OK");

  
  // Año footer

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Menú mobile =====
  const toggle = document.querySelector(".nav__toggle");
  const nav = document.querySelector(".nav");

  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

      
    });

    // Cierra al tocar un link
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", closeNav);
    });

    // Cierra al tocar fuera
    document.addEventListener("click", (e) => {
      const inside = nav.contains(e.target) || toggle.contains(e.target);
      if (!inside) closeNav();
    });

    // Cierra con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  // ===== WhatsApp desplegable =====
  const waMenu = document.querySelector(".whatsapp-menu");
  const waMainBtn = document.querySelector(".whatsapp-main");
  if (waMenu && waMainBtn) {
    waMainBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      waMenu.classList.toggle("is-open"); // ✅ coincide con tu CSS
    });

    document.addEventListener("click", (e) => {
      if (!waMenu.contains(e.target)) waMenu.classList.remove("is-open");
    });
  }

  // ===== Pausar otros videos =====
  const videos = document.querySelectorAll("video");
  videos.forEach((v) => {
    v.addEventListener("play", () => {
      videos.forEach((other) => {
        if (other !== v) other.pause();
      });
    });
  });
});

// ===== Formulario a WhatsApp =====
function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const data = new FormData(form);

  const contacto = data.get("contacto");
  const nombre = (data.get("nombre") || "").toString().trim();
  const fecha = (data.get("fecha") || "").toString().trim();
  const ciudad = (data.get("ciudad") || "").toString().trim();
  const ubicacion = (data.get("ubicacion") || "").toString().trim();
  const tipo = (data.get("tipo_evento") || "").toString().trim();
  const tandas = (data.get("tandas") || "").toString().trim();

  const msg =
`Hola, soy ${nombre}.
Quiero cotizar a Krisálida para un evento.

📅 Fecha: ${fecha}
📍 Ciudad: ${ciudad}
📌 Ubicación: ${ubicacion}
🎉 Tipo de evento: ${tipo}
🎶 Tandas: ${tandas}
Me podrían confirmar disponibilidad y costo porfavor`;

  const url = `https://wa.me/591${contacto}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  return false;
}

// =========================
// LIGHTBOX (a prueba de fallos)
// =========================
(function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!lightbox || !lightboxImg) {
    console.warn("Lightbox: no se encontró #lightbox o #lightbox-img");
    return;
  }

  function openLightbox(src, alt = "") {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Imagen ampliada";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  // Click en una imagen de cualquier galería
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".gallery img");
    if (!img) return;
    openLightbox(img.src, img.alt);
  });

  // Botón cerrar
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  // Cerrar tocando fuera de la imagen
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();
