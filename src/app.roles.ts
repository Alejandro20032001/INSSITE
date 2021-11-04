import { RolesBuilder } from 'nest-access-control';
import { UserEnum } from './user/enum/user.enum';

export enum AppResources {
  USER = 'USER',
  COURSE = 'COURSE',
}
export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserEnum.DOCENTE)
  .createOwn([AppResources.COURSE])
  .readOwn([AppResources.COURSE])
  .updateOwn([AppResources.COURSE])
  .readAny([AppResources.USER])

  .grant(UserEnum.ESTUDIANTE)
  .readOwn([AppResources.COURSE])
  .updateOwn([AppResources.COURSE])
  .create([AppResources.USER])
  .updateAny([AppResources.COURSE]);
