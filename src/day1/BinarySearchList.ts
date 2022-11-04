export default function bs_list(haystack: number[], needle: number): boolean {
	let head = 0
	let tail = haystack.length

	while (tail > head) {
		let mid = Math.floor((head + tail) / 2)

		if (haystack[mid] === needle) {
			return true;
		} else if (haystack[mid] > needle) {
			tail = mid - 1;
		} else {
			head = mid + 1;
		}
	}

	return false
}