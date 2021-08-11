import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface myData{
  results : object
}

@Injectable({
  providedIn: 'root'
})


export class SearchService {

  constructor(private http: HttpClient) {

  }

  fetchData(){
    return this.http.get<myData>(`https://api.polygon.io/v3/reference/tickers?search=&limit=20000&apiKey=fLlAuMmLGw7lrlP7bl7lFvvagKR6eatF`);
  }
}
