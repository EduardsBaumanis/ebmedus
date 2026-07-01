const pages = [
  ["index.html", "Sākums", "home"],
  ["par-mums.html", "Par mums", "about"],
  ["produkti.html", "Produkti", "products"],
  ["pakalpojumi.html", "Pakalpojumi", "services"],
  ["invertsirups.html", "Invertsīrups", "syrup"],
  ["kontakti.html", "Kontakti", "contact"],
];

const activePage = document.body.dataset.page;

function renderHeader() {
  const target = document.querySelector("[data-site-header]");
  if (!target) return;

  const links = pages
    .map(
      ([href, label, key]) =>
        `<a class="nav-link" href="${href}"${key === activePage ? ' aria-current="page"' : ""}>${label}</a>`,
    )
    .join("");

  target.innerHTML = `
    <a class="skip-link" href="#main">Pāriet uz saturu</a>
    <header class="site-header">
      <div class="container nav-shell">
        <a class="brand" href="index.html" aria-label="Lielvaicēni — sākums">
          <img src="design/assets/logo-trans.png" alt="Lielvaicēni">
        </a>
        <nav class="site-nav" id="site-nav" aria-label="Galvenā izvēlne">${links}</nav>
        <a class="button button-dark nav-phone" href="tel:+37128243975" aria-label="Zvanīt Tomam Grudovskim">
          <span class="status-dot"></span>+371 28243975
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Atvērt izvēlni"><span></span></button>
      </div>
    </header>`;
}

function renderFooter() {
  const target = document.querySelector("[data-site-footer]");
  if (!target) return;

  target.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="design/assets/logo-cream.png" alt="Lielvaicēni">
            <p>Daudznozaru saimniecība kopš 1992. gada. Medus, biškopības produkti un pakalpojumi biškopjiem no Zemgales.</p>
          </div>
          <div>
            <div class="footer-heading">LAPAS</div>
            <div class="footer-links">
              <a href="par-mums.html">Par mums</a>
              <a href="produkti.html">Produkti</a>
              <a href="pakalpojumi.html">Pakalpojumi</a>
              <a href="invertsirups.html">Invertsīrups</a>
            </div>
          </div>
          <div class="footer-copy">
            <div class="footer-heading">KONTAKTI</div>
            Toms Grudovskis<br>
            <a href="tel:+37128243975">+371 28243975</a><br>
            <a href="mailto:lielvaiceni@inbox.lv">lielvaiceni@inbox.lv</a>
          </div>
          <div class="footer-copy">
            <div class="footer-heading">ADRESE</div>
            "Lielvaicēni"<br>Vītiņu pagasts<br>Dobeles novads, LV-3708
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span data-year></span> Z/S LIELVAICĒNI</span>
          <span>REĢ. NR. 45101006074</span>
        </div>
      </div>
    </footer>`;
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Atvērt izvēlni");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Aizvērt izvēlni" : "Atvērt izvēlni");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });

  nav.addEventListener("click", close);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });
  window.matchMedia("(min-width: 821px)").addEventListener("change", close);
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const error = form.querySelector(".form-error");
  const status = form.querySelector(".form-status");
  const query = new URLSearchParams(window.location.search);
  const messageField = form.elements.message;

  if (query.get("par")) {
    messageField.value = `Vēlos uzzināt vairāk par: ${query.get("par")}.`;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    status.textContent = "";

    if (!form.checkValidity()) {
      error.textContent = "Lūdzu aizpildi visus laukus un pārbaudi e-pasta adresi.";
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const name = data.get("name").trim();
    const email = data.get("email").trim();
    const message = data.get("message").trim();
    const subject = encodeURIComponent(`Ziņa no ${name} — lielvaiceni.lv`);
    const body = encodeURIComponent(`Vārds: ${name}\nE-pasts: ${email}\n\n${message}`);

    status.textContent = "Tiek atvērta tava e-pasta programma…";
    window.location.href = `mailto:lielvaiceni@inbox.lv?subject=${subject}&body=${body}`;
  });
}

renderHeader();
renderFooter();
setupMenu();
setupContactForm();

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});
