// Slideshow (top page)
(function () {
  var box = document.querySelector(".slideshow");
  if (!box) return;
  var slides = Array.prototype.slice.call(box.querySelectorAll(".slide"));
  var dotsBox = box.querySelector(".slide-dots");
  var current = 0;
  var timer = null;

  var dots = slides.map(function (_, i) {
    var b = document.createElement("button");
    b.setAttribute("aria-label", "スライド " + (i + 1));
    b.addEventListener("click", function () {
      show(i);
      restart();
    });
    dotsBox.appendChild(b);
    return b;
  });

  function show(i) {
    slides[current].classList.remove("current");
    dots[current].classList.remove("current");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("current");
    dots[current].classList.add("current");
  }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      show(current + 1);
    }, 5000);
  }

  box.querySelector(".slide-arrow.prev").addEventListener("click", function () {
    show(current - 1);
    restart();
  });
  box.querySelector(".slide-arrow.next").addEventListener("click", function () {
    show(current + 1);
    restart();
  });
  box.addEventListener("mouseenter", function () {
    if (timer) clearInterval(timer);
  });
  box.addEventListener("mouseleave", restart);

  slides[0].classList.add("current");
  dots[0].classList.add("current");
  restart();
})();

// Dropdown: tap support for touch devices
(function () {
  var parent = document.querySelector(".has-dropdown > a");
  if (!parent) return;
  parent.addEventListener("click", function (e) {
    if (window.matchMedia("(hover: none)").matches) {
      var li = parent.parentElement;
      if (!li.classList.contains("open")) {
        e.preventDefault();
        li.classList.add("open");
      }
    }
  });
  document.addEventListener("click", function (e) {
    var li = document.querySelector(".has-dropdown.open");
    if (li && !li.contains(e.target)) li.classList.remove("open");
  });
})();

// Fade-in on scroll
(function () {
  var targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach(function (el) { el.classList.add("visible"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  targets.forEach(function (el) { io.observe(el); });
})();
