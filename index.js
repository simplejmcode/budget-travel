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

      // Update the history with the correct hash
      history.pushState(null, "", `#${targetId}`);

      // Show the corresponding tab
      showTab(targetId);

      // ✅ Clear localStorage for Hero/Home or update it for other sections
      if (["Home", "Hero"].includes(targetId)) {
         localStorage.removeItem("activeTab");
      } else {
         localStorage.setItem("activeTab", targetId);
      }
   });
});

window.addEventListener("DOMContentLoaded", () => {
   const initialHash = window.location.hash.substring(1);
   const target = initialHash || "Home";
   showTab(target);
});

window.addEventListener("hashchange", () => {
   const hash = window.location.hash.substring(1);
   showTab(hash || "Home");
});

document.getElementById("btnStartTour").addEventListener("click", function () {
   history.pushState(null, "", "#Tour");
   showTab("Tour");

   setTimeout(() => {
      const targetSection = document.getElementById("Tour");
      if (targetSection) {
         targetSection.scrollIntoView({ behavior: "smooth" });
      }
   }, 100);
});

//Commitment explore now
["exploreNow", "exploreNowSecond"].forEach((id) => {
   const btn = document.getElementById(id);
   if (btn) {
      btn.addEventListener("click", function (e) {
         e.preventDefault();
         history.pushState(null, "", "#Destination");
         showTab("Destination");

         setTimeout(() => {
            const targetSection = document.getElementById("Destination");
            if (targetSection) {
               targetSection.scrollIntoView({ behavior: "smooth" });
            }
         }, 100);
      });
   }
});
//FOR THE NAVIGATION LINK IN MY HOME THAT LINK IN MY INDEX

//MOVING FIRST AIRPLANE
window.addEventListener("scroll", function () {
   const airplane = document.getElementById("home-airplane");

   if (window.scrollY > 50) {
      airplane.classList.add("move-right");
   } else {
      airplane.classList.remove("move-right");
   }
});
//MOVING FIRST AIRPLANE
//MOVING SECOND AIRPLANE
window.addEventListener("scroll", () => {
   const airplane = document.getElementById("services-airplane");
   const scrollY = window.scrollY;

   // Adjust this scroll range to suit your layout
   if (scrollY > 100) {
      // Move to the right
      airplane.style.transform = "translateX(42rem)";
   } else {
      // Back to original position
      airplane.style.transform = "translateX(0)";
   }
});
//MOVING SECOND AIRPLANE

//FOR DROPDOWN BUTTON OF SEARCH CONTENT IN HOME
document.addEventListener("DOMContentLoaded", function () {
   const dropdowns = document.querySelectorAll(".custom-dropdown");

   dropdowns.forEach((dropdown) => {
      const selected = dropdown.querySelector(".dropdown-selected");
      const optionsContainer = dropdown.querySelector(".dropdown-options");
      const options = optionsContainer.querySelectorAll("li");

      selected.addEventListener("click", function (e) {
         e.stopPropagation();
         dropdowns.forEach((d) => {
            if (d !== dropdown) {
               d.classList.remove("open");
            }
         });

         dropdown.classList.toggle("open");
      });

      options.forEach((option) => {
         option.addEventListener("click", function () {
            selected.childNodes[0].textContent = option.textContent;

            setTimeout(() => {
               dropdown.classList.remove("open");
            }, 200);
         });
      });

      document.addEventListener("click", function (event) {
         if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("open");
         }
      });
   });
});
//FOR DROPDOWN BUTTON OF SEARCH CONTENT IN HOME

//FOR SUBMITTING THE FORM
document.getElementById("clearButton").addEventListener("click", function () {
   document.getElementById("travelBookingForm").reset();
});

function confirmBooking() {
   return confirm("Are you sure you want to submit this booking?");
}

function confirmMessage() {
   return confirm("Are you sure you want to send this message?");
}
//FOR SUBMITTING THE FORM

