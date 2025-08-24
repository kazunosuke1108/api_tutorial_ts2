import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks') // このクラスを、データベースの「tasks」というテーブルに紐づけます
export class Task {
  @PrimaryGeneratedColumn('increment') // 主キー。1,2,3と自動で増えていく数値
  id!: number;

  @Column({ type: 'varchar', length: 200 }) // 200字以内で記入するタスクのタイトル
  title!: string;

  @Column({ type: 'text', nullable: true }) // 空でもOKのテキスト
  description!: string;

  @Column({ type: 'boolean', default: false }) // タスク官僚, 未完了。初期値はfalse
  done!: boolean;

  @CreateDateColumn() // レコードが作成された日時の自動保存
  createdAt!: Date;

  @CreateDateColumn() // レコードが更新された日時の自動保存
  updatedAt!: Date;
}
