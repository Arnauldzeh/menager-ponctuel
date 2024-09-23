import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  constructor(private router: Router){ }

  ngOnInit(): void{
    setTimeout(() => this.router.navigateByUrl('/home'), 3000)
  }
}
