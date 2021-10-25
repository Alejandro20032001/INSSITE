import { RolesBuilder } from 'nest-access-control';
import { UserEnum } from './user/enum/user.enum';

export enum AppResources {
  USER = 'USER',
  COURSE = 'COURSE',
}
export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserEnum.DOCENTE)
  .create([AppResources.COURSE])
  .readOwn([AppResources.COURSE])
  .updateOwn([AppResources.COURSE])

  .grant(UserEnum.ESTUDIANTE)
  .readOwn([AppResources.COURSE]);
