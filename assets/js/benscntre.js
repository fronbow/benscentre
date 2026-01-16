document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".links-grid");
    const grid = container.querySelector(".grid");
    const filterButtons = container.querySelectorAll(".filter-btn");

    if (!grid) return;

    if (typeof Muuri === "undefined" || typeof imagesLoaded === "undefined") {
        console.warn(
            "Muuri or imagesLoaded not available. Using CSS Grid fallback."
        );
        filterButtons.forEach((button) => {
            button.style.display = "none";
        });
        return;
    }

    grid.classList.add("loading");

    imagesLoaded(grid, function () {
        grid.classList.remove("loading");
        grid.classList.add("muuri");

        const muuriGrid = new Muuri(grid, {
            items: ".grid-item",
            layoutDuration: 400,
            layoutEasing: "ease",
            dragEnabled: true,
            layout: {
                fillGaps: true,
            },
        });

        filterButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const filterValue = this.getAttribute("data-filter");

                filterButtons.forEach((btn) => btn.classList.remove("active"));
                this.classList.add("active");

                muuriGrid.filter(function (item) {
                    const element = item.getElement();
                    if (filterValue === "*") {
                        return true;
                    }
                    return element.classList.contains(filterValue.replace(".", ""));
                });
            });
        });
    });
});