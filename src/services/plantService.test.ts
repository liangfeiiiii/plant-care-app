import { describe, it, expect } from 'vitest';
import { plantService } from './plantService';
import type { Plant } from '../store';

const createPlant = (overrides: Partial<Plant> = {}): Plant => ({
  id: '1',
  name: '测试植物',
  species: '龟背竹',
  imageUrl: '/test.png',
  lastWatered: '2024-01-01T00:00:00Z',
  waterIntervalDays: 7,
  status: 'active',
  ...overrides,
});

describe('plantService.getStatus', () => {
  it('returns "今天" when plant is due today', () => {
    const plant = createPlant({
      lastWatered: '2024-01-01T00:00:00Z',
      waterIntervalDays: 7,
    });
    const now = new Date('2024-01-08T00:00:00Z'); // exactly 7 days later

    const status = plantService.getStatus(plant, now);

    expect(status.statusText).toBe('今天');
    expect(status.isOverdue).toBe(true);
    expect(status.isDueToday).toBe(true);
  });

  it('returns "明天" when plant is due tomorrow', () => {
    const plant = createPlant({
      lastWatered: '2024-01-01T00:00:00Z',
      waterIntervalDays: 7,
    });
    const now = new Date('2024-01-07T00:00:00Z'); // 6 days later

    const status = plantService.getStatus(plant, now);

    expect(status.statusText).toBe('明天');
    expect(status.isDueTomorrow).toBe(true);
  });

  it('returns days remaining when not due yet', () => {
    const plant = createPlant({
      lastWatered: '2024-01-01T00:00:00Z',
      waterIntervalDays: 7,
    });
    const now = new Date('2024-01-03T00:00:00Z'); // 2 days later

    const status = plantService.getStatus(plant, now);

    expect(status.statusText).toBe('4天后');
    expect(status.daysUntilWatering).toBe(4);
  });

  it('returns overdue days when past due', () => {
    const plant = createPlant({
      lastWatered: '2024-01-01T00:00:00Z',
      waterIntervalDays: 7,
    });
    const now = new Date('2024-01-10T00:00:00Z'); // 9 days later

    const status = plantService.getStatus(plant, now);

    expect(status.statusText).toBe('逾期2天');
    expect(status.isOverdue).toBe(true);
  });
});

describe('plantService.needsWatering', () => {
  it('returns true when plant is overdue', () => {
    const plant = createPlant({
      lastWatered: '2024-01-01T00:00:00Z',
      waterIntervalDays: 7,
    });
    const now = new Date('2024-01-08T00:00:00Z');

    expect(plantService.needsWatering(plant, now)).toBe(true);
  });

  it('returns false when plant is not due', () => {
    const plant = createPlant({
      lastWatered: '2024-01-01T00:00:00Z',
      waterIntervalDays: 7,
    });
    const now = new Date('2024-01-05T00:00:00Z');

    expect(plantService.needsWatering(plant, now)).toBe(false);
  });
});

describe('plantService.getWateringStats', () => {
  it('calculates correct stats for multiple plants', () => {
    const plants: Plant[] = [
      createPlant({ id: '1', lastWatered: '2024-01-01T00:00:00Z', waterIntervalDays: 7 }), // overdue
      createPlant({ id: '2', lastWatered: '2024-01-05T00:00:00Z', waterIntervalDays: 7 }), // not due
      createPlant({ id: '3', species: '琴叶榕', lastWatered: '2024-01-05T00:00:00Z', waterIntervalDays: 14 }), // not due
    ];
    const now = new Date('2024-01-08T00:00:00Z');

    const stats = plantService.getWateringStats(plants, now);

    expect(stats.total).toBe(3);
    expect(stats.needsWatering).toBe(1);
    expect(stats.speciesDiversity).toBe(2);
  });
});
