export class FavoritesEvents {
  root;

  constructor(root) {
    this.root = document.querySelector(root);
    this.clickObserver();
  }

  actions = {
    "remove": this.deleteRows,
    "search": this.searchUser
  }

  clickObserver = () => {
    this.root.addEventListener("click", event => {
      const {action} = event.target.dataset;
      
      const func = this.actions[action];
      if(!(typeof func === 'function')) return;

      const eventFuncion = func.bind(this);
      eventFuncion(event);
    });
  }
}