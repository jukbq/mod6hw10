import { Component, OnInit } from '@angular/core';
import { ComponentsResponse } from 'src/app/shared/interfaces/components';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { ComponentsService } from 'src/app/shared/services/comments/comments.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(
    private commmpService: ComponentsService,
    private gooService: GoodsService
  ) { }

  public getArr!: Array<ComponentsResponse>
  public goodsArr!: Array<GoodsResponse>
  public activeItem: any;

  ngOnInit(): void {
    this.getCategory()
    this.getGoodst()

  }

  getCategory(): void {
    this.commmpService.getAll().subscribe(data => {
      this.getArr = data
    })
  }

  getGoodst(): void {
    this.gooService.getAll().subscribe(data => {
      this.goodsArr = data
    })
  }

  onSelectItem(component: ComponentsResponse): void {
    this.activeItem = component;

  }

}
