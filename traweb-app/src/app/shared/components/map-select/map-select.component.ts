import { Component, Input, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Coordinates } from 'src/app/models/Coordinates';
import { Constants } from '../../constants/Constants';
import * as L from 'leaflet';
import { Functions } from '../../constants/Functions';
import { MapMarker } from 'src/app/models/MapMarker';

@Component({
  selector: 'app-map-select',
  templateUrl: './map-select.component.html',
  styleUrls: ['./map-select.component.css']
})
export class MapSelectComponent implements AfterViewInit {

  @Input() width = 800;
  @Input() height = 600;
  @Input() markerTitle = '';
  @Input() startLocation: Coordinates = {lat: Constants.LMAP_DEFAULT_COORD.lat, lng: Constants.LMAP_DEFAULT_COORD.lng};
  @Input() fixedMarkers: MapMarker[] = [];
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
      // init map object
      this.map = L.map('map', {
        center: [this.startLocation.lat, this.startLocation.lng],
        zoom: 6
      });
      // add fixed markers
      this.fixedMarkers.forEach(fm => this.addMarker(fm.lat, fm.lng, fm.title, false));
      // add current draggable marker
      this.addMainMarker(this.startLocation.lat, this.startLocation.lng);
      // init map tiles
      const tiles = L.tileLayer(Constants.LMAP_TITLE_LAYER_URL_TEMPLATE, {
        maxZoom: Constants.LMAP_MAX_ZOOM,
        attribution: Constants.LMAP_TITLE_LAYER_OPTIONS_ATTRIBUTION
      });
      tiles.addTo(this.map);
    }
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
          this.moveMainMarker(position.coords.latitude, position.coords.longitude);
          this.locationChange.emit(this.getMarkerCoordinates());
        },
        (error) => {
          this.map.flyTo([this.startLocation.lat, this.startLocation.lng], 6);
          this.moveMainMarker(this.startLocation.lat, this.startLocation.lng);
          this.locationChange.emit(this.getMarkerCoordinates());
        },
        {timeout: 1000});
    } else {
      this.map.flyTo([this.location.lat, this.location.lng], 12);
      this.moveMainMarker(this.location.lat, this.location.lng);
      this.locationChange.emit(this.getMarkerCoordinates());
    }
  }

  private addMarker(latitude: number, longitude: number, title: string, isDraggable = true, markerIcon?: any, zIndexOffset?: number): any {
    const customIcon = markerIcon ?? L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    const zIndex = zIndexOffset ?? 1;
    return L.marker([latitude, longitude],
      {title, draggable: isDraggable, icon: customIcon, zIndexOffset: zIndex})
      .addTo(this.map);
  }

  addMainMarker(latitude: number, longitude: number): void {
    const redIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    const markerTitle = (this.markerTitle.length > 0 ? this.markerTitle + ' - ' : '') + 'Drag marker to select location';

    this.marker = this.addMarker(latitude, longitude, markerTitle, true, redIcon, 100)
      .on('dragend', () => {
        this.locationChange.emit(this.getMarkerCoordinates());
      });
  }

  moveMainMarker(latitude: number, longitude: number): void {
    this.marker.setLatLng([latitude, longitude]);
  }
}
