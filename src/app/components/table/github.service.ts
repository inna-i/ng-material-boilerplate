import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface GitHubUser {
  id: number;
  login: string;
  user_view_type: string;
  avatar_url: string;
  html_url: string;
  // ... other properties
}

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private apiUrl = 'https://api.github.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<GitHubUser[]> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    });

    return this.http.get<GitHubUser[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUser(username: string): Observable<GitHubUser> {
    const url = `${this.apiUrl}/${username}`;
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    });

    return this.http.get<GitHubUser>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}