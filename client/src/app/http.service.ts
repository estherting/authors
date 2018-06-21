import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getAuthors(){
    return this._http.get('/api/authors');
  }
  edit(author, authorId){
    return this._http.put('/authors/'+authorId, author)
  }
  getAuthor(id){
    return this._http.get('/api/authors/'+id);
  }
  new(author){
    return this._http.post('/authors', author);
  }
  deleteAuthor(id){
    return this._http.delete('/authors/'+id);
  }
  vote(vote, quoteId, authorId){
    return this._http.post('/quotes/'+quoteId+"/"+authorId, {voting: vote})
  }
  newQuote(authorId, newQuote){
    return this._http.post('/authors/write/'+authorId, newQuote)
  }
  deleteQuote(quoteId, authorId){
    return this._http.delete('/authors/'+authorId+'/'+quoteId)
  }
}
