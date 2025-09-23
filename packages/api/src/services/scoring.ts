// API scoring service delegates to shared implementation
import { computeScore as baseCompute } from 'shared';
export const computeScore = baseCompute;
export default computeScore;
