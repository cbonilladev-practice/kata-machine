
function hasUnvisited(seen: boolean[], dists: number[]): boolean {
	// Just checking if there are unvisited, since all dists are Infinity we're looking for dists less than that until they run out.
	return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
	let idx = -1;
	// Max value, so anything less is lowest.
	let lowestDistance = Infinity;

	for (let i = 0; i < seen.length; i++) {
		if (seen[i]) {
			continue;
		}

		// Checking for min distance, > all dists[i].
		if (lowestDistance > dists[i]) {
			lowestDistance = dists[i]
			idx = i
		}
	}

	return idx
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
	const seen = new Array(arr.length).fill(false);
    const prev = new Array(arr.length).fill(-1);
    const dists = new Array(arr.length).fill(Infinity);
	// We start at the source.
    dists[source] = 0;

	// We keep going until all have been visited.
	// O(V2)
    while (hasUnvisited(seen, dists)) {
		// O(V2)
        const curr = getLowestUnvisited(seen, dists);
		seen[curr] = true;

		// For WeightedAdjacencyList. 
		const adjs = arr[curr];
		for (let i = 0; i < adjs.length; i++) {
			const edge = adjs[i]
			if (seen[edge.to]) {
				continue;
			}

			// Weight of the edge + my curr distance.
			const dist = dists[curr] + edge.weight;
			if (dist < dists[edge.to]) {
				// Traversing the edges.
				dists[edge.to] = dist;
				prev[edge.to] = curr;
			}
		}
    }

	const out: number[] = []
	let curr = sink;

	while (prev[curr] !== -1) {
		out.push(curr);
		curr = prev[curr];
	}

	out.push(source);
	return out.reverse();
}
