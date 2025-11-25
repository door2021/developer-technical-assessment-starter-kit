import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { Property } from './entities/property.entity';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get('popular')
  async getPopular(): Promise<Property[]> {
    return this.listingsService.getPopularListings();
  }

  @Get('property/:id')
  async getProperty(@Param('id', ParseIntPipe) id: number): Promise<Property> {
    return this.listingsService.getPropertyById(id);
  }
}
