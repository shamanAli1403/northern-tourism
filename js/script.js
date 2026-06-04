/* 
    Explore Northern Pakistan - Global Script
    Contains: Global Data, Navigation Logic, Dark Mode Toggle
*/

// Global Data Store
const tourismData = {
    destinations: [
        {
            id: 'hunza',
            name: 'Hunza Valley',
            distance: '600 km from Islamabad',
            numericDistance: 600,
            time: '12-14 hours',
            season: 'April to October',
            weather: 'Mild Summers (15-25°C), Harsh Winters',
            description: 'A mountainous valley in the northern part of the Gilgit-Baltistan region of Pakistan.',
            attractions: ['Karimabad', 'Baltit Fort', 'Altit Fort', 'Attabad Lake', 'Passu Cones'],
            image: 'images/hunza.jpg'
        },
        {
            id: 'skardu',
            name: 'Skardu',
            distance: '640 km from Islamabad',
            numericDistance: 640,
            time: '20-22 hours (via KKH) or 1 hour flight',
            season: 'June to September',
            weather: 'Cool Summers, Heavy Snow in Winter',
            description: 'The gateway to some of the world\'s highest peaks, including K2.',
            attractions: ['Shangrila Resort', 'Sheosar Lake', 'Deosai National Park', 'Katpana Desert'],
            image: 'images/skardu.jpg'
        },
        {
            id: 'fairy-meadows',
            name: 'Fairy Meadows',
            distance: '470 km from Islamabad',
            numericDistance: 470,
            time: '10-12 hours + 3 hour trek',
            season: 'May to August',
            weather: 'Cold nights even in Summer',
            description: 'A grassland near one of the base camp sites of the Nanga Parbat.',
            attractions: ['Nanga Parbat Base Camp', 'Reflection Lake', 'Raikot Bridge'],
            image: 'https://images.unsplash.com/photo-1627664819818-e147d6221422?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'naran',
            name: 'Naran Kaghan',
            distance: '280 km from Islamabad',
            numericDistance: 280,
            time: '7-8 hours',
            season: 'May to September',
            weather: 'Pleasant Summers, Closed in Winter',
            description: 'One of the most popular tourist destinations in Pakistan.',
            attractions: ['Saif-ul-Malook Lake', 'Babusar Top', 'Lulusar Lake', 'Ansoo Lake'],
            image: 'images/Naran Kaghan.jpg'
        },
        {
            id: 'swat',
            name: 'Swat Valley',
            distance: '250 km from Islamabad',
            numericDistance: 250,
            time: '4-5 hours',
            season: 'Year round (Skiing in Winter)',
            weather: 'Pleasant Summers, Snowy Winters',
            description: 'Known as the Switzerland of the East.',
            attractions: ['Malam Jabba', 'Kalam', 'Mahodand Lake', 'Fizagat Park'],
            image: 'images/Swat Valley.jpg'
        },
        {
            id: 'neelum',
            name: 'Neelum Valley',
            distance: '240 km from Islamabad',
            numericDistance: 240,
            time: '7-8 hours',
            season: 'March to October',
            weather: 'Pleasant Summers, Heavy Snow in Winter',
            description: 'A 144km long bow-shaped valley in Azad Kashmir.',
            attractions: ['Kutton Waterfall', 'Keran', 'Upper Neelum', 'Sharda Peeth', 'Arang Kel'],
            image: 'images/neelum.jpg'
        },
        {
            id: 'shogran',
            name: 'Shogran & Siri Paye',
            distance: '230 km from Islamabad',
            numericDistance: 230,
            time: '6-7 hours',
            season: 'May to September',
            weather: 'Cool and Misty',
            description: 'A hill station situated on a green plateau in the Kaghan Valley.',
            attractions: ['Siri Lake', 'Paye Meadows', 'Shogran Forest', 'Makra Peak View'],
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'khunjerab',
            name: 'Khunjerab Pass',
            distance: '870 km from Islamabad',
            numericDistance: 870,
            time: '18-20 hours',
            season: 'May to October (Border closed in Winter)',
            weather: 'Extremely Cold, High Altitude',
            description: 'The highest paved international border crossing in the world (Pakistan-China Border).',
            attractions: ['Zero Point', 'World\'s Highest ATM', 'Snow Leopards', 'Khunjerab National Park'],
            image: 'images/khunjerab-Pass.png'
        }
    ],
    packages: [
        {
            id: '3-day',
            name: '3-Day Quick Escape',
            price: 8000,
            duration: '3 Days',
            hotel: 'Standard',
            transport: 'Excluded (Select Below)',
            meals: ['Breakfast'],
            activities: ['Sightseeing', 'Photography']
        },
        {
            id: '5-day',
            name: '5-Day Explorer',
            price: 15000,
            duration: '5 Days',
            hotel: 'Standard Plus',
            transport: 'Excluded (Select Below)',
            meals: ['Breakfast', 'Dinner'],
            activities: ['Boating', 'Hiking', 'Cultural Tour']
        },
        {
            id: '7-day',
            name: '7-Day Grand Tour',
            price: 25000,
            duration: '7 Days',
            hotel: 'Luxury',
            transport: 'Excluded (Select Below)',
            meals: ['Breakfast', 'Lunch', 'Dinner'],
            activities: ['Jeep Safari', 'Shopping', 'Guided Trekking']
        },
        {
            id: 'honeymoon',
            name: 'Honeymoon Special',
            price: 40000,
            duration: '5 Days',
            hotel: 'Premium Suite',
            transport: 'Excluded (Select Below)',
            meals: ['All Inclusive', 'Candle Light Dinner'],
            activities: ['Couple Spa', 'Private Boat Ride', 'Decorated Room']
        }
    ],
    hotels: [
        {
            category: 'Budget',
            name: 'Mount View Inn',
            location: 'Kalam, Swat',
            price: '3,000',
            facilities: ['Free WiFi', 'Hot Water', 'Room Service'],
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80'
        },
        {
            category: 'Standard',
            name: 'Eagle\'s Nest Hotel',
            location: 'Hunza Valley',
            price: '8,000',
            facilities: ['Breathtaking View', 'Buffet Breakfast', 'Heated Rooms'],
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80'
        },
        {
            category: 'Luxury',
            name: 'Shangrila Resort',
            location: 'Skardu',
            price: '25,000',
            facilities: ['Lakeside View', 'Mini Golf', 'Premium Suites', 'Airport Pickup'],
            image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=400&q=80'
        }
    ],
    transport: [
        {
            id: 'suv',
            type: 'SUV / Prado',
            ratePerKm: 40,
            capacity: '4-5 Persons',
            charges: '15,000',
            driver: 'Included',
            fuel: 'Not Included',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'hiace',
            type: 'Hiace Grand Cabin',
            ratePerKm: 35,
            capacity: '12-14 Persons',
            charges: '18,000',
            driver: 'Included',
            fuel: 'Not Included',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 'coaster',
            type: 'Coaster',
            ratePerKm: 60,
            capacity: '22-25 Persons',
            charges: '25,000',
            driver: 'Included',
            fuel: 'Not Included',
            image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80'
        }
    ],
    startingCities: [
        { id: 'islamabad', name: 'Islamabad / Rawalpindi', baseDistance: 0 },
        { id: 'lahore', name: 'Lahore', baseDistance: 380 },
        { id: 'karachi', name: 'Karachi', baseDistance: 1400 },
        { id: 'multan', name: 'Multan', baseDistance: 540 },
        { id: 'peshawar', name: 'Peshawar', baseDistance: 180 },
        { id: 'faisalabad', name: 'Faisalabad', baseDistance: 320 },
        { id: 'gujranwala', name: 'Gujranwala', baseDistance: 220 },
        { id: 'sialkot', name: 'Sialkot', baseDistance: 250 }
    ]
};

// Navigation Logic
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Sticky Header
    const updateHeader = () => {
        if (window.scrollY > 50 || !document.querySelector('.hero')) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Call on load

    // Mobile Menu Toggle (Simplified)
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--white)';
            navLinks.style.padding = '20px';
        });
    }

    // Initialize Dark Mode based on preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Function to toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Update Icon
    const icon = document.querySelector('.nav-icons i.fa-moon, .nav-icons i.fa-sun');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}
