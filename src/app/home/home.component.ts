import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface SWAPIObject {
  count: number,
  results: any[],
  next: string
}

export interface character {
  name: string,
  height: string,
  mass: string,
  hair_color: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  apiLength = 0;
  displayedColumns: string[] = ['name', 'height', 'mass', 'hair_color'];
  dataSource: MatTableDataSource<character>;
  API_URL = "https://swapi.dev/api/people/"

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiService: ApiService) { }

  
  ngOnInit(){
    this.apiService.get(this.API_URL).subscribe( (data: SWAPIObject) => {
        this.apiLength = data.count;
        this.dataSource = new MatTableDataSource(data.results)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    })
  }
}
