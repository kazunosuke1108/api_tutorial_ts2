import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // use(): ミドルウェアの本体
  // req: 入ってきたリクエスト
  // res: レスポンス
  // next: 次の処理にバトンタッチする関数
  use(req: Request, res: Response, next: NextFunction) {
    // もしクライアントが「x-request-id」というヘッダを付けてきたら、それをそのまま使う
    // ヘッダがなければ、サーバ側でランダムにUUIDをつける
    const incoming = req.header('x-request-id');
    const reqId = incoming || randomUUID();

    // 生成したUUIDをオブジェクトに埋め込んで、req.reqIdとして他の処理からも参照できるようにする
    (req as any).reqId = reqId;

    // 処理時間計測のために開始時刻を記録
    const start = Date.now();

    // リクエスト受信時のログ出力
    console.log(`[REQ] ${req.method} ${req.originalUrl} id=${reqId}`);

    // レスポンスが返り終わった時点で呼ぶ処理を登録しておく
    res.on('finish', () => {
      const ms = Date.now() - start;
      console.log(
        `[RES] ${req.method} ${req.originalUrl} id=${reqId} status=${res.statusCode} ${ms}ms`,
      );
    });
    // レスポンスのヘッダにUUIDを入れておくことで、レスポンスとリクエストの対応が付けられるようにする
    res.setHeader('x-request-id', reqId);

    // 次の処理に進んでね
    next();
  }
}
