class node<T> {
    public val: T;
    public prev: node<T> | undefined;

    constructor(item: T) {
        this.val = item;
        this.prev = undefined;
    }
}

export default class Stack<T> {
    public length: number;
    public head?: node<T> | undefined;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        let new_node = new node(item);

        if (this.length === 0) {
            this.head = new_node;
        }

        if (this.head != null) {
            new_node.prev = this.head;
            this.head = new_node;
        }

        this.length += 1;
    }
    //@ts-ignore
    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);

        if (this.length === 0) {
            const head = this.head;
            this.head = undefined;
            return head?.val;
        }

        let head = this.head;
        this.head = head?.prev;

        return head?.val;
    }
    //@ts-ignore
    peek(): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        if (this.head != null) {
            return this.head.val;
        }
    }
}
