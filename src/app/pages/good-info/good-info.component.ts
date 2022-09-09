import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-cood-info',
  templateUrl: './good-info.component.html',
  styleUrls: ['./good-info.component.css']
})
export class CoodInfoComponent implements OnInit {

  public goodsData!: GoodsResponse

  constructor(
    private goodService: GoodsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.goodsData = response['goodInfo']
    })
  }

  quantity_goods(good: GoodsResponse, value: boolean): void {
    if (value) {
      ++good.count
    } else if (!value && good.count > 1) {
      --good.count
    }
  }

  addToBasket(goods: GoodsResponse) : void{
let basket = []
if(localStorage.length > 0 && localStorage.getItem('basket')){
  basket = JSON.parse(localStorage.getItem('basket')as string);
}
    basket.push(goods);
    goods.count = 1
  }


}
