//TODO - Your ES6 JavaScript code (if any) goes here
import "bootstrap"
import "../stylesheets/main.css"

// javascripts/main.js
// Progressive enhancement: simple behaviors and static Instagram injection
;(function () {
  // Set copyright year
  document.addEventListener("DOMContentLoaded", function () {
    const y = document.getElementById("year")
    if (y) y.textContent = new Date().getFullYear()

    // Collapse navbar on nav link click (mobile)
    document.querySelectorAll("#mainNav .nav-link").forEach((a) => {
      a.addEventListener("click", () => {
        const el = document.getElementById("mainNav")
        if (el && el.classList.contains("show")) {
          // using Bootstrap API if available
          const bs = bootstrap.Collapse.getInstance(el) || new bootstrap.Collapse(el, { toggle: false })
          bs.hide()
        }
      })
    })

    // Inject static "Recent Instagram" posts — replace with Instagram API when credentials available.
    injectStaticPosts()
  })

  // Demo handler for booking form (server-side not connected)
  window.handleForm = function handleForm(e) {
    e.preventDefault()
    alert("Demo contact form — connect to a backend or mail service to enable sending.")
    return false
  }

  // STATIC Instagram placeholders (3 posts). Replace when you have API keys.
  function injectStaticPosts() {
    const posts = [
      {
        img: "assets/images/ig-1.jpg",
        link: "https://www.instagram.com/p/DFi12w5Sksw/",
        caption: "Under the Sea — cabaret installment (reel).",
      },
      {
        img: "assets/images/ig-2.jpg",
        link: "https://www.instagram.com/p/DP-JE6WDJZw/",
        caption: "What Goes Bump in the Night — spooky cabaret highlights.",
      },
      {
        img: "assets/images/ig-3.jpg",
        link: "https://www.facebook.com/61558493872618/photos/122183769434283129/",
        caption: "Audience & performers — live show snapshot.",
      },
    ]

    const container = document.getElementById("igPosts")
    if (!container) return

    container.innerHTML = posts
      .map((p) => {
        return `
        <div class="col-12 col-md-4">
          <a class="ig-card" href="${p.link}" target="_blank" rel="noopener">
            <img src="${p.img}" alt="${escapeHtml(p.caption)}" loading="lazy" />
            <div class="ig-caption">${escapeHtml(p.caption)}</div>
          </a>
        </div>
      `
      })
      .join("")
  }

  // tiny escape for captions
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
    })
  }
})()
