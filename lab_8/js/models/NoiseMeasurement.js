import {NoiseSensor} from "./NoiseSensor.js";
export { NoiseMeasurement };
class NoiseMeasurement {
    constructor(value, measurementAt = new Date()) {
        this.value = value;
        this.measurementAt = measurementAt;
    }

    isValid() {
        return Number.isFinite(this.value) && this.value >= 0 && this.value <= 200;
    }
}