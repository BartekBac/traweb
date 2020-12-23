import { Coordinates } from "src/app/models/Coordinates";

export class Constants {
  public static readonly LOCAL_STORAGE_AUTH_TOKEN = 'auth_token';
  public static readonly TRAWEB_API_BASE_URL = 'http://localhost:8000/api/';
  public static readonly LMAP_TITLE_LAYER_URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  public static readonly LMAP_TITLE_LAYER_OPTIONS_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  public static readonly LMAP_MAX_ZOOM = 19;
  public static readonly LMAP_DEFAULT_COORD: Coordinates = {lat: 51.55, lng: 19.08};
}