//FOR THE ANCHOR LINK IN THE DESTINATION JUMP TO
window.addEventListener("DOMContentLoaded", function () {
   const activeTabId = localStorage.getItem("activeTab");

   if (activeTabId) {
      const tabContent = document.getElementById(activeTabId);
      if (tabContent) {
         document.querySelectorAll(".tab-content").forEach((tab) => {
            tab.style.display = "none";
         });

         tabContent.style.display = "block";

         tabContent.scrollIntoView({ behavior: "smooth" });

         document.querySelectorAll(".nav-list, .locations a").forEach((nav) => {
            nav.classList.remove("active");
         });

         const navMatch = document.querySelector(`.nav-list[href="#${activeTabId}"]`);
         const dropdownMatch = document.querySelector(`.locations a[href="#${activeTabId}"]`);
         if (dropdownMatch) dropdownMatch.classList.add("active");
         if (navMatch) navMatch.classList.add("active");

         if (["Luzon", "Visayas", "Mindanao"].includes(activeTabId)) {
            const mainDestNav = document.querySelector('.nav-list[href="#Destination"]');
            if (mainDestNav) mainDestNav.classList.add("active");
         }
      }
   }
});

document.querySelectorAll(".jump-to a, .locations a").forEach((link) => {
   link.addEventListener("click", function (e) {
      const targetID = this.getAttribute("href");
      const targetElement = document.querySelector(targetID);

      if (targetElement) {
         e.preventDefault();

         const tabContent = targetElement.closest(".tab-content");

         if (this.closest(".locations")) {
            if (tabContent && tabContent.style.display === "none") {
               document
                  .querySelectorAll(".tab-content")
                  .forEach((tab) => (tab.style.display = "none"));
               tabContent.style.display = "block";
            }

            document.querySelectorAll(".nav-list, .locations a").forEach((nav) => {
               nav.classList.remove("active");
            });

            const navMatch = document.querySelector(`.nav-list[href="${targetID}"]`);
            const dropdownMatch = document.querySelector(`.locations a[href="${targetID}"]`);
            if (dropdownMatch) dropdownMatch.classList.add("active");
            if (navMatch) navMatch.classList.add("active");

            if (["#Destination", "#Luzon", "#Visayas", "#Mindanao"].includes(targetID)) {
               const mainDestNav = document.querySelector('.nav-list[href="#Destination"]');
               if (mainDestNav) mainDestNav.classList.add("active");
            }

            // Store or clear active tab depending on destination
            if (tabContent && tabContent.id) {
               if (tabContent.id === "Home" || tabContent.id === "Hero") {
                  localStorage.removeItem("activeTab");
               } else {
                  localStorage.setItem("activeTab", tabContent.id);
               }
            }
         }

         targetElement.scrollIntoView({ behavior: "smooth" });
      }
   });
});
//FOR THE ANCHOR LINK IN THE DESTINATION JUMP TO

