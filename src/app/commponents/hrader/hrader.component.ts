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
    this.addToBasket()
    this.updateBasket()
  }

  active() {
    this.activeClass
  }

  quantity_goods(goods: GoodsResponse, value: boolean): void {
    if (value) {
      ++goods.count

      this.editBasket(goods, value)

    } else if (!value && goods.count > 1) {
      --goods.count
      this.editBasket(goods, value)
    }

  }

  addToBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.summPrice()

  }

  summPrice(): void {
    this.summ = this.basket.reduce((summ: number, good: GoodsResponse) =>
      summ + good.count * good.price, 0)
    this.count = this.basket.reduce((count: number, goods: GoodsResponse) =>
      count + goods.count, 0)
  }


  editBasket(good: any, value: boolean) {
    let basket: Array<GoodsResponse> = []
    basket = JSON.parse(localStorage.getItem('basket') as string);
    let index = basket.findIndex(index => index.id === good.id)
    if (basket.some(good => good.id === good.id)) {
      if (value) {
        basket[index].count += 1;
      } if (!value) {
        basket[index].count -= 1;
      }
    }
    else {
      basket.push(good);
    }
    localStorage.setItem('basket', JSON.stringify(basket))
    this.orderService.chageBasket.next(true)
  }

  delOrder(order:any){
    let basket: Array<GoodsResponse> = [];
    basket = JSON.parse(localStorage.getItem('basket') as string);
    console.log(basket);
    let index = basket.findIndex(index => index.id === order.id);
    basket.splice(index, 1);
    localStorage.setItem('basket', JSON.stringify(basket))
    this.orderService.chageBasket.next(true)
  
    
  }

  addOrder(order: any){
       this.orderService.addOrder(order).subscribe(() => {
      localStorage.removeItem('basket');
         location.reload();
            } )

    
    
  }




  updateBasket(): void {
    this.orderService.chageBasket.subscribe(() =>
      this.addToBasket()
    )
  }

}
