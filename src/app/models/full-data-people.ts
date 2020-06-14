import { People } from './people';
import { User } from './user';
import { Address } from './address';
import { PhisicalAvaliation } from './phisical-avaliation';
import { Metrics } from './metrics';
import { Disease } from './disease';
import { PeopleDisease } from './people-disease';
import { Client } from './client';

export class FullDataPeople {
  people: People;
  user: User;
  address?: Address;
  phisicalAvaliation?: PhisicalAvaliation;
  metrics?: Metrics;
  client?: Client;
  diseasesCollection?: Disease[];
  peopleDiseasesCollection?: PeopleDisease[];
}
