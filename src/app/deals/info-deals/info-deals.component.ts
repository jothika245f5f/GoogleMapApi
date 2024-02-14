import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import { DOCUMENT } from '@angular/common';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-info-deals',
  templateUrl: './info-deals.component.html',
  styleUrls: ['./info-deals.component.css'],
})
export class InfoDealsComponent implements OnInit, AfterViewInit {
  dealsData: any = [];
  progressData: any = [];
  resilience: any;
  spendAlloc: any;
  navigation_check: boolean;
  

  constructor(httpClient: HttpClient, private service: CommonService) {}
  ngAfterViewInit(): void {
    this.navigation_check = this.service.navication_check;
    console.log(this.navigation_check, 'check');
    let line: google.maps.Polyline;
    let map: google.maps.Map;

    const loader = new Loader({
      apiKey: 'AIzaSyBX1SY1ZBc5xXFel9PyYclBSV69zVCFmrc',
      version: 'weekly',
      libraries: ['places', 'geometry'],
    });

    loader.load().then(async () => {
      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      map = new Map(document.getElementById('maps') as HTMLElement, {
        center: { lat: 44.5452, lng: -78.5389 },
        zoom: 6,
      });
      // Define a symbol using SVG path notation, with an opacity of 1.
      const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4,
      };

      const flightPlanCoordinates = [
        { lat: 45.098470064470604, lng: -79.35463486328126 },
        { lat: 45.156604024281776, lng: -77.45400009765626 },
        { lat: 44.231160472306875, lng: -78.28896103515626 },
        { lat: 45.06744106015689, lng: -79.36562119140626 },
      ];

      // Create the polyline, passing the symbol in the 'icons' property.
      // Give the line an opacity of 0.
      // Repeat the symbol at intervals of 20 pixels to create the dashed effect.
      line = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      line.setMap(map);
    });
  }

  ngOnInit(): void {
    this.service.getFormData().subscribe((data: any) => {
      var filter_array = data[data.length - 1];
      this.dealsData = filter_array;
    });
    this.service.getProgressData().subscribe((data: any) => {
       data.filter((item: any) => (this.progressData = item));
    });
  }

  
}
