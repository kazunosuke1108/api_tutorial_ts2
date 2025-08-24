import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Swagger の設定を行う関数
// Swagger は「APIの取扱説明書＋テスト画面」を自動生成してくれる便利ツール
export function setupSwagger(app: INestApplication) {
  // APIの基本情報を設定する部分
  // タイトル・説明・バージョンなどを指定できる
  const config = new DocumentBuilder()
    .setTitle('API') // ドキュメントのタイトル
    .setDescription('API description') // APIの説明文
    .setVersion('1.0') // APIのバージョン
    .addTag('API') // タグ（グループ分け用のラベル）
    .build();

  // 上で作った設定情報(config)をもとに、API仕様書(document)を作成
  const document = SwaggerModule.createDocument(app, config);

  // `http://localhost:3000/api-docs` にアクセスすると、
  // Swagger UI が表示され、APIの一覧や動作確認ができるようになる
  SwaggerModule.setup('api-docs', app, document);
}
