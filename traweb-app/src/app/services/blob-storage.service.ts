import { Injectable } from '@angular/core';

import { 
  BlobServiceClient, StorageSharedKeyCredential
} from '@azure/storage-blob';
import { Constants } from '../shared/constants/Constants';


@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {

  private blobClient: BlobServiceClient;

  constructor() {
    this.blobClient = new BlobServiceClient(Constants.BLOB_STORAGE_CONNECTION_STRING);
  }

  async uploadImage(file: File): Promise<string>{
    const containerClient = this.blobClient.getContainerClient('images');

    const blobName = new Date().getTime() + file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(file, file.size);

    return blockBlobClient.url;
  }
}
