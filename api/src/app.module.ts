import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { LoggingMiddleware } from './common/logging.middleware';
import { Task } from './tasks/entities/task.entity';
// tasks.entityで今回扱うDBのクラスを定義しており、その名前がTask。

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeORMError } from 'typeorm';
// import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // アプリ起動時にTypeORMを初期化
      type: 'postgres',
      host: process.env.DATABASE_HOST, // この変数は.envかdocker-compose.ymlに定義してあるはず
      port: Number(process.env.DATABASE_PORT || 5432), // 接続ポート。未設定なら5432。型を明記
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Task],
      // この接続で扱うエンティティをここに書く。書かれたクラスがテーブル定義のもとになる
      synchronize: true,
    }),
    TasksModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  // NestModuleを噛ませることで、configure()が使えるようになり、それを使ってミドルウェアの設定が出来る
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // 全ルート('*')においてLoggingMiddlewareを適用(=IDの管理対象)
  }
}
