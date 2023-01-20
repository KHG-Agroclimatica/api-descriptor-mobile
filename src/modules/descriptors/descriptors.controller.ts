import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DescriptorsService } from './descriptors.service';
import {
  FilterItemsDTO,
  GetItemsParams,
  ItemsByReferenceParams,
  LanguageParams,
} from './dto/request';

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
    return await this.descriptorsService.filterItemsByRelated(params);
  }

  @Post('/:language-:country/items')
  async filterAdvanceQuery(
    @Param() params: LanguageParams,
    @Body() filterDTO: FilterItemsDTO,
  ) {
    return await this.descriptorsService.filterAdvanceQuery(params, filterDTO);
  }

  @Get()
  get() {
    return 'hello descriptor';
  }
}
