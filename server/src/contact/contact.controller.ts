import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Contact } from './contact.entity';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.contactService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id) {
        return this.contactService.findOne(id);
    }

    @Post() create(@Body() contact: Contact) {
        return this.contactService.createcontact(contact);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async editcontact(@Body() contact: Contact, @Param('id') id: number): Promise<Contact> {
        const contactEdited = await this.contactService.editcontact(id, contact);
        return contactEdited;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id) {
        this.contactService.remove(id);
    }
}