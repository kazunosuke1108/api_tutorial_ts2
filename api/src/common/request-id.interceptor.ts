import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestIdInterceptor implements NestInterceptor {
  // intercept(): インターセプターの本体
  // context: 実行コンテキスト。HTTPリクエストなどの情報が入ってる？
  // next: この後の処理を進めてね、というハンドラ
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // HTTPコンテキストへの切り替え(型を揃える)
    const ctx = context.switchToHttp();

    // リクエストを取得
    // このreqに入るデータはRequestという型です。
    // reqIdという型プロパティが入ってる可能性があって、その型はstringのはずですよ、と教えておく(=cast))
    const req = ctx.getRequest<Request & { reqId?: string }>();

    // レスポンスを取得
    const res = ctx.getResponse();

    // next.handle()で次の処理を呼び出す
    // 呼び出し結果に対して、pipeという機能を使って処理を追加
    return next.handle().pipe(
      tap(() => {
        // ミドルウェアでreqIdが埋め込まれていれば
        if ((req as any).reqId) {
          // レスポンスヘッダーにx-transaction-idとしてセット
          res.setHeader('x-transaction-id', (req as any).reqId);
        }
      }),
    );
  }
}
