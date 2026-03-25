export { ticketTriage } from './ticketTriage';
export { contentDistribution } from './contentDistribution';
export { licensingCheck } from './licensingCheck';
export { revenueAnomaly } from './revenueAnomaly';

import { ticketTriage } from './ticketTriage';
import { contentDistribution } from './contentDistribution';
import { licensingCheck } from './licensingCheck';
import { revenueAnomaly } from './revenueAnomaly';

export const ALL_PRESETS = [ticketTriage, contentDistribution, licensingCheck, revenueAnomaly];
