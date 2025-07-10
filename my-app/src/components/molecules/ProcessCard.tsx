'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

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
        '<span class="text-green-600 font-bold">LINE</span>登録後、お名前（ニックネーム、イニシャル可）、年齢、ご希望のプランをお知らせください。あわせて簡単なご相談の内容やご質問もお書き添えいただけますとスムーズです。',
    },
    {
      title: 'ご希望プランの確認と金額のご案内',
      content:
        'ご希望プランを確認後、カウンセリングの料金とお支払い方法（<span class="text-red-600 font-bold">PayPay</span>、<span class="text-red-600 font-bold">クレジットカード</span>）をご案内いたします。PayPayでのお支払いの場合はQRコードを使って簡単にご送金いただけます。'
    },
    {
      title: 'お支払い完了の確認',
      content:
        'ご入金が確認できましたら<span class="text-green-600 font-bold">LINE</span>にてご連絡いたします。その後正式にカウンセリング開始となります。',
    },
    {
      title: 'ご相談内容を、メールまたはLINEでお送りください。',
      content:
        '時間帯は問いません。字数制限もありません。ご自分のペースで、思うままに綴っていただければ大丈夫です。<span class="text-green-600 font-bold">LINE</span>の場合、既読がつくまでは何度でも追加や訂正をして頂けます。何から話していいか分からない方は、今感じていることをそのまま教えてくださいね。',
    },
    {
      title: 'カウンセラーからの返信（1往復完了）',
      content:
        '<span class="text-red-600 font-bold">48時間</span>以内にご返信いたします。これで1往復のカウンセリングが完了です。'
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
        <p className='text-center text-sm sm:text-base mt-10'>ご不明な点がありましたら、</p>
        <p className='text-center text-sm sm:text-base'>LINEからお気軽にご質問ください</p>
        <p className='text-center text-sm sm:text-base'>不安なお気持ちが少しでも軽くなるよう、</p>
        <p className='text-center text-sm sm:text-base'>心を込めてお手伝いさせていただきます</p>
      </div>
    </>
  );
};

export default ProcessCard;
