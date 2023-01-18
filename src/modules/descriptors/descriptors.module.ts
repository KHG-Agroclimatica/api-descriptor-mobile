import { Module } from '@nestjs/common';
import { DescriptorsService } from './descriptors.service';
import { DescriptorsController } from './descriptors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/Item.schema';
import { Mapper } from './utils/mapper';
import { FieldSchema } from './schemas/Field.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'items', schema: ItemSchema },
      { name: 'fields', schema: FieldSchema },
    ]),
  ],
  controllers: [DescriptorsController],
  providers: [DescriptorsService, Mapper],
})
export class DescriptorsModule {}
