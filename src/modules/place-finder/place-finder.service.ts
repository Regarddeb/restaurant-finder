import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import configuration from 'src/config/env.validation';
import { buildUrl } from 'src/common/utils/urlBuilder';
import { Places, FindPlaceParams } from './interfaces/places';

const config = configuration();

@Injectable()
export class PlaceFinderService {
  private FOURSQUARE_API_KEY = config.foursquare.apiKey;
  private FOUR_SQUARE_URL = config.foursquare.baseUrl;

  async execute(dto: FindPlaceParams) {
    const queryParams = instanceToPlain(dto);
    const apiURL = buildUrl(this.FOUR_SQUARE_URL, queryParams.parameters);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-Places-Api-Version': '2025-06-17',
        authorization: `Bearer ${this.FOURSQUARE_API_KEY}`,
      },
    };

    try {
      const response = await fetch(apiURL, options);
      if (!response.ok) {
        throw new Error(
          `Foursquare API error: ${response.status} ${response.statusText}`,
        );
      }

      const json = await response.json();
      return this.formatResponse(json.results);
    } catch (error) {
      console.error('Error calling Foursquare API:', error);
      throw new HttpException(
        `Failed to fetch restaurant data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private formatResponse(results: Places[]): Places[] {
    return results.map((place: Places) => ({
      fsq_place_id: place.fsq_place_id,
      latitude: place.latitude,
      longitude: place.longitude,
      categories: {
        name: place.categories?.[0]?.name || '',
        short_name: place.categories?.[0]?.short_name || '',
      },
      location: {
        country: place.location?.country || '',
        formatted_address: place.location?.formatted_address || '',
      },
      name: place.name,
      rating: place.rating ?? undefined,
      tel: place.tel || '',
      website: place.website || '',
    }));
  }
}
