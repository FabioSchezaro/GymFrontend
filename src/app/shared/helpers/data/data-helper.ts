import { FullDataPeople } from 'src/app/models/full-data-people';
import { GuidService } from 'src/app/utils/services/guid.service';
import { PeopleDisease } from 'src/app/models/people-disease';
import { Client } from 'src/app/models/client';
import { Address } from 'src/app/models/address';
import { Metrics } from 'src/app/models/metrics';
import { PhisicalAvaliation } from 'src/app/models/phisical-avaliation';

export function newInstanceToObject(object: any): any {
  return  JSON.parse(JSON.stringify(object));
}

export function CreateInstacelToNewPeople(object: FullDataPeople): FullDataPeople {
  const response = new FullDataPeople();
  const peopleDiseaseCollection = new Array<PeopleDisease>();

  response.people = object.people;
  response.user = object.user;
  response.address = null;
  response.metrics = null;
  response.phisicalAvaliation = null;
  response.peopleDiseasesCollection = null;
  response.client = null;

  if (object.address.cep) {
    response.address = new Address();
    response.address = object.address;
    response.address.idPeople = object.people.id;
    response.address.id = GuidService.GetGuid();
  }

  if (object.metrics.biceps) {
    response.metrics = new Metrics();
    response.metrics = object.metrics;
    response.metrics.idPeople = object.people.id;
    response.metrics.id = GuidService.GetGuid();
  }

  if (object.phisicalAvaliation.reight) {
    response.phisicalAvaliation = new PhisicalAvaliation();
    response.phisicalAvaliation = object.phisicalAvaliation;
    response.phisicalAvaliation.idPeople = object.people.id;
    response.phisicalAvaliation.id = GuidService.GetGuid();
  }

  if (object.client.value) {
    response.client = new Client();
    response.client.idDueDay = object.client.idDueDay;
    response.client.idPlan = object.client.idPlan;
    response.client.idPeople = object.people.id;
    response.client.id = GuidService.GetGuid();
  }

  if (object.diseasesCollection.length > 0) {
    object.diseasesCollection.forEach(obj => {
      const disease = new PeopleDisease();

      disease.id = GuidService.GetGuid();
      disease.idDisease = obj.id;
      disease.idPeople = object.people.id;

      peopleDiseaseCollection.push(disease);
      response.peopleDiseasesCollection = peopleDiseaseCollection;
    });
  }
  return response;
}
