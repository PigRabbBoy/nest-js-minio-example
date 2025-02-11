import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('presigned-url')
  async presignedUrl(@Body() body: { key: string; contentType: string }) {
    return this.appService.getPreSignedURL(
      'content',
      body.key,
      body.contentType,
    );
  }
}
