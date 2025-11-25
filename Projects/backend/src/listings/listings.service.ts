import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepo: Repository<Property>,
  ) {}

  async getPopularListings(limit = 3): Promise<Property[]> {
    return this.propertyRepo.find({
      order: { views: 'DESC' },
      take: limit,
    });
  }

  async getPropertyById(id: number): Promise<Property> {
    const property = await this.propertyRepo.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }
    return property;
  }
}
