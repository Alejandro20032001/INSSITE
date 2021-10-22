import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'us-cdbr-east-04.cleardb.com',
    port: 3306,
    username: 'bb0d82da493adf',
    password: 'c10e444f',
    database: 'heroku_42e4360e936cb76',
    entities: [__dirname + './**/**/*entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: true,
  }), UserModule, AuthModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
