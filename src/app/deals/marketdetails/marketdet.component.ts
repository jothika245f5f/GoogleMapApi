import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapGeocoder, MapInfoWindow } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/common.service';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
@Component({
  selector: 'app-marketdet',
  templateUrl: './marketdet.component.html',
  styleUrls: ['./marketdet.component.css'],
})
export class MarketdetComponent implements OnInit, AfterViewInit {
  apiLoaded: Observable<boolean>;
  details: any = FormGroup;
  public shown = false;
  line2: google.maps.Polyline;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  selectedValue: any = '';
  radioArr = [
    {
      label: 'By Zip Codes',
      value: 'By Zip Codes',
      checked: true,
    },
    {
      label: 'Draw on Map',
      value: 'Draw on Map',
      
    },
  ];

  zip1value: any;
  zip2value: any;
  zip3Value: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CommonService,
    private activaterou: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    let line: google.maps.Polyline;
    let map: google.maps.Map;
    let origin: any;
    let autocomplete1: google.maps.places.Autocomplete;
    let autocomplete2: google.maps.places.Autocomplete;
    let autocomplete3: google.maps.places.Autocomplete;
    let address1Field1: HTMLInputElement;
    let address1Field2: HTMLInputElement;
    let address1Field3: HTMLInputElement;
    

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
        zoom: 8,
      });

      address1Field1 = document.querySelector('#zip1') as HTMLInputElement;
      address1Field2 = document.querySelector('#zip2') as HTMLInputElement;
      address1Field3 = document.querySelector('#zip3') as HTMLInputElement;

     

      autocomplete1 = new google.maps.places.Autocomplete(address1Field1, {
        componentRestrictions: { country: ['us'] },
        fields: ['address_components', 'geometry'],
        strictBounds: false,
      });
      autocomplete2 = new google.maps.places.Autocomplete(address1Field2, {
        componentRestrictions: { country: ['us'] },
        fields: ['address_components', 'geometry'],
        strictBounds: false,
      });
      autocomplete3 = new google.maps.places.Autocomplete(address1Field3, {
        componentRestrictions: { country: ['us'] },
        fields: ['address_components', 'geometry'],
        strictBounds: false,
      });
      address1Field1.focus();
      autocomplete1.bindTo('bounds', map);
      autocomplete1.addListener('place_changed', fillInAddress1);
      autocomplete2.addListener('place_changed', fillInAddress2);
      autocomplete3.addListener('place_changed', fillInAddress3);

      // Define a symbol using SVG path notation, with an opacity of 1.
      const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4,
      };

      // Create the polyline, passing the symbol in the 'icons' property.
      line = new google.maps.Polyline({
        strokeColor: '#de1010',
        strokeOpacity: 0,
        icons: [
          {
            icon: lineSymbol,
            offset: '0',
            repeat: '20px',
          },
        ],
        map: map,
      });

      line.setMap(map);
      // Add a listener for the click event
      map.addListener('click', addLatLng);

    });

    let postcode = '';
    function fillInAddress1() {
      line.setVisible(false);
      // Get the place details from the autocomplete object.
      const place1 = autocomplete1.getPlace();
      console.log(place1.address_components?.toString());
      for (const component of place1.address_components as google.maps.GeocoderAddressComponent[]) {
        const componentType = component.types[0] || component.types[7];

        switch (componentType) {
          case 'street_number': {
            postcode = `${component.long_name}`;
            break;
          }

          case 'postal_code': {
            postcode = `${component.long_name}`;
            break;
          }
        }
        console.log(postcode);

        let lat = place1.geometry?.location!.lat();
        let lang = place1.geometry?.location!.lng();

        var lineCoordinates = new google.maps.LatLng(lat!, lang);

        console.log(lineCoordinates.toString());
        if (place1.geometry?.viewport) {
          addLine(lineCoordinates);
        } else {
          map.setCenter(place1.geometry?.location!);
        }
        if (address1Field1.value) {
          address1Field1.value = postcode;
          this.zip1value = postcode;
          break;
        }
      }
    }
    function fillInAddress2() {
      line.setVisible(false);
      // Get the place details from the autocomplete object.
      const place2 = autocomplete2.getPlace();
      console.log(place2.address_components?.toString());
      for (const component of place2.address_components as google.maps.GeocoderAddressComponent[]) {
        const componentType = component.types[0] || component.types[7];

        switch (componentType) {
          case 'street_number': {
            postcode = `${component.long_name}`;
            break;
          }

          case 'postal_code': {
            postcode = `${component.long_name}`;
            break;
          }
        }
        console.log(postcode);

        let lat = place2.geometry?.location!.lat();
        let lang = place2.geometry?.location!.lng();
        var lineCoordinates = new google.maps.LatLng(lat!, lang);

        console.log(lineCoordinates.toString());

        if (place2.geometry?.viewport) {
          addLine(lineCoordinates);
        } else {
          map.setCenter(place2.geometry?.location!);
        }

        if (address1Field2.value) {
          address1Field2.value = postcode;
          break;
        }
      }
    }
    function fillInAddress3() {
      line.setVisible(true);
      // Get the place details from the autocomplete object.
      const place3 = autocomplete3.getPlace();
      console.log(place3.address_components?.toString());
      for (const component of place3.address_components as google.maps.GeocoderAddressComponent[]) {
        const componentType = component.types[0] || component.types[7];

        switch (componentType) {
          case 'street_number': {
            postcode = `${component.long_name}`;
            break;
          }

          case 'postal_code': {
            postcode = `${component.long_name}`;
            break;
          }
        }
        console.log(postcode);

        let lat = place3.geometry?.location!.lat();
        let lang = place3.geometry?.location!.lng();
        var lineCoordinates = new google.maps.LatLng(lat!, lang);

        if (place3.geometry?.viewport) {
          addLine(lineCoordinates);
        } else {
          map.setCenter(place3.geometry?.location!);
        }
        if (address1Field3.value) {
          address1Field3.value = postcode;
          break;
        }
      }
    }
    function addLine(paths: any) {
      new google.maps.Marker({
        position: paths,
        map,
      });
      const path = line.getPath();
      path.push(paths as google.maps.LatLng);
      const lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4,
      };
      const flightPath = new google.maps.Polyline({
        path: path,
        strokeColor: '#de1010',
        strokeOpacity: 0,
        icons: [
          {
            icon: lineSymbol,
            offset: '0',
            repeat: '20px',
          },
        ],
      });

      map.setZoom(5);

      flightPath.setMap(map);
    }

    function addLatLng(event: google.maps.MapMouseEvent) {
      const path = line.getPath();

      // Because path is an MVCArray, we can simply append a new coordinate
      // and it will automatically appear.
      path.push(event.latLng as google.maps.LatLng);
      new google.maps.Marker({
        position: event.latLng,
        map,
      });

      if (event.latLng) {
        let latitude1 = event.latLng.lat();
        let longitude = event.latLng.lng();
        getAddressFrom(latitude1, longitude);
        console.log(event.latLng);
      }
    }

    function getAddressFrom(latitude: number, longitude: number) {
      axios
        .get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            latitude +
            ',' +
            longitude +
            '&key=AIzaSyAGCv-PRWD9fuUZpMzR6RI6_d9CYf-Hz20'
        )
        .then((res) => {
          if (res.data.error_message) {
            console.log(res.data.error_message);
          } else {
            console.log(res.data.results[0].address_components, 'data');
            origin = res.data.results[0].address_components;
            setTimeout(() => getPostalcode(origin), 1000);
          }
        });
    }

    function getPostalcode(address_components: string | any[]) {
      for (var i = 0; i < address_components.length; i++) {
        if (
          address_components[i]['types'].includes('postal_code') ||
          address_components[i]['types'].includes('plus_code')
        ) {
          var final_value =
            address_components[i]['long_name'] ||
            address_components[i]['short_name'];
        }
        console.log(final_value, 'postcode');
        if (address1Field1.value == '') {
          address1Field1.value = final_value;
          break;
        }
        if (address1Field1.value.length != 0 && !address1Field2.value) {
          address1Field2.focus();
          address1Field2.value = final_value;
          break;
        }
        if (
          address1Field1.value.length != 0 &&
          address1Field2.value.length != 0 &&
          !address1Field3.value
        )
          address1Field3.value = final_value;
        break;
      }
      return final_value;
    }
  }

  deleteRow(id: any) {
    (<HTMLInputElement>document.getElementById(id)!).value = '';
  }

  onRadioChange(event: any) {
    // Get the selected value
    this.selectedValue = event.target.value;
    if (this.selectedValue == 'By Zip Codes') {
      let address1Field1 = document.querySelector('#zip1') as HTMLInputElement;
      address1Field1.focus();
    }
    console.log(this.selectedValue);
  }

  ngOnInit(): void {
    this.details = this.fb.group({
      estClose: ['', Validators.required],
      exAsp: ['', Validators.required],
      TotalLots: ['', Validators.required],
    });
  }

  onKey(e: any) {
    var nStr = e.value + '';
    nStr = nStr.replace(/\,/g, '');
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    e.value = x1 + x2;
  }

  submitData(data: any) {
    let zip1value = document.querySelector('#zip1') as HTMLInputElement;
    let zip2value = document.querySelector('#zip2') as HTMLInputElement;
    let zip3Value = document.querySelector('#zip3') as HTMLInputElement;
    let zip1JsonStr = JSON.stringify(zip1value.value);
    let zip1Parse = JSON.parse(zip1JsonStr);
    let zip2JsonStr = JSON.stringify(zip2value.value);
    let zip2Parse = JSON.parse(zip2JsonStr);
    let zip3JsonStr = JSON.stringify(zip3Value.value);
    let zip3Parse = JSON.parse(zip3JsonStr);
    this.service.navication_check = true;
    console.log(zip1Parse, zip2Parse, zip3Parse);
    console.log(data, 'formdata');
    let DataToPass = {
      estClose: data.estClose,
      exAsp: data.exAsp,
      TotalLots: data.TotalLots,
      zip1: zip1Parse,
      zip2: zip2Parse,
      zip3: zip3Parse,
    };

    this.service.postFormData(DataToPass).subscribe((data) => {
      console.log('form submitted', data);
    });

    setTimeout(() => this.navigate(), 3000);
  }

  navigate() {
    console.log('navigate calling');

    this.router.navigate(['info'], { relativeTo: this.activaterou });
  }
}
