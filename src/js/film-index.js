export default class FilmIndex {
  constructor() {
    this.id = 0;
    this.object = [];
    this.arr = [];
  }

  newId(number) {
    this.id = number;
  }

  newObject() {
    this.object.push(this.arr[this.id]);
  }

  newArr(arr) {
    this.arr = arr;
  }
}
