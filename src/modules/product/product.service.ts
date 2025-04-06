import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entiti';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  /**
   * Tạo sản phẩm mới
   * @param userId - ID của người dùng tạo sản phẩm
   * @param createProductDto - Dữ liệu sản phẩm mới
   * @returns Sản phẩm đã được tạo
   */
  async create(userId: string, createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.productRepository.create({
      ...createProductDto,
      userId,
    });

    return new ProductResponseDto(product);
  }

  /**
   * Lấy tất cả sản phẩm
   * @returns Danh sách tất cả sản phẩm
   */
  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.findAll();
    return products.map(product => new ProductResponseDto(product));
  }

  /**
   * Lấy tất cả sản phẩm của một người dùng
   * @param userId - ID của người dùng
   * @returns Danh sách sản phẩm của người dùng
   */
  async findByUserId(userId: string): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.findByUserId(userId);
    return products.map(product => new ProductResponseDto(product));
  }

  /**
   * Tìm sản phẩm theo ID
   * @param id - ID của sản phẩm
   * @returns Thông tin sản phẩm
   */
  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return new ProductResponseDto(product);
  }

  /**
   * Cập nhật sản phẩm
   * @param userId - ID của người dùng
   * @param id - ID của sản phẩm
   * @param updateProductDto - Dữ liệu cập nhật
   * @returns Sản phẩm đã được cập nhật
   */
  async update(userId: string, id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    // Kiểm tra sản phẩm có tồn tại và thuộc về người dùng hay không
    const isOwner = await this.productRepository.isOwnedByUser(id, userId);
    if (!isOwner) {
      throw new ForbiddenException('You do not have permission to update this product');
    }

    // Cập nhật sản phẩm
    await this.productRepository.update(id, updateProductDto);
    
    // Trả về sản phẩm đã cập nhật
    return this.findOne(id);
  }

  /**
   * Xóa sản phẩm
   * @param userId - ID của người dùng
   * @param id - ID của sản phẩm
   * @returns Thông báo xóa thành công
   */
  async remove(userId: string, id: string): Promise<{ message: string }> {
    // Kiểm tra sản phẩm có tồn tại và thuộc về người dùng hay không
    const isOwner = await this.productRepository.isOwnedByUser(id, userId);
    if (!isOwner) {
      throw new ForbiddenException('You do not have permission to delete this product');
    }

    // Xóa sản phẩm
    await this.productRepository.delete(id);
    
    return { message: `Product with ID ${id} has been deleted` };
  }
}
