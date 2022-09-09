import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ComponentsResponse, CopmponentsRequest } from 'src/app/shared/interfaces/components';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { ComponentsService } from 'src/app/shared/services/comments/comments.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

const LIST: any[] = [
  { name: 'Всі', link: 'all' },
  { name: 'Філадельфія', link: 'filadelfia' },
  { name: 'Каліфорнія', link: 'californian' },
  { name: 'Запечені', link: 'baked' },
  { name: 'Фірмові', link: 'firm' },
  { name: 'Макі', link: 'maki' },
  { name: 'Праміум', link: 'premium' }
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

public goodArr: Array<GoodsResponse> = [];

  constructor(
    private commmpService: ComponentsService,
    private gooService: GoodsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe()
   }


  public listCommponenet: any[] = LIST;
  public getArr!: Array<ComponentsResponse>
  public goodsArr!: Array<GoodsResponse>
  public activeItem: any;
  public compName!: string


  ngOnInit(): void {
    this.getCategory()
    this.getGood()
  
  }

  getCategory(): void {
    this.commmpService.getAll().subscribe(data => {
      this.getArr = data
    })
  }

  getGood(): void {
    this.gooService.getAll().subscribe(data => {
      this.goodsArr = data
        
    })
  }

  getGoodst(): void {
    this.gooService.getAllByComponent(this.compName).subscribe(data => {
      this.goodsArr = data

    })
  }



  onSelectItem(component: ComponentsResponse): void {
    this.activeItem = component;
    this.compName = component.link
    if (this.compName == 'all') {
      this.getGood()
    } else {
      this.getGoodst()
    }

  }



}
