class Node {
  constructor(k, v) {
    this.key = k;
    this.value = v;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(cap) {
    if (!Number.isInteger(cap) || cap < 0)
      throw new Error("Capacity must be a positive integer");
    this.capacity = cap;

    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.hits = 0;
    this.miss = 0;
    this.hashMap = new Map();
  }

  get(k) {
    if (this.hashMap.has(k)) {
      this.hits += 1;
      const foundNode = this.hashMap.get(k);
      this.unlinkNode(foundNode);
      this.addNode(foundNode);
      return foundNode.value;
    }
    this.miss += 1;
    return -1;
  }

  put(k, v) {
    if (this.hashMap.has(k)) {
      this.hits += 1;
      const foundNode = this.hashMap.get(k);
      foundNode.value = v;
      this.unlinkNode(foundNode);
      this.addNode(foundNode);
      return;
    }
    if (this.hashMap.size === this.capacity) {
      const lastNode = this.tail.prev;
      this.hashMap.delete(lastNode.key);
      this.unlinkNode(lastNode);
    }
    this.miss += 1;
    const newNode = new Node(k, v);
    this.addNode(newNode);
    this.hashMap.set(k, newNode);
  }

  addNode(givenNode) {
    const temp = this.head.next;
    this.head.next = givenNode;
    givenNode.prev = this.head;
    temp.prev = givenNode;
    givenNode.next = temp;
  }

  unlinkNode(givenNode) {
    const prevNode = givenNode.prev;
    const nextNode = givenNode.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }

  hitRatio() {
    if (this.hits + this.miss === 0) return 0.0;
    return this.hits / (this.hits + this.miss);
  }

  currentState() {
    const state = [];
    let currentNode = this.head.next;
    while (currentNode != this.tail) {
      state.push({ key: currentNode.key, value: currentNode.value });
      currentNode = currentNode.next;
    }
    return state;
  }

  mapSnapshot() {
    return Array.from(this.hashMap.entries()).map(([k, node]) => ({
      key: k,
      value: node.value,
      addr: `0x${Math.abs((node.key * 1e9 + 7) >>> 0).toString(16)}`,
    }));
  }

  size() {
    return this.hashMap.size;
  }

  capacityLeft() {
    return Math.max(0, this.capacity - this.hashMap.size);
  }
}

export default LRUCache;
