"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingBar from "@/components/atoms/LoadingBar";
import { toast } from "react-hot-toast";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  user_id: string;
}

export default function AdminNewsPage() {
  const { isLoggedIn, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && (!isLoggedIn || !user.is_admin)) {
      router.push("/admin/login");
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

  return <NewsManagement />;
}

function NewsManagement() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    hasNext: false,
    hasPrev: false
  });

  // Fetch posts function
  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts/read?page=${page}&limit=10`);
      const data = await response.json();
      
      if (response.ok) {
        setPosts(data.posts);
        setPagination(data.pagination);
      } else {
        toast.error(data.error || 'ニュースの読み込みに失敗しました');
      }
    } catch {
      toast.error('ニュースの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // Delete post function
  const handleDeletePost = async (postId: string) => {
    // Delete confirmation function
    const doDelete = async () => {
      try {
        const response = await fetch('/api/posts/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: postId }),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success('ニュースを削除しました');
          // Refresh the posts list
          fetchPosts(pagination.currentPage);
        } else {
          toast.error(result.error || 'ニュースの削除に失敗しました');
        }
      } catch {
        toast.error('ニュースの削除に失敗しました');
      }
    };

    // Delete confirmation toast modal
    toast(
      (t) => (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 max-w-sm">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">ニュースの削除</h3>
            </div>
          </div>
          
          <p className="text-sm text-red-600 mb-6">
            この操作は元に戻せません
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              キャンセル
            </button>
            <button
              onClick={() => { doDelete(); toast.dismiss(t.id); }}
              className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center">
                削除する
              </span>
            </button>
          </div>
        </div>
      ),
      { 
        duration: Infinity,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        }
      }
    );
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* kokolth SVG Logo */}
        <svg width="120" height="32" viewBox="0 0 120 32" className="mb-2">
          <text
            x="0"
            y="24"
            fontSize="24"
            fontWeight="bold"
            fill="#1f2937"
            fontFamily="Arial, sans-serif"
          >
            kokolth
          </text>
        </svg>

        {/* back button */}
        <Link
          href="/admin"
          className="flex items-baseline text-gray-700 hover:text-gray-900"
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

        {/* section header */}
        <div className="flex justify-between items-center mb-4">
          <svg width="120" height="40" viewBox="0 0 120 32">
            <text
              x="0"
              y="24"
              fontSize="20"
              fontWeight="bold"
              fill="#1f2937"
              fontFamily="Arial, sans-serif"
            >
              ニュース
            </text>
          </svg>
        </div>

          {/* 追加ボタン */}
          <div className="mt-4">
            <button
              onClick={() => router.push('/admin/posts/create')}
              className="relative w-full sm:w-96 sm:mx-auto sm:block flex items-center justify-center px-8 py-3 bg-white border border-gray-800 hover:bg-gray-50 transition-all duration-200 group rounded-xl cursor-pointer text-center"
            >
            <div className="flex items-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 text-gray-600 group-hover:text-gray-800"
              >
                <path
                  d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-gray-700 font-medium group-hover:text-gray-900">
                新しくニュースを書く
              </span>
            </div>
            <span className="absolute inset-0 rounded-lg bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span>
          </button>
        </div>

        {/* ニュースセクション */}
        <div className="bg-white shadow rounded-lg mb-6 mt-5">
          <div className="px-4 py-5 sm:p-6">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <LoadingBar message="読み込み中..." />
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">ニュースがありません</h3>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post: Post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                          <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          <button
                            onClick={() => router.push(`/admin/posts/view/${post.slug}`)}
                            className="text-left hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {post.title.length > 10 ? post.title.substring(0, 10) + '...' : post.title}
                          </button>
                        </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>作成日: {new Date(post.created_at).toLocaleDateString('ja-JP')}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/admin/posts/edit/${post.slug}`)}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          編集
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      {pagination.totalCount}件中 {((pagination.currentPage - 1) * 10) + 1}-{Math.min(pagination.currentPage * 10, pagination.totalCount)}件を表示
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => fetchPosts(pagination.currentPage - 1)}
                        disabled={!pagination.hasPrev}
                        className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        前へ
                      </button>
                      <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">
                        {pagination.currentPage} / {pagination.totalPages}
                      </span>
                      <button
                        onClick={() => fetchPosts(pagination.currentPage + 1)}
                        disabled={!pagination.hasNext}
                        className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        次へ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
}
