import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { map, Observable } from "rxjs";
import { TuiFileLike } from "@taiga-ui/kit";
import { blobToFile } from "../functions/blob-to-file.func";

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(
    private http: HttpService,
  ) { }

  public getImage(name: string): Observable<TuiFileLike> {
    return this.http.getImage(`storage/images/${name}`).pipe(
      map((blob: Blob) => {
        return blobToFile(blob, name);
      })
    );
  }

  public addImages(images: File[]): Observable<{ url: string; name: string; }> {
    const formData: FormData = new FormData();
    images.forEach((file) => { formData.append('image', file); });
    return this.http.post('/storage/upload', formData);
  }

  public deleteImage(name: string): Observable<any> {
    return this.http.delete('storage/images', name);
  }
}
