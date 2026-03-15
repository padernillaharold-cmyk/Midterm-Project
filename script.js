// SmartTour - Tourism Guide and Destination Recommendation System
// Features: Destination Directory, Search & Filter, Travel Planning, Reviews & Ratings

const destinations = [
    {
        id: 1,
        name: "Boracay Island",
        category: "Beach",
        location: "Philippines",
        description: "A stunning island paradise known for white sand beaches.",
        image: "https://via.placeholder.com/500x400?text=Boracay+Island",
        rating: 4.8,
        reviews: 254,
        details: "Boracay is one of Asia's best beaches, featuring crystal-clear waters, water sports, and exciting entertainment.",
        activities: ["Swimming", "Snorkeling", "Beach Volleyball", "Water Sports"],
        accommodations: ["Hotels", "Resorts", "Hostels"]
    },
    {
        id: 2,
        name: "Mount Everest",
        category: "Mountain",
        location: "Nepal/China",
        description: "The world's highest mountain, perfect for experienced climbers.",
        image: "https://via.placeholder.com/500x400?text=Mount+Everest",
        rating: 4.6,
        reviews: 189,
        details: "An ultimate climbing challenge with breathtaking views and the experience of a lifetime.",
        activities: ["Mountain Climbing", "Trekking", "Photography"],
        accommodations: ["Base Camp Lodges", "Mountain Huts"]
    },
    {
        id: 3,
        name: "Eiffel Tower",
        category: "Historical",
        location: "France",
        description: "An iconic symbol of Paris and one of the most visited monuments.",
        image: "https://via.placeholder.com/500x400?text=Eiffel+Tower",
        rating: 4.7,
        reviews: 512,
        details: "Discover the history and architectural beauty of this famous landmark.",
        activities: ["Sightseeing", "Photography", "Dining"],
        accommodations: ["Hotels", "Apartments", "Bed & Breakfast"]
    },
    {
        id: 4,
        name: "Great Barrier Reef",
        category: "Adventure",
        location: "Australia",
        description: "The world's largest coral reef system, ideal for diving.",
        image: "https://via.placeholder.com/500x400?text=Great+Barrier+Reef",
        rating: 4.9,
        reviews: 378,
        details: "Explore the incredible marine biodiversity and colorful coral formations.",
        activities: ["Scuba Diving", "Snorkeling", "Glass Bottom Boat"],
        accommodations: ["Beach Resorts", "Island Lodges"]
    },
    {
        id: 5,
        name: "Taj Mahal",
        category: "Cultural",
        location: "India",
        description: "A magnificent white marble mausoleum and symbol of eternal love.",
        image: "https://via.placeholder.com/500x400?text=Taj+Mahal",
        rating: 4.8,
        reviews: 456,
        details: "One of the Seven Wonders of the World with stunning architecture and gardens.",
        activities: ["Photography", "Guided Tours", "Cultural Experience"],
        accommodations: ["Heritage Hotels", "Luxury Resorts"]
    },
    {
        id: 6,
        name: "Bali Beaches",
        category: "Beach",
        location: "Indonesia",
        description: "Tropical paradise with pristine beaches and rich culture.",
        image: "https://via.placeholder.com/500x400?text=Bali+Beaches",
        rating: 4.7,
        reviews: 334,
        details: "Experience the beauty of Bali with its golden beaches and vibrant culture.",
        activities: ["Surfing", "Temple Visits", "Traditional Massage"],
        accommodations: ["Beachfront Villas", "Hotels", "Resorts"]
    },
    {
        id: 7,
        name: "Machu Picchu",
        category: "Historical",
        location: "Peru",
        description: "Ancient Incan city set high in the Andes Mountains.",
        image: "https://via.placeholder.com/500x400?text=Machu+Picchu",
        rating: 4.9,
        reviews: 421,
        details: "A 15th-century Inca estate situated on a mountain ridge.",
        activities: ["Trekking", "Historical Tours", "Photography"],
        accommodations: ["Mountain Lodges", "Hotels"]
    },
    {
        id: 8,
        name: "Victoria Falls",
        category: "Adventure",
        location: "Zimbabwe/Zambia",
        description: "One of the world's most spectacular waterfalls.",
        image: "https://via.placeholder.com/500x400?text=Victoria+Falls",
        rating: 4.8,
        reviews: 267,
        details: "Experience the power and beauty of one of the largest waterfalls in the world.",
        activities: ["Bungee Jumping", "White Water Rafting", "Helicopter Tours"],
        accommodations: ["Adventure Lodges", "Safari Camps"]
    }
];

