'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

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
  const { isLoggedIn } = useAuthStore();
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
      title: 'お申し込み',
      content:
        'まずはお問い合わせフォームより<br />お申し込みをお願いいたします。',
      hasLinkButton: true,
      linkButtonText: 'お申し込みはこちら',
      linkButtonUrl: '/payment',
      accordionItems: [
        {
          label: '料金について',
          detail:
            '料金は、メール一往復2,000円です。返信メールが届いてから５日以内にご入金ください。',
        },
      ],
      additionalContent: [
        {
          type: 'heading',
          text: 'お支払い方法',
        },
        {
          type: 'list',
          items: ['クレジットカード', 'PayPay'],
        },
      ],
    },
    {
      title: 'ご相談内容の送信',
      content:
        'お申し込み後にご案内するメールアドレス宛に、ご相談内容をお送りください。',
    },
    {
      title: 'メールへのお返事',
      content:
        'お悩みの内容を受け止め、ご質問にはお答えし、お悩みには、今後のお気持ちの持ち方や、状況改善に効果的なワークをご紹介する等の内容をお送りいたします。<br />返信は数日以内にお送りさせて頂きます。',
    },
    {
      title: 'その後のやり取り',
      content:
        'お気持ちがスッキリされた場合は、そのまま終了されても構いません。さらにご相談されたい場合は、いつでもご返信ください。<br /><br />※<span class="text-red-600 font-bold">２回目以降のやり取りに期限はありません</span>ので、今後もご自由にカウンセリングを活用ください。',
    },
    {
      title: 'アンケート',
      content:
        'よろしければ、お問い合わせフォーム、もしくは<span class="text-green-600 font-bold">LINE</span>でカウンセリングの率直なご感想をお聞かせください。今後の改善に取り入れさせて頂きます！',
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
                            
                            if (isLoggedIn) {
                              window.location.href = step.linkButtonUrl || '';
                            } else {
                              toast.error('ログインが必要です');
                            }
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
      </div>
    </>
  );
};

export default ProcessCard;
