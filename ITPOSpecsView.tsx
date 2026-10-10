import React, { useState } from 'react';
import { 
  MessageSquare, ThumbsUp, Eye, CheckCircle2, 
  HelpCircle, Tag, Plus, Send, Search, Filter, 
  Sparkles, ArrowRight, CornerDownRight, X
} from 'lucide-react';
import { ForumThread, Course } from '../types/lms';

interface ForumViewProps {
  threads: ForumThread[];
  courses: Course[];
  onUpvoteThread: (threadId: string) => void;
  onAddThread: (thread: Omit<ForumThread, 'id' | 'createdAt' | 'upvotes' | 'views' | 'replies' | 'isSolved'>) => void;
  onAddReply: (threadId: string, content: string) => void;
}

export const ForumView: React.FC<ForumViewProps> = ({
  threads,
  courses,
  onUpvoteThread,
  onAddThread,
  onAddReply
}) => {
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(threads[0] || null);
  const [searchQ, setSearchQ] = useState<string>('');
  const [filterSolved, setFilterSolved] = useState<'all' | 'solved' | 'unsolved'>('all');
  const [showNewThreadModal, setShowNewThreadModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Product & Agile');
  const [newTags, setNewTags] = useState<string>('Scrum, Backlog');
  const [replyText, setReplyText] = useState<string>('');

  const filteredThreads = threads.filter(t => {
    if (filterSolved === 'solved' && !t.isSolved) return false;
    if (filterSolved === 'unsolved' && t.isSolved) return false;
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q) || t.tags.some(tag => tag.toLowerCase().includes(q));
    }
    return true;
  });

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddThread({
      title: newTitle.trim(),
      content: newContent.trim(),
      authorName: 'Trần Minh Khang (Bạn)',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      category: newCategory,
      tags: newTags.split(',').map(s => s.trim()).filter(Boolean)
    });

    setNewTitle('');
    setNewContent('');
    setShowNewThreadModal(false);
  };

  const handleSendReply = () => {
    if (!selectedThread || !replyText.trim()) return;
    onAddReply(selectedThread.id, replyText.trim());
    setReplyText('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Cộng Đồng Học Tập Nội Bộ</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Diễn Đàn Thảo Luận & Q&A Chuyên Môn
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Nơi kết nối giữa học viên, giảng viên nội bộ và các chuyên gia kỹ thuật để giải đáp thắc mắc dự án thực tế.
          </p>
        </div>

        <button
          onClick={() => setShowNewThreadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Đặt câu hỏi mới</span>
        </button>
      </div>

      {/* Main Forum Split: Left List + Right Thread Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filter Bar */}
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm chủ đề, tag, câu hỏi..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs border border-transparent focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => setFilterSolved('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  filterSolved === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Tất cả ({threads.length})
              </button>
              <button
                onClick={() => setFilterSolved('solved')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  filterSolved === 'solved' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Đã giải quyết
              </button>
              <button
                onClick={() => setFilterSolved('unsolved')}
                className={`px-2.5 py-1 rounded-lg font-semibold ${
                  filterSolved === 'unsolved' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Cần phản hồi
              </button>
            </div>
          </div>

          {/* Threads List */}
          <div className="space-y-3">
            {filteredThreads.map((thread) => {
              const isSelected = selectedThread?.id === thread.id;
              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {thread.category}
                    </span>
                    {thread.isSolved ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã giải quyết
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">Đang thảo luận</span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {thread.title}
                  </h3>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-1.5 truncate">
                      <img
                        src={thread.authorAvatar}
                        alt={thread.authorName}
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span className="truncate">{thread.authorName.split(' ')[0]}</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {thread.upvotes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" /> {thread.replies.length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-6">
          {selectedThread ? (
            <>
              {/* Question Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      {selectedThread.category}
                    </span>
                    {selectedThread.courseTitle && (
                      <span className="text-xs text-slate-400">
                        • {selectedThread.courseTitle}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onUpvoteThread(selectedThread.id)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1 hover:bg-indigo-100 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{selectedThread.upvotes}</span>
                  </button>
                </div>

                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                  {selectedThread.title}
                </h2>

                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <img
                    src={selectedThread.authorAvatar}
                    alt={selectedThread.authorName}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedThread.authorName}</span>
                  <span>• {selectedThread.createdAt}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-4 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  {selectedThread.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {selectedThread.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Replies Section */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                  Câu Trả Lời & Phản Hồi ({selectedThread.replies.length})
                </h3>

                <div className="space-y-3">
                  {selectedThread.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        reply.isInstructorAnswer
                          ? 'bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800/80 ring-1 ring-indigo-500/20'
                          : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={reply.authorAvatar}
                            alt={reply.authorName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white">{reply.authorName}</span>
                            <span className="text-[10px] text-slate-400 block">{reply.authorRole}</span>
                          </div>
                        </div>

                        {reply.isInstructorAnswer && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[10px]">
                            Giảng Viên Xác Thực
                          </span>
                        )}
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                        {reply.content}
                      </p>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span>{reply.createdAt}</span>
                        <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                          <ThumbsUp className="w-3 h-3 text-indigo-500" /> {reply.upvotes} đồng tình
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input Box */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Viết phản hồi hoặc đóng góp ý kiến của bạn..."
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleSendReply}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi phản hồi</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">
              Chọn một câu hỏi ở danh sách bên trái để xem thảo luận chi tiết.
            </div>
          )}
        </div>
      </div>

      {/* New Thread Modal */}
      {showNewThreadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Tạo Câu Hỏi Thảo Luận Mới
              </h3>
              <button onClick={() => setShowNewThreadModal(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tiêu đề câu hỏi (tóm tắt rõ vấn đề):
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Cách ước lượng Story Points cho bài toán tích hợp API bên thứ 3?"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Danh mục:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  <option value="Product & Agile">Product & Agile</option>
                  <option value="Kỹ thuật & Lập trình">Kỹ thuật & Lập trình</option>
                  <option value="Bảo mật & Tuân thủ">Bảo mật & Tuân thủ</option>
                  <option value="Dữ liệu & AI">Dữ liệu & AI</option>
                  <option value="Kỹ năng mềm & Lãnh đạo">Kỹ năng mềm & Lãnh đạo</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Mô tả chi tiết câu hỏi & bối cảnh thực tế:
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Chia sẻ rõ bối cảnh dự án, khúc mắc gặp phải và mong muốn được hỗ trợ..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tags phân loại (phân cách bằng dấu phẩy):
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Scrum, Estimation, API, Backend"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewThreadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Đăng câu hỏi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
