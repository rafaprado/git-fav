export class Favorites {

  static load() {
    return JSON.parse(localStorage.getItem('@github-favorites')) || [];
  }

  static async search(userName) {
    const endpoint = `https://api.github.com/users/${userName}`;

    const request = await fetch(endpoint);
    const response = await request.json();

    return response;
  }

  static save(favorites) {
    localStorage.setItem('@github-favorites', JSON.stringify(favorites));
  }

  static delete(userName, list) {
    const newList = list.filter(user => user.login !== userName)

    this.save(newList);
    return newList;
  }

}