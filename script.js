// ------------------ Carrusel de Lenguajes (index.html) ------------------
const languages = ["JavaScript", "Python", "HTML", "CSS", "React", "Node.js"];
let currentLang = 0;

function updateLang() {
  const carouselContent = document.getElementById("carousel-content");
  if (carouselContent) {
    carouselContent.textContent = languages[currentLang];
  }
}

function nextLang() {
  currentLang = (currentLang + 1) % languages.length;
  updateLang();
}

function prevLang() {
  currentLang = (currentLang - 1 + languages.length) % languages.length;
  updateLang();
}

setInterval(nextLang, 3000);
updateLang();

// ------------------ Formulario de Contacto (contacto.html) ------------------
if (typeof emailjs !== 'undefined') {
  emailjs.init("TU_USER_ID"); // Cambia por tu User ID real de EmailJS

  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const submitButton = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      // Validación básica
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formMessage.textContent = "Por favor, completa todos los campos.";
        formMessage.style.color = "#ff6961"; // rojo suave
        return;
      }

      // Deshabilitar botón para evitar múltiples envíos
      if (submitButton) submitButton.disabled = true;
      formMessage.textContent = "Enviando...";
      formMessage.style.color = "#f8bbd0";

      emailjs.sendForm("TU_SERVICE_ID", "TU_TEMPLATE_ID", this)
        .then(() => {
          formMessage.textContent = "¡Mensaje enviado con éxito!";
          formMessage.style.color = "#90ee90"; // verde claro
          form.reset();
          if (submitButton) submitButton.disabled = false;
        })
        .catch((error) => {
          console.error("Error al enviar el mensaje:", error);
          formMessage.textContent = "Error al enviar el mensaje. Intenta nuevamente.";
          formMessage.style.color = "#ff6961";
          if (submitButton) submitButton.disabled = false;
        });
    });
  }
}
