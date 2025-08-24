# ====================
# 依存関係のインストール
# ====================
FROM node:20-alpine AS deps   
# 軽量な Node.js (v20) の公式イメージを使う
WORKDIR /app                  
# 作業ディレクトリを /app に設定
COPY package*.json ./         
# 依存関係を定義したファイルをコピー
RUN npm ci                    
# package-lock.json に従って依存関係をインストール


# ====================
# 上記でインストールしたライブラリと自作ソースコードを組み合わせて、「完成品」(distフォルダ)を作る
# ====================
FROM node:20-alpine AS build  
# 同じ Node.js イメージを利用
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules  
# 依存関係をコピー（再インストールを省略）
COPY . .                                            
# プロジェクトの全ファイルをコピー
RUN npm run build                                   
# ビルドコマンドを実行（例: TypeScript を JS に変換）


# ====================
# 本番環境を作る
# ====================
FROM node:20-alpine AS runner   
# 実行環境も軽量な Node.js イメージを利用
WORKDIR /app
ENV NODE_ENV=production         
# 環境変数を本番モードに設定
COPY --from=build /app/node_modules ./node_modules  
# ビルド済みの依存関係をコピー
COPY --from=build /app/dist ./dist                  
# ビルド済みの成果物（distフォルダ）をコピー
CMD [ "node", "dist/src/main.js" ]                  
# コンテナ起動時にアプリを実行