import { shortenedRankToRankMap } from '../mappings';
import { ShortenedRank } from '../shortened-rank';
import { Rank } from '../rank';

export function convertToFullRank(shortenedRank: ShortenedRank): Rank {
  return shortenedRankToRankMap[shortenedRank];
}