//FOR THE SECTION PLACE IMAGE TRACK
const track = document.getElementById("image-track");
window.onmousedown = (e) => {
   track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = (e) => {
   track.dataset.mouseDownAt = "0";
   track.dataset.prevPercentage = track.dataset.percentage;
};

window.onmousemove = (e) => {
   if (track.dataset.mouseDownAt == "0") return;

   const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
   const maxDelta = window.innerWidth / 0.5;

   const percentage = (mouseDelta / maxDelta) * -100;
   const nextPerUniconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
   const nextPercentage = Math.max(Math.min(nextPerUniconstrained, 0), -100);

   track.dataset.percentage = nextPercentage;

   track.animate(
      {
         transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 2500, fill: "forwards" },
   );

   const listImage = track.getElementsByClassName("image");
   for (const image of listImage) {
      image.animate(
         {
            objectPosition: `${100 + nextPercentage}% center`,
         },
         { duration: 2500, fill: "forwards" },
      );
   }
};
//FOR THE SECTION PLACE IMAGE TRACK

// FOR THE TOUR EXPLORE MORE SO THAT IT WILL DISPLAY INTO THE TOUR SECTION
document.addEventListener("DOMContentLoaded", function () {
   const params = new URLSearchParams(window.location.search);
   const tourId = params.get("tour");

   loadTourData(tourId);

   // Handle browser hash changes (when URL changes, like clicking a different section)
   window.addEventListener("hashchange", handleSectionChange);

   // Also handle anchor clicks manually to catch cases where hash doesn't actually change
   document.querySelectorAll("a[href^='#']").forEach((link) => {
      link.addEventListener("click", function (e) {
         // Wait a tick for hash to update before checking
         setTimeout(() => {
            handleSectionChange();
         }, 10);
      });
   });

   function handleSectionChange() {
      const hash = window.location.hash;
      const tourBox = document.getElementById("selectedTourDetails");

      if (hash !== "#Tour") {
         // Leaving the Tour section
         sessionStorage.removeItem("tourData");
         if (tourBox) {
            tourBox.innerHTML = "";
            tourBox.style.display = "none";
         }

         // ➕ SHOW back all tours when not viewing a specific one
         const allTours = document.getElementById("dispAllTour");
         if (allTours) {
            allTours.style.display = "block";
         }

         // ➕ SHOW footer again
         const footer = document.getElementById("footer-container");
         if (footer) {
            footer.style.display = "block";
         }
      } else {
         // Returning to Tour
         const storedTour = sessionStorage.getItem("tourData");
         if (storedTour) {
            displayTourDetails(JSON.parse(storedTour));
         }
      }
   }

   function loadTourData(tourId) {
      const storedTour = sessionStorage.getItem("tourData");
      const storedTourId = sessionStorage.getItem("tourId");

      if (tourId) {
         if (tourId !== storedTourId) {
            // New tour selected, fetch new data
            fetchTourDetails(tourId);
         } else if (storedTour) {
            // Same tour, use cached data
            displayTourDetails(JSON.parse(storedTour));
         } else {
            fetchTourDetails(tourId); // fallback
         }
      } else if (storedTour) {
         displayTourDetails(JSON.parse(storedTour));
      }
   }

   function fetchTourDetails(tourId) {
      fetch("get_tour_details.php?id=" + tourId)
         .then((res) => res.json())
         .then((tour) => {
            sessionStorage.setItem("tourData", JSON.stringify(tour));
            sessionStorage.setItem("tourId", tourId); // Store the ID too
            displayTourDetails(tour);
         })
         .catch((error) => {
            console.error("Failed to fetch tour details:", error);
         });
   }

   function displayTourDetails(tour) {
      const tourBox = document.getElementById("selectedTourDetails");
      if (tourBox) {
         // Hide all tours list
         const allTours = document.getElementById("dispAllTour");
         if (allTours) allTours.style.display = "none";

         const shortDescription = tour.description;

         const ratingSum = tour.rating_sum; // Assuming `tour.rating_sum` holds the sum of all ratings
         const ratingCount = tour.rating_count; // Assuming `tour.rating_count` holds the number of ratings

         let rating = 0;
         if (ratingCount > 0) {
            rating = ratingSum / ratingCount; // Calculate average rating
         }

         let starRatingHTML = "";

         // Loop through the 5 stars to display the correct rating
         for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
               // Full star
               starRatingHTML += `<span class="star full" data-value="${i}">★</span>`;
            } else if (i - 0.5 <= rating) {
               // Half star (use special character or class for styling)
               starRatingHTML += `<span class="star half" data-value="${i}">⯨</span>`; // Or use a styled <span>
            } else {
               // Empty star
               starRatingHTML += `<span class="star empty" data-value="${i}">☆</span>`;
            }
         }

         // Inject the star rating HTML into the page
         document.getElementById("starRating").innerHTML = starRatingHTML;

         tourBox.innerHTML = `
                <div class="divSelectedTour">
                    <img class="pictureDiv" src="admin/${tour.image_path}" alt="Tour Image">
    
                    <div class="image-place-content">
                        <h2 id="title">${tour.title}</h2>
                        <h5 id="title"><i class='bx bx-map'></i> ${tour.location} ${tour.destination}</h5>
                        <h3 class="aboutSpan">About ${tour.title}</h3>
                        <p class="descriptionTour">${shortDescription}</p>
    
                        <div class="place-footer-costinfo">
                            <span class="price">
                                <p><b>₱${parseFloat(tour.price).toFixed(2)}</b>/Person</p>
                            </span>
    
                            <div id="detailContent">
                                <div class="content"><i class='bx bx-calendar'></i> ${tour.duration} days</div>
                                <div class="content"><i class='bx bxs-user'></i> ${tour.view_count}</div>
                            </div>
    
                            <button class="tourBookButton" data-tour-id="${tour.id}">Book Tour</button>
                        </div>
    
                        <div id="rate-Star" class="rate-star-content">
                            <div class="content" id="starRating">${starRatingHTML}</div>
                            <span id="ratingEquivalentTour">${rating}</span>
                            <span id="totalNumberWhoRate">(${tour.rating_count} reviews)</span>
                            <button class="ButtonRateTour" id="rateNowBtn">Rate Now</button>
                        </div>
    
                        <div id="starRatingClick">
                            <div>
                            <h4>Select Rating</h4>
                            <span class="star" data-value="1">☆</span>
                            <span class="star" data-value="2">☆</span>
                            <span class="star" data-value="3">☆</span>
                            <span class="star" data-value="4">☆</span>
                            <span class="star" data-value="5">☆</span>
                            </div>
                            
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            `;

         tourBox.style.display = "block";

         // Hide footer
         const footer = document.getElementById("footer-container");
         if (footer) footer.style.display = "none";

         // ✅ Attach event listeners AFTER setting innerHTML
         document.getElementById("rateNowBtn").addEventListener("click", () => {
            document.getElementById("rate-Star").style.display = "none";
            document.getElementById("starRatingClick").style.display = "block";
         });

         document.querySelectorAll("#starRatingClick .star").forEach((star) => {
            star.addEventListener("click", function () {
               const rating = parseInt(this.dataset.value);
               updateStars(rating);
               submitRating(tour.id, rating);

               document.getElementById("starRatingClick").style.display = "none";
               document.querySelector(".rate-star-content").style.display = "block";
            });
         });
      }
   }
});

