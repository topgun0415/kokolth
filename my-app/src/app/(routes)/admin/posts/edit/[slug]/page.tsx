"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import LoadingBar from "@/components/atoms/LoadingBar";
import { toast } from "react-hot-toast";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { 
  XMarkIcon,
  BoldIcon,
  ListBulletIcon,
  Bars3Icon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  SwatchIcon,
  ChatBubbleLeftRightIcon,
  Bars3BottomLeftIcon,
  Bars3CenterLeftIcon,
  Bars3BottomRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

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

export default function EditPostPage() {
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
  
  return <PostEditor slug={slug} />;
}

function PostEditor({ slug }: { slug: string }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showAlignMenu, setShowAlignMenu] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // When click outside of toolbar, close all menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target as Node)) {
        setShowColorMenu(false);
        setShowHeadingMenu(false);
        setShowAlignMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Title Editor
  const titleEditor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Placeholder.configure({
        placeholder: 'タイトル',
      }),
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'text-2xl font-bold focus:outline-none',
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          return true;
        }
        return false;
      },
      handleTextInput(view, from, to, text) {
        const maxLen = 10;
        const currentLen = view.state.doc.textContent.length;
        // Block any input that would exceed maxLen
        if (currentLen + text.length > maxLen) {
          return true; // prevent the input
        }
        return false; // allow the input
      },
      handlePaste(view, event) {
        const maxLen = 10;
        const pasteText = event.clipboardData?.getData('text') || '';
        const currentLen = view.state.doc.textContent.length;
        // Block paste if it would exceed maxLen
        if (currentLen + pasteText.length > maxLen) {
          return true; // prevent paste
        }
        return false; // allow paste
      },
    },
  });
  
  // Content Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'bullet-list',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'ordered-list',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'list-item',
          },
        },
      }),
      Placeholder.configure({
        placeholder: '内容を入力してください',
      }),
      CharacterCount,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote'],
      }),
    ],
    content: '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
      handleTextInput(view, from, to, text) {
        const maxLen = 300;
        const currentLen = editor?.getText().trim().length || 0;
        if (currentLen >= maxLen) {
          return true;
        }
        if (currentLen + text.length > maxLen) {
          return true;
        }
        return false;
      },
      handlePaste(view, event) {
        const maxLen = 300;
        const pasteText = event.clipboardData?.getData('text') || '';
        const currentLen = editor?.getText().trim().length || 0;
        if (currentLen >= maxLen) {
          return true;
        }
        if (currentLen + pasteText.length > maxLen) {
          return true;
        }
        return false;
      },
    },
  });

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/posts/read/${slug}`);
        const data = await response.json();
        
        if (response.ok) {
          setPost(data.post);
          // Set editor content
          if (titleEditor) {
            titleEditor.commands.setContent(data.post.title);
          }
          if (editor) {
            editor.commands.setContent(data.post.content);
          }
        } else {
          toast.error(data.error || 'ニュースの読み込みに失敗しました');
          router.push('/admin/posts');
        }
      } catch {
        toast.error('ニュースの読み込みに失敗しました');
        router.push('/admin/posts');
      } finally {
        setLoading(false);
      }
    };

    if (slug && titleEditor && editor) {
      fetchPost();
    }
  }, [slug, titleEditor, editor, router]);

  const handleUpdate = async () => {
    if (!post) return;
    
    if (!titleEditor?.getText().trim()) {
      toast.error('タイトルを入力してください');
      return;
    }
    if (titleEditor?.getText().trim().length > 10) {
      toast.error('タイトルは10文字以内で入力してください');
      return;
    }
    if (!editor?.getText().trim()) {
      toast.error('内容を入力してください');
      return;
    }
    if (editor?.getText().trim().length > 300) {
      toast.error('内容は300文字以内で入力してください');
      return;
    }

    // Update confirmation modal
    const doUpdate = async () => {
      try {
        const response = await fetch('/api/posts/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: post.id,
            title: titleEditor.getText().trim(),
            content: editor.getJSON(),
          }),
        });

        const result = await response.json();
        
        if (response.ok) {
          toast.success('ニュースを更新しました');
          router.push('/admin/posts');
        } else {
          toast.error(result.error || '更新に失敗しました');
        }
      } catch {
        toast.error('更新に失敗しました');
      }
    };

    // Update confirmation toast modal
    toast(
      (t) => (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 max-w-sm">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">ニュースの更新</h3>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            「{titleEditor?.getText().trim()}」を更新しますか？
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              キャンセル
            </button>
            <button
              onClick={() => { doUpdate(); toast.dismiss(t.id); }}
              className="px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center">
                更新する
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

  const handleClose = () => {
    const doClose = () => {
      router.push('/admin/posts');
    };

    toast(
      (t) => (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 max-w-sm">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">変更内容の確認</h3>
            </div>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            変更内容が保存されていません。
          </p>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
            >
              キャンセル
            </button>
            <button
              onClick={() => { doClose(); toast.dismiss(t.id); }}
              className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center">
                <XMarkIcon className="w-4 h-4 mr-2" />
                閉じる
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-black rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              更新する
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Title Input */}
          <div className="p-2">
            <EditorContent 
              editor={titleEditor} 
              className="w-full text-2xl font-bold border-none outline-none bg-transparent"
            />
          </div>

          {/* Content Editor */}
          <div className="p-2 flex-1">
            <div className="h-96 md:h-[500px] lg:h-[750px] overflow-y-auto">
              <EditorContent 
                editor={editor} 
                className="h-full text-lg leading-relaxed focus:outline-none"
              />
            </div>
          </div>

          {/* Character Count */}
          <div className="px-4 py-2 border-gray-100 text-right">
            <span className="inline-block px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded-full">
              {(editor?.getText()?.trim().length || 0)} 文字
            </span>
          </div>
        </div>
      </div>

      {/* Tiptap Toolbar - Fixed at bottom */}
      {(titleEditor || editor) && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-4xl mx-auto p-4">
            <div className="p-2" ref={toolbarRef}>
              {/* First line */}
              <div className="flex items-center gap-1 mb-2 flex-wrap">
                {/* Undo/Redo */}
                <button
                  onClick={() => editor?.chain().focus().undo().run()}
                  disabled={!editor?.can().undo()}
                  className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
                  title="元に戻す"
                >
                  <ArrowUturnLeftIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor?.chain().focus().redo().run()}
                  disabled={!editor?.can().redo()}
                  className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors disabled:opacity-50"
                  title="やり直し"
                >
                  <ArrowUturnRightIcon className="h-4 w-4" />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                
                {/* Text Style */}
                <button
                  onClick={() => {
                    if (titleEditor?.isFocused) {
                      titleEditor.chain().focus().toggleBold().run();
                    } else {
                      editor?.chain().focus().toggleBold().run();
                    }
                  }}
                  className={`p-1.5 rounded transition-colors ${
                    (titleEditor?.isFocused ? titleEditor?.isActive('bold') : editor?.isActive('bold'))
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                  title="太字"
                >
                  <BoldIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`p-1.5 rounded transition-colors ${
                    editor?.isActive('italic')
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                  title="斜体"
                >
                  <ItalicIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={`p-1.5 rounded transition-colors ${
                    editor?.isActive('underline')
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                  title="下線"
                >
                  <UnderlineIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                  className={`p-1.5 rounded transition-colors ${
                    editor?.isActive('strike')
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                  }`}
                  title="取り消し線"
                >
                  <StrikethroughIcon className="h-4 w-4" />
                </button>
                
                {/* Color Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowColorMenu(!showColorMenu)}
                    className={`flex items-center gap-1 p-1.5 rounded transition-colors ${
                      editor?.getAttributes('textStyle')?.color
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                    }`}
                    title="テキスト色"
                  >
                    <SwatchIcon className="h-4 w-4" />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: editor?.getAttributes('textStyle')?.color || '#6b7280' }}></div>
                  </button>
                  
                  {showColorMenu && (
                    <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 min-w-[80px]">
                      <div className="flex flex-wrap gap-1 justify-center">
                        <button
                          onClick={() => { editor?.chain().focus().unsetColor().run(); setShowColorMenu(false); }}
                          className="p-2 hover:bg-gray-100 rounded border border-gray-300 transition-colors"
                          title="デフォルト"
                        >
                          <div className="w-6 h-6 bg-gray-400 rounded"></div>
                        </button>
                        <button
                          onClick={() => { editor?.chain().focus().setColor('#000000').run(); setShowColorMenu(false); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="黒"
                        >
                          <div className="w-6 h-6 bg-black rounded"></div>
                        </button>
                        <button
                          onClick={() => { editor?.chain().focus().setColor('#ef4444').run(); setShowColorMenu(false); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="赤"
                        >
                          <div className="w-6 h-6 bg-red-500 rounded"></div>
                        </button>
                        <button
                          onClick={() => { editor?.chain().focus().setColor('#3b82f6').run(); setShowColorMenu(false); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="青"
                        >
                          <div className="w-6 h-6 bg-blue-500 rounded"></div>
                        </button>
                        <button
                          onClick={() => { editor?.chain().focus().setColor('#10b981').run(); setShowColorMenu(false); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="緑"
                        >
                          <div className="w-6 h-6 bg-emerald-500 rounded"></div>
                        </button>
                        <button
                          onClick={() => { editor?.chain().focus().setColor('#f59e0b').run(); setShowColorMenu(false); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="黄"
                        >
                          <div className="w-6 h-6 bg-amber-500 rounded"></div>
                        </button>
                        <button
                          onClick={() => { editor?.chain().focus().setColor('#8b5cf6').run(); setShowColorMenu(false); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="紫"
                        >
                          <div className="w-6 h-6 bg-violet-500 rounded"></div>
                        </button>
                        <button
                          onClick={() => { editor?.chain().focus().setColor('#ec4899').run(); setShowColorMenu(false); }}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title="ピンク"
                        >
                          <div className="w-6 h-6 bg-pink-500 rounded"></div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Heading Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowHeadingMenu(!showHeadingMenu)}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                      editor?.isActive('heading')
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                    }`}
                    title="見出し"
                  >
                    <span className="text-xs font-bold">
                      {editor?.isActive('heading', { level: 1 }) ? 'H1' :
                       editor?.isActive('heading', { level: 2 }) ? 'H2' :
                       editor?.isActive('heading', { level: 3 }) ? 'H3' : 'H'}
                    </span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showHeadingMenu && (
                    <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                      <button
                        onClick={() => { editor?.chain().focus().setParagraph().run(); setShowHeadingMenu(false); }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
                      >
                        通常テキスト
                      </button>
                      <button
                        onClick={() => { editor?.chain().focus().toggleHeading({ level: 1 }).run(); setShowHeadingMenu(false); }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-lg font-bold"
                      >
                        大見出し (H1)
                      </button>
                      <button
                        onClick={() => { editor?.chain().focus().toggleHeading({ level: 2 }).run(); setShowHeadingMenu(false); }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-base font-bold"
                      >
                        見出し (H2)
                      </button>
                      <button
                        onClick={() => { editor?.chain().focus().toggleHeading({ level: 3 }).run(); setShowHeadingMenu(false); }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 text-sm font-bold"
                      >
                        小見出し (H3)
                      </button>
                    </div>
                  )}
                </div>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  
                  {/* List */}
                   <button
                     onClick={() => {
                       editor?.chain().focus().toggleBulletList().run();
                     }}
                     className={`p-1.5 rounded transition-colors ${
                       editor?.isActive('bulletList')
                         ? 'bg-blue-100 text-blue-600'
                         : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                     }`}
                     title="箇条書き"
                   >
                     <ListBulletIcon className="h-4 w-4" />
                   </button>
                   <button
                     onClick={() => {
                       editor?.chain().focus().toggleOrderedList().run();
                     }}
                     className={`p-1.5 rounded transition-colors ${
                       editor?.isActive('orderedList')
                         ? 'bg-blue-100 text-blue-600'
                         : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                     }`}
                     title="番号付きリスト"
                   >
                     <Bars3Icon className="h-4 w-4" />
                   </button>
                   <button
                     onClick={() => {
                       editor?.chain().focus().toggleBlockquote().run();
                     }}
                     className={`p-1.5 rounded transition-colors ${
                       editor?.isActive('blockquote')
                         ? 'bg-blue-100 text-blue-600'
                         : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                     }`}
                     title="引用"
                   >
                     <ChatBubbleLeftRightIcon className="h-4 w-4" />
                   </button>
                   
                   <div className="w-px h-6 bg-gray-300 mx-1"></div>
                   
                   {/* Align Menu */}
                   <div className="relative">
                     <button
                       onClick={() => setShowAlignMenu(!showAlignMenu)}
                       className={`flex items-center gap-1 p-1.5 rounded transition-colors ${
                         editor?.isActive({ textAlign: 'center' }) || editor?.isActive({ textAlign: 'right' })
                           ? 'bg-blue-100 text-blue-600'
                           : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                       }`}
                       title="文字揃え"
                     >
                       {editor?.isActive({ textAlign: 'center' }) ? (
                         <Bars3CenterLeftIcon className="h-4 w-4" />
                       ) : editor?.isActive({ textAlign: 'right' }) ? (
                         <Bars3BottomRightIcon className="h-4 w-4" />
                       ) : (
                         <Bars3BottomLeftIcon className="h-4 w-4" />
                       )}
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </button>
                     
                     {showAlignMenu && (
                       <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[100px]">
                         <button
                           onClick={() => { editor?.chain().focus().setTextAlign('left').run(); setShowAlignMenu(false); }}
                           className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                         >
                           <Bars3BottomLeftIcon className="h-4 w-4" />
                           左揃え
                         </button>
                         <button
                           onClick={() => { editor?.chain().focus().setTextAlign('center').run(); setShowAlignMenu(false); }}
                           className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                         >
                           <Bars3CenterLeftIcon className="h-4 w-4" />
                           中央揃え
                         </button>
                         <button
                           onClick={() => { editor?.chain().focus().setTextAlign('right').run(); setShowAlignMenu(false); }}
                           className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                         >
                           <Bars3BottomRightIcon className="h-4 w-4" />
                           右揃え
                         </button>
                       </div>
                     )}
                   </div>
                   
                   <div className="w-px h-6 bg-gray-300 mx-1"></div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 