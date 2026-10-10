import React, { useState } from 'react';
import { 
  FileText, Download, Sparkles, Tag, 
  Search, BookOpen, Layers, CheckCircle2, Bookmark
} from 'lucide-react';
import { LearningResource } from '../types/lms';

interface ResourceHubViewProps {
  resources: LearningResource[];
}

export const ResourceHubView: React.FC<ResourceHubViewProps> = ({ resources }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQ, setSearchQ] = useState<string>('');
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const categories = ['Tất cả', 'Product & Agile', 'Dữ liệu & AI', 'Bảo mật & Tuân thủ', 'Kỹ thuật & Lập trình'];

  const filtered = resources.filter(res => {
    if (selectedCategory !== 'Tất cả' && res.category !== selectedCategory) return false;
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      return res.title.toLowerCase().includes(q) || res.description.toLowerCase().includes(q) || res.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  const handleDownload = (id: string) => {
    setDownloadedIds(prev => [...prev, id]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kho Tài Liệu Cá Nhân Hóa (Resource Hub)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tài Liệu Tham Khảo, Ebook & Cheat Sheets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Tự động gợi ý tài liệu học tập, biểu mẫu User Story, và các cẩm nang thực hành chuẩn hóa theo sở thích và chuyên môn của bạn.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm tài liệu, template, cheatsheet..."
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
          />
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((res) => {
          const isDownloaded = downloadedIds.includes(res.id);
          return (
            <div
              key={res.id}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                    {res.format}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {res.fileSize} • {res.downloadCount + (isDownloaded ? 1 : 0)} lượt tải
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {res.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {res.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Tác giả: {res.author}
                </span>

                <button
                  onClick={() => handleDownload(res.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isDownloaded
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                  }`}
                >
                  {isDownloaded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đã tải về</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Tải tài liệu</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