function updateStars(rating) {
   document.querySelectorAll("#starRatingClick .star").forEach((star) => {
      const value = parseInt(star.dataset.value);
      if (value <= rating) {
         star.classList.add("filled");
         star.textContent = "★";
      } else {
         star.classList.remove("filled");
         star.textContent = "☆";
      }
   });
}

function submitRating(tourId, rating) {
   const userId = sessionStorage.getItem("userId");

   // Check if user is logged in
   if (!userId) {
      alert("Please log in to rate this tour.");
      window.location.href = "register.php";
      return; // Prevent further execution
   }

   // Prepare the data to send to the backend
   const data = {
      tour_id: tourId,
      user_id: userId,
      rating: rating,
   };

   console.log("Sending rating data:", data); // Debugging

   // Send the rating to the backend
   fetch("submit_rating.php", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   })
      .then((res) => {
         if (!res.ok) {
            throw new Error("Network response was not ok");
         }
         return res.json();
      })
      .then((data) => {
         console.log("Rating response:", data); // Debugging
         if (data.success) {
            alert("Thanks for rating!");
            // Optionally, update the UI with the new rating
            // Example: updateStars(data.newRating);
         } else {
            alert(data.message || "Failed to submit rating.");
         }
      })
      .catch((err) => {
         console.error("Rating submission failed:", err);
         alert("An error occurred while submitting your rating. Please try again.");
      });
}
// For the tour in home

// For the tour in home
// FOR THE TOUR EXPLORE MORE SO THAT IT WILL DISPLAY INTO THE TOUR SECTION

//FOR THE WINDOW WHEN REFRESH
window.addEventListener("load", function () {
   if (window.location.search) {
      let newURL = window.location.origin + window.location.pathname + window.location.hash;
      history.replaceState({}, document.title, newURL);
   }
});
//FOR THE WINDOW WHEN REFRESH

//For the dropdown button at my destination
document.addEventListener("DOMContentLoaded", function () {
   const triggers = document.querySelectorAll(".dropdown .trigger");

   triggers.forEach((trigger) => {
      trigger.addEventListener("click", function (e) {
         e.stopPropagation();
         // Close all other dropdowns first
         triggers.forEach((otherTrigger) => {
            if (otherTrigger !== trigger) {
               otherTrigger.classList.remove("open");
            }
         });
         // Toggle current one
         trigger.classList.toggle("open");
      });
   });

   // Close dropdown if clicked outside
   document.addEventListener("click", function () {
      triggers.forEach((trigger) => {
         trigger.classList.remove("open");
      });
   });
});
//For the dropdown button at my destination

