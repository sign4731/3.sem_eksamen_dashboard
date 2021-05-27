import { settings } from "../modules/settings";
import { makeBeerBubbles } from "./beer-bubbles";
import { sortBy } from "../modules/helpers";

export function prepareBeerTapChartObjects(beerTaps) {
    // Resets the chart & xAxis
    settings.hooks.beerTapChart.innerHTML = "";

    // Set amount of beers available from the bar
    settings.hooks.beerTapChart.style.setProperty("--beers", beerTaps.length);

    // Sort beers from A - Z
    beerTaps.sort(sortBy("id"));

    // Show updated chart
    beerTaps.forEach((beerTap) => {
        showBeerTapLiquid(beerTap);
    });
}

function showBeerTapLiquid(beerTapObject) {
    const beerTapChart = settings.hooks.beerTapChart;
    const templateClone = settings.templates.beerBar.cloneNode(true);
    const percentage = parseInt(
        (beerTapObject.level / beerTapObject.capacity) * 100
    );

    templateClone
        .querySelector(".beer-bar")
        .style.setProperty("--bar-percentage", percentage);

    templateClone
        .querySelector(".beer-bar")
        .setAttribute("data-beer", beerTapObject.beer);

    templateClone.querySelector(".beer-bar__name").textContent =
        beerTapObject.beer;

    templateClone.querySelector(
        ".beer-bar__percent"
    ).textContent = `${percentage}%`;

    const beerWithBubbles = makeBeerBubbles(templateClone);

    beerTapChart.append(beerWithBubbles);
}
