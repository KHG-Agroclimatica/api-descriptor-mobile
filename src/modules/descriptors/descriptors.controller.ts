import { Controller, Get, Param } from '@nestjs/common';
import { DescriptorsService } from './descriptors.service';
import { GetItemsParams } from './dto/get-items.params';

@Controller('descriptors')
export class DescriptorsController {
  constructor(private readonly descriptorsService: DescriptorsService) {}

  @Get(':language-:country/:descriptorId')
  async GetItems(@Param() params: GetItemsParams){
    return await this.descriptorsService.GetItems(params);
  }

  @Get()
  Get(){
    return 'hello descriptor'
  }
}
