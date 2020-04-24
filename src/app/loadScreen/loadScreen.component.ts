import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from '../../../node_modules/jquery';

@Component({
  selector: 'app-loadScreen',
  templateUrl: './loadScreen.component.html',
  styleUrls: ['./loadScreen.component.scss']
})
export class loadScreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.startTimedNavigation();
  }

  startTimedNavigation() {
    setTimeout(
      function () {
        $('#message').removeClass('fadeIn');
        $('#message').addClass('fadeOut');
      }, 5000);

    setTimeout(
      () => {
        this.router.navigate(['home'])
      }, 5500);
  }

}
