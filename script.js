// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add animations on scroll
const fadeInElements = document.querySelectorAll(".fade-in");
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const onScroll = () => {
  fadeInElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", debounce(onScroll, 100));
onScroll(); // Trigger on page load

// Initialize EmailJS
emailjs.init("PMe7p2aB6o1OnkkjV"); // Replace with your actual User ID

// Handle Contact Form Submission
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  console.log("Sending email...");
  emailjs.send("service_199u7yr", "template_1kfpiwa", { name, email, message })
    .then(
      () => {
        console.log("Email sent successfully!");
        alert("Message sent successfully!");
        contactForm.reset();
      },
      error => {
        console.error("Failed to send email:", error);
        alert("Failed to send message. Error: " + error.text);
      }
    );
});

// Validate Email Function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Chat Widget Toggle
const chatToggle = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
chatToggle?.addEventListener("click", () => {
  chatBox?.classList.toggle("hidden");
});

// Highlight the active navigation link
const navLinks = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname;
navLinks.forEach(link => {
  if (currentPage.includes(link.getAttribute("href"))) {
    link.classList.add("active");
  }
});

// Toggle visibility of project info
document.body.addEventListener("click", event => {
  if (event.target.classList.contains("view-more-btn")) {
    const projectInfo = event.target.nextElementSibling;
    if (projectInfo) {
      projectInfo.style.display = projectInfo.style.display === "block" ? "none" : "block";
    }
  }
});

// CV Form Submission
document.getElementById("cv-form")?.addEventListener("submit", function (event) {
  event.preventDefault();

  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!firstName || !lastName || !validateEmail(email) || !contact.match(/^\d{10}$/)) {
    alert("Please fill in the details correctly.");
    return;
  }

  fetch("/save-details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, contact }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.getElementById("download-btn").style.display = "block";
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("There was an error saving your details. Please try again later.");
    });
});
