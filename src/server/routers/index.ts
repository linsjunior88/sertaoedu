import { router } from '@/lib/trpc';
import { tracksRouter } from './tracks';

export const appRouter = router({
  tracks: tracksRouter,
});

export type AppRouter = typeof appRouter; 