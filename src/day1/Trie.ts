class TNode {
    public isWord: boolean;
    public children: TNode[];
    public val?: string;

    constructor() {
        this.isWord = false;
        this.children = new Array(26) 
    }
}

export default class Trie {
    public head: TNode;

    constructor() {
        this.head = new TNode();
    }

    insert(item: string): void {
        let curr: TNode = this.head 
        for(let i = 0; i < item.length; i++) {
            let c = this.getCharCode(item[i]);
            if (!curr.children[c]) {
                curr.children[c] = new TNode();
            }
            curr = curr.children[c]
        }
        curr.val = item;
        curr.isWord = true;
    }
    
    delete(item: string): void {
        let curr: TNode = this.head;

        for (let i = 0; i < item.length && curr; i++) {
            curr = curr.children[this.getCharCode(item[i])]
        }

        if (!curr) {
            return;
        }

        curr.val = undefined;
        curr.isWord = false;
    }
    
    find(partial: string): string[] {
        let curr: TNode = this.head;

        for (let i = 0; i < partial.length; i++) {
            curr = curr.children[this.getCharCode(partial[i])]
        }

        return this.traverse(curr, []);
    }

    /*
        Zero the charCode so you know where to place your character in the size 26 array.
        It's 26 to make a place for every letter of the alphabet.
        "Real" programming languages allow for this functionality w/ a char declaration.
    */
    private getCharCode(char: string): number {
        const zero = 'a'.charCodeAt(0)
        return char.charCodeAt(0) - zero 
    }

    /* 
        Traverse the node.children (similar to node.next or head.left) recursively ...
        ... for every isWord = true parameter. 
    */
    private traverse(node: TNode | undefined, autocomplete: string[]): string[] {
        if (!node) {
            return autocomplete;
        }

        if (node.isWord) {
            autocomplete.push(node.val as string);
        }

        for (let i = 0; i < node.children.length; i++) {
            this.traverse(node.children[i], autocomplete);
        }

        return autocomplete;
    }
}