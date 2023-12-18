import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLogin: boolean = false;

  constructor(private router: Router) {}

  loginHandler() {
    if (this.isLogin) {
      this.router.navigate(['']);
      localStorage.clear();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const tokenString = localStorage.getItem('token');
    this.isLogin = tokenString ? true : false;
  }
}
