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

  async uploadImage(file: File){
    const containerClient = this.blobClient.getContainerClient('images');

    const blobName = new Date().getTime() + file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(file, file.size);

    console.log(blockBlobClient.url);

    console.log(uploadBlobResponse);
  }
}
