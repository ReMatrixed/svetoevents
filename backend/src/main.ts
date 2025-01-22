import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { EventsModule } from "./events/events.module";

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
