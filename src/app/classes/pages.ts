import { Component, OnChanges, SimpleChanges } from "@angular/core";


export class Pages{


  pages: Array<any> | null = null;

  constructor() {
    this.pages = [
      {
        title: "<-- Go back",
        url: "profile",
      },
    ];
  }

  getPagesByRoute(route: string) {
    if (route === "/profile") {
      return []
    } else if (route === "/research/:id/movements/1") {

      return [
       {
        title: "<-- Go back",
        url: "profile",
      },
    ];

    } else {
      return this.pages;
    }
  }
}

export default new Pages();
