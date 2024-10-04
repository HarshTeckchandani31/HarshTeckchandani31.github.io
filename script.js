// Typewriter Effect

const texts = [
    "SOFTWARE DEVELOPER",
    "CYBER SECURITY ENTHUSIAST",
    "FREELANCER"
]

let speed = 100;
const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if(characterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if(characterIndex > 0){
        textElements.innerHTML = texts[textIndex].substring(0, characterIndex - 1);
        characterIndex--;
        setTimeout(eraseText, speed);
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, speed);
    }
}

window.onload = typeWriter
const skillsGrid = document.querySelector('.skills-grid');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Clone the first few skill items to make the rotation seamless
const totalItems = document.querySelectorAll('.skill-item').length;
const visibleItems = 4; // Number of visible items in the carousel
const skillItemWidth = 180 + 20; // Width of .skill-item + margin
let currentIndex = visibleItems; // Start at the cloned first set

// Clone the first and last few items
const itemsToClone = Array.from(document.querySelectorAll('.skill-item')).slice(0, visibleItems);
itemsToClone.forEach(item => {
    const clone = item.cloneNode(true);
    skillsGrid.appendChild(clone);
});

// Set initial button states and add smooth sliding
skillsGrid.style.transition = 'transform 0.5s ease-in-out';
skillsGrid.style.transform = `translateX(-${currentIndex * skillItemWidth}px)`;

nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
});

function updateCarousel() {
    // Move the carousel smoothly
    skillsGrid.style.transition = 'transform 0.5s ease-in-out';
    skillsGrid.style.transform = `translateX(-${currentIndex * skillItemWidth}px)`;

    // Circular effect logic
    if (currentIndex >= totalItems) {
        // If we move past the last real item, instantly go back to the start (first set)
        setTimeout(() => {
            skillsGrid.style.transition = 'none'; // Remove transition for the jump
            currentIndex = visibleItems;
            skillsGrid.style.transform = `translateX(-${currentIndex * skillItemWidth}px)`;
        }, 500); // Wait for the current transition to finish
    }

    if (currentIndex <= 0) {
        // If we move past the first real item, instantly go to the last set
        setTimeout(() => {
            skillsGrid.style.transition = 'none'; // Remove transition for the jump
            currentIndex = totalItems - visibleItems;
            skillsGrid.style.transform = `translateX(-${currentIndex * skillItemWidth}px)`;
        }, 500); // Wait for the current transition to finish
    }
}

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission
    const form = event.target;
    const formData = new FormData(form);

    // Send form data to Formspree
    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Success: Clear form fields
            form.reset();
            document.getElementById("form-message").textContent = "Thank you! Your message has been sent.";
        } else {
            // Error: Display error message
            document.getElementById("form-message").textContent = "Oops! Something went wrong. Please try again.";
        }
    }).catch(error => {
        // Network error handling
        document.getElementById("form-message").textContent = "There was a problem submitting your form.";
    });
});



document.getElementById("contact-form").addEventListener("submit", function() {
    alert("Thank you! Your message has been sent.");
});

