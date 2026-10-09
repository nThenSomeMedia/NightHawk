
const venues = {
	bearRiver: {
		title: "Bear River",
		room: "Thirsty Bear Lounge",
		address: "11 Bear Paws Way",
		city: "Loleta",
		phone: "(707) 733-9646",
		tel: "707-733-9646",
		defaultTime: null
	},
	blueLake: {
		title: "Blue Lake Casino",
		room: "Wave Lounge",
		address: "777 Casino Way",
		city: "Blue Lake",
		phone: "(877) 252-2946",
		tel: "877-252-2946",
		// Confirmed by Brigette on October 9, 2026.
		defaultTime: "8:00PM to Midnight"
	},
	elks: {
		title: "Elks Lodge",
		room: "",
		address: "445 Herrick Ave",
		city: "Eureka",
		phone: "(707) 442-6652",
		tel: "707-442-6652",
		defaultTime: null
	},
	heights: {
		title: "The Heights Casino",
		room: "Firewater Lounge",
		address: "27 Scenic Dr",
		city: "Trinidad, CA 95570",
		phone: "(707) 677-3611",
		tel: "707-677-3611",
		// Confirmed for December 31, 2026; treat as the current default pending future confirmation.
		defaultTime: "8:00PM to Midnight"
	}
};

// =====================================
// Gigs
//
// date  = YYYY-MM-DD
// venue = Key from the venues object
// time  = Displayed on the website
// cover = Cover charge, discounts,
//         member information, or notes
// =====================================

const gigs = [
	{
		date: "2026-10-10",
		venue: "blueLake",
		cover: "No cover"
	},
	{
		date: "2026-12-05",
		venue: "blueLake",
		cover: "No cover"
	},
	{
		date: "2026-12-31",
		venue: "heights",
		cover: "New Year's Eve Red Carpet Celebration"
	}
];

const gigList = document.getElementById("gig-list");

const formatDate = dateString => {
	const date = new Date(`${dateString}T12:00:00`);
	return {
		year: date.getFullYear(),
		weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
		month: date.toLocaleDateString("en-US", { month: "long" }),
		day: date.getDate()
	};
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const upcomingGigs = gigs
	.filter(gig => new Date(`${gig.date}T00:00:00`) >= today)
	.sort((a, b) => a.date.localeCompare(b.date));

let currentYear = "";

upcomingGigs.forEach(gig => {
	const venue = venues[gig.venue];
	const date = formatDate(gig.date);

	if (date.year !== currentYear) {
		currentYear = date.year;
		gigList.insertAdjacentHTML("beforeend", `<h3 class="year">${currentYear}</h3>`);
	}

	gigList.insertAdjacentHTML("beforeend", `
		<div class="event">
			<div class="event-left">
				<div class="event-date">
					<div class="month">${date.weekday}</div>
					<div class="month">${date.month}</div>
					<div class="date">${date.day}</div>
				</div>
			</div>
			<div class="event-right">
				<h3 class="event-title">${venue.title}</h3>
				<div class="event-description">
					<p>${venue.room ? venue.room + " <br>" : ""}${venue.address}<br>${venue.city}</p>
					<a href="tel:${venue.tel}">
						<p>${venue.phone}</p>
					</a>
				</div>
				<div class="event-timing">
					<img src="images/time.png" alt="" aria-hidden="true" />
					${gig.time || venue.defaultTime || "Time to be announced"}
				</div>
				<div class="event-timing">
					${gig.cover}
				</div>
			</div>
		</div>
	`);
});
