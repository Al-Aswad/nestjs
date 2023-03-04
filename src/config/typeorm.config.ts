import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/db/data.source';

export const typeconf: TypeOrmModule = {
  ...dataSourceOptions,
  autoLoadEntities: true,
};
