import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store'; 

interface myData{
  results : object;
  count: number;
}

@Injectable({
  providedIn: 'root'
})


export class SearchService {

  constructor(private http: HttpClient,
              private store: Store<any>) {

  }

  fetchData(x: string, state?: string){
    if(state === "EMPTY"){
      return this.http.get<myData>(`https://api.polygon.io/v3/reference/tickers?search=&limit=20000&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`);
    }
    return this.http.get<myData>(`https://api.polygon.io/v3/reference/tickers?search=${x}&limit=20000&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`);

  }
  getInputValue(){
    return this.store.select('appReducer');
  }
}
