import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchService } from '../search.service';
import { Store } from '@ngrx/store'; 

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;
  inputValue = '';
  oldInputVale = '';
  count;
  data;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private searchService: SearchService,
              private store: Store<any>) { }

  ngOnInit(){
    this.searchService.fetchData(this.inputValue, "EMPTY").subscribe(data => {
      this.store.dispatch({type: "SET_SEARCH_RESULT", data:data});
      this.count = data.count;
      let newData: PeriodicElement[] = [];
      for(let i = 0; i < this.count; i++) {
        let temp:PeriodicElement = {
          position: i + 1,
          name: data.results[i].name,
          weight: data.results[i].ticker,
          symbol: data.results[i].market,
        }
        newData.push(temp);
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(newData);
      this.dataSource.paginator = this.paginator;
    });
  }
  ngDoCheck(){
    if(!(this.inputValue === '')){
      if(!(this.inputValue === this.oldInputVale)){
        this.searchService.fetchData(this.inputValue).subscribe(data => {
          this.store.dispatch({type: "SET_SEARCH_RESULT", data:data});
          this.count = data.count;
          let newData: PeriodicElement[] = [];
          for(let i = 0; i < this.count; i++) {
            let temp:PeriodicElement = {
              position: i + 1,
              name: data.results[i].name,
              weight: data.results[i].ticker,
              symbol: data.results[i].market,
            }
            newData.push(temp);
          }
          this.dataSource = new MatTableDataSource<PeriodicElement>(newData);
          this.dataSource.paginator = this.paginator;
        });
      }
    }
    this.oldInputVale = this.inputValue;
    this.searchService.getInputValue().subscribe(state => {
      this.inputValue = state.inputValue;
    });
    console.log("log", this.inputValue);
  }

  handleClick(row){
    this.store.dispatch({type: "SET_SYMBOL", data:row.weight});
    this.store.dispatch({type: "SHOW_PROFILE", data:true});
  }
}

export interface PeriodicElement {
  position?: number;
  name?: string;
  weight?: string;
  symbol?: string;
}