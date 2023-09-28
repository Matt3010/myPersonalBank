import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './general-ricerca.component.html',
  styleUrls: ['./general-ricerca.component.scss']
})
export class GeneralRicercaComponent {

  tab: string | null = "period";
  id: string | null = null

  constructor(private route: ActivatedRoute, private router: Router){
    const tab = this.route.snapshot.queryParamMap.get("tab") ;
    this.id = this.route.snapshot.queryParamMap.get("id") ;
    this.tab = ["number", "type", "period" ].includes(tab!) ? tab : "period";
  }

 setTab(tab: string) {
    this.router.navigate([], {queryParams: { id: this.id,tab }})
               .then(() => (this.tab = tab));
  }

}
