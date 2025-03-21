import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value !== 'string' || !/^[a-fA-F0-9]{24}$/.test(value)) {
      throw new Error('Invalid MongoDB ObjectId');
    }
    return value;
  }
}
