// Sample Destinations Data
const destinations = [
    {
        id: 1,
        name: "Boracay Island",
        category: "Beach",
        location: "Philippines",
        description: "A stunning island paradise known for white sand beaches.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        rating: 4.8,
        reviews: 254,
        details: "Boracay is one of Asia's best beaches, featuring crystal-clear waters, water sports, and exciting entertainment. Perfect for swimming, snorkeling, and beach activities."
    },
    {
        id: 2,
        name: "Mount Everest",
        category: "Mountain",
        location: "Nepal/China",
        description: "The world's highest mountain, perfect for experienced climbers.",
        image: "https://images.unsplash.com/photo-1741747929569-c21e8110b9ef?auto=format&fit=crop&w=1500&q=80",
        rating: 4.6,
        reviews: 189,
        details: "An ultimate climbing challenge with breathtaking views and the experience of a lifetime. Home to the world's highest peak at 8,849 meters."
    },
    {
        id: 3,
        name: "Eiffel Tower",
        category: "Historical",
        location: "France",
        description: "An iconic symbol of Paris and one of the most visited monuments.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        rating: 4.7,
        reviews: 512,
        details: "Discover the history and architectural beauty of this famous landmark. Built in 1889, it stands 330 meters tall and attracts millions of visitors annually."
    },
    {
        id: 4,
        name: "Great Barrier Reef",
        category: "Adventure",
        location: "Australia",
        description: "The world's largest coral reef system, ideal for diving.",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
        rating: 4.9,
        reviews: 378,
        details: "Explore the incredible marine biodiversity and colorful coral formations. A UNESCO World Heritage site with thousands of species of fish and corals."
    },
    {
        id: 5,
        name: "Taj Mahal",
        category: "Cultural",
        location: "India",
        description: "A magnificent white marble mausoleum and symbol of eternal love.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
        rating: 4.8,
        reviews: 456,
        details: "One of the Seven Wonders of the World with stunning architecture and gardens. Built by Emperor Shah Jahan in memory of his beloved wife."
    },
    {
        id: 6,
        name: "Bali Beaches",
        category: "Beach",
        location: "Indonesia",
        description: "Tropical paradise with pristine beaches and rich culture.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        rating: 4.7,
        reviews: 334,
        details: "Experience the beauty of Bali with its golden beaches and vibrant culture. Home to ancient temples, rice terraces, and tropical landscapes."
    },
    {
        id: 7,
        name: "Machu Picchu",
        category: "Historical",
        location: "Peru",
        description: "Ancient Incan city set high in the Andes Mountains.",
        image: "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee",
        rating: 4.9,
        reviews: 421,
        details: "A 15th-century Inca estate situated on a mountain ridge above the Sacred Valley. One of the most iconic archaeological sites in the world."
    },
    {
        id: 8,
        name: "Victoria Falls",
        category: "Adventure",
        location: "Zimbabwe/Zambia",
        description: "One of the world's most spectacular waterfalls.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        rating: 4.8,
        reviews: 267,
        details: "Experience the power and beauty of one of the largest waterfalls in the world. Ideal for adventure activities like bungee jumping and white-water rafting."
    }
];

// Itinerary stored in browser's local storage
let itinerary = JSON.parse(localStorage.getItem('smarttourItinerary')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadDestinations();
    setupEventListeners();
    loadItinerary();
});

// Setup Event Listeners
function setupEventListeners() {
    // Modal Close Button
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('show');
        });
    });

    // Click outside modal to close
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('show');
        }
    });

    // Search on input change
    document.getElementById('searchInput').addEventListener('keyup', searchDestinations);
    document.getElementById('categoryFilter').addEventListener('change', searchDestinations);
}

// Load Destinations
function loadDestinations() {
    const grid = document.getElementById('destinationsGrid');
    grid.innerHTML = '';

    destinations.forEach(destination => {
        const card = createDestinationCard(destination);
        grid.appendChild(card);
    });
}

// Create Destination Card
function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}">
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

