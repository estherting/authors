import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  author = {_id: ""};
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getAuthor(params['id']);
    });
  }
  getAuthor(id){
    let observable = this._httpService.getAuthor(id);
    observable.subscribe(data => {
      console.log('got author back: ', data['author'])
      this.author = data['author']
    })
  }
  vote(vote, quoteId){
    vote = Number(vote);
    let observable = this._httpService.vote(vote, quoteId, this.author._id);
    observable.subscribe(data => {
      this.getAuthor(this.author._id)
    })
  }
  deleteQuote(quoteId){
    let observable = this._httpService.deleteQuote(quoteId, this.author._id);
    observable.subscribe(data => {
      this.getAuthor(this.author._id);
    })
  }
}
