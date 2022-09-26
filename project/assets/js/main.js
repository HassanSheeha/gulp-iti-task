/*
  Layout
 */

const swiper = new Swiper(".brands .swiper", {
	slidesPerView: 2,
	breakpoints: {
		768: {
			slidesPerView: 3,
		},
		992: {
			slidesPerView: 5,
		},
	},
});
const swipe = new Swiper(".feedback .swiper", {
	loop: true,
	slidesPerView: 1,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 2,
		},
	},
});

/*
  Main Content
 */

/*
  Home Page
 */
/*
  Out Latest Projects
 */
const projectsFiltersBtns = document.querySelectorAll(
	"#latest-projects [data-filter]"
);
const projects = document.querySelectorAll("#latest-projects [data-cat]");

function projectFilterClickHandler(e) {
	const clickedBtn = e.target;
	const projectSelector = clickedBtn.getAttribute("data-filter");

	if (projectSelector === "all")
		return projects.forEach(function (project) {
			project.classList.remove("hide");
		});

	const relatedProjects = document.querySelectorAll(
		`#latest-projects [data-cat="${projectSelector}"]`
	);

	projects.forEach(function (project) {
		project.classList.add("hide");
	});

	relatedProjects.forEach(function (project) {
		project.classList.remove("hide");
	});
}

projectsFiltersBtns.forEach(function (projectFilterBtn) {
	projectFilterBtn.addEventListener("click", projectFilterClickHandler);
});
