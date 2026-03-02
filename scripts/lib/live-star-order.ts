export type LiveStarEntry = {
  full_name: string;
  stars: number;
};

export type StarOrderInversion = {
  previous_rank: number;
  next_rank: number;
  previous_repo: string;
  next_repo: string;
  previous_stars: number;
  next_stars: number;
  delta: number;
  tolerance: number;
};

export type LiveStarOrderCheck = {
  should_fail: boolean;
  minor_inversions: StarOrderInversion[];
  severe_inversions: StarOrderInversion[];
};

export type LiveStarOrderConfig = {
  absolute_tolerance: number;
  relative_tolerance: number;
  max_minor_pairs: number;
};

export const DEFAULT_LIVE_STAR_ORDER_CONFIG: LiveStarOrderConfig = {
  absolute_tolerance: 120,
  relative_tolerance: 0.03,
  max_minor_pairs: 3,
};

export function evaluateLiveStarOrder(
  entries: LiveStarEntry[],
  config: LiveStarOrderConfig = DEFAULT_LIVE_STAR_ORDER_CONFIG,
): LiveStarOrderCheck {
  const minor: StarOrderInversion[] = [];
  const severe: StarOrderInversion[] = [];

  for (let i = 1; i < entries.length; i += 1) {
    const previous = entries[i - 1];
    const next = entries[i];
    if (previous.stars >= next.stars) continue;

    const delta = next.stars - previous.stars;
    const tolerance = Math.max(
      config.absolute_tolerance,
      Math.floor(Math.max(previous.stars, next.stars) * config.relative_tolerance),
    );

    const inversion: StarOrderInversion = {
      previous_rank: i,
      next_rank: i + 1,
      previous_repo: previous.full_name,
      next_repo: next.full_name,
      previous_stars: previous.stars,
      next_stars: next.stars,
      delta,
      tolerance,
    };

    if (delta <= tolerance) {
      minor.push(inversion);
    } else {
      severe.push(inversion);
    }
  }

  return {
    should_fail: severe.length > 0 || minor.length > config.max_minor_pairs,
    minor_inversions: minor,
    severe_inversions: severe,
  };
}
