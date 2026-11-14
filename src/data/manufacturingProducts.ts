import { ProductItem } from '../types';
import { manufacturingTrays } from './manufacturingTrays';
import { manufacturingStorage } from './manufacturingStorage';
import { manufacturingTraditional } from './manufacturingTraditional';
import { manufacturingDisplay } from './manufacturingDisplay';
import { manufacturingOther } from './manufacturingOther';

export const manufacturingProducts: ProductItem[] = [
  ...manufacturingTrays,
  ...manufacturingStorage,
  ...manufacturingTraditional,
  ...manufacturingDisplay,
  ...manufacturingOther,
];
