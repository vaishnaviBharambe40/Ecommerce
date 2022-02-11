import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact) private contactsRepository: Repository<Contact>,
      ) {}
      async getAll(): Promise<Contact[]> {
        return await this.contactsRepository.find();
      }
    
      findOne(id: string): Promise<Contact> {
        return this.contactsRepository.findOne(id);
      }
    
      async createcontact(contact: Contact) {
        this.contactsRepository.save(contact);
      }
    
      async remove(id: string): Promise<void> {
        await this.contactsRepository.delete(id);
      }
    
      async editcontact(id: number, contact: Contact): Promise<Contact> {
        const editedcontact = await this.contactsRepository.findOne(id);
        if (!editedcontact) {
          throw new NotFoundException('contact is not found');
        }
        editedcontact.name = contact.name;
        editedcontact.email = contact.email;
        editedcontact.contact_no = contact.contact_no;
        editedcontact.query = contact.query;
        await editedcontact.save();
        return editedcontact;
      }
}