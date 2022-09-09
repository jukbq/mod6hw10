import { Component, OnInit } from '@angular/core';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
  constructor(
    private gooService: GoodsService
  ) { }

  public goodsArr!: Array<GoodsResponse>
  public compName = 'drinks'
  ngOnInit(): void {
    this.getGoodst()
  }

  getGoodst(): void {
    this.gooService.getAllByComponent(this.compName).subscribe(data => {
      this.goodsArr = data
  
    })
  }
}
