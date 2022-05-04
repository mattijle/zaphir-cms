import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema()
export class Page {
    @Prop()
    name: string;

    @Prop()
    slug: string;

    @Prop()
    created_by: string

    @Prop()
    edited_by: string

    @Prop()
    last_edited: Date

    @Prop({ type: Object })
    content: Object;
}

export const PageSchema = SchemaFactory.createForClass(Page);