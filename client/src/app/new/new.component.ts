import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newAuthor = {name: ""};
  // authorAdded = false;
  error = "";
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  }
  new(){
    let observable = this._httpService.new(this.newAuthor);
    observable.subscribe(data => {
      if(data['error']){
        this.error = data['error'];
        console.log(this.error)
      } else {
        console.log('success!')
        // this.authorAdded = true;
        this.goHome();
      }
    })
  }
  goHome() {
    this._router.navigate(['/home']);
  }

}
