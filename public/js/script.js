// Form Submission Handler using AJAX
document.getElementById("serviceForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        service: document.getElementById("service").value,
        notes: document.getElementById("notes").value,
    };

    // Send data to the server via AJAX (fetch API)
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(responseText => {
        // Success - Show success message in the alert
        showAlert('Success!', responseText, 'alert-success');
        
        // Reset form
        document.getElementById("serviceForm").reset();
    })
    .catch(error => {
        // Error - Show error message in the alert
        showAlert('Error!', 'There was an issue submitting your form. Please try again later.', 'alert-danger');
    });
});

// Function to show the custom Bootstrap alert
function showAlert(heading, message, alertType) {
    const alert = document.getElementById("response-alert");
    const headingElement = document.getElementById("alert-heading");
    const messageElement = document.getElementById("alert-message");

    // Set alert heading and message
    headingElement.innerHTML = heading;
    messageElement.innerHTML = message;

    // Set alert type (Bootstrap success or danger)
    alert.classList.remove("alert-success", "alert-danger");
    alert.classList.add(alertType);

    // Show the alert
    alert.style.display = "block";

    // Automatically hide the alert after 5 seconds
    setTimeout(() => {
        alert.style.display = "none";
    }, 5000);
}

// Function to close the alert manually
function closeAlert() {
    document.getElementById("response-alert").style.display = "none";
}




// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
            });
        }
    });
});

const createMobileNav = () => {
    const nav = document.querySelector(".nav-links");
    const burger = document.querySelector(".burger");

    // Toggle navigation and animation
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
        burger.classList.toggle("active");
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove("active");
            burger.classList.remove("active");
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.burger').classList.remove('active');
            document.querySelector('.nav-links').classList.remove('active');
        });
    });
    
};

// Initialize mobile navigation
createMobileNav();


// Form validation
const validateForm = () => {
    const form = document.getElementById("serviceForm");
    const inputs = form.querySelectorAll("input[required], select[required]");

    inputs.forEach((input) => {
        input.addEventListener("invalid", (e) => {
            e.preventDefault();
            input.classList.add("invalid");
        });

        input.addEventListener("input", () => {
            if (input.validity.valid) {
                input.classList.remove("invalid");
            }
        });
    });
};

// Add form validation styles
const validationStyles = document.createElement("style");
validationStyles.textContent = `
.invalid {
    border-color: #dc2626 !important;
}
.invalid:focus {
    outline-color: #dc2626 !important;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline-color: var(--primary-color);
    border-color: var(--primary-color);
}
`;
document.head.appendChild(validationStyles);

// Initialize form validation
validateForm();

// Scroll-based navigation highlight
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

// Add navigation highlight styles
const navStyles = document.createElement("style");
navStyles.textContent = `
.nav-links a.active {
    color: var(--primary-color);
    font-weight: 600;
}
`;
document.head.appendChild(navStyles);



window.onload = function() {
    document.getElementById("translate-popup").style.display = "block";
  }

  // Close the pop-up
  function closePopup() {
    document.getElementById("translate-popup").style.display = "none";
  }

  // Implement translation (example for Google Translate)
  function changeLanguage(languageCode) {
    if (languageCode === 'mr') {
      window.location.href = "https://translate.google.com/translate?sl=en&tl=mr&u=" + window.location.href;
    }
  }






// JavaScript to randomly change chat messages or show/hide animations

const chatbotText = document.querySelector('.chat-text');

// Array of chat messages
const chatMessages = [
    "Hey! Need Help? Let's Chat!",
    "Got Questions? Chat with Us!",
    "We're here to assist you! Chat now!",
    "Have a query? Send us a message!",
];

// Function to change text randomly
setInterval(() => {
    const randomMessage = chatMessages[Math.floor(Math.random() * chatMessages.length)];
    chatbotText.textContent = randomMessage;
}, 4000);


