import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { ThemeToggleComponent } from '../shared/components/theme-toggle/theme-toggle.component';
import { routes } from '../app.routes';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    ThemeToggleComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  private router: Router = inject(Router);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  isHandset: boolean = false;
  private mediaQuery: MediaQueryList;
  private mediaQueryListener!: () => void;
  private route: ActivatedRoute = inject(ActivatedRoute);
  routes: Routes = routes[1]?.children?.filter(
    (r) => r.path && r.path !== '**'
  ) || [{ path: '', data: { icon: '' } }];
  actualRoute: { title: string; icon: string } = { title: '', icon: '' };

  constructor() {
    this.mediaQuery = window.matchMedia('(max-width: 599px)');
  }

  ngOnInit() {
    this.updateActualRoute();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActualRoute();
      }
    });
  }

  ngAfterViewInit() {
    this.isHandset = this.mediaQuery.matches;
    this.mediaQueryListener = () => {
      this.isHandset = this.mediaQuery.matches;
      this.cdr.detectChanges();
    };
    this.mediaQuery.addEventListener('change', this.mediaQueryListener);
  }

  ngOnDestroy() {
    this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
  }

  private updateActualRoute() {
    const currentRoute = this.routes.find(
      (r) => r.path === this.route.snapshot.firstChild?.routeConfig?.path
    ) as any;

    if (currentRoute) {
      this.actualRoute = {
        title: currentRoute.data?.title || '',
        icon: currentRoute.data?.icon || '',
      };
    } else {
      this.actualRoute = { title: '', icon: '' };
    }
  }
}
