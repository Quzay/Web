const API_URL = "https://6ad323c959dd78397bbb6589.mockapi.io/api/v1/sensors"

async function loadSensors() {
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
    }
        const sensors = await response.json();
        renderSensors(sensors);
    } catch (error) {
        console.error("Помилка при завантаженні сенсорів:", error);
    }
}   



function renderSensors(sensors) {
    const container = document.querySelector("#sensors-list");

    container.innerHTML = ""; 

    sensors.forEach(sensor => {
        const card = document.createElement("article");

        card.classList.add("sensor-card");
        
        card.innerHTML = `
            <h3>${sensor.id}</h3>
            <p>Назва: ${sensor.name}</p>
            <p>Район: ${sensor.district}</p>
            <p>Рівень шуму: ${sensor.noiseLevel} дБ</p>
            <p>Статус: ${sensor.status}</p>
        `;

        container.appendChild(card);
    });
}

loadSensors();