import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PageService } from './page/page.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly pageService: PageService) { }
  @Get('/:slug')
  getPage(@Param('slug') slug: string): Object {
    return this.pageService.getPage(slug);
  }
}
