// Initialize Glide Carousel
const glide = new Glide('.glide', {
	type: 'carousel',
	perView: 1,
	autoplay: 4000,
	animationDuration: 700
});
glide.mount();

// Scrolls to destination card when clicking a Glide slide
const glideSlides = document.querySelector('.glide__slides');

if (glideSlides) {
	glideSlides.addEventListener('click', (event) => {
		const clickedSlide = event.target.closest('.glide__slide');
		if (!clickedSlide) return;

		const targetId = clickedSlide.getAttribute('data-target');
		const targetSection = document.getElementById(targetId);

		if (targetSection) {
			targetSection.scrollIntoView({ behavior: 'smooth' });
		}
	});
}

// Initialize AOS Scroll Animations
AOS.init({
	duration: 800,
	once: false
});

// Helper Function for Leaflet Maps
function createDestinationMap(elementId, coords, zoom = 10) {
	const map = new L.LeafletMap(elementId, {
		scrollWheelZoom: false // Prevents accidental zooming while scrolling the page
	}).setView(coords, zoom);

	new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; OpenStreetMap'
	}).addTo(map);
}

createDestinationMap('map', [35.6762, 139.6503]);    // Japan
createDestinationMap('map2', [48.8566, 2.3522]);     // Paris
createDestinationMap('map3', [36.393154, 25.461510]); // Santorini
createDestinationMap('map4', [4.175, 73.509]);       // Maldives
createDestinationMap('map5', [-8.409518, 115.188919]); // Bali

// Bar Charts Function
function createTravelChart(canvasId, ratings) {
	const ctx = document.getElementById(canvasId);
	if (!ctx) return;

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ['Spring', 'Summer', 'Autumn', 'Winter'],
			datasets: [{
				label: 'Travel Rating (out of 10)',
				data: ratings,
				backgroundColor: 'rgba(233, 196, 106, 0.85)',
				hoverBackgroundColor: '#e9c46a',
				borderRadius: 8,
				borderSkipped: false,
				barThickness: 36
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false
				},
				tooltip: {
					backgroundColor: '#1b2e30',
					titleColor: '#e9c46a',
					bodyColor: '#f8fafc',
					padding: 12,
					cornerRadius: 8,
					displayColors: false
				}
			},
			scales: {
				x: {
					grid: { display: false },
					border: { display: false },
					ticks: {
						color: '#cbd5e1',
						font: { family: 'Inter', size: 12 }
					}
				},
				y: {
					beginAtZero: true,
					max: 10,
					border: { display: false },
					grid: {
						color: 'rgba(255, 255, 255, 0.08)'
					},
					ticks: {
						stepSize: 2,
						color: '#cbd5e1',
						font: { family: 'Inter', size: 12 }
					}
				}
			}
		}
	});
}

// Create all 5 charts with seasonal ratings
createTravelChart('travelChart', [9, 6, 10, 5]);   // Japan
createTravelChart('travelChart2', [9, 8, 8, 5]);   // Paris
createTravelChart('travelChart3', [8, 10, 9, 4]);  // Santorini
createTravelChart('travelChart4', [9, 6, 7, 10]);  // Maldives
createTravelChart('travelChart5', [8, 10, 9, 6]);  // Bali
