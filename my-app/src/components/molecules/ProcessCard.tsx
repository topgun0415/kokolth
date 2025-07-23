'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Typography } from '@/components/atoms/Typography';

interface AdditionalContent {
  type: 'heading' | 'list';
  text?: string;
  items?: string[];
}

interface AccordionItem {
  label: string;
  detail: string;
}

interface Step {
  title: string;
  content: string;
  hasLinkButton?: boolean;
  linkButtonText?: string;
  linkButtonUrl?: string;
  additionalContent?: AdditionalContent[];
  accordionItems?: AccordionItem[];
  annotations?: string[];
}

const ProcessCard = () => {
  const [expandedAccordions, setExpandedAccordions] = useState<Record<string, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), 1000);
            observer.unobserve(cardElement);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px',
      }
    );

    observer.observe(cardElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleAccordion = (id: string) => {
    setExpandedAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const steps: Step[] = [
    {
      title: 'LINEからお申し込み',
      content:
        'まずは友達登録をお願い致します。ご相談のお申し込み、ご質問やお問い合わせもこちらからお気軽にどうぞ！ご質問やお問い合わせは無料です。決済後でも無料でご質問頂けます。',
    },
    {
      title: 'ご希望プランの確認と決済',
      content:
        'クレジットカードご希望の方はホームページの決済画面から<span class="text-red-600 font-bold">PayPay</span>ご希望の方は<span class="text-green-600 font-bold">LINE</span>のトークルーム<br />左下「＋」から簡単に決済して頂けます。'
    },
    {
      title: 'ご相談内容をLINEもしくはメールにてお送りください',
      content:
        '<span class="text-green-600 font-bold">LINE</span>のトーク画面でそのまま書いて頂くか、メールご希望の方にはアドレスもご案内いたします。時間帯は問いません。字数制限もありません。ご自分のペースで、思うままに綴っていただければ大丈夫です。',
    },
    {
      title: 'カウンセラーからの返信',
      content:
        'ご相談文を受け取りましたら、24時間以内にご返信いたします。これで1往復のカウンセリングが完了です。',
    },
  ];

  return (
    <>
      <div
        ref={cardRef}
        className={`w-full max-w-3xl mx-auto rounded-lg overflow-hidden transform transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
        <div className='rounded-lg p-3 md:p-8 relative '>
          <ol className='relative list-none p-0 m-0'>
            {steps.map((step, index) => (
              <li key={index} className='relative pb-12 last:pb-0'>
                <div className='flex flex-row'>
                  <div className='flex flex-col items-center mr-2'>
                    <div className='relative z-10 flex justify-center items-center w-12 h-12 text-white bg-gray-600 border-4 border-white rounded-full font-extrabold text-base'>
                      {index + 1}
                    </div>

                    {index < steps.length - 1 && (
                      <div className='w-1 bg-gray-200 h-full absolute left-[23px] top-[48px]'></div>
                    )}
                  </div>

                  {/* Right column with content */}
                  <div className='flex-1'>
                    {/* Step Title */}
                    <h3 className='text-lg font-bold mt-2 mb-4 text-left'>
                      {step.title}
                    </h3>

                    {/* Step Content Box */}
                    <div className='bg-white p-4 rounded-lg border border-gray-200'>
                      <p
                        className='font mb-4 text-sm text-left'
                        dangerouslySetInnerHTML={{ __html: step.content }}
                      />

                      {/* Link Button */}
                      {step.hasLinkButton && (
                        <a
                          href={step.linkButtonUrl}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className='inline-flex items-center justify-between bg-gray-600 text-white px-4 py-2 text-sm rounded-md mb-4 w-full'>
                          <span>{step.linkButtonText}</span>
                          <span className='ml-2'>→</span>
                        </a>
                      )}

                      {/* Additional Content */}
                      {step.additionalContent &&
                        step.additionalContent.map((content, i) => (
                          <div key={i} className='mt-4'>
                            {content.type === 'heading' && content.text && (
                              <h4 className='text-base sm:text-lg font-bold mb-2 text-left'>
                                {content.text}
                              </h4>
                            )}
                            {content.type === 'list' && content.items && (
                              <ul className='list-disc pl-5 text-sm sm:text-base text-left'>
                                {content.items.map((item, j) => (
                                  <li key={j} className='mb-2 last:mb-0'>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}

                      {/* Accordion Items */}
                      {step.accordionItems &&
                        step.accordionItems.length > 0 && (
                          <div className='mt-4 border rounded-md overflow-hidden text-sm sm:text-base'>
                            {step.accordionItems.map((item, i) => {
                              const accordionId = `accordion-${index}-${i}`;
                              return (
                                <div
                                  key={i}
                                  className='border-b last:border-b-0'>
                                  <div
                                    className='flex justify-between items-center p-3 sm:p-4 bg-gray-50 cursor-pointer'
                                    onClick={() =>
                                      toggleAccordion(accordionId)
                                    }>
                                    <button
                                      type='button'
                                      className='font-medium w-full flex justify-between items-center text-sm sm:text-base'>
                                      <span>{item.label}</span>
                                      <ChevronDownIcon
                                        className={`w-5 h-5 transition-transform flex-shrink-0 ml-2 ${
                                          expandedAccordions[accordionId]
                                            ? 'rotate-180'
                                            : ''
                                        }`}
                                      />
                                    </button>
                                  </div>
                                  {expandedAccordions[accordionId] && (
                                    <div className='p-3 sm:p-4 bg-white text-left'>
                                      <p>{item.detail}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                      {/* Annotations */}
                      {step.annotations && step.annotations.length > 0 && (
                        <ul className='list-disc pl-5 mt-4 text-sm sm:text-base text-left'>
                          {step.annotations.map((annotation, i) => (
                            <li key={i} className='mb-2 last:mb-0'>
                              <p
                                dangerouslySetInnerHTML={{ __html: annotation }}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10 text-center space-y-2">
          <Typography
            variant="body"
            weight="bold"
            color="primary"
            className="text-lg sm:text-xl font-bold mt-10"
          >
            ご相談内容についてのお願い
          </Typography>
          <Typography
            variant="body"
            weight="regular"
            color="primary"
            className="text-sm sm:text-base text-center mt-4"
          >
            ご相談内容は一度で書き切れなくても大丈夫です。<br />
            何日かかけてゆっくりと、自分のペースで整理<br />
            しながら綴っていただいても大丈夫です。
          </Typography>
          <Typography
            variant="body"
            weight="regular"
            color="primary"
            className="text-sm sm:text-base text-center mt-4"
          >
            途中で送ってしまったり、「やっぱりここ直したい」<br />と思われた場合もご安心ください。<br />
            最後に「ここまででお願いします」や<br />「以上で送信完了です」など、<br />一言そえていただけた時点で、返信の準備を<br />させていただきます。
          </Typography>
          <Typography
            variant="body"
            weight="regular"
            color="primary"
            className="text-sm sm:text-base text-center mt-4"
          >
            何から話していいか分からない方は、今感じている<br />ことをそのまま教えてくださいね。
          </Typography>
          <Typography
            variant="body"
            weight="regular"
            color="primary"
            className="text-sm sm:text-base text-center mt-4"
          >
            書くという行為自体が、心の整理を助けてくれる<br />ことがあります。
            カウンセリングは、すでにその時間<br />から始まっています。
            あなたの言葉を、ゆっくり<br />お待ちしております。
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ProcessCard;
