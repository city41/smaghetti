import { client } from './client';

async function saveLevelSession(
  id: string,
  duration: number,
  deaths: number,
  cleared: boolean
): Promise<void> {
  const { error } = await client
    .from<LevelPlaySession>('level_play_sessions')
    .insert({
      // @ts-ignore
      user_id: client.auth.user()?.id ?? null,
      duration,
      cleared,
      deaths,
    })
    .match({ id });

  if (error) {
    throw error;
  }
}

export { saveLevelSession };
