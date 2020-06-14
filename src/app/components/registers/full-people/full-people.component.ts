import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { FullDataPeople } from 'src/app/models/full-data-people';
import { ISchemaFormButton } from 'src/app/shared/schema/schema-form-button';
import { People } from 'src/app/models/people';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/address';
import { PhisicalAvaliation } from 'src/app/models/phisical-avaliation';
import { Metrics } from 'src/app/models/metrics';
import { Disease } from 'src/app/models/disease';
import { FullDataPeopleService } from 'src/app/services/full-data-people.service';
import { PeopleComponent } from './people/people.component';
import { RoleType } from 'src/app/utils/enums/role-type';
import { BaseComponent } from 'src/app/utils/components/base.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CreateInstacelToNewPeople } from 'src/app/shared/helpers/data/data-helper';
import { PeopleDisease } from 'src/app/models/people-disease';
import { Client } from 'src/app/models/client';
import { YesNoDialogComponent } from 'src/app/shared/dialog/yes-no-dialog/yes-no-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-full-people',
  templateUrl: './full-people.component.html',
  styleUrls: ['./full-people.component.scss'],
  providers: [DatePipe]
})
export class FullPeopleComponent extends BaseComponent implements OnInit, DoCheck {

  fullDataPeople: FullDataPeople;
  people: People;
  user: User;

  listButtons: Array<ISchemaFormButton> = new Array<ISchemaFormButton>();
  saveFullDataPeopleButton: ISchemaFormButton;
  cleanFullDataPeopleButton: ISchemaFormButton;
  deleteFullDataPeopleButton: ISchemaFormButton;

  idPeople: string;
  update = false;
  delete = false;

  @ViewChild('people', { static: false }) peopleChild: PeopleComponent;

  constructor(
    private fullDataPeopleService: FullDataPeopleService,
    private alertService: ToastrService,
    private dialog: MatDialog,
    private datePipe: DatePipe) {
    super();
    this.subscriptions = new Array<Subscription>();

    this.subscriptions.push(
      this.fullDataPeopleService.saveSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.CleanFullDataPeople();
      })
    );
    this.subscriptions.push(
      this.fullDataPeopleService.saveError$.subscribe(error => {
        this.alertService.error(error.message);
      })
    );

    this.subscriptions.push(
      this.fullDataPeopleService.updateSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.CleanFullDataPeople();
      })
    );
    this.subscriptions.push(
      this.fullDataPeopleService.updateError$.subscribe(error => {
        this.alertService.error(error.message);
      })
    );

    this.subscriptions.push(
      this.fullDataPeopleService.deleteSuccess$.subscribe(success => {
        this.alertService.success(success.message);
        this.CleanFullDataPeople();
      })
    );
    this.subscriptions.push(
      this.fullDataPeopleService.deleteError$.subscribe(error => {
        this.alertService.error(error.message);
      })
    );
   }

  ngOnInit() {
    this.SetClass();
    this.ConfigureButton();
  }

  ngDoCheck() {
    this.ChangeNameButton();
  }

  SetClass() {
    this.fullDataPeople = new FullDataPeople();
    this.fullDataPeople.people = new People();
    this.fullDataPeople.user = new User(this.fullDataPeople.people.id);
    this.fullDataPeople.address = new Address();
    this.fullDataPeople.phisicalAvaliation = new PhisicalAvaliation();
    this.fullDataPeople.metrics = new Metrics();
    this.fullDataPeople.client = new Client();
    this.fullDataPeople.diseasesCollection = new Array<Disease>();
    this.fullDataPeople.peopleDiseasesCollection = new Array<PeopleDisease>();
  }

  diseasesSelected(diseases: Array<Disease>) {
    this.fullDataPeople.diseasesCollection = diseases;
  }

  ConfigureButton() {
    this.saveFullDataPeopleButton = {
      Description: 'Salvar',
      Disabled: false,
      Color: 'primary',
      Type: 'button',
      Click: () => {
        this.SaveFullDataPeople();
      }
    };
    this.cleanFullDataPeopleButton = {
      Description: 'Limpar',
      Disabled: false,
      Color: 'accent',
      Type: 'button',
      Click: () => {
        this.CleanFullDataPeople();
      }
    };
    this.deleteFullDataPeopleButton = {
      Description: 'Deletar',
      Disabled: false,
      Color: 'warn',
      Type: 'button',
      Click: () => {
        this.DeleteFullDataPeople();
      }
    };
    this.listButtons.push(this.saveFullDataPeopleButton);
    this.listButtons.push(this.cleanFullDataPeopleButton);
    this.listButtons.push(this.deleteFullDataPeopleButton);
  }

  DeleteFullDataPeople() {
    if (this.idPeople) {

      const date = new Date();

      const dialogRef = this.dialog.open(YesNoDialogComponent, {
        width: '50%',
        height: 'auto',
        data: {
          title: `Nome: ${this.fullDataPeople.people.name} - CPF: ${this.fullDataPeople.people.cpf}`,
          contentBody: `<p>Você tem certeza que deseja apagar os dados dessa pessoa?</p>
                          <p>Esta ação irá remover todos os registros referente a ela.</p>`,
          contentFooter: `${JSON.parse(localStorage.getItem('currentPeople')).name},
                          ${this.datePipe.transform(date, 'dd MMMM, yyyy')} `
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.fullDataPeople.people.id = this.idPeople;
          this.fullDataPeopleService.Delete(this.fullDataPeople.people);
          this.CleanFullDataPeople();
        }
      });

    } else {
      this.alertService.warning('Selecione um usuário já cadastrado para deletar');
    }
  }


  CleanFullDataPeople() {
    this.SetClass();
    this.peopleChild.SetFocus();
    this.idPeople = '';
    this.update = false;
  }

  SaveFullDataPeople() {
    const savePeople = CreateInstacelToNewPeople(this.fullDataPeople);

    if (!this.update) {
      this.fullDataPeopleService.Register(savePeople);
    } else {
      this.fullDataPeopleService.Update(savePeople);
    }
  }

  LoadDataPeople(id: string) {
    this.idPeople	= id;
    const elmRef = this.peopleChild.nameColumn.ElementRef;

    if (elmRef) {
      elmRef.nativeElement.addEventListener('focusout', (event) => {
        if (id) {
          this.LoadPeopleById(id);
          id = null;
        }
      });
    }
  }

  LoadPeopleById(id: string) {
    this.fullDataPeopleService.GetById(id).subscribe(result => {
      this.fullDataPeople = result;
      if (!result.address) {
        this.fullDataPeople.address = new Address();
      }
      if (!result.phisicalAvaliation) {
        this.fullDataPeople.phisicalAvaliation = new PhisicalAvaliation();
      }
      if (!result.metrics) {
        this.fullDataPeople.metrics = new Metrics();
      }
      if (!result.client) {
        this.fullDataPeople.client = new Client();
      }
      if (!result.diseasesCollection || result.diseasesCollection.length === 0) {
        this.fullDataPeople.diseasesCollection = new Array<Disease>();
      }
      this.update = true;
    });
  }

  ChangeNameButton() {
    if (this.update) {
      this.saveFullDataPeopleButton.Description = 'Atualizar';
    } else {
      this.saveFullDataPeopleButton.Description = 'Salvar';
    }
  }

  RoleChanged(roleId: string) {
    if (roleId.toUpperCase() === RoleType.employer.toUpperCase()) {
      this.fullDataPeople.people.idRole = RoleType.employer.toUpperCase();
    } else {
      this.fullDataPeople.people.idRole = RoleType.client.toUpperCase();
    }
  }
}
