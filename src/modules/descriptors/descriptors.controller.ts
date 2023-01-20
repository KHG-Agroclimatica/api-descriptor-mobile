import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  UseFilters,
} from '@nestjs/common';
import { DescriptorsService } from './descriptors.service';
import { GetItemsParams, ItemsByReferenceParams } from './dto/request';

@Controller('descriptors')
export class DescriptorsController {
  constructor(private readonly descriptorsService: DescriptorsService) {}

  @Get(':id')
  async filterDescriptorById(@Param('id') id: string) {
    return await this.descriptorsService.filterDescriptorById(id);
  }

  @Get('/:descriptorId/:language-:country/items')
  async getItems(@Param() params: GetItemsParams) {
    return await this.descriptorsService.GetItems(params);
  }

  @Get(':descriptorId/relatedTo/:referenceId')
  async filterItemsByRelated(@Param() params: ItemsByReferenceParams) {
    console.log(params);
    return await this.descriptorsService.filterItemsByRelated(params);
  }

  @Get()
  get() {
    return 'hello descriptor';
  }
}