let itinerary = JSON.parse(localStorage.getItem('smarttourItinerary')) || [];

// Load images from localStorage on startup
function loadImagesFromStorage() {
    const savedImages = localStorage.getItem('destinationImages');
    if (savedImages) {
        const images = JSON.parse(savedImages);
        destinations.forEach(dest => {
            if (images[dest.id]) {
                dest.image = images[dest.id];
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadImagesFromStorage();
    loadDestinations();
    setupEventListeners();
    loadItinerary();
});

function setupEventListeners() {
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
        }
    });

    document.getElementById('searchInput').addEventListener('keyup', searchDestinations);
    document.getElementById('categoryFilter').addEventListener('change', searchDestinations);
}

function loadDestinations() {
    const grid = document.getElementById('destinationsGrid');
    grid.innerHTML = '';

    destinations.forEach(destination => {
        const card = createDestinationCard(destination);
        grid.appendChild(card);
    });
}

function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" style="width: 100%; height: 200px; object-fit: cover; display: block;">
        <div class="destination-info">
            <h3>${destination.name}</h3>
            <span class="category-badge">${destination.category}</span>
            <p><strong>📍 Location:</strong> ${destination.location}</p>
            <p>${destination.description}</p>
            <div class="rating">⭐ ${destination.rating} (${destination.reviews} reviews)</div>
            <button class="btn-view-details" onclick="viewDestinationDetails(${destination.id})">View Details</button>
            <button class="btn-view-details btn-add-itinerary" onclick="addToItinerary(${destination.id})">➕ Add to Trip</button>
        </div>
    `;
    return card;
}

function viewDestinationDetails(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;

    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="destination-details">
            <img src="${destination.image}" alt="${destination.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem; display: block;">
            <h2>${destination.name}</h2>
            <div class="rating">⭐ ${destination.rating} (${destination.reviews} reviews)</div>
            <p><strong>📍 Location:</strong> ${destination.location}</p>
            <p><strong>Category:</strong> <span class="category-badge">${destination.category}</span></p>
            
            <h3>About</h3>
            <p>${destination.details}</p>
            
            <h3>Local Activities</h3>
            <ul>
                ${destination.activities.map(activity => `<li>🎯 ${activity}</li>`).join('')}
            </ul>
            
            <h3>Accommodations</h3>
            <ul>
                ${destination.accommodations.map(acc => `<li>🏨 ${acc}</li>`).join('')}
            </ul>
            
            <h3>Visitor Information</h3>
            <ul>
                <li>✈️ Best time to visit: Check local weather</li>
                <li>📅 Average stay: 2-5 days recommended</li>
                <li>💰 Budget: Varies by season</li>
                <li>🗺️ Navigation: Use map integration for directions</li>
            </ul>
            
            <h3>Reviews & Ratings</h3>
            <div style="background-color: #f9f9f9; padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                <p><strong>👤 John Traveler:</strong> "Amazing experience! Highly recommended." ⭐⭐⭐⭐⭐</p>
                <p style="margin-top: 0.5rem;"><strong>👤 Jane Explorer:</strong> "Beautiful place with friendly locals." ⭐⭐⭐⭐</p>
                <p style="margin-top: 0.5rem;"><strong>👤 Mike Adventure:</strong> "Best trip ever!" ⭐⭐⭐⭐⭐</p>
            </div>
            
            <button class="btn-primary" onclick="addToItinerary(${destination.id}); closeModal()" style="width: 100%; margin-top: 1.5rem;">➕ Add to My Itinerary</button>
        </div>
    `;

    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('detailsModal').classList.remove('show');
}

