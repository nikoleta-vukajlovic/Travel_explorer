import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef, ɵConsole, Inject } from '@angular/core';
import { ReceiverService } from '../receiver.service';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements AfterViewInit {
  [x: string]: any;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 44.0165;
  lng = 21.0059;

  markers = [
    {
      position: new google.maps.LatLng(43.3947, 22.6788),
      map: this.map,
      title: 'Stara planina',
      animation: google.maps.Animation.DROP,
      content: 'https://yellshops.com/wp-content/uploads/2020/06/isto%C4%8Dnik-stara-planina.jpg'
    },
    {
      position: new google.maps.LatLng(45.1571, 19.7093),
      map: this.map,
      title: 'Fruška gora',
      animation: google.maps.Animation.DROP,
      content: 'https://www.opanak.rs/wp-content/uploads/2017/04/fruska-gora.jpg'
    },
    {
      position: new google.maps.LatLng(43.2680, 20.8263),
      map: this.map,
      title: 'Kopaonik',
      animation: google.maps.Animation.DROP,
      content: 'https://www.supernovatravel.rs/media/image/84/t3_92332.jpg'
    },
    {
      position: new google.maps.LatLng(44.5290, 21.9803),
      map: this.map,
      title: 'Đerdap',
      animation: google.maps.Animation.DROP,
      content: 'https://kudanaput.com/wp-content/uploads/2018/08/Djerdapska-klisura-i-Nacionalni-park-Djerdap-informacije-i-zanimljivosti.jpg'
    },
    {
      position: new google.maps.LatLng(43.7260, 19.6970),
      map: this.map,
      title: 'Zlatibor',
      animation: google.maps.Animation.DROP,
      content: 'https://www.supernovatravel.rs/media/image/e9/t3_57816.jpg'
    }
  ];

  // Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 7.25,
    scrollwheel: false,
    draggable: false,
    fullscreenControl: false,
    mapTypeControlOptions: { mapTypeIds: [] },

  };

  constructor( private receiver: ReceiverService) {
  }
  ngAfterViewInit(): void {
    this.mapInitializer();
  }
  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.loadAllMarkers();
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      // Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });
      // creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: markerInfo.content,
      });

      // Add click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });

      // Adding marker to google map
      marker.setMap(this.map);


      const boxText = document.createElement('div');
      boxText.id = '1';
      boxText.style.cssText = 'border: 1px solid black; margin-top: 8px;  background-image: linear-gradient(to bottom right, #99ff99, #000000); padding: 5px; border-radius: 7px;';
      boxText.innerHTML = '<h4>' + marker.getTitle() + '</h4>' + '<img src="' + markerInfo.content + '" width="100" height="60" />' +
      '<br><br>';


      google.maps.event.addDomListener(boxText, 'click', ((marker, event) => {
      return () => {
        event.callNavigate(marker.getTitle());
      };
    })(marker, this.receiver));




      infoWindow.setContent(boxText);
      infoWindow.open(this.map, marker);

    });
  }
}
