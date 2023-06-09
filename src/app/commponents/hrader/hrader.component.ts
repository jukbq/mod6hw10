import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { faFilm, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hrader',
  templateUrl: './hrader.component.html',
  styleUrls: ['./hrader.component.scss']
})
export class HraderComponent implements OnInit {


  public summ = 0;
  public count = 0;
  public activeClass = true;
  public goodsData!: GoodsResponse
  public basket: Array<GoodsResponse> = []

  trashIcon = faTrash;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
   
  }

  active() {
    this.activeClass
  }


}
