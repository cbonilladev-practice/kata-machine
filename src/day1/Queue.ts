class node<T> {
    val: T | undefined;
    next: node<T> | undefined;

    constructor(item: T) {
        this.val = item;
        this.next = undefined;
    }
}

export default class Queue<T> {
    public length: number;
    public head?: node<T> | undefined;
    public tail?: node<T> | undefined;

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    enqueue(item: T): void {
        let new_node = new node(item);

        if (this.length === 0) {
            this.head = new_node;
            this.tail = new_node;
        } else {
            if (this.tail != null) {
                this.tail.next = new_node;
                this.tail = new_node;
            }
        }
        this.length += 1;
    }
    //@ts-ignore
    deque(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        let curr = this.head;
        
        if (this.head != undefined) {
            this.head = this.head?.next;

            curr!.next = undefined;
            
            this.length -= 1;
            return curr!.val;
        }
    }
    //@ts-ignore
    peek(): T | undefined {
        if (this.length === 0) {
            return undefined;
        } else {
            if (this.head != null) {
                return this.head.val;
            }
        }
    }
}
