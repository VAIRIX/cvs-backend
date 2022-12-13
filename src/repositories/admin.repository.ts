import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BCRYPT_HASH_ROUND } from '../constants/index';
import { AdminEntity } from '..//entities/admin.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AdminRepository {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  findAll(): Promise<AdminEntity[]> {
    return this.adminRepository.find();
  }

  findById(id: number): Promise<AdminEntity> {
    return this.adminRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<AdminEntity> {
    return this.adminRepository.findOneBy({ username });
  }

  async create(admin: any): Promise<AdminEntity> {
    const password = await bcrypt.hash(
      admin.password,
      Number(BCRYPT_HASH_ROUND),
    );
    return this.adminRepository.save({ ...admin, password });
  }
}
