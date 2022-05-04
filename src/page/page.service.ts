import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePageDTO } from 'src/dto/CreatePage.dto';
import { Page, PageDocument } from 'src/schemas/page.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { UpdatePageDTO } from 'src/dto/updatePage.dto';

@Injectable()
export class PageService {
    constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) { }
    getPage(slug: string): Object {
        return this.pageModel.findOne({ slug: { $eq: slug } })
    }
    async createPage(createPageDTO: CreatePageDTO, user: UserDocument) {
        if (await this.pageModel.findOne({ slug: { $eq: createPageDTO.slug } }))
            throw new ConflictException('Page with the same url already exists.')
        const createdPage = new this.pageModel(createPageDTO);
        createdPage.created_by = user.name;
        return createdPage.save();
    }
    async updatePage(updatePageDTO: UpdatePageDTO, user: UserDocument) {
        const { name, slug, content } = updatePageDTO;
        const update = { name, slug, content, edited_by: user.name, last_edited: Date.now() }
        const updatedPage = await this.pageModel.findByIdAndUpdate({ _id: updatePageDTO.id }, update, { new: true });
        return updatedPage;
    }
    async deletePage(id: string) {
        try {
            const removed = await this.pageModel.findByIdAndRemove(id);
            if (removed)
                return `Successfully deleted page ${removed.name}`
            return `Page you're trying to delete doesn't exist.`
        } catch (err) {
            console.log(err);
        }


    }
}
