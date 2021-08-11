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
    this.searchService.fetchData("AAPL").subscribe(data => this.heroes = data.results);
  }

  handleChange(e){
    this.store.dispatch({type: "SET_INPUT_VALUE", data:e.target.value});
    this.store.dispatch({type: "SHOW_PROFILE", data:false});
  }
  handleClick(e){
    this.store.dispatch({type: "SET_SYMBOL", data:e}); 
  }
}
