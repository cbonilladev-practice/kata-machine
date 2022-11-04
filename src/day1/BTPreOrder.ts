function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
	if (!curr) {
		return path;
	}

	//3 Steps of Recursion
	//Pre
	path.push(curr.value)
	//Recurse
	walk(curr.left, path)
	walk(curr.right, path)
	//Post
	return path
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
	return walk(head, []);
}
