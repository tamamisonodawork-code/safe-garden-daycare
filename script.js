const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

function setupMailtoForm(formSelector, statusSelector, shortVersion = false) {
  const form = document.querySelector(formSelector);
  const status = document.querySelector(statusSelector);

  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const phone = formData.get("phone") || "";
    const childAge = formData.get("childAge") || "";
    const startDate = formData.get("startDate") || "";
    const message = formData.get("message") || "";

    const subject = encodeURIComponent(
      shortVersion
        ? "Check Availability Today - Safe Garden Home Daycare"
        : "Registration Inquiry - Safe Garden Home Daycare"
    );

    const body = encodeURIComponent(
      `Parent Name: ${name}\n` +
      `Email: ${email}\n` +
      (phone ? `Phone: ${phone}\n` : "") +
      `Child's Age: ${childAge}\n` +
      (startDate ? `Preferred Start Date: ${startDate}\n` : "") +
      `\nMessage:\n${message}`
    );

    // Temporary simple option before Google Form is ready.
    // Change this email address if needed.
    window.location.href = `mailto:info@safegardenhomedaycare.ca?subject=${subject}&body=${body}`;

    status.textContent =
      "Your email app should open now. Later, this form can be connected to Google Forms.";
  });
}

setupMailtoForm("#quickAvailabilityForm", "#quickFormStatus", true);
setupMailtoForm("#inquiryForm", "#formStatus", false);
