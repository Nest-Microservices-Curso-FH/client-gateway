import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'Esta función crea productos';
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send(
      { cmd: 'find_all_products' },
      paginationDto,
    );
  }

  @Get(':id')
  async findOneProduct(@Param('id') id: number) {
    return this.productsClient.send({ cmd: 'find_product_by_id' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    // igual que arriba pero usando firstValueFrom, que convierte el Observable en una Promesa
    // try {
    //   const product = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_product_by_id' }, { id }),
    //   );

    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
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
