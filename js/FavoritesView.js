import { FavoritesEvents } from "./FavoritesEvents.js";
import { Favorites } from "./Favorites.js";

export class FavoritesView extends FavoritesEvents {
  favorites;

  constructor(root) {
    super(root);
    
    try {
      this.favorites = Favorites.load();
      if(!this.favorites) throw new Error("ERRO: conexão mal sucedida!");

    }catch(e) {
      alert(e.message)
    }

    this.renderFavorites(this.favorites)
  }
  
  deleteRows(event) {
    const isOk = confirm("Tem certeza que deseja apagar esse registro?");
    if(!isOk) return;

    const row = event.target.closest("tr");
    this.favorites = Favorites.delete(row.dataset.user, this.favorites);
    
    row.remove();
  }

  searchUser() {
    const {value} = document.querySelector(".search input");
    Favorites.search(value).then(user => this.addUser(user))
  }

  addUser(user) {
    if(this.favorites.find(item => item.login === user.login)) return;

    this.root.querySelector("table tbody").append(this.buildRow(user));
    Favorites.save([...this.favorites, user]);

    this.favorites = Favorites.load();
  }

  renderFavorites() {

    this.favorites.forEach(user => {
      this.root.querySelector("table tbody").append(this.buildRow(user));
    })
  }

  buildRow({ login, name, public_repos, followers }) {
    const row = document.createElement('tr');
    row.dataset.user = login;

    const template = `
      <td class="user">
        <img src="https:/github.com/${login}.png" alt="Imagem de ${name}" />

        <div class="user__info">
          <p class="user__name">${name}</p>
          <span class="user__address">/${login}</span>
        </div>
      </td>

      <td>${public_repos}</td>

      <td>${followers}</td>

      <td>
        <span class="remove" data-action="remove">
          Remover
        </span>
      </td>
    `;

    row.innerHTML = template;

    return row;
  }

}