function openImageUploader() {
    const modal = document.getElementById('imageUploaderModal');
    const list = document.getElementById('imageUploaderList');
    
    list.innerHTML = '';
    
    destinations.forEach(destination => {
        const editor = document.createElement('div');
        editor.className = 'image-editor-item';
        editor.innerHTML = `
            <h4>${destination.name}</h4>
            <img src="${destination.image}" alt="${destination.name}" class="image-preview">
            <input type="text" id="imageInput${destination.id}" placeholder="Paste image URL here..." value="${destination.image}">
            <button onclick="saveImage(${destination.id})">Save Image</button>
        `;
        list.appendChild(editor);
    });
    
    modal.classList.add('show');
}

function saveImage(destinationId) {
    const imageUrl = document.getElementById('imageInput' + destinationId).value;
    
    if (!imageUrl) {
        alert('Please enter an image URL');
        return;
    }
    
    // Update the destination
    const destination = destinations.find(d => d.id === destinationId);
    if (destination) {
        destination.image = imageUrl;
    }
    
    // Save to localStorage
    const savedImages = JSON.parse(localStorage.getItem('destinationImages') || '{}');
    savedImages[destinationId] = imageUrl;
    localStorage.setItem('destinationImages', JSON.stringify(savedImages));
    
    // Reload the page
    loadDestinations();
    alert('✅ Image saved successfully!');
}

function searchDestinations() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const grid = document.getElementById('destinationsGrid');

    const filtered = destinations.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchTerm) || 
                            d.location.toLowerCase().includes(searchTerm) ||
                            d.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || d.category === category;
        return matchesSearch && matchesCategory;
    });

    grid.innerHTML = '';
    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No destinations found!</p>';
        return;
    }

    filtered.forEach(destination => {
        const card = createDestinationCard(destination);
        grid.appendChild(card);
    });
}

function scrollToDestinations() {
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
}

function addToItinerary(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;

    if (itinerary.find(d => d.id === destinationId)) {
        alert(`${destination.name} is already in your itinerary!`);
        return;
    }

    itinerary.push(destination);
    localStorage.setItem('smarttourItinerary', JSON.stringify(itinerary));
    loadItinerary();
    alert(`✅ ${destination.name} added to your travel plan!`);
}

function loadItinerary() {
    const itineraryList = document.getElementById('itineraryList');

    if (itinerary.length === 0) {
        itineraryList.innerHTML = '<p>No destinations added yet! Start planning your trip by adding destinations from the list.</p>';
        return;
    }

    itineraryList.innerHTML = '';
    
    itinerary.forEach((destination, index) => {
        const item = document.createElement('div');
        item.className = 'itinerary-item';
        item.innerHTML = `
            <h3>Day ${index + 1} - ${destination.name}</h3>
            <div class="category">📍 ${destination.location}</div>
            <div class="location">🏷️ ${destination.category}</div>
            <p style="margin-top: 0.5rem;">${destination.description}</p>
            <button class="btn-remove" onclick="removeFromItinerary(${destination.id})">Remove from Trip</button>
        `;
        itineraryList.appendChild(item);
    });
}

function removeFromItinerary(destinationId) {
    itinerary = itinerary.filter(d => d.id !== destinationId);
    localStorage.setItem('smarttourItinerary', JSON.stringify(itinerary));
    loadItinerary();
}

function clearItinerary() {
    if (itinerary.length === 0) {
        alert('Your itinerary is empty!');
        return;
    }

    if (confirm('Clear all destinations from your travel plan?')) {
        itinerary = [];
        localStorage.setItem('smarttourItinerary', JSON.stringify(itinerary));
        loadItinerary();
    }
}

