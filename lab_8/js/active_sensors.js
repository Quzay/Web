import { NoiseSensor } from "./models/NoiseSensor.js";

const sensors = [
    {
        id: "NS-01",
        district: "Галицький",
        location: "просп. Свободи",
        noiseLevel: 58,
    },
    {
        id: "NS-02",
        district: "Франківський",
        location: "вул. Наукова",
        noiseLevel: 74,
    },
    {
        id: "NS-03",
        district: "Шевченківський",
        location: "просп. Чорновола",
        noiseLevel: 83,
    },
    ];

const mySensors = sensors.map(data => NoiseSensor.fromObject(data));

const sensorList = document.querySelector(".sensor-list");
const districtFilter = document.querySelector("#district-filter");
const criticalFilter = document.querySelector("#critical-filter");

function createSensorCard(sensor) {
    const card = document.createElement("article");
    card.classList.add("sensor-card");
    card.classList.add(`sensor-card--${sensor.getStatus()}`);

    const title = document.createElement("h3");
    title.textContent = sensor.id;

    const district = document.createElement("p");
    district.textContent = `Район: ${sensor.district}`;

    const location = document.createElement("p");
    location.textContent = `Локація: ${sensor.location}`;

    const level = document.createElement("p");
    level.textContent = `Рівень шуму: ${sensor.noiseLevel} дБ`;

    const status = document.createElement("p");
    status.textContent = `Статус: ${sensor.getStatus()}`;

    card.append(title, district, location, level, status);
    return card;
}

function renderSensors(sensorArray) {
    sensorList.replaceChildren();
    sensorArray.forEach((sensor) => {
        const card = createSensorCard(sensor);
        sensorList.append(card);
    });
}

function applyFilters() {
    const selectedDistrict = districtFilter.value;
    const criticalOnly = criticalFilter.checked;

    const filteredSensors = mySensors.filter((sensor) => {
        const matchesDistrict =
            selectedDistrict === "all" ||
            sensor.district === selectedDistrict;

        const matchesStatus =
            !criticalOnly ||
            sensor.getStatus() === "critical";

        return matchesDistrict && matchesStatus;
    });

    renderSensors(filteredSensors);
}

districtFilter.addEventListener("change", applyFilters);
criticalFilter.addEventListener("change", applyFilters);

renderSensors(mySensors);