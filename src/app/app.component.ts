import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'udemy';
  loadedFeature='recipe';
  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyDLa5Nb8_qQMbq0CnfUh_qzkRC8h51Heu8",
    authDomain: "recipe-book-14cbc.firebaseapp.com"
    });
  }
  onNavigate(feature: string){
    this.loadedFeature= feature;
  }

}
