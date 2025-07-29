import React from "react";
import Link from "next/link";

const legalInfo: { item: string; content: string }[] = [
  { item: "販売業者の名称", content: "FOOD LIFE" },
  { item: "運営統括責任者", content: "Hisako Ishimatsu" },
  { item: "所在地", content: "福岡県糟屋郡新宮町新宮東3-12-12" },
  { item: "電話番号", content: "080-4280-2050" },
  { item: "メールアドレス", content: "kokolth.room@gmail.com" },
  { item: "販売URL", content: "https://www.kokolth.com/" },
  {
    item: "販売価格",
    content: `🔸 初回お試しプラン（メール1往復） 1,000円（税込） ※初回のみ
🔸 通常プラン（メール1往復） 2,000円（税込）
🔸 継続サポート3回パック（メール3往復） 5,000円（税込）`,
  },
  {
    item: "商品代金以外の必要料金",
    content: `送料なし（デジタルサービスのため）
振込手数料はお客様負担`,
  },
  { item: "支払い方法", content: "Stripe決済 または LINE経由のPayPay決済" },
  { item: "支払い時期", content: "サービス申し込み時に即時決済" },
  {
    item: "引き渡し時期",
    content: "決済完了後、サービス開始（メール相談開始）",
  },
  {
    item: "返品・キャンセルポリシー",
    content:
      "デジタルサービスの性質上、基本的に返品・キャンセル不可。ただし、サービス提供前のキャンセルは対応可能な場合あり。詳細はお問い合わせください。",
  },
];

export default function LegalPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-8">
        特定商取引法に基づく表記
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm md:text-base">
          <thead>
            <tr>
              <th className="w-1/3 p-3 bg-gray-100 font-medium border-r border-gray-200">
                項目
              </th>
              <th className="p-3 bg-gray-100 font-medium">内容</th>
            </tr>
          </thead>
          <tbody>
            {legalInfo.map(({ item, content }) => (
              <tr key={item} className="border-t border-gray-200">
                <td className="p-3 font-medium bg-gray-50 border-r border-gray-200">
                  {item}
                </td>
                <td className="p-3 whitespace-pre-line">{content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-full bg-gray-800 text-white hover:opacity-90 transition"
        >
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}