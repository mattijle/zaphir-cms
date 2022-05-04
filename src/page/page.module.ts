import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Page, PageSchema } from 'src/schemas/page.schema';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]), AuthModule],
    exports: [PageModule, PageService],
    controllers: [PageController],
    providers: [PageService]
})
export class PageModule { }
