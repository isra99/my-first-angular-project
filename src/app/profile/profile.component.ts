import { Component, OnInit } from '@angular/core';
import { FetchInfoService } from '../fetch-info.service'
import { Store } from '@ngrx/store'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
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
    if(this.symbol === ''){
      this.show = false;
    } else{
      if(!(this.oldSymbol === this.symbol)){
        this.show = false;
        this.info.fetchProfileData(this.symbol).subscribe(data => {
          this.store.dispatch({type: "SET_INFO", data:data}); 
          this.profileData = data  
          this.load = true;
          this.delay(this.randomInteger(500, 1500));
        });
        this.info.fetchOpenClose(this.symbol).subscribe(data => {
          this.store.dispatch({type: "SET_PRICE", data:data});
          this.stockData = data;
          this.load = false;
          this.delay(this.randomInteger(500, 1500));
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
