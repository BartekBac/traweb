import { Component, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Coordinates } from 'src/app/models/Coordinates';
import { Constants } from '../../constants/Constants';
import * as L from 'leaflet';
import { Functions } from '../../constants/Functions';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css']
})
export class MapSelectComponent implements AfterViewInit {

  @Input() width = 800;
  @Input() height = 600;
  @Input() location: Coordinates;
  @Output() locationChange = new EventEmitter<Coordinates>();

  private map: any;
  private marker: any;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    if (this.map == null) {
      this.map = L.map('map', {
        center: [Constants.LMAP_DEFAULT_COORD.lat, Constants.LMAP_DEFAULT_COORD.lng],
        zoom: 6
      });
      this.addMarker(Constants.LMAP_DEFAULT_COORD.lat, Constants.LMAP_DEFAULT_COORD.lng);
      const tiles = L.tileLayer(Constants.LMAP_TITLE_LAYER_URL_TEMPLATE, {
        maxZoom: Constants.LMAP_MAX_ZOOM,
        attribution: Constants.LMAP_TITLE_LAYER_OPTIONS_ATTRIBUTION
      });
      tiles.addTo(this.map);
    }
    console.log('from init');
    this.setCurrentPosition();
  }

  private getMarkerCoordinates(): Coordinates {
    const selectedLatLng = this.marker.getLatLng();
    const location: Coordinates = {lat: selectedLatLng.lat, lng: selectedLatLng.lng};
    return location;
  }

  private setCurrentPosition(): void {
    if (!Functions.isLocationSet(this.location)) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.map.flyTo([position.coords.latitude, position.coords.longitude], 12);
          this.moveMarker(position.coords.latitude, position.coords.longitude);
          this.locationChange.emit(this.getMarkerCoordinates());
        },
        (error) => {
          this.map.flyTo([Constants.LMAP_DEFAULT_COORD.lat, Constants.LMAP_DEFAULT_COORD.lng], 6);
          this.moveMarker(Constants.LMAP_DEFAULT_COORD.lat, Constants.LMAP_DEFAULT_COORD.lng);
          this.locationChange.emit(this.getMarkerCoordinates());
        },
        {timeout: 1000});
    } else {
      this.map.flyTo([this.location.lat, this.location.lng], 12);
      this.moveMarker(this.location.lat, this.location.lng);
      this.locationChange.emit(this.getMarkerCoordinates());
    }
  }

  addMarker(latitude: number, longitude: number): void {
    this.marker = L.marker([latitude, longitude],
      {title: 'Drag marker to select location', draggable: true})
      .addTo(this.map)
      .on('dragend', () => {
        this.locationChange.emit(this.getMarkerCoordinates());
      });
  }

  moveMarker(latitude: number, longitude: number): void {
    this.marker.setLatLng([latitude, longitude]);
  }
}
