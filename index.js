//FOR THE NAVIGATION LINK IN MY HOME THAT LINK IN MY INDEX
const navLinks = document.querySelectorAll(".nav-link .nav-list");
const allContent = document.querySelectorAll(".tab-content");

function showTab(targetId) {
   navLinks.forEach((link) => link.classList.remove("active"));

   allContent.forEach((section) => (section.style.display = "none"));

   const targetSection = document.getElementById(targetId);
   if (targetSection) targetSection.style.display = "block";

   const matchingLink = document.querySelector(`.nav-list[href="#${targetId}"]`);
   if (matchingLink) matchingLink.classList.add("active");
}

navLinks.forEach((link) => {
   link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      history.pushState(null, "", `#${targetId}`);

      showTab(targetId);

      if (["home", "hero"].includes(targetId)) {
         localStorage.removeItem("activeTab");
      } else {
         localStorage.setItem("activeTab", targetId);
      }
   });
});
