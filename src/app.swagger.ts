import { INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
        .setTitle('INSSITE')
        .addBearerAuth()
        .setDescription('Una pagina web de cursos y materias online')
        .setVersion('1.0')
        .build();
        const document = SwaggerModule.createDocument(app, swaggerConfig);
        SwaggerModule.setup('/docs', app, document,{
            explorer: true,
            swaggerOptions: {
            filter: true,
            showRequestDuration: true,
            },
        });
    }