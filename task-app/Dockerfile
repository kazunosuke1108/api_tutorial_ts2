FROM node:18
WORKDIR /app

# 依存だけ先に入れてキャッシュ効かせる
COPY package*.json ./
RUN npm install

# ソース投入→ビルド
COPY . .
RUN npm run build

# 静的配信用のサーバ
RUN npm install -g serve

EXPOSE 3000
# ← ここが超重要：exec 形式（角カッコ）で JSON 配列。前後に余計なクォートを付けない
CMD ["serve", "-s", "build", "-l", "3000"]