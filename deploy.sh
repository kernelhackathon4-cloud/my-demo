#!/bin/bash

# Vercel 배포 스크립트
# Usage: ./deploy.sh

echo "🚀 Vercel 배포 시작..."
echo ""

# 1. 빌드
echo "📦 빌드 중..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ 빌드 실패"
  exit 1
fi

echo "✅ 빌드 완료"
echo ""

# 2. Vercel 배포
echo "📤 Vercel에 배포 중..."
npx vercel deploy --prod

echo ""
echo "✅ 배포 완료!"
echo "🌐 https://my-demo.vercel.app"
