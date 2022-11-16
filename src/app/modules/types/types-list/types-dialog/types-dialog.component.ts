import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { POLYMORPHEUS_CONTEXT } from "@tinkoff/ng-polymorpheus";
import { TuiDialogContext } from "@taiga-ui/core";
import {
  ProductTypeModel,
  ProductTypePrevModel,
  ProductTypePropertyModel
} from "../../../../shared/models/type-property.model";
import { ApiDataModel } from "../../../../shared/models/api-data.model";
import { TypesService } from "../../types.service";
import { BehaviorSubject, map, Observable, startWith, Subject, switchMap } from "rxjs";
import { TUI_DEFAULT_MATCHER, TuiHandler, TuiContextWithImplicit, tuiIsString } from "@taiga-ui/cdk";
import { PropertiesService } from "../../../properties/properties.service";

@Component({
  selector: 'app-types-dialog',
  templateUrl: './types-dialog.component.html',
  styleUrls: ['./types-dialog.component.scss']
})
export class TypesDialogComponent {
  public propertiesDataSubject: BehaviorSubject<ApiDataModel<ProductTypePropertyModel[]>> = new BehaviorSubject<ApiDataModel<ProductTypePropertyModel[]>>(undefined);
  public propertiesData$: Observable<ApiDataModel<ProductTypePropertyModel[]>> = this.propertiesDataSubject.asObservable();
  public typesData: ApiDataModel<ProductTypeModel>;
  private readonly search$ = new Subject<string>();

  readonly items$ = this.search$.pipe(
    startWith(``),
    switchMap(search =>
      this.propertiesData$.pipe(
        map((items) =>
          (items || [])
            .filter(({name}) => TUI_DEFAULT_MATCHER(name, search))
            .map(({id}) => id),
        ),
      ),
    ),
    startWith(null),
  );

  public formGroup: FormGroup = this.formBuilder.group( {
    name : [ null, Validators.required ],
    description : [ null ],
    properties: [ [] ],
  } );

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<any, ProductTypePrevModel | undefined>,
    private formBuilder: FormBuilder,
    private typesService: TypesService,
    private propertiesService: PropertiesService,
  ) {
    if (this.context.data) {
      typesService.getTypeById(this.context.data?.id).subscribe((res: ProductTypeModel | undefined) => {
        this.typesData = res || null;
        this.formGroup.setValue({
          name: res?.name || '',
          description: res?.description || '',
          properties: res?.properties || [],
        });
      });
    } else {
      this.typesData = null;
    }
    propertiesService.getProperties().subscribe((res: ProductTypePropertyModel[]) => this.propertiesDataSubject.next(res));
  }

  readonly stringify$: Observable<
    TuiHandler<string | TuiContextWithImplicit<string>, string>
    > = this.propertiesData$.pipe(
    map(items => new Map((items || []).map<[string, string]>(({id, name}) => [id, name]))),
    startWith(new Map()),
    map(
      map => (id: string | TuiContextWithImplicit<string>) =>
        (tuiIsString(id) ? map.get(id) : map.get(id.$implicit)) || `Loading...`,
    ),
  );

  public onSearch(search: string | null): void {
    this.search$.next(search || ``);
  }

}
