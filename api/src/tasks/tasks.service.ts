import { Injectable } from '@nestjs/common';
// Serviceに他のところで定義した処理を注入(突っ込める)ようにする
import { InjectRepository } from '@nestjs/typeorm';
// TypeORM製のリポジトリ(DBとの翻訳)を注入するためのヘルパー
import { Repository } from 'typeorm';
// DBと会話する窓口の型
import { Task } from './entities/task.entity';
// DBと紐づいたクラスのエンティティ
import { CreateTaskDto } from './dto/create-task.dto';
// APIの入出力定義

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly repo: Repository<Task>) {}
  // Taskというテーブル専属の、Repository(DBにSELECT INSERTとかをやってくれる通訳)を引き合わせる。
  // 以後、repoといったらTaskの読み書きをしてくれるrepositoryを指す

  // 関数1つ目：タスクを新規に記入
  create(dto: CreateTaskDto) {
    const task = this.repo.create(dto);
    return this.repo.save(task);
  }

  // 関数2つ目：完了/未完了タスクの一覧を取得
  findAll(filter: { done?: boolean }) {
    const qb = this.repo.createQueryBuilder('t');
    if (filter.done != undefined) qb.andWhere('t.done = :done', { done: filter.done });
    qb.orderBy('t.id', 'DESC');
    return qb.getMany();
  }

  // 関数3つ目：特定IDの情報を取得
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
