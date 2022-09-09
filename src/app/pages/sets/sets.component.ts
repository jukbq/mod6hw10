import { Component, OnInit } from '@angular/core';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
  constructor(
    private gooService: GoodsService
  ) { }

  public goodsArr!: Array<GoodsResponse>
  public compName = 'sets'
  ngOnInit(): void {
    this.getGoodst()
  }

  getGoodst(): void {
    this.gooService.getAllByComponent(this.compName).subscribe(data => {
      this.goodsArr = data
 
    })
  }
}
