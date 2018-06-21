import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  authorToEdit = "hello";
  idToEdit = "";
  error: string;
  constructor(private _httpService: HttpService, private _route: ActivatedRoute,  private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.idToEdit = params['id'];
      this.getAuthor();
    })
  }

  getAuthor(){
    let observable = this._httpService.getAuthor(this.idToEdit);
    observable.subscribe(data => {
      console.log('got author: ', data)
      this.authorToEdit = data['author'];
    })
  }

  edit(){
    let observable = this._httpService.edit(this.authorToEdit, this.idToEdit);
    observable.subscribe(data => {
      if (data['error']){
        this.error = data['error'];
      }
      else {
        console.log('edited data', data)
        this._router.navigate(['/home'])
      }
    })
  }
}
