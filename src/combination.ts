/**
 * Logic for finding combination
 * @param sets Available rules
 * @param maximum Value target
 * @returns The supersets (all and unique)
 */
export function getGroupsets(sets: number[], maximum: number): number[][] {
  const groupSets: number[][] = [];
  
  let working: number[][] = [[]];
  while (working.length) {
    const next_work: number[][] = []
    for (let i = 0; i < working.length; i++) {
      for (let j = 0; j < sets.length; j++) {
        const subset: number[] = working[i].concat([sets[j]])
        const sum: number = subset.reduce((a, b) => a + b, 0)
        if (sum == maximum) {
          // collecting unique sets
          const copied = subset.sort()
          const uniqueExist = groupSets.filter(row => row.join() === copied.join())
          if (!uniqueExist.length) {
            groupSets.push(copied)
          }
        } else if (sum < maximum) {
          next_work.push(subset)
        }
      }
    }
    working = next_work
  }

  return groupSets;
}

export function getCombinations(sets: number[], k: number): number[][] {
	let i: number;
  let j: number;
  let combs: number[][];
  let head: number[];
  let tailcombs: number[][];
	
	if (k > sets.length || k <= 0) return [];
	if (k == sets.length) return [sets];
	if (k == 1) {
		combs = [];
		for (i = 0; i < sets.length; i++) {
			combs.push([sets[i]]);
		}
		return combs;
	}
  
	combs = [];
	for (i = 0; i < sets.length - k + 1; i++) {
		head = sets.slice(i, i + 1);
		tailcombs = getCombinations(sets.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

export function getMultiCombinations(supersets: number[], sets: number[]): number[][][] {
  const result: number[][][] = [];
  (function inner(i = 0, indices: any[] = []) {
    const groups = getCombinations(sets, supersets[i]);

    for (let j = 0; j < groups.length; j++) {
      if (!i) indices = [];
      indices[i] = [];

      // * Filter for non-exist only on available indices
      const group: number[] = groups[j];
      const filtered = group.filter(g => {
        if (indices.flat().indexOf(g) == -1) return 1
        return 0
      })
      if (filtered.length !== group.length) continue;

      // * Put in to result
      let lastIdx: number = result.length - 1
      if (!i || result[lastIdx].length == supersets.length) {
        result.push([])
        lastIdx = result.length - 1
      }
      if (!result[lastIdx].length && lastIdx - 1 > -1) {
        result[lastIdx] = result[lastIdx - 1].slice(0, i)
      }
      result[lastIdx].push(group)

      // * Recursive phase (next)
      if (supersets[i + 1]) {
        indices[i] = group
        inner(i + 1, indices)
      }
    }
  })()
  
  return result;
}