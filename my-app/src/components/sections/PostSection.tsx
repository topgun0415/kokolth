"use client";

import { useState, useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Typography } from "../atoms/Typography";
import LoadingBar from "../atoms/LoadingBar";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: TipTapContent;
  created_at: string;
  user_id: string;
}

interface TipTapContent {
  content?: TipTapNode[];
  type?: string;
}

interface TipTapNode {
  type: string;
  content?: TipTapNode[];
  text?: string;
  attrs?: {
    level?: number;
    textAlign?: string;
    color?: string;
  };
  marks?: TipTapMark[];
}

interface TipTapMark {
  type: string;
  attrs?: {
    color?: string;
  };
}

// TipTap content renderer
function TipTapRenderer({ content }: { content: TipTapContent }) {
  if (!content) return null;

  const renderNode = (node: TipTapNode, index: number): React.ReactNode => {
    switch (node.type) {
      case "paragraph":
        const textAlign = node.attrs?.textAlign || 'left';
        return (
          <p
            key={index}
            className="mb-4 leading-relaxed"
            style={{ textAlign: textAlign as React.CSSProperties['textAlign'] }}
          >
            {node.content?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </p>
        );

      case "heading":
        const level = node.attrs?.level || 1;
        const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        const headingClasses: Record<number, string> = {
          1: "text-2xl font-bold mb-4 text-gray-900",
          2: "text-xl font-bold mb-3 text-gray-900",
          3: "text-lg font-bold mb-2 text-gray-900",
        };
        const headingClass = headingClasses[level] || "text-lg font-bold mb-2 text-gray-900";
        const headingAlign = node.attrs?.textAlign || 'left';

        return (
          <HeadingTag
            key={index}
            className={headingClass}
            style={{ textAlign: headingAlign as React.CSSProperties['textAlign'] }}
          >
            {node.content?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </HeadingTag>
        );

      case "bulletList":
        return (
          <ul key={index} className="list-disc list-inside mb-4 space-y-1">
            {node.content?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </ul>
        );

      case "orderedList":
        return (
          <ol key={index} className="list-decimal list-inside mb-4 space-y-1">
            {node.content?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </ol>
        );

      case "listItem":
        return (
          <li key={index} className="leading-relaxed">
            {node.content?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </li>
        );

      case "blockquote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-700 bg-gray-50"
          >
            {node.content?.map((child, childIndex) =>
              renderNode(child, childIndex)
            )}
          </blockquote>
        );

      case "text":
        const textElement = node.text || "";
        let className = "";
        const style: React.CSSProperties = {};

        if (node.marks) {
          node.marks.forEach((mark) => {
            switch (mark.type) {
              case "bold":
                className += " font-bold";
                break;
              case "italic":
                className += " italic";
                break;
              case "underline":
                className += " underline";
                style.textDecoration = style.textDecoration ? `${style.textDecoration} underline` : 'underline';
                break;
              case "strike":
                className += " line-through";
                style.textDecoration = style.textDecoration ? `${style.textDecoration} line-through` : 'line-through';
                break;
              case "code":
                className += " bg-gray-100 text-gray-800 px-1 py-0.5 rounded font-mono text-xs";
                break;
              case "textStyle":
                if (mark.attrs?.color) {
                  style.color = mark.attrs.color;
                }
                break;
              case "highlight":
                if (mark.attrs?.color) {
                  style.backgroundColor = mark.attrs.color;
                } else {
                  className += " bg-yellow-200";
                }
                break;
            }
          });
        }

        return (
          <span key={index} className={className.trim()} style={style}>
            {textElement}
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="prose max-w-none">
      {content.content?.map((node, index) =>
        renderNode(node, index)
      )}
    </div>
  );
}

export default function PostSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/posts/read?limit=10");
        const data = await response.json();

        if (response.ok) {
          setPosts(data.posts);
        } else {
          setError(data.error || "ポストの読み込みに失敗しました");
        }
      } catch {
        setError("ポストの読み込みに失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Cleanup effect to restore scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Format date to Japanese format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  // Handle post click to open modal
  const handlePostClick = async (post: Post, event: React.MouseEvent) => {
    // Prevent event bubbling
    event.stopPropagation();
    
    setSelectedPost(post);
    setModalLoading(true);
    setError(null);

    try {
      // Fetch full post data if needed
      const response = await fetch(`/api/posts/read/${post.slug}`);
      const data = await response.json();

      if (response.ok) {
        setSelectedPost(data.post);
      } else {
        setError(data.error || "ポストの詳細読み込みに失敗しました");
        // Keep modal open but show error
      }
    } catch {
      setError("ポストの詳細読み込みに失敗しました");
      // Keep modal open but show error
    } finally {
      setModalLoading(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setSelectedPost(null);
    setModalLoading(false);
    setError(null);
  };

  // Handle modal content click to prevent closing
  const handleModalContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // 모달 열기 및 스크롤 방지
  useEffect(() => {
    if (selectedPost) {
      // 간단하고 안전한 스크롤 방지
      document.body.style.overflow = 'hidden';
      
      // 터치 이벤트 방지 (모바일)
      const preventTouchMove = (e: TouchEvent) => {
        // 모달 내부 스크롤은 허용하고 배경 스크롤만 방지
        if (e.target && !(e.target as HTMLElement).closest('[data-modal-content]')) {
          e.preventDefault();
        }
      };
      
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
      
      return () => {
        // 스크롤 방지 해제
        document.body.style.overflow = '';
        
        // 이벤트 리스너 제거
        document.removeEventListener('touchmove', preventTouchMove);
      };
    }
  }, [selectedPost]);

  if (loading) {
    return (
      <section className="py-16 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex flex-col justify-center items-center">
              <Typography
                variant="h3"
                weight="medium"
                color="primary"
                font="yugothic-medium"
                className="mt-4 text-center"
              >
                ニュース
              </Typography>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="h-80 overflow-y-auto p-8">
              <LoadingBar />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex flex-col justify-center items-center">
            <Typography
              variant="h3"
              weight="medium"
              color="primary"
              font="yugothic-medium"
              className="mt-4 text-center"
            >
              ニュース
            </Typography>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          {posts.length === 0 ? (
            <div className="text-center py-12 px-8">
              <div className="text-gray-500 text-lg mb-4">
                {error || "まだニュースがありません"}
              </div>
            </div>
          ) : (
            <div className="h-80 overflow-y-auto p-8">
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <div key={post.id}>
                    <button
                      onClick={(e) => handlePostClick(post, e)}
                      className="w-full text-left hover:bg-gray-50 p-4 rounded-lg transition-colors group"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {post.title}
                      </h4>
                      <div className="text-gray-500 text-sm">
                        {formatDate(post.created_at)}
                      </div>
                    </button>
                    {index < posts.length - 1 && (
                      <hr className="border-gray-200 mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 overflow-y-auto" style={{ zIndex: 99999 }}>
          {/* Background overlay with blur and dark effect */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
            onClick={closeModal}
            style={{ zIndex: 99998 }}
          />
          
          {/* Modal container */}
          <div className="flex items-center justify-center min-h-screen px-4 py-8" style={{ zIndex: 99999 }}>
            {/* Modal panel */}
            <div 
              className="relative w-full max-w-4xl p-6 bg-white shadow-2xl rounded-2xl transform transition-all duration-300"
              onClick={handleModalContentClick}
              style={{ zIndex: 100000 }}
              data-modal-content
            >
              {/* Date */}
              <div className="flex justify-center items-center text-gray-500 mb-4">
                <CalendarIcon className="h-5 w-5 mr-2" />
                <time dateTime={selectedPost.created_at}>
                  {formatDate(selectedPost.created_at)}
                </time>
              </div>

              {/* Modal header */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 leading-tight text-center">
                  {selectedPost.title}
                </h2>
              </div>

              {/* Modal content */}
              <div className="max-h-96 overflow-y-auto" data-modal-content>
                {modalLoading ? (
                  <div className="py-12">
                    <LoadingBar />
                  </div>
                ) : error ? (
                  <div className="py-12 text-center text-red-600">
                    {error}
                  </div>
                ) : (
                  <div className="text-gray-800 leading-relaxed">
                    <TipTapRenderer content={selectedPost.content} />
                  </div>
                )}
              </div>

              {/* Modal footer */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
