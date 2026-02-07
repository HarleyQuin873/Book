import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
   standalone: true, // obbligatorio
   imports: [CommonModule, FormsModule],
  template: `
    <!-- <p>
      header works!
    </p> -->

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" routerLink="book"
          ><i class="fa fa-book"></i>Book</a
        >
        <button
          class="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="book">Book</a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link" href="about.html">About</a>
            </li> -->
            <!-- <li class="nav-item">
            <a class="nav-link" href="post.html">Sample Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contact.html">Contact</a>
          </li> -->
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Header -->
    <header
      class="masthead"
      style="background-image: url('../../../assets/img/home-bg.jpg')"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1 class="title">I love book <i class="fa fa-heart"></i></h1>
              <span class="subheading"
                >La bellezza non è che una promessa di felicità. <br /><small
                  ><i>(Stendhal, Dell'amore)</i></small
                >
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,

  styles: [
    `
      .bgImg {
        background-image: url(../../../assets/img/home-bg.jpg);
        max-height: 450px;
      }
      .masthead {
        max-height: 450px;
      }
      .fa.fa-book {
        margin-right: 5px !important;
        color: orange;
      }
      
      /* .title i.fa-heart {
        color: red;
      } */
      /* .site-heading .title i{
  color:white;
} */
      .subheading i.fa-heart {
        color: red;
      }
      /* .subheading{
  color:white;
} */

      .navbar-brand {
        font-size: 2.5rem;

        font-family: 'Amatic SC', cursive;
      }
      /* .title {
        font-size: 7.2rem !important;
        font-family: 'Amatic SC', cursive;
        color: #fff;
        z-index: 4;
      } */
      .title {
  color: #fff !important;       /* testo bianco */
  font-size: 7.2rem !important;
  font-family: 'Amatic SC', cursive;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
.title i.fa-heart {
  color: red !important;
}
      #mainNav .navbar-nav > li.nav-item > a {
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
      header.masthead .overlay {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        max-height: 450px;
        width: 100%;
        background-color: #212529;
        /* opacity: .5; */
        /* color: white;  */
      }
      /* .title {
  color: #fff; 
}
*/

header.masthead .overlay {
  background-color: rgba(33, 37, 41, 0.5); /* overlay scuro semitrasparente */
  z-index: 1;
}

.site-heading {
  position: relative;
  z-index: 2; /* sopra l’overlay */
}
      .subheading {
        color: #fff;
      }
    `,
  ],
})
export class HeaderComponent {
  //  red:string;

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //  this.red = 'red';
  }
}
