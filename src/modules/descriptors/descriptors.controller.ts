import { Controller, ForbiddenException, Get, Param, UseFilters } from '@nestjs/common';
import { DescriptorsService } from './descriptors.service';
import { GetItemsParams } from './dto/get-items.params';

@Controller('descriptors')
export class DescriptorsController {
  constructor(private readonly descriptorsService: DescriptorsService) {}

  @Get(':id')
  async filterDescriptorById(@Param('id') id: string){
    return await this.descriptorsService.filterDescriptorById(id);
  }

  @Get('/:descriptorId/:language-:country/items')
  async getItems(@Param() params: GetItemsParams){
      return await this.descriptorsService.GetItems(params);
  }

  @Get()
  get(){
    return 'hello descriptor'
  }
}
