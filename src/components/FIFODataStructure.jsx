class Node{
    constructor(k, v){
        this.key = k;
        this.value = v;
        this.prev = null;
        this.next = null;
    }
}

class FIFOCache{
    constructor(cap){
        this.maxSize = cap;
        this.curSize = 0;

        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;

        this.hits = 0;
        this.miss = 0;
        this.keyNodeMap = new Map();
    }

    get(k){
        if(this.keyNodeMap.has(k)){
            this.hits += 1;
            return this.keyNodeMap.get(k).value;
        }
        this.miss += 1;
        return -1;
    }

    put(k, v){
        if(this.maxSize === 0)  return;

        if(this.keyNodeMap.has(k)){
            const foundNode = this.keyNodeMap.get(k);
            foundNode.value = v;

            return;
        }
        
        if(this.maxSize === this.curSize){
            const foundNode = this.tail.prev;

            this.keyNodeMap.delete(foundNode.key);
            this.unlinkNode(foundNode);

            this.curSize -= 1;
        }
        this.curSize += 1;
        const newNode = new Node(k, v);
        this.addNode(newNode);
        this.keyNodeMap.set(k, newNode);
    }

    addNode(givenNode){
        const firstNode = this.head.next;

        this.head.next = givenNode;
        firstNode.prev = givenNode;

        givenNode.next = firstNode;
        givenNode.prev = this.head;
    }

    unlinkNode(givenNode){
        givenNode.prev.next = givenNode.next;
        givenNode.next.prev = givenNode.prev;
    }

    hitRatio(){
        if(this.hits + this.miss === 0) return 0.0;
        return this.hits / (this.hits + this.miss);
    }

    currentState(){
        const state = [];
        let currentNode = this.head.next;
        while(currentNode != this.tail){
            state.push({key: currentNode.key, value: currentNode.value});
            currentNode = currentNode.next;
        }
        return state;
    }

    mapSnapshot(){
        return Array.from(this.keyNodeMap.entries()).map(([k, node]) => ({
            key: k, 
            value: node.value,
            addr: `0x${Math.abs((node.key * 1e9 + 7) >>> 0).toString(16)}`,
        }));
    }

    size(){
        return this.curSize;
    }
}

export default FIFOCache;