import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';



// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
//   private readonly users = [
//     {
//       userId: 1,
//       username: 'john',
//       password: 'changeme',
//     },
//     {
//       userId: 2,
//       username: 'maria',
//       password: 'guess',
//     },
//   ];

//   async findOne(username: string): Promise<User | undefined> {
//     return this.users.find(user => user.username === username);
//   }

constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findOne(mobile: string): Promise<User> {
    return this.usersRepository.findOne({ where:
        { mobile: mobile }
    });
  }

  async create(user: User) {
    this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async edit(id: number, user: User): Promise<User> {
    const editeduser = await this.usersRepository.findOne(id);
    if (!editeduser) {
      throw new NotFoundException('user is not found');
    }
    editeduser.name = user.name;
    editeduser.mobile = user.mobile;
    editeduser.role = user.role;
    await editeduser.save();
    return editeduser;
  }
}