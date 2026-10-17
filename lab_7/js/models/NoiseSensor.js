import { NoiseMeasurement } from "./NoiseMeasurement.js";
import { MonitoringSystem} from "../services/MonitoringSystem.js";
export { NoiseSensor };


const NOISE_LIMITS = {
    normalMax: 55,
    warningMax: 70,
}

class NoiseSensor {
    constructor(id, district, location, noiseLevel, measurements ) {
        this.id = id;
        this.district = district;
        this.location = location;
        this.noiseLevel = noiseLevel;
        this.measurements = [];
    }

    getStatus(){
        if (this.noiseLevel <= NOISE_LIMITS.normalMax) {
            return "normal";
        }else if (this.noiseLevel <= NOISE_LIMITS.warningMax) {
            return "warning";
        }else {
            return "critical";
        }
    }
    updateNoiseLevel(value) {
        if (!NoiseSensor.isValidNoiseLevel(value)) {
            throw new Error("Некоректний рівень шуму" + value);
        }
        this.noiseLevel = value;
    }

    addMeasurement(measurement) {
        if (!(measurement instanceof NoiseMeasurement)) {
            throw new Error("Некоректний об'єкт вимірювання");
        }
        this.measurements.push(measurement);
        this.updateNoiseLevel(measurement.value);
    }

    static isValidNoiseLevel(value) {
        return Number.isFinite(value) && value >= 0 && value <= 200;
    }
    
    static fromObject(data) {
        return new NoiseSensor(data.id, data.district, data.location, data.noiseLevel, data.measurements);
    }   

}