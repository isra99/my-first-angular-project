import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store'; 

@Injectable({
  providedIn: 'root'
})

export class FetchInfoService {

  data = {};
  constructor(private http: HttpClient,
              private store: Store<any>) {
  }

  fetchProfileData(x){
    console.log("inside fetch 1");
    return this.http.get(`https://api.polygon.io/v1/meta/symbols/${x}/company?&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`);
  }

  fetchOpenClose(x){
    console.log("inside fetch 2");
    return this.data = this.http.get(`https://api.polygon.io/v1/open-close/${x}/2020-10-14?adjusted=true&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`);
  }
  getSymbol(){
    return this.store.select('appReducer');
  }
  getLogo(){
    return this.store.select('appReducer').subscribe(state => {
      return state.info.logo;
    });
  }
  getName(){
    return this.store.select('appReducer').subscribe(state => {
      return state.info.name;
    });
  }
  getOpen(){
    return this.store.select('appReducer').subscribe(state => {
      return state.price.open;
    });
  }
  getHigh(){
    return this.store.select('appReducer').subscribe(state => {
      return state.price.high;
    });
  }
  getLow(){
    return this.store.select('appReducer').subscribe(state => {
      return state.price.low;
    });
  }
  getClose(){
    return this.store.select('appReducer').subscribe(state => {
      return state.price.close;
    });
  }
  getPrevious(){
    return this.store.select('appReducer').subscribe(state => {
      return state.price.preMarket;
    });
  }
}
