class Node {
    constructor(k, v){
        this.key = k;
        this.value = v;
        this.freq = 1;
        this.prev = null;
        this.next = null;
    }
}

class DLL{
    constructor(){
        this.nodes = 0;

        this.head = new Node(-1, -1);
        this.tail = new Node(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    addNode(givenNode){
        const tempNode = this.head.next;
        this.head.next = givenNode;
        tempNode.prev = givenNode;

        givenNode.next = tempNode;
        givenNode.prev = this.head;

        this.nodes += 1;
    }

    unlinkNode(givenNode){
        const prevNode = givenNode.prev;
        const nextNode = givenNode.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        this.nodes -= 1;
    }

    removeLast(){
        if(this.nodes > 0){
            const lastNode = this.tail.prev;
            this.unlinkNode(lastNode);
            return lastNode;
        }
        return null;
    }
}

class LFUCache{
    constructor(cap){
        this.maxSize = cap;
        this.curSize = 0;

        this.hits = 0;
        this.miss = 0;
        this.minFreq = 0;

        this.freqListMap = new Map();
        this.keyNodeMap = new Map();
    }

    put(k, v){
        if(this.maxSize === 0)  return;
        
        if(this.keyNodeMap.has(k)){
            const foundNode = this.keyNodeMap.get(k);
            foundNode.value = v;
            this.updateFreqListMap(foundNode);
            return;
        }

        if(this.curSize === this.maxSize){
            const list = this.freqListMap.get(this.minFreq);
            if(list){
                const toDeleteNode = list.removeLast();
                if(toDeleteNode){
                    this.keyNodeMap.delete(toDeleteNode.key);
                    this.curSize -= 1;
                    if(list.nodes === 0)
                        this.freqListMap.delete(this.minFreq);
                }
            }
        }

        this.minFreq = 1;
        let list = this.freqListMap.get(1) || new DLL();
        const newNode = new Node(k, v);
        list.addNode(newNode);
        this.freqListMap.set(1, list);
        this.keyNodeMap.set(k, newNode);
        this.curSize += 1;
        
    }

    get(k) {
        if(this.keyNodeMap.has(k)){
            this.hits += 1;
            const foundNode = this.keyNodeMap.get(k);
            this.updateFreqListMap(foundNode);
            return foundNode.value;
        }
        this.miss += 1;
        return -1;
    }

    updateFreqListMap(givenNode){
        this.freqListMap.get(givenNode.freq).unlinkNode(givenNode);

        if(this.minFreq === givenNode.freq && this.freqListMap.get(givenNode.freq).nodes === 0){
            this.freqListMap.delete(givenNode.freq);
            this.minFreq += 1;
        }

        givenNode.freq += 1;
        let nextHigherFreqList = this.freqListMap.get(givenNode.freq) || new DLL();

        nextHigherFreqList.addNode(givenNode);
        this.freqListMap.set(givenNode.freq, nextHigherFreqList);
        this.keyNodeMap.set(givenNode.key, givenNode);
    }

    
    size() { 
        return this.curSize; 
    }

    hitRatio() {
        if (this.hits + this.miss === 0) return 0.0;
        return this.hits / (this.hits + this.miss);
    }

    currentState() {
        const state = [];
        const freqs = Array.from(this.freqListMap.keys()).sort((a, b) => a - b);
        for (const freq of freqs) {
            const dll = this.freqListMap.get(freq);
            let cur = dll.head.next;
            while (cur !== dll.tail) {
                state.push({ key: cur.key, value: cur.value, freq });
                cur = cur.next;
            }
        }
        return state;
    }

    mapSnapshot() {
    return Array.from(this.keyNodeMap.values()).map(n => ({
        key: n.key,
        value: n.value,
        freq: n.freq,
        addr: `0x${Math.abs((n.key * 1e9 + 7) >>> 0).toString(16)}`,
    }));
    }
}

export default LFUCache;