// View Destination Details
function viewDestinationDetails(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;

    const modal = document.getElementById('detailsModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="destination-details">
            <img src="${destination.image}" alt="${destination.name}">
            <h2>${destination.name}</h2>
            <div class="rating">⭐ ${destination.rating} (${destination.reviews} reviews)</div>
            <p><strong>📍 Location:</strong> ${destination.location}</p>
            <p><strong>Category:</strong> <span class="category-badge">${destination.category}</span></p>
            
            <h3>About</h3>
            <p>${destination.details}</p>
            
            <h3>Visitor Information</h3>
            <ul>
                <li>✈️ Best time to visit: Check local weather</li>
                <li>🏨 Average stay: 2-5 days recommended</li>
                <li>🛏️ Nearby accommodations: Available</li>
                <li>🚗 Transportation: Multiple options</li>
                <li>💰 Budget: Varies by season</li>
            </ul>
            
            <h3>Guest Reviews</h3>
            <div style="background-color: #f9f9f9; padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                <p><strong>👤 John Traveler:</strong> "Amazing experience! Highly recommended." ⭐⭐⭐⭐⭐</p>
                <p style="margin-top: 0.5rem;"><strong>👤 Jane Explorer:</strong> "Beautiful place with friendly locals and great food." ⭐⭐⭐⭐</p>
            </div>
            
            <button class="btn-primary" onclick="addToItinerary(${destination.id}); closeModal()" style="width: 100%; margin-top: 1.5rem; font-size: 1.1rem;">➕ Add to My Itinerary</button>
        </div>
    `;

    modal.classList.add('show');
}

// Close Modal
function closeModal() {
    document.getElementById('detailsModal').classList.remove('show');
}

// Search Destinations
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
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; font-size: 1.1rem;">No destinations found. Try another search!</p>';
        return;
    }

    filtered.forEach(destination => {
        const card = createDestinationCard(destination);
        grid.appendChild(card);
    });
}

// Scroll to Destinations
function scrollToDestinations() {
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
}

// Itinerary Functions
function addToItinerary(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;

    // Check if already in itinerary
    if (itinerary.find(d => d.id === destinationId)) {
        alert(`${destination.name} is already in your itinerary!`);
        return;
    }

    itinerary.push(destination);
    localStorage.setItem('smarttourItinerary', JSON.stringify(itinerary));
    loadItinerary();
    
    // Show confirmation message
    showNotification(`✅ ${destination.name} added to your itinerary!`);
}

function loadItinerary() {
    const itineraryList = document.getElementById('itineraryList');

    if (itinerary.length === 0) {
        itineraryList.innerHTML = '<p>No destinations added yet. Start by adding destinations from the list!</p>';
        return;
    }

    itineraryList.innerHTML = '';
    const totalDays = itinerary.length;
    
    itinerary.forEach((destination, index) => {
        const item = document.createElement('div');
        item.className = 'itinerary-item';
        item.innerHTML = `
            <h3>Day ${index + 1} - ${destination.name}</h3>
            <div class="category">📍 ${destination.location}</div>
            <div class="location">🏷️ ${destination.category}</div>
            <p style="margin-top: 0.5rem;">${destination.description}</p>
            <button class="btn-remove" onclick="removeFromItinerary(${destination.id})">Remove</button>
        `;
        itineraryList.appendChild(item);
    });

    // Add summary
    const summary = document.createElement('div');
    summary.style.cssText = 'background-color: #ecf0f1; padding: 1rem; border-radius: 5px; margin-top: 1rem; text-align: center;';
    summary.innerHTML = `<h4>📅 Trip Summary: ${totalDays} ${totalDays === 1 ? 'day' : 'days'}</h4>`;
    itineraryList.appendChild(summary);
}

function removeFromItinerary(destinationId) {
    const destination = destinations.find(d => d.id === destinationId);
    itinerary = itinerary.filter(d => d.id !== destinationId);
    localStorage.setItem('smarttourItinerary', JSON.stringify(itinerary));
    loadItinerary();
    
    showNotification(`❌ ${destination.name} removed from itinerary!`);
}

function clearItinerary() {
    if (itinerary.length === 0) {
        alert('Your itinerary is already empty!');
        return;
    }

    if (confirm('Are you sure you want to clear your entire itinerary?')) {
        itinerary = [];
        localStorage.setItem('smarttourItinerary', JSON.stringify(itinerary));
        loadItinerary();
        showNotification('🗑️ Itinerary cleared!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
