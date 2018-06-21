import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  authorId = "";
  author = {name: ""};
  newQuote = {content: ""}
  error = [];
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.authorId = params['id'];
      this.getAuthor(params['id'])
    });
  }
  getAuthor(id){
    let observable = this._httpService.getAuthor(id);
    observable.subscribe(data => {
      this.author = data['author'];
    })
  }
  postQuote(){
    let observable = this._httpService.newQuote(this.authorId, this.newQuote);
    observable.subscribe(data => {
      if (data['error']){
        console.log('got here')
        this.error = data['error']
      } else {
        this._router.navigate(['/quotes/'+this.authorId])
      }

    })
  }
}
