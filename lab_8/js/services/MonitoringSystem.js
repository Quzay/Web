import { NoiseSensor } from "../models/NoiseSensor.js";
export { MonitoringSystem };

class MonitoringSystem {
    constructor(sensors) {
        this.sensors = [];
    }
    
    addSensor(sensor) {
        if (!(sensor instanceof NoiseSensor)) {
            throw new Error("Некоректний об'єкт сенсора");
        }
        this.sensors.push(sensor);
    }
    
    findSensorById(id) {
        return this.sensors.find(sensor => sensor.id === id);
    }

    getCriticalSensors(){
        return this.sensors.filter(sensor => sensor.getStatus() === "critical");
    }

    getAverageNoiseLevel() {
        if (this.sensors.length === 0) return null;
        const totalNoiseLevel = this.sensors.reduce((sum, sensor) => sum + sensor.noiseLevel, 0);
        return totalNoiseLevel / this.sensors.length;
    }

    getSensorsByDistrict(district) {
        return this.sensors.filter(sensor => sensor.district === district);
    }
}