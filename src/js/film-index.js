export default class FilmIndex {
  constructor() {
    this.id = 0;
    this.object = {};
    this.arr = [];
    // this.genres = [];
  }

  newId(number) {
    this.id = Number(number);
  }

  newObject() {
    const id = this.id;
    this.object = this.arr[id];
  }

  newArr(arr) {
    this.arr = arr;
  }

  // newGenres(arr) {
  //   this.genres = arr;
  // }
}
