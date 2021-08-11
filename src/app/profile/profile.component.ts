import { Component } from '@angular/core';
import { FetchInfoService } from '../fetch-info.service'
import { Store } from '@ngrx/store'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  public show = false;
  public load = false;
  public symbol = '';
  public oldSymbol = '';
  public profileData;
  public stockData;
  constructor(private info: FetchInfoService,
              private store: Store<any>) { }
  
  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  ngDoCheck(): void {
    this.info.getShow().subscribe(state => {
      this.show = state.showProfile;
    });
    if(this.symbol === ''){
      this.show = false;
    } else{
      if(!(this.oldSymbol === this.symbol)){
        this.show = false;
        this.load = true;
        this.info.fetchProfileData(this.symbol).subscribe(data => {
          this.store.dispatch({type: "SET_INFO", data:data}); 
          this.profileData = data  
          this.delay(this.randomInteger(500, 1500));
        });
        console.log("LOGO", this.profileData.logo);
      
        this.info.fetchOpenClose(this.symbol).subscribe(data => {
          this.store.dispatch({type: "SET_PRICE", data:data});
          this.stockData = data;
          this.delay(this.randomInteger(500, 1500));
          this.load = false;
        }); 
        this.store.dispatch({type: "LOAD_PROFILE", data:false});
        this.show = true;
      }
    }
    this.oldSymbol = this.symbol;
    this.info.getSymbol().subscribe(state => {
      this.symbol = state.symbol;
    });
  }
}
