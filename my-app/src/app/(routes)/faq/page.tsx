import type { NextPage } from "next";
import Link from "next/link";
import Footer from "../../../components/organisms/Footer";
import Typography from "../../../components/atoms/Typography";

const FAQPage: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <Link href="/" className="flex items-baseline text-gray-700 hover:text-gray-900">
          <svg 
            className="mr-1 h-3 w-3" 
            width="12" 
            height="12" 
            viewBox="0 0 16 16" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.381 1.381A.875.875 0 1 1 7.62 2.62L3.112 7.125H15a.875.875 0 1 1 0 1.75H3.112l4.507 4.506A.875.875 0 1 1 6.38 14.62l-6-6a.872.872 0 0 1 0-1.238l6-6Z"></path>
          </svg>
          <span className="text-sm font-medium">戻る</span>
        </Link>
      </div>
      
      <main className="pt-8 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <Typography
              variant="h2"
              weight="bold"
              color="primary"
              className="mb-8 text-center"
            >
              よくある質問
            </Typography>
            
            <div className="space-y-8">
              <section>
                <Typography
                  variant="h3"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  サービスについて
                </Typography>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. KOKOLTHはどのようなサービスですか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. KOKOLTHは、LINEを通じて心の悩みや人生の相談を受け付けるオンライン相談サービスです。
                      プライバシーを重視し、匿名での相談が可能です。
                    </Typography>
                  </div>

                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. どのような悩みについて相談できますか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. 高齢出産、妊活、妊娠、高齢育児、夫婦関係、将来への不安など、あらゆる心の悩みについて相談を受け付けています。
                      どんな小さな悩みでもお気軽にご相談ください。
                    </Typography>
                  </div>
                </div>
              </section>

              <section>
                <Typography
                  variant="h3"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  ご利用方法
                </Typography>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. 相談はどのように行いますか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. ウェブサイトに掲載されているLINE KOKOLTHビジネスアカウントを友だち追加のうえチャットでご相談内容をお送りいただく<span style={{color: 'red'}}>（※要決済）</span>と、専門カウンセラーが通常24時間以内にLINEで回答いたします。
                    </Typography>
                  </div>

                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. 会員登録は必要ですか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. 基本的な相談は会員登録なしでご利用いただけます。
                    </Typography>
                  </div>
                </div>
              </section>

              <section>
                <Typography
                  variant="h3"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  料金について
                </Typography>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. 料金はいくらですか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. 1回につき2,000円となります。
                    </Typography>
                  </div>

                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. 支払い方法は何がありますか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. クレジットカード、PayPayでのお支払いが可能です。
                    </Typography>
                  </div>
                </div>
              </section>

              <section>
                <Typography
                  variant="h3"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  プライバシーとセキュリティ
                </Typography>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. 個人情報は安全に管理されていますか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. はい、LINEチャットを含むすべての相談メッセージはTLS（SSL）暗号化で送受信され、当社サーバーへの保存は行っておりません。
                      相談記録は担当カウンセラーの端末にのみ一時的に保管され、相談終了後は30日以内に完全に削除されます。
                    </Typography>
                  </div>

                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. 匿名での相談は可能ですか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. もちろん可能です。ニックネームや仮名でのご相談も承っております。
                      お客様のプライバシーを最優先に考えています。
                    </Typography>
                  </div>
                </div>
              </section>

              <section>
                <Typography
                  variant="h3"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  その他
                </Typography>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-amber-200 pl-6">
                    <Typography
                      variant="h5"
                      weight="medium"
                      color="black"
                      className="mb-2"
                    >
                      Q. キャンセルや返金は可能ですか？
                    </Typography>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      A. サービス開始前であれば、キャンセルと返金が可能です。
                      詳しくは利用規約をご確認いただくか、お問い合わせください。
                    </Typography>
                  </div>
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <Typography
                  variant="body"
                  color="gray"
                  className="leading-relaxed"
                >
                  その他ご質問がございましたら、LINEでお気軽にお問い合わせください。
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
