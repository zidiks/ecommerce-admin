import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { TuiDialogContext } from "@taiga-ui/core";
import {
  ProductTypeModel,
  ProductTypePrevModel,
} from "../../../../shared/models/type-property.model";
import { ApiDataModel } from "../../../../shared/models/api-data.model";
import { TypesService } from "../../types.service";
import { PropertiesService } from "../../../properties/properties.service";
import { map, Observable, shareReplay, startWith, Subject, switchMap } from "rxjs";
import { TUI_DEFAULT_MATCHER, TuiContextWithImplicit, TuiHandler, tuiIsString } from "@taiga-ui/cdk";
import { ProductPropertyPipe } from "../../../../shared/pipes/product-property/product-property.pipe";

@Component({
  selector: 'app-types-dialog',
  templateUrl: './types-dialog.component.html',
  styleUrls: ['./types-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypesDialogComponent {
  public typesData: ApiDataModel<ProductTypeModel>;
  private productPropertyPipe = new ProductPropertyPipe();

  public formGroup: FormGroup = this.formBuilder.group( {
    name : [ null, Validators.required ],
    description : [ null ],
    properties: [ [] ],
  } );

  private readonly properties$ = this.propertiesService.getProperties().pipe(
    shareReplay({bufferSize: 1, refCount: true}),
  );

  private readonly search$ = new Subject<string>();

  readonly items$ = this.search$.pipe(
    startWith(``),
    switchMap(search =>
      this.properties$.pipe(
        map(items =>
          items
            .filter(({name}) => TUI_DEFAULT_MATCHER(name, search))
            .map(({_id}) => _id),
        ),
      ),
    ),
    startWith(null),
  );

  readonly stringify$: Observable<
    TuiHandler<string | TuiContextWithImplicit<string>, string>
    > = this.properties$.pipe(
    map(items => new Map(items.map<[string, string]>(({_id, name, type}) => [_id, `${name} (${this.productPropertyPipe.transform(type)?.name})`]))),
    startWith(new Map()),
    map(
      map => (_id: string | TuiContextWithImplicit<string>) => {
        return (tuiIsString(_id) ? map.get(_id) : map.get(_id.$implicit)) || `Loading...`;
      }
    ),
  );


  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, ProductTypePrevModel | undefined>,
    private formBuilder: FormBuilder,
    private typesService: TypesService,
    private propertiesService: PropertiesService,
  ) {
    if (this.context.data) {
      typesService.getTypeById(this.context.data?._id).subscribe((res: ProductTypeModel | null) => {
        this.typesData = res || null;
        console.log(res);
        this.formGroup.setValue({
          name: res?.name || '',
          description: res?.description || '',
          properties: res?.properties ? res.properties.map(item => item._id) : [],
        });
      });
    } else {
      this.typesData = null;
    }
  }

  public onSearch(search: string | null): void {
    this.search$.next(search || ``);
  }

}
