const dir = [
	[-1,0],
	[1,0],
	[0,-1],
	[0,1],
]

function walk( // walk
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
	path: Point[]
): boolean {
    //Base Case
    //1. Off the map.
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }
    //2. On a wall.
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }
    //3. It's the end.
    if (curr.x === end.x && curr.y === end.y) {
		path.push(end);
        return true;
    }
    //4. We've seen it.
	if (seen[curr.y][curr.x]) {
		return false;
	}

	// 3 Phases of Recursion
	// 1. Pre
	seen[curr.y][curr.x] = true;
	path.push(curr);
	// 2. Recurse
	for (let i = 0; i < dir.length; i++) {
		const [x, y] = dir[i];
		if (walk(maze, wall, { // walk()
			x: curr.x + x,
			y: curr.y + y,
		}, end, seen, path)) {
			return true;
		}
	}
	// 3. Post
	path.pop();
    return false;
}

//@ts-ignore
export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
	const seen: boolean[][] = [];
	const path: Point[] = [];
	
	for (let i = 0; i < maze.length; i++) {
		seen.push(new Array(maze[0].length).fill(false));
	}

	walk(maze, wall, start, end, seen, path); //walk()

	return path;
}
