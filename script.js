// Sample profile data
const profiles = [
    {
        id: 1,
        name: "Margaret",
        age: 68,
        location: "Boston, MA",
        interests: "Gardening, Reading, Travel",
        about: "Retired teacher who loves tending to my rose garden and getting lost in a good mystery novel. Looking for someone to share afternoon tea and meaningful conversations.",
        ageRange: "60-70",
        mainInterest: "gardening"
    },
    {
        id: 2,
        name: "Robert",
        age: 72,
        location: "Seattle, WA",
        interests: "Woodworking, Fishing, Dancing",
        about: "Former engineer with a passion for creating things with my hands. I enjoy ballroom dancing and would love to find a partner who shares my enthusiasm for life.",
        ageRange: "70-80",
        mainInterest: "dancing"
    },
    {
        id: 3,
        name: "Dorothy",
        age: 65,
        location: "Portland, OR",
        interests: "Travel, Photography, Cooking",
        about: "Adventure seeker who's been to 42 countries and counting! Love trying new recipes and capturing beautiful moments. Seeking a travel companion for the next chapter.",
        ageRange: "60-70",
        mainInterest: "travel"
    },
    {
        id: 4,
        name: "William",
        age: 75,
        location: "Austin, TX",
        interests: "Reading, Chess, Classical Music",
        about: "Retired professor who enjoys intellectual conversations and classical concerts. Looking for a companion who appreciates the finer things in life and a good game of chess.",
        ageRange: "70-80",
        mainInterest: "reading"
    },
    {
        id: 5,
        name: "Eleanor",
        age: 70,
        location: "Denver, CO",
        interests: "Hiking, Gardening, Volunteering",
        about: "Active retiree who believes age is just a number. I volunteer at the local animal shelter and love staying fit with nature walks. Seeking someone with a kind heart.",
        ageRange: "70-80",
        mainInterest: "gardening"
    },
    {
        id: 6,
        name: "George",
        age: 63,
        location: "Charleston, SC",
        interests: "Travel, Golf, Wine Tasting",
        about: "Recently retired businessman ready to enjoy life. Love exploring new places, playing golf, and enjoying fine wines. Looking for someone to share these experiences with.",
        ageRange: "60-70",
        mainInterest: "travel"
    },
    {
        id: 7,
        name: "Patricia",
        age: 67,
        location: "San Diego, CA",
        interests: "Dancing, Yoga, Beach Walks",
        about: "Former dancer who still moves to her own rhythm. Enjoy sunset beach walks and staying active. Seeking a gentleman who loves life and isn't afraid to take a chance.",
        ageRange: "60-70",
        mainInterest: "dancing"
    },
    {
        id: 8,
        name: "Thomas",
        age: 78,
        location: "Savannah, GA",
        interests: "Reading, History, Gardening",
        about: "Retired historian with a green thumb. Love spending time in my garden and discussing world events over coffee. Looking for intelligent conversation and companionship.",
        ageRange: "70-80",
        mainInterest: "reading"
    }
];

// State management
let likedProfiles = [];
let userProfile = {};

// Page navigation
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(`${pageName}-page`).classList.add('active');
    
    // Add active class to clicked nav button
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
    
    // Load content based on page
    if (pageName === 'browse') {
        loadProfiles();
    } else if (pageName === 'matches') {
        loadMatches();
    }
}

// Load profiles with filters
function loadProfiles() {
    const ageFilter = document.getElementById('age-filter').value;
    const interestFilter = document.getElementById('interest-filter').value;
    
    let filteredProfiles = profiles;
    
    if (ageFilter !== 'all') {
        filteredProfiles = filteredProfiles.filter(p => p.ageRange === ageFilter);
    }
    
    if (interestFilter !== 'all') {
        filteredProfiles = filteredProfiles.filter(p => p.mainInterest === interestFilter);
    }
    
    const profilesGrid = document.getElementById('profiles-grid');
    profilesGrid.innerHTML = '';
    
    if (filteredProfiles.length === 0) {
        profilesGrid.innerHTML = '<p class="empty-state">No profiles match your filters. Try adjusting your criteria.</p>';
        return;
    }
    
    filteredProfiles.forEach(profile => {
        const isLiked = likedProfiles.includes(profile.id);
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.innerHTML = `
            <h3>${profile.name}, ${profile.age}</h3>
            <p class="profile-info">📍 ${profile.location}</p>
            <p class="profile-interests">❤️ ${profile.interests}</p>
            <p class="profile-about">${profile.about}</p>
            <button class="like-button ${isLiked ? 'liked' : ''}" onclick="toggleLike(${profile.id})">
                ${isLiked ? '✓ Connected' : '💝 Connect'}
            </button>
        `;
        profilesGrid.appendChild(card);
    });
}

// Toggle like status
function toggleLike(profileId) {
    const index = likedProfiles.indexOf(profileId);
    if (index > -1) {
        likedProfiles.splice(index, 1);
    } else {
        likedProfiles.push(profileId);
    }
    loadProfiles();
}

// Load matches
function loadMatches() {
    const matchesList = document.getElementById('matches-list');
    
    if (likedProfiles.length === 0) {
        matchesList.innerHTML = '<p class="empty-state">You haven\'t made any connections yet. Start browsing profiles to find your match!</p>';
        return;
    }
    
    matchesList.innerHTML = '';
    
    likedProfiles.forEach(profileId => {
        const profile = profiles.find(p => p.id === profileId);
        if (profile) {
            const card = document.createElement('div');
            card.className = 'match-card';
            card.innerHTML = `
                <div>
                    <h3>${profile.name}, ${profile.age}</h3>
                    <p>📍 ${profile.location}</p>
                    <p style="margin-top: 10px;">${profile.about}</p>
                </div>
                <button class="message-button" onclick="sendMessage('${profile.name}')">
                    💌 Send Message
                </button>
            `;
            matchesList.appendChild(card);
        }
    });
}

// Send message (simulated)
function sendMessage(name) {
    alert(`Great! In a real dating site, this would open a messaging window to chat with ${name}. For this demo, imagine you're starting a wonderful conversation! 😊`);
}

// Handle profile form submission
document.getElementById('profile-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    userProfile = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        location: document.getElementById('location').value,
        interests: document.getElementById('interests').value,
        about: document.getElementById('about').value
    };
    
    // Show success message
    const successMsg = document.getElementById('profile-saved');
    successMsg.style.display = 'block';
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 3000);
    
    console.log('Profile saved:', userProfile);
});

// Navigation event listeners
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const page = this.getAttribute('data-page');
        showPage(page);
    });
});

// Filter event listeners
document.getElementById('age-filter').addEventListener('change', loadProfiles);
document.getElementById('interest-filter').addEventListener('change', loadProfiles);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('SilverConnections Dating Site Loaded');
});
