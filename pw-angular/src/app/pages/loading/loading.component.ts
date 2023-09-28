import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(private route: ActivatedRoute, private router: Router) {


    window.setTimeout(() => {
      this.route.queryParams
        .subscribe(params => {
          let id = params['id'];
          let page = params['page']
          if (id && page) {
            this.router.navigate(['bankAccounts/transactions'], { queryParams: { id: id, page: page } })
          }
        }
        );

    }, 1500)


  }



}
