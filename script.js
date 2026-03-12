const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const scrollButtons = document.querySelectorAll("[data-scroll-target]");
const topButtons = document.querySelectorAll("[data-scroll-top]");
const form = document.querySelector("[data-contact-form]");
const successPanel = document.querySelector("[data-form-success]");
const submitButton = document.querySelector("[data-submit-button]");
const yearNode = document.querySelector("[data-year]");
const formIntro = document.querySelector(".form-intro");

const closeMobileMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.remove("is-open");
  mobileMenu.hidden = true;
};

const openMobileMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu.hidden = false;
  mobileMenu.classList.add("is-open");
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.contains("is-open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
  closeMobileMenu();
};

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scrollToSection(button.dataset.scrollTarget);
  });
});

topButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMobileMenu();
  });
});

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 40);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

if (form && successPanel && submitButton) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    window.setTimeout(() => {
      form.hidden = true;
      if (formIntro) formIntro.hidden = true;
      successPanel.hidden = false;
      submitButton.disabled = false;
      submitButton.textContent = "Register Interest";

      window.setTimeout(() => {
        form.reset();
        form.hidden = false;
        if (formIntro) formIntro.hidden = false;
        successPanel.hidden = true;
      }, 4000);
    }, 1000);
  });
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
