"use client";

import { redirect, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import LoadingBar from "@/components/atoms/LoadingBar";
import toast from "react-hot-toast";

import {
  ChatBubbleBottomCenterTextIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function AdminPage() {
  const { isLoggedIn, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && (!isLoggedIn || !user.is_admin)) {
      redirect("/admin/login");
    }
  }, [isLoading, isLoggedIn, user.is_admin]);

  if (isLoading || !isLoggedIn || !user.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingBar />
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const { user, setLogout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    // Encapsulate logout logic to call on confirmation
    const doLogout = async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        setLogout();
        window.location.href = "/admin/login";
      } catch {
        toast.error("ログアウトに失敗しました");
      }
    };

    toast(
      (t) => (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 max-w-sm">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">ログアウトの確認</h3>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            本当にログアウトしますか？
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              キャンセル
            </button>
            <button
              onClick={() => { doLogout(); toast.dismiss(t.id); }}
              className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center">
                ログアウト
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

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        {/* ヘッダー */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm">ようこそ、{user.name}様</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                ログアウト
              </button>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ユーザー管理 */}
              {/* <div
                className="bg-blue-50 p-6 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                onClick={() => router.push("/admin")}
              >
                <div className="flex items-center">
                  <UsersIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-blue-900">
                      ユーザー管理
                    </h3>
                    <p className="text-blue-700 mt-1 text-sm">
                      アカウントを管理する
                    </p>
                  </div>
                </div>
              </div> */}

              {/* 設定 */}
              {/* <div
                className="bg-green-50 p-6 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                onClick={() => router.push("/admin")}
              >
                <div className="flex items-center">
                  <CogIcon className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-green-900">設定</h3>
                    <p className="text-green-700 mt-1 text-sm">
                      システム設定を管理する
                    </p>
                  </div>
                </div>
              </div> */}

              {/* 統計 */}
              {/* <div
                className="bg-purple-50 p-6 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                onClick={() => router.push("/admin")}
              >
                <div className="flex items-center">
                  <ChartBarIcon className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-purple-900">
                      統計
                    </h3>
                    <p className="text-purple-700 mt-1 text-sm">
                      サイト統計を確認する
                    </p>
                  </div>
                </div>
              </div> */}

              {/* チャット */}
              {/* <div
                className="bg-orange-50 p-6 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
                onClick={() => router.push("/admin")}
              >
                <div className="flex items-center">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-orange-900">
                      チャット
                    </h3>
                    <p className="text-orange-700 mt-1 text-sm">
                      チャットを管理する
                    </p>
                  </div>
                </div>
              </div> */}

              {/* ニュース */}
              <div
                className="bg-pink-50 p-6 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer"
                onClick={() => router.push("/admin/posts")}
              >
                <div className="flex items-center">
                  <ChatBubbleBottomCenterTextIcon className="h-8 w-8 text-pink-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-pink-900">
                      ニュース
                    </h3>
                    <p className="text-pink-700 mt-1 text-sm">
                      ニュースを登録・管理する
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
