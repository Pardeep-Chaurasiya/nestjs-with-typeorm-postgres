import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>){}

  create(createUserDto: CreateUserDto):Promise<User> {
    let user : User = new User()
    // user.id = uuidv4()
    user.firstName = createUserDto.firstName
    user.lastName = createUserDto.lastName
    user.age = createUserDto.age
    return this.userRepository.save(user);
  }

  findAll() :Promise<User[]>{
    return this.userRepository.find();
  }

  findOne(id: string):Promise<User> {
    return this.userRepository.findOneBy({id});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    let user : User = new User()
    user.firstName = updateUserDto.firstName
    user.lastName = updateUserDto.lastName
    user.age = updateUserDto.age
    user.id=id
    return this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
