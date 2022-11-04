export default class ArrayList<T> {
    public length: number;
    public arr: any[] = [];
    public capacity: number;

    constructor(capacity: number) {
        this.arr = new Array<number>(capacity);
        this.length = 0;
    }

    prepend(item: T): void {
        this.insertAt(item, 0);
    }

    /*
		If you're inserting at the end, it's an append().
		For constant time, you just insert your item at the length position and add to length.
		That way, you're not shifting any values and achieve constant time.
	*/
    insertAt(item: T, idx: number): void {
        if (this.length === this.capacity) {
            let big_arr = new Array<number>(this.capacity * 2);
            big_arr = [...this.arr, ...big_arr.slice(length, big_arr.length)];
            this.arr = big_arr;
        }

        // for (let i = this.length; i > idx; i--) {
        //     [this.arr[i], this.arr[i - 1]] = [this.arr[i - 1], this.arr[i]]
        // }

        if (idx === this.length) {
            this.arr[idx] = item;
        } else {
            this.arr.splice(idx, 0, item);
        }

        this.length += 1;
    }
    append(item: T): void {
        this.insertAt(item, this.length);
    }
    //@ts-ignore
    remove(item: T): T | undefined {
        let idx = this.arr.indexOf(item);
        if (idx !== -1) {
            return this.removeAt(idx);
        } else {
            return undefined;
        }
    }
    //@ts-ignore
    get(idx: number): T | undefined {
        if (this.length <= idx) {
            return undefined;
        }

        return this.arr[idx];
    }

    /*
		If we're removing at the end, it's pop().
		We can just remove the last item by subtracting the length by one.
		Garbage collection is not necessary. 
		Removing anywhere is O(n), but popping is O(1) since we're only tracking length.
	*/
    //@ts-ignore
    removeAt(idx: number): T | undefined {
        if (idx >= 0 && idx <= this.length) {
            let val = this.get(idx);
            // for (let i = idx; i < this.length; i++) {
            //     this.arr[i] = this.arr[i + 1];
            // }

            // this.arr = [
            //     ...this.arr.slice(0, idx),
            //     ...this.arr.slice(idx + 1, this.length),
            // ];

            if (idx === this.length) {
                this.length -= 1;
                return val;
            }

            this.arr.splice(idx, 1);

            this.length -= 1;
            return val;
        } else {
            return undefined;
        }
    }
}
