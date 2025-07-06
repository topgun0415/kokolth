"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingBar from "@/components/atoms/LoadingBar";
import { toast } from "react-hot-toast";
import Link from "next/link";

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

interface Post {
  id: string;
  title: string;
  slug: string;
  content: TipTapContent;
  created_at: string;
  user_id: string;
}

export default function ViewPostPage() {
  const { isLoggedIn, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isLoading && (!isLoggedIn || !user.is_admin)) {
      router.push('/admin/login');
    }
  }, [isLoading, isLoggedIn, user.is_admin, router]);

  if (isLoading || !isLoggedIn || !user.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingBar />
        </div>
      </div>
    );
  }
  
  return <PostViewer slug={slug} />;
}

function PostViewer({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts/read/${slug}`);
        const data = await response.json();
        
        if (response.ok) {
          setPost(data.post);
        } else {
          toast.error(data.error || 'ニュースの読み込みに失敗しました');
        }
      } catch {
        toast.error('ニュースの読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Render TipTap content
  const renderContent = (content: TipTapContent) => {
    if (!content || !content.content) return null;

    const renderNode = (node: TipTapNode, index: number = 0): React.ReactNode => {
      switch (node.type) {
        case 'paragraph':
          const textAlign = node.attrs?.textAlign || 'left';
          return (
            <p key={index} className={`mb-4 text-${textAlign}`} style={{ textAlign: textAlign as React.CSSProperties['textAlign'] }}>
              {node.content?.map((child, childIndex) => renderNode(child, childIndex))}
            </p>
          );
        case 'heading':
          const level = node.attrs?.level || 1;
          const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
          const headingAlign = node.attrs?.textAlign || 'left';
          const headingClass = level === 1 ? 'text-3xl font-bold mb-6' : 
                              level === 2 ? 'text-2xl font-bold mb-4' : 
                              'text-xl font-bold mb-3';
          return (
            <HeadingTag key={index} className={`${headingClass} text-${headingAlign}`} style={{ textAlign: headingAlign as React.CSSProperties['textAlign'] }}>
              {node.content?.map((child, childIndex) => renderNode(child, childIndex))}
            </HeadingTag>
          );
        case 'bulletList':
          return (
            <ul key={index} className="list-disc list-inside mb-4 space-y-2">
              {node.content?.map((child, childIndex) => renderNode(child, childIndex))}
            </ul>
          );
        case 'orderedList':
          return (
            <ol key={index} className="list-decimal list-inside mb-4 space-y-2">
              {node.content?.map((child, childIndex) => renderNode(child, childIndex))}
            </ol>
          );
        case 'listItem':
          return (
            <li key={index} className="mb-1">
              {node.content?.map((child, childIndex) => renderNode(child, childIndex))}
            </li>
          );
        case 'blockquote':
          return (
            <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic mb-4 text-gray-600">
              {node.content?.map((child, childIndex) => renderNode(child, childIndex))}
            </blockquote>
          );
        case 'text':
          const textElement = node.text;
          let className = '';
          const style: React.CSSProperties = {};
          
          if (node.marks) {
            node.marks.forEach((mark) => {
              switch (mark.type) {
                case 'bold':
                  className += ' font-bold';
                  break;
                case 'italic':
                  className += ' italic';
                  break;
                case 'underline':
                  className += ' underline';
                  style.textDecoration = style.textDecoration ? `${style.textDecoration} underline` : 'underline';
                  break;
                case 'strike':
                  className += ' line-through';
                  style.textDecoration = style.textDecoration ? `${style.textDecoration} line-through` : 'line-through';
                  break;
                case 'textStyle':
                  if (mark.attrs?.color) {
                    style.color = mark.attrs.color;
                  }
                  break;
                case 'highlight':
                  if (mark.attrs?.color) {
                    style.backgroundColor = mark.attrs.color;
                  } else {
                    className += ' bg-yellow-200';
                  }
                  break;
              }
            });
          }
          
          return (
            <span key={index} className={className} style={style}>
              {textElement}
            </span>
          );
        default:
          return null;
      }
    };

    return (
      <div className="prose max-w-none">
        {content.content.map((node, index) => renderNode(node, index))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <LoadingBar message="読み込み中..." />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{error}</h3>
            <Link
              href="/admin/posts"
              className="text-blue-600 hover:text-blue-800"
            >
              一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/admin/posts"
            className="flex items-baseline text-gray-700 hover:text-gray-900 mb-4"
          >
            <svg
              className="mr-1 h-3 w-3"
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.381 1.381A.875.875 0 1 1 7.62 2.62L3.112 7.125H15a.875.875 0 1 1 0 1.75H3.112l4.507 4.506A.875.875 0 1 1 6.38 14.62l-6-6a.872.872 0 0 1 0-1.238l6-6Z" />
            </svg>
            <span className="text-sm font-medium">戻る</span>
          </Link>

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">ニュース詳細</h1>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push(`/admin/posts/edit/${post.slug}`)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                編集
              </button>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="bg-white shadow rounded-lg">
          <div className="p-6">
            {/* Post Meta */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
            </div>

            {/* Post Content */}
            <div className="prose max-w-none mb-6">
              {renderContent(post.content)}
            </div>

            {/* Post Date */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-end">
                <span className="text-sm text-gray-500">
                  作成日: {new Date(post.created_at).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 