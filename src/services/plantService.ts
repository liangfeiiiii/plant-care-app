import type { Plant } from '../store';

export interface PlantStatus {
  isOverdue: boolean;
  isDueToday: boolean;
  isDueTomorrow: boolean;
  daysUntilWatering: number;
  daysSinceLastWatered: number;
  statusText: string;
}

export const plantService = {
  getStatus(plant: Plant, now: Date = new Date()): PlantStatus {
    const lastWatered = new Date(plant.lastWatered).getTime();
    const nowTime = now.getTime();
    const daysSinceLastWatered = Math.floor(
      (nowTime - lastWatered) / (1000 * 60 * 60 * 24)
    );
    const daysUntilWatering = plant.waterIntervalDays - daysSinceLastWatered;

    const isOverdue = daysSinceLastWatered >= plant.waterIntervalDays;
    const isDueToday = daysSinceLastWatered === plant.waterIntervalDays;
    const isDueTomorrow = daysUntilWatering === 1;

    let statusText: string;
    if (isDueToday) {
      statusText = '今天';
    } else if (isDueTomorrow) {
      statusText = '明天';
    } else if (daysUntilWatering > 0) {
      statusText = `${daysUntilWatering}天后`;
    } else {
      statusText = `逾期${Math.abs(daysUntilWatering)}天`;
    }

    return {
      isOverdue,
      isDueToday,
      isDueTomorrow,
      daysUntilWatering,
      daysSinceLastWatered,
      statusText,
    };
  },

  needsWatering(plant: Plant, now: Date = new Date()): boolean {
    return this.getStatus(plant, now).isOverdue;
  },

  getWateringStats(plants: Plant[], now: Date = new Date()) {
    const total = plants.length;
    const needsWatering = plants.filter((p) => this.needsWatering(p, now)).length;
    const speciesDiversity = new Set(
      plants.map((p) => p.species).filter(Boolean)
    ).size;

    return { total, needsWatering, speciesDiversity };
  },
};
