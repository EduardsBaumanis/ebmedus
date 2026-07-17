const pages = [
  ["index.html", "Sākums", "home"],
  ["pakalpojumi.html", "Pakalpojumi", "services"],
  ["produkti.html", "Produkti", "products"],
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
    <svg class="icon-sprite" aria-hidden="true">
      <defs>
        <symbol id="icon-hex" viewBox="0 0 100 88">
          <polygon points="25,2 75,2 98,44 75,86 25,86 2,44" fill="currentColor"/>
        </symbol>
        <symbol id="icon-hive" viewBox="0 0 100 120">
          <polygon points="12,33 50,13 88,33" fill="#f2a515"/>
          <rect x="14" y="32" width="72" height="13" rx="2" fill="#e2971b"/>
          <rect x="20" y="48" width="60" height="22" rx="2" fill="#f2b32c"/>
          <rect x="20" y="73" width="60" height="25" rx="2" fill="#243354"/>
          <rect x="13" y="98" width="74" height="12" rx="2" fill="#e2971b"/>
          <rect x="40" y="87" width="20" height="6" rx="3" fill="#f7cf20"/>
        </symbol>
        <symbol id="icon-flower" viewBox="0 0 100 120">
          <path d="M50 55v58M50 86c-8-13-19-16-27-13 1 12 11 22 27 22M50 82c8-13 19-16 27-13-1 12-11 22-27 22" fill="none" stroke="#1f9b79" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          <g fill="#e7a2b8">
            <circle cx="50" cy="26" r="13"/><circle cx="33" cy="35" r="12"/><circle cx="67" cy="35" r="12"/>
            <circle cx="31" cy="53" r="12"/><circle cx="69" cy="53" r="12"/><circle cx="50" cy="59" r="13"/>
          </g>
          <circle cx="50" cy="43" r="12" fill="#f2b32c"/>
          <g fill="#f6f1dc">
            <circle cx="45" cy="36" r="2.5"/><circle cx="56" cy="39" r="2.5"/><circle cx="50" cy="49" r="2.5"/>
          </g>
        </symbol>
        <symbol id="icon-wax" viewBox="0 0 120 120">
          <g fill="none" stroke="#f7cf20" stroke-width="7" stroke-linejoin="round">
            <path d="M29 12h62l20 35-20 35H29L9 47z"/>
            <path d="M45 40h30l10 18-10 18H45L35 58z"/>
          </g>
          <path d="M20 91h80v17H20z" fill="#e2971b"/>
        </symbol>
        <symbol id="icon-queen" viewBox="0 0 120 120">
          <path d="M34 27l11 10 15-20 15 20 11-10 5 27H29z" fill="#f7cf20"/>
          <ellipse cx="60" cy="77" rx="23" ry="30" fill="#f2b32c"/>
          <path d="M39 66h42M37 80h46M42 94h36" stroke="#182234" stroke-width="8"/>
          <ellipse cx="36" cy="68" rx="17" ry="10" fill="#f6f1dc" opacity=".92" transform="rotate(-28 36 68)"/>
          <ellipse cx="84" cy="68" rx="17" ry="10" fill="#f6f1dc" opacity=".92" transform="rotate(28 84 68)"/>
        </symbol>
        <symbol id="icon-candy" viewBox="0 0 120 120">
          <path d="M20 38l40-20 40 20-40 21z" fill="#f2b32c"/>
          <path d="M20 38v48l40 22V59z" fill="#e2971b"/>
          <path d="M100 38v48l-40 22V59z" fill="#f7cf20"/>
          <rect x="69" y="62" width="21" height="15" rx="3" fill="#1e2a41"/>
        </symbol>
        <symbol id="icon-feed" viewBox="0 0 120 120">
          <path d="M32 34h56c8 0 14 6 14 14v44c0 8-6 14-14 14H32c-8 0-14-6-14-14V48c0-8 6-14 14-14z" fill="#f2b32c"/>
          <path d="M28 34h64v12c0 6-5 11-11 11H39c-6 0-11-5-11-11V34z" fill="#e2971b"/>
          <path d="M36 40c0-16 48-16 48 0" fill="none" stroke="#f6f1dc" stroke-width="7" stroke-linecap="round"/>
          <path d="M60 58c10 14 12 19 12 25a12 12 0 01-24 0c0-6 2-11 12-25z" fill="#1f8a70"/>
        </symbol>
        <symbol id="icon-candle" viewBox="0 0 120 120">
          <ellipse cx="60" cy="111" rx="30" ry="7" fill="#1e2a41" opacity=".16"/>
          <rect x="42" y="46" width="36" height="62" rx="6" fill="#f2b32c"/>
          <rect x="42" y="46" width="36" height="62" rx="6" fill="none" stroke="#e2971b" stroke-width="4"/>
          <line x1="60" y1="30" x2="60" y2="48" stroke="#182234" stroke-width="5"/>
          <path d="M60 4c9 14 9 24 0 32-9-8-9-18 0-32z" fill="#f7cf20"/>
          <path d="M60 12c5 8 5 14 0 19-5-5-5-11 0-19z" fill="#fce8a0"/>
        </symbol>
      </defs>
    </svg>
    <a class="skip-link" href="#main">Pāriet uz saturu</a>
    <header class="site-header">
      <div class="container nav-shell">
        <a class="brand" href="index.html" aria-label="Lielvaicēni, sākums">
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
            <p>Piegādes un pakalpojumi biškopjiem un lauksaimniekiem kopš 1992. gada. Ražojam arī medu un citus biškopības produktus.</p>
          </div>
          <div>
            <div class="footer-heading">LAPAS</div>
            <div class="footer-links">
              <a href="pakalpojumi.html">Pakalpojumi</a>
              <a href="produkti.html">Produkti</a>
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

    const button = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    button.disabled = true;
    button.textContent = "Nosūta…";
    status.textContent = "Ziņojums tiek nosūtīts…";

    fetch("https://formsubmit.co/ajax/lielvaiceni@inbox.lv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Form submission failed");
        return response.json();
      })
      .then((data) => {
        if (data.success !== true && data.success !== "true") {
          throw new Error(data.message || "Form submission failed");
        }
        form.reset();
        status.textContent = "Paldies! Ziņojums ir veiksmīgi nosūtīts.";
      })
      .catch(() => {
        error.textContent = "Ziņojumu neizdevās nosūtīt. Lūdzu, mēģini vēlreiz vai raksti uz lielvaiceni@inbox.lv.";
        status.textContent = "";
      })
      .finally(() => {
        button.disabled = false;
        button.textContent = "Nosūtīt ziņojumu";
      });
  });
}

renderHeader();
renderFooter();
setupMenu();
setupContactForm();

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});
