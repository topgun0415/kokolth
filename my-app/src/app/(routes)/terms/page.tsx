import type { NextPage } from "next";
import Link from "next/link";
import Footer from "../../../components/organisms/Footer";
import Typography from "../../../components/atoms/Typography";

const TermsPage: NextPage = () => {
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
              利用規約
            </Typography>

            <div className="space-y-8">
              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第1条（目的）
                </Typography>
                <Typography
                  variant="body"
                  color="gray"
                  className="leading-relaxed"
                >
                  本規約は、当社（以下「当社」といいます）が提供するウェブ／モバイルサービス（以下「本サービス」といいます）の利用条件ならびに当社と利用者との権利義務関係を定めるものです。
                </Typography>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第2条（定義）
                </Typography>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      「利用者」…本規約に同意のうえ本サービスを利用するすべての個人または法人。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      「投稿コンテンツ」…利用者が本サービス上に投稿・送信・アップロードする一切のデータ。
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第3条（規約の表示および改定）
                </Typography>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      当社は本規約を本サービスの初期画面またはウェブサイトに常時掲示します。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      当社は法令を遵守したうえで本規約を変更できます。変更時は施行日・改定理由を明示し、少なくとも14日前から掲示します。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      利用者が改定後に本サービスを継続利用した場合、改定内容に同意したものとみなします。
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第4条（サービスの提供および中断）
                </Typography>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed mb-2"
                    >
                      当社は以下のサービスを提供します。
                    </Typography>
                    <div className="pl-4 space-y-2">
                      <Typography
                        variant="body"
                        color="gray"
                        className="leading-relaxed"
                      >
                        (1) コンテンツ配信サービス
                      </Typography>
                      <Typography
                        variant="body"
                        color="gray"
                        className="leading-relaxed"
                      >
                        (2) コミュニティ機能（掲示板・コメント等）
                      </Typography>
                      <Typography
                        variant="body"
                        color="gray"
                        className="leading-relaxed"
                      >
                        (3) その他当社が別途定めるサービス
                      </Typography>
                    </div>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      当社はシステム保守・アップデート・災害・クラウド障害等やむを得ない場合に、本サービスを一時中断することがあります。事前告知を原則としますが、緊急時は事後告知とすることがあります。
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第5条（利用者の禁止事項）
                </Typography>
                <Typography
                  variant="body"
                  color="gray"
                  className="leading-relaxed mb-4"
                >
                  利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。
                </Typography>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      他者の個人情報・アカウント情報を不正取得／不正使用する行為
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      犯罪行為またはその準備行為
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      当社または第三者の知的財産権その他権利を侵害する行為
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      AI／自動化ツールを用いたスパム投稿、ディープフェイク生成等の行為
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      法令・公序良俗に反する行為
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第6条（利用制限およびサービス終了）
                </Typography>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      利用者が本規約に違反した場合、当社は事前通知なく利用停止・アカウント削除等を行うことがあります。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      利用者はいつでも自己の操作により退会できます。当社は速やかに処理します。
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第7条（知的財産権）
                </Typography>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      本サービスに関する著作権・商標権その他知的財産権は当社または正当な権利者に帰属します。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      利用者は、本サービス経由で取得した情報を当社の事前書面承諾なく複製・改変・配布・商業利用してはなりません。
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第8条（投稿コンテンツの取扱い）
                </Typography>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      利用者は、自己の投稿コンテンツについて、当社に対し日本国内外で無償・非独占的に利用（複製・翻訳・配信・改変を含む）する権利を許諾します。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      当社は、情報流通プラットフォーム法および当社ガイドラインに従い、違法・不適切な投稿コンテンツを削除または非公開化できるものとします。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      利用者は、投稿コンテンツが第三者の権利を侵害しないことを保証し、紛争が生じた場合は自己の費用と責任で解決するものとします。
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第9条（未成年者の利用）
                </Typography>
                <Typography
                  variant="body"
                  color="gray"
                  className="leading-relaxed"
                >
                  未成年者が本サービスを利用する場合、親権者等法定代理人の同意を得たものとみなします。未成年者が当該同意なく利用した場合、当社は契約取消しに関する一切の責任を負いません。
                </Typography>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第10条（料金・支払・キャンセル）
                </Typography>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      有料サービスを利用する場合、料金・支払方法・キャンセルポリシーは別途ウェブサイトに表示します。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      電子契約成立後、法令に基づくクーリングオフが適用される場合を除き、返金は行いません。
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第11条（個人情報の取扱い）
                </Typography>
                <Typography
                  variant="body"
                  color="gray"
                  className="leading-relaxed"
                >
                  当社は、利用者の個人情報を個人情報保護法および当社プライバシーポリシーに従い適切に取り扱います。詳細は別途掲載するプライバシーポリシーをご確認ください。
                </Typography>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第12条（免責事項）
                </Typography>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      当社は、天災地変、第三者によるサービス停止、通信回線・クラウド障害その他当社の合理的支配を超える事由により生じた損害について、責任を負いません。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      当社は、当社の故意または重過失による場合を除き、通常かつ直接の損害について、1万円を上限として賠償責任を負うものとします。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      利用者のデバイス環境・操作ミスから生じた損害について、当社は責任を負いません。
                    </Typography>
                  </li>
                </ol>
              </section>

              <section>
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  第13条（準拠法および管轄裁判所）
                </Typography>
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      本規約の準拠法は日本法とします。
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      variant="body"
                      color="gray"
                      className="leading-relaxed"
                    >
                      本サービスに関連して紛争が生じた場合、福岡地方裁判所を第一審の専属的合意管轄裁判所とします。
                    </Typography>
                  </li>
                </ol>
              </section>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <Typography
                  variant="h4"
                  weight="medium"
                  color="secondary"
                  className="mb-4"
                >
                  附則
                </Typography>
                <Typography
                  variant="body"
                  color="gray"
                  className="leading-relaxed"
                >
                  本規約は2025年7月5日から適用します。
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

export default TermsPage;
