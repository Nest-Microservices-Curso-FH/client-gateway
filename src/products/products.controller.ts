import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'Esta función crea productos';
  }

  @Get()
  findAllProducts() {
    return 'Esta función lista productos';
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return 'Esta función devuelve un producto ' + id;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return 'Esta función crea un producto ' + id;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return 'Esta función elimina un producto ' + id;
  }
}
