import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { trigger, state, transition, style, animate} from '@angular/animations';
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";
import { Output, EventEmitter } from '@angular/core';
import { SearchService } from 'src/app/service/search.service';



@Component({
  selector: 'app-header',
   standalone: true, // obbligatorio
   imports: [CommonModule, FormsModule, RouterModule, NgbCollapse],
  template: `
    <!-- Navigation -->
    <nav class="animated fadeInDown navbar navbar-expand-lg navbar-light fixed-top" id="mainNav"
    [@fade]="state">
      <!-- <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav"> -->
      <div class="container">
        <a class="navbar-brand" routerLink=""><i class="fa fa-book"></i>Book</a>       
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
          (click)="isCollapsed = !isCollapsed">
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div [ngbCollapse]="!isCollapsed" class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" *ngFor="let link of linkMenu">
              <!-- <a class="nav-link" [routerLink]="this.auth.checkDir() + link.url">{{link.text}}</a>   -->
              <a class="nav-link" [routerLink]="['/', link.url]">{{ link.text }}</a>
            </li>
            
            <li *ngIf="!this.auth.notExpired(); else logout" class="nav-item">
              <a class="nav-link" routerLink="login">Login <i class="fa fa-unlock"></i></a>       
              <!-- {{this.auth.notExpired()}} -->
            </li>
            <ng-template #logout >
               <li  class="nav-item">
              <a class="nav-link" routerLink="logout">Logout <i class="fa fa-lock"></i></a>       
              <!-- {{this.auth.notExpired()}} -->
            </li>
            </ng-template>
            <!-- <li class="nav-item">
              <a class="nav-link" routerLink="logout">Logout</a>
            </li> -->
            <li *ngIf="auth.notExpired()" class="nav-item">
              <a class="nav-link" routerLink="dashboard">Dashboard</a>
            </li>

            <li *ngIf="auth.notExpired()" class="nav-item">
              <a class="nav-link" routerLink="profilo">Profilo</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
            <!-- <li class="nav-item">
              <a class="nav-link" routerLink="dashboard">Book</a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav> -->

    <!-- Page Header -->
    <header
      class="masthead bgImg">
      <!-- style="background-image: url('../../../assets/img/home-bg.jpg')"
    > -->
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1 class="title">I love book <i [style.color]='red' class="fa fa-heart"
              aria-hidden="true"></i></h1>
              <span class="subheading"
                >La bellezza non è che una promessa di felicità. <br>
                  <small>
                    <i>(Stendhal, Dell'amore)</i>
                  </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- <div class="subHeader"></div> -->
     <div class="subHeader d-flex justify-content-center align-items-center">

      <div *ngIf="auth.notExpired()" style="width: 40%;">
        <input 
          type="text"
          class="form-control"
          placeholder="Cerca libro..."
          [(ngModel)]="searchText"
          (input)="onSearch()">
      </div>

    </div>


  `,

  styles: [
    `
      .subHeader{
        width: 100%;
        height: 60px;
        border: 1px solid #dadada;
        margin-top: 0 !important;
        margin-bottom: 20px;
        background: #f3f3f3f3;
        padding-top: 0px;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px rgba(0,0,0,0.22);
      }
      .subHeader ul li{
        display: table-cell;
        vertical-align: middle;
      }
      .subHeader ul li a{
        font-family: 'Montserrat', sans-serif;
        color: #424242;
        text-transform: uppercase;
        font-weight: bold;
      }
      .subHeader > ul > li > a {
        background-color: #f3f3f3f3;
        border-right: 1px solid #d3d3d3;
        padding-left: 180px;
        right: 30px;
        padding-top: 0;
        height: 50px !important;
        display: table-cell;
        width: 25% !important;
        vertical-align: middle;
      }
      .sticky{
        background: #fff !important;
        box-shadow: 0 3px 12px 0 rgba(0,0,0,0.7);
        position: fixed !important;
        color: #444 !important;
        top: 0 !important;
        height: auto;
        max-height: 50px;
        float: left;
        color: #333 !important;
      }
      .sticky a.navbar-brand{
        color: #222 !important;
        font-weight: bold !important;
      }
      .sticky li a{
        color: #222 !important;
        font-weight: bold !important;
      }
      .bgImg {
        background-image: url(../../../assets/img/home-bg.jpg);
        max-height: 300px;
      }

      /* .masthead {
        max-height: 450px;
      } */
      .fa.fa-book {
        margin-right: 5px !important;
        color: orange;
      }
      .fa.fa-lock{
        margin-left: 5px;
        margin-top: -3px;
        font-size: 1rem;
        color: #212529;
      }
      .fa.fa-unlock{
          margin-left: 5px;
          margin-top: -3px;
          font-size: 1rem;
          color: green;
      }
      /* .title i.fa-heart {
        color: red;
      } */
      /* .site-heading .title i{
  color:white;
} */
      /* .subheading i.fa-heart {
        color: red;
      } */
      /* .subheading{
  color:white;
} */

      .navbar-brand {
        font-size: 2.5rem;
        font-family: 'Amatic SC', cursive;
      }
       .title {
        font-size: 7.2rem !important;
        font-family: 'Amatic SC', cursive;
        /* color: #fff;
        z-index: 4; */
      } 
      .title {
        margin-top: -80px !important;
        font-size: 6rem !important;
        font-family: 'Amatic SC', cursive;
      }

      #mainNav .navbar-nav > li.nav-item > a {
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      .header.masthead{
        margin-bottom: 0 !important;
      }

      header.masthead .overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        max-height: 300px;
        width: 100%;
        background-color: #212529;
        opacity: .5; 
      }
    `,
  ],
  animations:[
    trigger('fade',
      [
        state('void', style({opacity:0.9})),
        transition(':enter',[animate(300)]),
        transition(':leave',[animate(500)])
      ]
    )
  ]
})
export class HeaderComponent implements OnInit{
    red:string='';
    isCollapsed: any;
    linkMenu: any;
    state: string = 'void';
    searchText: string = '';

    @Output() searchEvent = new EventEmitter<string>();

    // onSearch() {
    //   this.searchEvent.emit(this.searchText);
    // }

    onSearch() {
      this.searchService.setSearch(this.searchText);
    }

    constructor(
      public auth: AuthService,
      private searchService: SearchService,
      @Inject(DOCUMENT) private document: Document
    ) {
        this.linkMenu=[
        {text:'Book',url:''},
        { text: 'Tipi', url: 'tipi' },
        { text: 'Contatti', url: 'contatti' },
        { text: 'About', url: 'about' }
      ];

    }
  

  @HostListener('window:scroll') 
  onWindowScroll(): void {
    const element = this.document.getElementById('mainNav');

    if (!element) return;

    if (window.pageYOffset > 40) {
      element.classList.add('sticky');
    } else {
      element.classList.remove('sticky');
    }
  }

  ngOnInit(): void {
    this.red = 'red';
  }
}
