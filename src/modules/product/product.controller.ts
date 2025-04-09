import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { CurrentUser } from 'src/core/decorators/current-user.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ProductResponseDto } from './dto/product-response.dto';

@ApiTags('products')
@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo sản phẩm mới' })
  @ApiResponse({ status: 201, description: 'Sản phẩm đã được tạo', type: ProductResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @CurrentUser() user: any,
    @Body() createProductDto: CreateProductDto
  ): Promise<ProductResponseDto> {
    return this.productService.create(user.id, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả sản phẩm' })
  @ApiResponse({ status: 200, description: 'Danh sách tất cả sản phẩm', type: [ProductResponseDto] })
  findAll(): Promise<ProductResponseDto[]> {
    return this.productService.findAll();
  }

  @Get('my-products')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy sản phẩm của tôi' })
  @ApiResponse({ status: 200, description: 'Danh sách sản phẩm của người dùng', type: [ProductResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findMyProducts(@CurrentUser() user: any): Promise<ProductResponseDto[]> {
    return this.productService.findByUserId(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy sản phẩm theo ID' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm' })
  @ApiResponse({ status: 200, description: 'Sản phẩm chi tiết', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm' })
  @ApiResponse({ status: 200, description: 'Sản phẩm đã được cập nhật', type: ProductResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Không có quyền cập nhật sản phẩm này' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return this.productService.update(user.id, id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa sản phẩm' })
  @ApiParam({ name: 'id', description: 'ID của sản phẩm' })
  @ApiResponse({ status: 200, description: 'Sản phẩm đã được xóa' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Không có quyền xóa sản phẩm này' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy sản phẩm' })
  remove(@CurrentUser() user: any, @Param('id') id: string): Promise<{ message: string }> {
    return this.productService.remove(user.id, id);
  }
}
