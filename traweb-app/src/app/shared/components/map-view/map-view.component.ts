import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { MapMarker } from 'src/app/models/MapMarker';
import { Constants } from '../../constants/Constants';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @Input() markers: MapMarker[];
  @Input() width = 800;
  @Input() height = 600;

  private map: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [Constants.LMAP_DEFAULT_COORD.lat, Constants.LMAP_DEFAULT_COORD.lng],
      zoom: 3
    });
    const tiles = L.tileLayer(Constants.LMAP_TITLE_LAYER_URL_TEMPLATE, {
      maxZoom: Constants.LMAP_MAX_ZOOM,
      attribution: Constants.LMAP_TITLE_LAYER_OPTIONS_ATTRIBUTION
    });
    tiles.addTo(this.map);
    this.setCurrentPosition();
    this.markers.forEach(marker => {
      this.addMarker(marker.lat, marker.lng, marker.title, marker.onClickFunction);
    });
    this.map.on('geosearch_showlocation', (result: any) => {
      L.marker([result.x, result.y]).addTo(this.map);
    });
  }

  private setCurrentPosition(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.map.flyTo([position.coords.latitude, position.coords.longitude], 12);
      },
      (error) => {
        this.map.flyTo([Constants.LMAP_DEFAULT_COORD.lat, Constants.LMAP_DEFAULT_COORD.lng], 6);
      },
      {timeout: 2000});
  }

  addMarker(latitude: number, longitude: number, title: string, onClickFunction: (content: any) => any): void {
    const marker = L.marker([latitude, longitude],
      {title}).addTo(this.map).on('click', onClickFunction);
  }
}
