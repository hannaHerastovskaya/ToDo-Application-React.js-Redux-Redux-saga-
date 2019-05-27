const randomInteger = (min, max, arr) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);

    arr.forEach(e => (
        e.idList === rand
            ? this.randomInteger(min, max, arr)
            : e.tasks.forEach(i => (i.id === rand ? this.randomInteger(min, max, arr) : rand))));
    return rand;
};

export default randomInteger;
