import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchService } from '../search.service';
import { Store } from '@ngrx/store'; 

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  data;
  newData;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private searchService: SearchService,
              private store: Store<any>) { }

  ngOnInit(){
    this.searchService.fetchData().subscribe(data => this.data = data.results);
    for (var i of this.data.count) {
      this.newData.push({
        position: i + 1,
        name: this.data.results[i].name,
        ticker: this.data.results[i].ticker,
        marker: this.data.results[i].marker,
        locale: this.data.results[i].locale,
        primary_exchang: this.data.results[i].primary_exchang,
      });
    }
    //alert(" ,k,lk");
    console.log(this.newData)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  id: number;
  ticker: string;
  marker: string;
  locale: string;
  primary_exchang: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];