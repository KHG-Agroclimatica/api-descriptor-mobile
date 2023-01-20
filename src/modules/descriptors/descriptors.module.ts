import { Module } from '@nestjs/common';
import { DescriptorsService } from './descriptors.service';
import { DescriptorsController } from './descriptors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/Item.schema';
import { Mapper } from './utils/mapper';
import { FieldSchema } from './schemas/Field.schema';
import { DescriptorScheme } from './schemas/Descriptor.schema';
import { DescriptorRepository } from './descriptor.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'items', schema: ItemSchema },
      { name: 'fields', schema: FieldSchema },
      { name: 'descriptors', schema: DescriptorScheme },
    ]),
  ],
  controllers: [DescriptorsController],
  providers: [DescriptorsService, Mapper, DescriptorRepository],
})
export class DescriptorsModule {}
