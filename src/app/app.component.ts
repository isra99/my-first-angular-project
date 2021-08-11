import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { Store } from '@ngrx/store'; 

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'my-first-angular-project';
  result = {}
  constructor(private searchService: SearchService,
              private store: Store<any>){
    
  }
  searchText;

  heroes = {};

  ngOnInit(){
    this.searchService.fetchData().subscribe(data => this.heroes = data.results);
  }

  handleEvent(e){
    this.store.dispatch({type: "SET_SYMBOL", data:e}); 
  }
}
