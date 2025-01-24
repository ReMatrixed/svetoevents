import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

import { EventsModule } from "./events/events.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    EventsModule
  );
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
