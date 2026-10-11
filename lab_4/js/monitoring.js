const noiseLevels = [
    42, 55, 61, 78, 83, 67, 49, 72, 91, 58, 64, 76,
    53, 47, 88, 69, 74, 82, 95, 51, 71, -1, 85, 63,
    79, 39, 141, 86
];


const warningLevel = 70;
const criticalLevel = 85;
const minValidLevel = 30;
const maxValidLevel = 130;

let firstValid = null;
if (noiseLevels.length > 0) {
    let i = 0;
    do {
        if (noiseLevels[i] >= minValidLevel && noiseLevels[i] <= maxValidLevel) {
            firstValid = { value: noiseLevels[i], position: i + 1 };
        }
        i++;
    } while (i < noiseLevels.length && firstValid === null);
}




console.group("Акустична варта -- звіт моніторингу");
console.log("Пороги: попередження > " + warningLevel + " дБ; критичний > " + criticalLevel + " дБ");

console.log("Усього вимирювань: " + noiseLevels.length);

const validLevels = [];
for (const level of noiseLevels) {
    if (level < minValidLevel || level > maxValidLevel) continue;
    validLevels.push(level);
}

console.log("Коретних вимирювань: " + validLevels.length);
console.log("Некоректних вимирювань: " + (noiseLevels.length - validLevels.length));

let normalCount = 0;
let warningCount = 0;
let criticalCount = 0;

for(const element of validLevels){
    if (element > criticalLevel) {
        criticalCount++;
    }
    else if (element > warningLevel) {
        warningCount++;
    }
    else {
        normalCount++;
    }
}
console.log("Категорія " + "Кількість")
console.log("Без перевищень: " + normalCount);
console.log("Попередження: " + warningCount);
console.log("Критичні: " + criticalCount);

let Summ = 0
for (const element of validLevels){
    Summ += element;
}
const averageLevel = Summ / validLevels.length;
console.log("Середній рівень шуму: " + averageLevel + " дБ");

let minLevel = validLevels[0];
let maxLevel = validLevels[0];
for (const level of validLevels) {
    if (level < minLevel) minLevel = level;
    if (level > maxLevel) maxLevel = level;
}

console.log("Мінімальний рівень шуму: " + minLevel + " дБ");
console.log("Максимальний рівень шуму: " + maxLevel + " дБ");

let firstCriticalIndex = 0
for (const element of validLevels){
    if (element > criticalLevel) {
        firstCriticalIndex = validLevels.indexOf(element);
        console.log("Перший критичний рівень шуму зафіксовано на вимірюванні №" + (firstCriticalIndex + 1) + " (" + element + " дБ)");
        break;
    }
}

let recovery = null;
let i = firstCriticalIndex + 1;
let safeCount = 0;

while (i < noiseLevels.length) {
    const level = noiseLevels[i];
    if (level < minValidLevel || level > maxValidLevel || level > warningLevel) {
        safeCount = 0;
    } else {
        safeCount++;
        if (safeCount === 3) {
            recovery = i + 1;
            break;
        }
    }
    i++;
}

if (recovery) {
    console.log("Відновлення -- три безпечні вимірювання поспіль: позиція " + recovery);
} else {
    console.log("Відновлення -- три безпечні вимірювання поспіль: не знайдено");
}


console.log("Поріг " + warningLevel + " дБ перевищено " + (warningCount+criticalCount) + " вимірювань");

for (const element of noiseLevels){
    if (element < minValidLevel || element > maxValidLevel) {
        console.log("Некоректні дані: позиція " + (noiseLevels.indexOf(element) + 1) + " (" + element + " дБ)");
    }
}

console.log("Висновок : зафіксовано " + criticalCount + " критичних вимірювань");

console.groupEnd();