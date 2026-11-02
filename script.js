// FITNESSLYF GYM - JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    // 1. Update the year in the footer.
    const years = document.querySelectorAll(".current-year");

    years.forEach(function (year) {
        year.textContent = new Date().getFullYear();
    });


    // 2. Open and close the navigation menu.
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("open");

            const isOpen = navigation.classList.contains("open");
            menuButton.setAttribute("aria-expanded", isOpen);
        });
    }


    // 3. Search for services.
    const searchInput = document.querySelector("#service-search");
    const serviceCards = document.querySelectorAll(".searchable");
    const searchStatus = document.querySelector("#search-status");
    const noResults = document.querySelector("#no-results");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const searchWord = searchInput.value.toLowerCase().trim();
            let found = 0;

            serviceCards.forEach(function (card) {
                const words =
                    (card.textContent + " " + card.dataset.search).toLowerCase();

                const matches = words.includes(searchWord);
                card.classList.toggle("hidden", !matches);

                if (matches) {
                    found++;
                }
            });

            if (searchStatus) {
                searchStatus.textContent = searchWord === ""
                    ? "Showing all services."
                    : found + " service(s) found.";
            }

            if (noResults) {
                noResults.classList.toggle("hidden", found > 0);
            }
        });
    }


    // 4. Open gallery pictures in a larger window.
    const galleryImages = document.querySelectorAll(".gallery-image");
    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = document.querySelector("#lightbox-image");
    const lightboxCaption = document.querySelector("#lightbox-caption");
    const closeButton = document.querySelector("#close-lightbox");

    function openImage(image) {
        if (!lightbox || !lightboxImage) {
            return;
        }

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        if (lightboxCaption) {
            lightboxCaption.textContent = image.alt;
        }

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    }

    function closeImage() {
        if (lightbox) {
            lightbox.classList.remove("open");
            lightbox.setAttribute("aria-hidden", "true");
        }
    }

    galleryImages.forEach(function (image) {
        image.addEventListener("click", function () {
            openImage(image);
        });

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openImage(image);
            }
        });
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeImage);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeImage();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeImage();
        }
    });


    // 5. Select the membership plan from the URL.
    const planSelect = document.querySelector("#enquiry-plan");

    if (planSelect) {
        const parameters = new URLSearchParams(window.location.search);
        const selectedPlan = parameters.get("plan");

        if (selectedPlan) {
            planSelect.value = selectedPlan;
        }
    }


    // 6. Function to validate a form and prepare an email.
    function setupForm(formId, statusId, subject, getDetails) {
        const form = document.querySelector(formId);
        const status = document.querySelector(statusId);

        if (!form || !status) {
            return;
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            status.textContent = "";
            status.className = "form-status";

            if (!form.checkValidity()) {
                form.reportValidity();
                status.textContent =
                    "Please complete the required fields correctly.";
                status.classList.add("error");
                return;
            }

            const details = getDetails();

            if (details.Name.length < 2) {
                status.textContent = "Please enter your full name.";
                status.classList.add("error");
                return;
            }

            if (details.Message.length < 10) {
                status.textContent =
                    "Please enter a message with at least 10 characters.";
                status.classList.add("error");
                return;
            }

            const body = Object.entries(details)
                .map(function (item) {
                    return item[0] + ": " + item[1];
                })
                .join("\n");

            const emailLink =
                "mailto:fitnesslyf@gmail.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            status.textContent =
                "Your email draft is ready. Review it and press Send in your email application.";
            status.classList.add("success");

            window.location.href = emailLink;
        });
    }


    // 7. Enquiry form.
    setupForm(
        "#enquiry-form",
        "#enquiry-status",
        "FitnessLyf Gym Enquiry",
        function () {
            return {
                Name: document.querySelector("#enquiry-name").value.trim(),
                Email: document.querySelector("#enquiry-email").value.trim(),
                Phone: document.querySelector("#enquiry-phone").value.trim(),
                "Enquiry type": document.querySelector("#enquiry-type").value,
                "Membership plan": document.querySelector("#enquiry-plan").value,
                Message: document.querySelector("#enquiry-message").value.trim()
            };
        }
    );


    // 8. Contact form.
    setupForm(
        "#contact-form",
        "#contact-status",
        "FitnessLyf Gym Contact Message",
        function () {
            return {
                Name: document.querySelector("#contact-name").value.trim(),
                Email: document.querySelector("#contact-email").value.trim(),
                Phone: document.querySelector("#contact-phone").value.trim(),
                Topic: document.querySelector("#contact-topic").value,
                Message: document.querySelector("#contact-message").value.trim()
            };
        }
    );

});