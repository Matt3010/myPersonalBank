import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FontService } from 'src/app/services/utils/font.service';

@Component({
  selector: 'app-img-account',
  templateUrl: './img-account.component.html',
  styleUrls: ['./img-account.component.scss']
})
export class ImgAccountComponent{


  @Input() firstName!: string
  @Input() lastName!: string



}
