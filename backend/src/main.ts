import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";

import { EventsModule } from "./events/events.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    EventsModule
  );
  const config = new DocumentBuilder()
    .setTitle("SvetoEvents API")
    .setDescription("API-сервер СветоСобытий")
    .setVersion("1.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));
  app.useStaticAssets(
    join(__dirname, "..", "upload"), {
      prefix: "/upload/",
    }
  );
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
