// jQuery to add interactivity
$(document).ready(function() {

    // Adding classes for spacing
    $("li").addClass("spacing");
    $("img").addClass("spacingbtm");

    // Show a title when hovering over the movie image
    $("#movie-image").hover(
        function() {
            let diehard = '<span style="color: red; font-weight: bold;">DIE HARD</span>';
            let title1 = '<span style="color: black;">with a Vengeance</span>';
            $(this).after(`<p id='movie-title'>Title: ${diehard} ${title1}</p>`);
        },
        function() {
            $("#movie-title").remove();
        }
    );

    // Smooth scroll to sections when clicking nav links
    $("nav a").click(function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const target = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(target).offset().top - 50
        }, 800);
    });

    // Contact form submission handling
    $("#contactForm").on("submit", function(event){
        event.preventDefault();

        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var phonenumber = $("#phonenumber").val().trim();
        var message = $("#message").val().trim();

        if (name === "" || email === "" || phonenumber === "") {
            alert("Please fill in all fields.");
            return;
        }

        alert("Thank you, " + name + "! Your message has been sent.");

        $(this).trigger("reset");
    });

    // Append image to container
    $("#imagecontainer").append('<img src="stockphoto.jpg" alt="Sample Image">');

    // Ensure descriptions are hidden initially
    $('.movie-description').hide();

    // Toggle the visibility of the movie description when a list item is clicked
    $('.movie-list li').click(function() {
        // Slide up any currently visible descriptions
        $(this).siblings().find('.movie-description').slideUp();

        // Toggle the clicked item's description
        $(this).find('.movie-description').slideToggle();
    });

    // Load saved data from localStorage if available
    if (localStorage.getItem('userInfo')) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        $('#name').val(userInfo.name);
        $('#email').val(userInfo.email);
        $('#favoriteMovie').val(userInfo.favoriteMovie);
        $('#rating').val(userInfo.rating);
        $('#comments').val(userInfo.comments);
    }

    // Handle form submission to save user data to localStorage
    $('#submitForm').click(function () {
        // Collect form data
        const userInfo = {
            name: $('#name').val(),
            email: $('#email').val(),
            favoriteMovie: $('#favoriteMovie').val(),
            rating: $('#rating').val(),
            comments: $('#comments').val(),
        };

        // Save data to localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        // Display confirmation message
        alert('Your information has been saved!');
    });

    // Favorites functionality with localStorage
    const favoritesList = document.getElementById("favorites-list");
    const favoriteInput = document.getElementById("favorite-input");
    const form = document.getElementById("add-favorite-form");

    // Load favorites from localStorage
    const loadFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favoritesList.innerHTML = ""; // Clear current list
        favorites.forEach((favorite, index) => {
            const li = document.createElement("li");
            li.textContent = favorite;
            li.innerHTML += ` <button data-index="${index}" class="remove-favorite">Remove</button>`;
            favoritesList.appendChild(li);
        });
    };

    // Add a favorite to localStorage
    const addFavorite = (favorite) => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites.push(favorite);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        loadFavorites(); // Refresh the list
    };

    // Remove a favorite from localStorage
    favoritesList.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-favorite")) {
            const index = e.target.getAttribute("data-index");
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            favorites.splice(index, 1); // Remove the selected favorite
            localStorage.setItem("favorites", JSON.stringify(favorites));
            loadFavorites(); // Refresh the list
        }
    });

    // Handle form submission to add a favorite movie
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const favorite = favoriteInput.value.trim();
        if (favorite) {
            addFavorite(favorite);
            favoriteInput.value = ""; // Clear input field
        } else {
            alert("Please enter a favorite movie.");
        }
    });

    // Load favorites on page load
    loadFavorites();

});
