import { createFileRoute } from '@tanstack/react-router';
import VoltageDropCalculator from '../components/VoltageDropCalculator';

export const Route = createFileRoute('/voltage-drop')({
  component: VoltageDropCalculator,
});
