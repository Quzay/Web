import {NoiseSensor} from "./models/NoiseSensor.js";
import {MonitoringSystem} from "./services/MonitoringSystem.js";
import {NoiseMeasurement} from "./models/NoiseMeasurement.js";
import {MobileNoiseSensor} from "./models/MobileNoiseSensor.js";

const sensorsData = [
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

const mySensors = sensorsData.map(data => NoiseSensor.fromObject(data));

const system = new MonitoringSystem();
mySensors.forEach(sensor => system.addSensor(sensor));

console.log("Критичні сенсори:", system.getCriticalSensors());
console.log("Середній рівень шуму:", system.getAverageNoiseLevel());
console.log("Сенсор з ID NS-02:", system.findSensorById("NS-02"));

const mobile = new MobileNoiseSensor("NS-04", "Личаківський", "вул. Личаківська", 61, 15);
system.addSensor(mobile);

function renderSensorCard(sensor) {
    const card = document.createElement("div");
    card.classList.add("sensor-card", sensor.getStatus());
    card.innerHTML = `
        <h3>${sensor.id}</h3>
        <p>Район: ${sensor.district}</p>
        <p>Адреса: ${sensor.location}</p>
        <p>Рівень шуму: ${sensor.noiseLevel} dB</p>
        <p>Статус: ${sensor.getStatus()}</p>
    `;
    return card;
}

const container = document.querySelector(".sensors-container");
if (container) {
    system.sensors.forEach(sensor => {
        container.appendChild(renderSensorCard(sensor));
    });
}