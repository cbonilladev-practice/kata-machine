
/*
First, there is Space. 
Then, there is Time.

In order to walk a path, 
one must define a step. 

In order to define a step,    
one must create a world. 
*/

class node<T> {
    public val: T;
    public prev: node<T> | null;
    public next: node<T> | null;

    constructor(item: T) {
        this.val = item;
        this.prev = null;
        this.next = null;
    }
}

export default class DoublyLinkedList<T> {
    public length: number;
    public head: node<T> | null;
    public tail: node<T> | null;

    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    prepend(item: T): void {
        let new_node = new node(item) 

        if (this.length === 0) {
            this.head = new_node
            this.tail = new_node
        }

        else if (this.head) {
            this.head.prev = new_node;
            new_node.next = this.head;
            this.head = new_node;
        }

        this.length += 1
    }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            return undefined
        }
        
        if (idx === this.length) {
            this.append(item)
            return;
        } else if (idx === 0) {
            this.prepend(item)
            return;
        }

        this.length += 1
        let curr = this.head

        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next
        }

        let new_node = new node(item);

        new_node.next = curr;
        new_node.prev = curr!.prev;
        curr!.prev = new_node

        if (new_node?.prev) {
            new_node.prev.next = curr;
        }
        
    }
    append(item: T): void {
        let new_node = new node(item);

        if (this.length === 0) {
            this.head = new_node;
            this.tail = new_node;
        }

        else if (this.tail) {
            this.tail.next = new_node;
            new_node.prev = this.tail;
            this.tail = new_node;
        }

        this.length += 1
    }
    //@ts-ignore
    remove(item: T): T | undefined {
        if (this.length === 0) {
            return undefined;
        }

        else if (this.head!.val === item) {
            return this.removeAt(0);
        }

        else if (this.tail!.val === item) {
            return this.removeAt(-1);
        }

        let curr = this.head
        let pos = 0

        while (curr != null && curr.next != null) {
            curr = curr.next
            pos += 1

            if (curr!.val === item) {
                return this.removeAt(pos)
            } else {
                return undefined;
            }
        }
    }
    //@ts-ignore
    get(idx: number): T | undefined {
        let curr = this.head;
        let pos = 0;

        while (curr != null) {
            if (pos === idx) {
                return curr.val
            }

            pos += 1;
            curr = curr.next;
        }
    }
    //@ts-ignore
    removeAt(idx: number): T | undefined {
        if (idx >= this.length || idx < 0) {
            return undefined;
        }

        if (idx === 0) {
            let prev_head = this.head!.val

            if (this.head != null && this.head.next != null) {
                this.head = this.head.next
                this.head!.prev = null;

            } else {
                this.head = null;
                this.tail = null;
            }

            this.length -= 1
            return prev_head;
        }

        else if (idx === -1) {
            let prev_tail = this.tail!.val

            if (this.tail != null && this.tail.prev != null) {
                this.tail = this.tail.prev;
                this.tail!.next = null;
            } else {
                this.head = null;
                this.tail = null;
            }

            this.length -= 1
            return prev_tail;
        }

        let curr = this.head;
        let pos = 0;

        while (curr != null && curr.next != null) {
            if (pos === idx) {
                let prev_curr = curr.val

                let curr_next = curr.next;
                let curr_prev = curr.prev;

                // curr_prev <==> curr <==> curr_next

                curr_prev!.next = curr_next;
                curr_next.prev = curr.prev;

                curr.prev = curr.next = null;

                this.length -= 1
                
                return prev_curr
            }

            curr = curr.next
            pos += 1
        }
    }
}
