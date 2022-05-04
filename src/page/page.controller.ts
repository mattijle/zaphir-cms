import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePageDTO } from 'src/dto/CreatePage.dto';
import { UpdatePageDTO } from 'src/dto/updatePage.dto';
import { PageDocument } from 'src/schemas/page.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { PageService } from './page.service';

@Controller('page')
@UseGuards(JwtAuthGuard)
export class PageController {
    constructor(private readonly pageService: PageService) { }
    @Post('/new')
    createPage(@Body() createPageDTO: CreatePageDTO, @GetUser() user: UserDocument) {
        return this.pageService.createPage(createPageDTO, user);
    }
    @Post('/delete')
    deletePage(@Body('id') id: string) {
        return this.pageService.deletePage(id);
    }
    @Post('/update')
    updatePage(@Body() updatePageDTO: UpdatePageDTO, @GetUser() user: UserDocument): Promise<PageDocument> {
        return this.pageService.updatePage(updatePageDTO, user);
    }
}
