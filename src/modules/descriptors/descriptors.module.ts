import { Module } from '@nestjs/common';
import { DescriptorsService } from './descriptors.service';
import { DescriptorsController } from './descriptors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/Item.schema';
import { Mapper } from './utils/mapper';
import { FieldSchema } from './schemas/Field.schema';
import { DescriptorSchema } from './schemas/Descriptor.schema';
import { DescriptorRepository } from './descriptor.repository';
import { DescriptorUtil } from './utils/descriptor.util';
import { ClassificationSchema } from './schemas/Classification.schema';
import { RelationshipSchema } from './schemas/RelationShip.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'items', schema: ItemSchema },
      { name: 'fields', schema: FieldSchema },
      { name: 'descriptors', schema: DescriptorSchema },
      { name: 'classifications', schema: ClassificationSchema },
      { name: 'relationships', schema: RelationshipSchema },
    ]),
  ],
  controllers: [DescriptorsController],
  providers: [DescriptorsService, Mapper, DescriptorRepository, DescriptorUtil],
})
export class DescriptorsModule {}
