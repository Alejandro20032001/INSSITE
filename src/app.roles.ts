import { RolesBuilder } from 'nest-access-control';
import { UserEnum } from './user/enum/user.enum';

export enum AppResources {
  USER = 'USER',
  COURSE = 'COURSE',
  MODULE = 'MODULE',
  RESOURCE = 'RESOURCE',
}
export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(UserEnum.DOCENTE)
  .createOwn([AppResources.COURSE, AppResources.RESOURCE])
  .readOwn([AppResources.COURSE, AppResources.MODULE, AppResources.RESOURCE])
  .updateOwn([AppResources.COURSE])
  .readAny([AppResources.USER])
  .readOwn([AppResources.MODULE, AppResources.RESOURCE])
  .deleteOwn([AppResources.MODULE, AppResources.RESOURCE])

  .grant(UserEnum.ESTUDIANTE)
  .readAny([AppResources.COURSE, AppResources.MODULE, AppResources.RESOURCE])
  .updateAny([AppResources.COURSE]);
