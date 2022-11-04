export default class MinHeap {
    public length: number;
    private data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length);
        this.length += 1;
    }

    delete(): number {
        if (this.length === 0) {
            return -1;
        }

        const out = this.data[0];
        this.length -= 1;

        if (this.length === 0) {
            this.data = [];
            return out;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);
        return out;
    }

    private heapifyDown(idx: number): void {
        const lIdx = this.leftChild(idx);
        const rIdx = this.rightChild(idx);
        if (idx >= this.length || lIdx >= this.length) {
            return;
        }

        const lV = this.data[lIdx];
        const rV = this.data[rIdx];

        const cV = this.data[idx];

        if (lV > rV && cV > rV) {
            this.data[idx] = rV;
            this.data[rIdx] = cV;
            this.heapifyDown(rIdx);
        } else if (rV > lV && cV > lV) {
            this.data[idx] = lV;
            this.data[lIdx] = cV;
            this.heapifyDown(lIdx);
        }
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }
        const p = this.parent(idx);
        const pV = this.data[p];
        const cV = this.data[idx];

        if (pV > cV) {
            this.data[idx] = pV;
            this.data[p] = cV;
            this.heapifyUp(p);
        }
    }

    private parent(idx: number): number {
        return Math.floor(idx - 1 / 2);
    }

    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}
