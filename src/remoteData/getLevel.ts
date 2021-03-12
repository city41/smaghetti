import { client } from './client';

type LevelData = SerializedLevel;

export async function getLevel(id: string): Promise<LevelData> {
  const { data, error } = await client
    .from<LevelData>('levels')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(`Level with id ${id} not found`);
  }

  return data;
}
