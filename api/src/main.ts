import { ValidationPipe } from '@nestjs/common'; // 入出力チェックツール
import { NestFactory } from '@nestjs/core'; // アプリのインスタンスを作る。
import { AppModule } from './app.module'; // アプリ全体の設定をまとめているファイル
import { setupSwagger } from './common/swagger'; // 自分で書いた、Swaggerの設定
import { RequestIdInterceptor } from './common/request-id.interceptor'; // 自分で書いた、ID管理するやつ。

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // AppModuleをもとにインスタンスappを作っていく。CORS(サーバを超えたデータ送受信)を許可。
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // すべてのリクエストに対してバリデーションする。許可していないプロパティは無視。データの自動型変換を許可。
  app.useGlobalInterceptors(new RequestIdInterceptor());
  // 全リクエストに対してInterceptor(ID管理)を適用
  setupSwagger(app);
  // Swaggerを適用
  const port = process.env.PORT || 3000;
  await app.listen(port);
  // アプリに指定のport番号で待ち受けさせる
  console.log(`API listening on port ${port}`);
}

bootstrap();
// bootstrap: アプリを立ち上げる入口的な関数
