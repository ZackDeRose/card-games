import { ShortenedRank } from './../shortened-rank';
import { Rank } from '../rank';
import { rankToShortenedRankMap } from '../mappings';

export function convertToShortenedRank(fullRank: Rank): ShortenedRank {
  return rankToShortenedRankMap[fullRank];
}
