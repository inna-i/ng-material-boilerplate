import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableDataSource } from './table-datasource';
import { GitHubService, GitHubUser } from './github.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<GitHubUser>;

  dataSource!: TableDataSource;
  displayedColumns = ['id', 'login', 'user_view_type'];

  constructor(private gitHubService: GitHubService) {
    this.dataSource = new TableDataSource(this.gitHubService);
  }

  ngOnInit(): void {
    this.dataSource.loadUsers(); // Load users in ngOnInit
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    console.log('data ', this.dataSource)

  }
}