//For the profile notification
document.addEventListener("DOMContentLoaded", function () {
   const tabs = document.querySelectorAll(".nav .nav-item");
   const sections = document.querySelectorAll(".tab-content");

   tabs.forEach((tab) => {
      tab.addEventListener("click", function (e) {
         e.preventDefault();

         // Remove active ID from all tabs
         tabs.forEach((t) => t.removeAttribute("id"));

         // Hide all content sections
         sections.forEach((section) => (section.style.display = "none"));

         // Add active ID to clicked tab
         this.setAttribute("id", "active");

         // Get the section ID from the href attribute
         const sectionId = this.getAttribute("href").replace("#", "");

         // Show the selected section
         const sectionToShow = document.getElementById(sectionId);
         if (sectionToShow) sectionToShow.style.display = "block";
      });
   });

   // Optional: Automatically show the first section by default
   if (tabs.length > 0) tabs[0].click();
});

// Add a click event listener in your displayTourDetails(tour)
document.addEventListener("click", function (e) {
   if (e.target.classList.contains("tourBookButton")) {
      const tourId = e.target.dataset.tourId;

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "book_tour_id";
      input.value = tourId;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
   }
});
// Add a click event listener in your displayTourDetails(tour)

// FOR REMOVING THE FOOTER AT A SPECIFIC ANCHOR LINK
window.addEventListener("load", function () {
   if (window.location.hash === "#Profile") {
      const footer = document.getElementById("footer-container");
      const header = document.getElementById("header");

      if (footer) {
         footer.style.display = "none";
      }

      if (header) {
         header.style.position = "fixed";
      }

      // Optional: scroll to #Profile section smoothly
      const profileSection = document.querySelector("#Profile");
      if (profileSection) {
         profileSection.scrollIntoView({ behavior: "smooth" });
      }
   }
});
// FOR REMOVING THE FOOTER AT A SPECIFIC ANCHOR LINK

//for the navigation in my profile.php
document.addEventListener("DOMContentLoaded", function () {
   const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");
   const allInnerTabs = document.querySelectorAll(".profile-inner-tabs .inner-tab");

   allSideMenu.forEach((link) => {
      link.addEventListener("click", function (e) {
         e.preventDefault();

         const targetId = this.dataset.target;

         // Update active class
         allSideMenu.forEach((link) => link.parentElement.classList.remove("activeNavProfile"));
         this.parentElement.classList.add("activeNavProfile");

         // Show the matching tab
         allInnerTabs.forEach((tab) => {
            tab.style.display = tab.id === targetId ? "block" : "none";
         });
      });
   });
});
//for the navigation in my profile.php

// for the search
function toggleDescription(link) {
   const shortDesc = link.parentElement.querySelector(".short-description");
   const remainingDesc = link.parentElement.querySelector(".remaining-description");

   if (remainingDesc.style.display === "none") {
      remainingDesc.style.display = "inline";
      link.textContent = "See Less";
   } else {
      remainingDesc.style.display = "none";
      link.textContent = "See More";
   }
}

// Check if there is a search query in the URL
document.addEventListener("DOMContentLoaded", function () {
   // Check if a search query exists
   if (window.location.search.indexOf("query=") > -1) {
      // Hide the Philippines section and show the search result section
      document.getElementById("philippines").style.display = "none";
      document.getElementById("ShowDestinationSearch").style.display = "block";
   }
});
// for the search

// For the displaying of tours in different destination
function showTours(region) {
   // Hide the default content
   document.getElementById("dispAllTour").style.display = "none";

   // List of all region-specific tour section IDs
   const regionIds = ["dispTourLuzon", "dispTourVisayas", "dispTourMindanao"];

   // Hide all region-specific spans
   regionIds.forEach((id) => {
      document.getElementById(id).style.display = "none";
   });

   // Show the selected region span
   const selectedId = "dispTour" + region;
   const selected = document.getElementById(selectedId);
   if (selected) {
      selected.style.display = "block"; // or 'block' if you want it as a full section
   }
}
// For the displaying of tours in different destination
// Function to show the destination section based on the region
function showDestination(destination) {
   // Hide all destination sections first
   document.getElementById("luzon").style.display = "none";
   document.getElementById("visayas").style.display = "none";
   document.getElementById("mindanao").style.display = "none";

   // Show the corresponding destination content
   if (destination === "Luzon") {
      document.getElementById("showDestinationLuzon").style.display = "block";
   }

   if (destination === "Visayas") {
      document.getElementById("showDestinationVisayas").style.display = "block";
   }

   if (destination === "Mindanao") {
      document.getElementById("showDestinationMindanao").style.display = "block";
   }
}
// for displaying destination in different destination
