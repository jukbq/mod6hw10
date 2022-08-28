import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, NgForm, NumberValueAccessor, Validators } from '@angular/forms';
import { GoodsResponse } from 'src/app/shared/interfaces/goods';
import { ComponentsResponse } from 'src/app/shared/interfaces/components';
import { ComponentsService } from 'src/app/shared/services/comments/comments.service';
import { GoodsService } from 'src/app/shared/services/goods/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {




  constructor(
    private formBuilder: FormBuilder,
    private gooService: GoodsService,
    private commentsService: ComponentsService,
    private storsge: Storage
  ) { }


  public category: Array<ComponentsResponse> = [];
  public goods: Array<GoodsResponse> = [];
  public goodForm!: FormGroup;
  public good_form = false;
  private goodID = 0;
  public edit_status = false;
  public uploadPercent!: number;


  ngOnInit(): void {
    this.getCategory()
    this.initGoodForm()
    this.getGoodst()
  }

  initGoodForm(): void {
    this.goodForm = this.formBuilder.group({
      component: [null, Validators.required],
      name: [null, Validators.required],
      compound: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      images: [null, Validators.required],
      count: [1]

    })
  }



  getCategory(): void {
    this.commentsService.getAll().subscribe(data => {
      this.category = data;
      this.goodForm.patchValue({
        category: this.category[0].id
      })
      console.log(this.category);
      
    })

  }


  getGoodst(): void {
    this.gooService.getAll().subscribe(data => {
      this.goods = data
    })
  }


  creatGood() {
    if (this.edit_status) {
      this.gooService.editGood(this.goodForm.value, this.goodID).subscribe(() => {
        this.getGoodst();
        this.uploadPercent = 0
      });
    }
    else {
      this.gooService.addGood(this.goodForm.value).subscribe(() => {
        this.getGoodst();
        this.uploadPercent = 0
      });
    }

    this.edit_status = false;
    this.good_form = false;
    this.goodForm.reset();
  };




  editGood(good: GoodsResponse) {

    this.goodForm.patchValue({
      component: good.component,
      name: good.name,
      compound: good.compound,
      weight: good.weight,
      price: good.price,
      images: good.images

    });
    this.good_form = true;
    this.edit_status = true;
    this.goodID = good.id;
  };


  delGood(index: GoodsResponse) {
    const task = ref(this.storsge, index.images);
    deleteObject(task)
    this.gooService.delGood(index.id).subscribe(() => {
      this.getGoodst();
    });
  }
  ;



  upload(event: any): void {
    const file = event.target.files[0]
    this.loadFIle('images', file.name, file)
      .then(data => {
        if (this.uploadPercent == 100) {
          this.goodForm.patchValue({
            images: data
          })

        }
      })
      .catch(err => {
        console.error(err)
      })

  }

  async loadFIle(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storsge, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        })
        await task;
        url = await getDownloadURL(storageRef)
        console.log(this.uploadPercent);

      } catch (e: any) {
        console.error(e)
      }

    } else {
      console.log('Wtong fike');

    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storsge, this.valueByControl('images'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.uploadPercent = 0;
      this.goodForm.patchValue({
        images: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.goodForm.get(control)?.value;
  }


}
