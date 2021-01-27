import { Coordinates } from "src/app/models/Coordinates";

export class Constants {
  public static readonly LOCAL_STORAGE_AUTH_TOKEN = 'auth_token';
  public static readonly TRAWEB_API_BASE_URL = 'http://localhost:8000/api/';
  public static readonly LMAP_TITLE_LAYER_URL_TEMPLATE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  public static readonly LMAP_TITLE_LAYER_OPTIONS_ATTRIBUTION = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  public static readonly LMAP_MAX_ZOOM = 19;
  public static readonly LMAP_DEFAULT_COORD: Coordinates = {lat: 51.55, lng: 19.08};
  public static readonly BLOB_STORAGE_CONNECTION_STRING = 'http://127.0.0.1:10000/devstoreaccount1/images?st=2021-01-26T19%3A21%3A16Z&se=2021-10-27T19%3A21%3A00Z&sp=racwdl&sv=2018-03-28&sr=c&sig=h7WjGfw3F2Z4yf%2FTvYgZxVibWzFv9goPeuNiEXzUcHY%3D';
  public static readonly IMAGES_CONTAINER_NAME = 'images';
}
