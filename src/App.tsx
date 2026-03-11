/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  User, 
  Calendar, 
  Wallet, 
  Home, 
  Sparkles, 
  ArrowRight, 
  RefreshCw,
  Quote,
  Eye,
  Ear,
  Wind,
  Utensils,
  Hand,
  Zap,
  Download
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface VisionData {
  fullName: string;
  targetDate: string;
  totalAssets: string;
  lifestyle: string;
}

export default function App() {
  const [step, setStep] = useState<'input' | 'generating' | 'result'>('input');
  const [data, setData] = useState<VisionData>({
    fullName: 'Lê Trường',
    targetDate: '11/09/2026',
    totalAssets: '27 tỷ VND',
    lifestyle: 'Ngôi nhà đẹp nhất thế giới, xe ô tô đẹp nhất thế giới',
  });
  const [visionText, setVisionText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const downloadVision = () => {
    const element = document.createElement("a");
    const file = new Blob([visionText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `TamNhin6Thang_${data.fullName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generateVision = async () => {
    if (!data.fullName || !data.targetDate || !data.totalAssets || !data.lifestyle) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setStep('generating');
    setError(null);

    try {
      const response = await genAI.models.generateContent({ 
        model: "gemini-3-flash-preview",
        contents: `
          Tên: ${data.fullName}
          Ngày đạt mục tiêu: ${data.targetDate}
          Tổng tài sản: ${data.totalAssets}
          Phong cách sống: ${data.lifestyle}
          
          YÊU CẦU CỰC KỲ QUAN TRỌNG:
          - Viết hoàn toàn ở NGÔI THỨ NHẤT ("Tôi").
          - Bắt đầu TRỰC TIẾP bằng câu: "Hôm nay ngày ${data.targetDate}, tôi là ${data.fullName}, tôi cảm thấy..."
          - KHÔNG có lời chào hỏi, KHÔNG có tiêu đề, KHÔNG có lời dẫn dắt bên ngoài.
          - Lồng ghép khéo léo các dữ kiện tuổi thơ: thích khám phá cầu thang, nghịch tài liệu gấp máy bay, cảm giác "cơ quan mình", và tiếng hô "Xung phong!".
        `,
        config: {
          systemInstruction: `Bạn là một chuyên gia tâm lý và người dẫn dắt kiến tạo tương lai. 
          Nhiệm vụ của bạn là viết một bức tranh tầm nhìn 6 tháng ở THÌ HIỆN TẠI (như thể mọi thứ đã xảy ra).
          
          Bức tranh phải bao gồm:
          1. 6 nhu cầu con người (Tony Robbins): Chắc chắn, Đa dạng, Tầm quan trọng, Kết nối/Yêu thương, Phát triển, Đóng góp.
          2. 6 giác quan: Thị giác, Thính giác, Khứu giác, Vị giác, Xúc giác, và Trực giác (giác quan thứ 6).
          3. 3 nhu cầu cốt lõi từ ký ức tuổi thơ của người này:
             - Khám phá và Tự trị (thích tìm tòi, không sợ ranh giới).
             - Thuộc về và An toàn tâm lý (cảm giác "mái nhà", "cơ quan mình").
             - Thể hiện bản thân và Dẫn dắt (tiếng hô "Xung phong!").
          
          Phong cách viết: Truyền cảm hứng, sang trọng, chi tiết, sống động.
          Ngôn ngữ: Tiếng Việt.
          
          Kết thúc luôn bằng câu: "Cảm ơn người thầy vĩ đại thầy tài phiệt sir Eric Lê, cảm ơn chủ tịch Đoàn Mai Ly, chủ tịch Khúc Quang Vương, cảm ơn doanh nhân Hồng Nga, cảm ơn tiềm thức."`
        }
      });

      setVisionText(response.text || "");
      setStep('result');
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi tạo bức tranh. Vui lòng thử lại.");
      setStep('input');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 font-sans selection:bg-emerald-500/30">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24">
        <AnimatePresence mode="wait">
          {step === 'input' && (
            <motion.div
              key="input-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <header className="space-y-4">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6"
                >
                  <Target className="w-8 h-8 text-emerald-400" />
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white">
                  Kiến Tạo <span className="italic font-serif text-emerald-400">Tầm Nhìn</span> 6 Tháng
                </h1>
                <p className="text-stone-400 text-lg max-w-xl font-light">
                  Hãy điền những thông tin quan trọng nhất để chúng tôi giúp bạn phác họa bức tranh tương lai rực rỡ của chính mình.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup 
                  label="Họ và Tên" 
                  name="fullName" 
                  value={data.fullName} 
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Lê Trường"
                  icon={<User className="w-4 h-4" />}
                />
                <InputGroup 
                  label="Ngày đạt mục tiêu" 
                  name="targetDate" 
                  value={data.targetDate} 
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 11/09/2026"
                  icon={<Calendar className="w-4 h-4" />}
                />
                <InputGroup 
                  label="Tổng tài sản" 
                  name="totalAssets" 
                  value={data.totalAssets} 
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 27 tỷ VND"
                  icon={<Wallet className="w-4 h-4" />}
                />
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
                    <Home className="w-4 h-4" /> Phong cách sống
                  </label>
                  <textarea
                    name="lifestyle"
                    value={data.lifestyle}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Ngôi nhà đẹp nhất thế giới, xe ô tô đẹp nhất thế giới..."
                    className="w-full bg-stone-900/50 border border-stone-800 rounded-xl p-4 text-stone-200 focus:outline-none focus:border-emerald-500/50 transition-colors min-h-[100px] resize-none"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm italic">{error}</p>
              )}

              <button
                onClick={generateVision}
                className="group relative w-full md:w-auto px-8 py-4 bg-emerald-500 text-black font-semibold rounded-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  Bắt đầu kiến tạo <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          )}

          {step === 'generating' && (
            <motion.div
              key="generating-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 space-y-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 border-t-2 border-emerald-500 rounded-full"
                />
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-light text-white">Đang kết nối với tiềm thức...</h2>
                <p className="text-stone-500 italic">Vũ trụ đang sắp đặt những mảnh ghép cho tương lai của bạn.</p>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep('input')}
                    className="text-stone-500 hover:text-white flex items-center gap-2 transition-colors text-sm uppercase tracking-widest font-semibold"
                  >
                    <RefreshCw className="w-4 h-4" /> Làm lại
                  </button>
                  <button 
                    onClick={downloadVision}
                    className="text-emerald-500 hover:text-emerald-400 flex items-center gap-2 transition-colors text-sm uppercase tracking-widest font-semibold"
                  >
                    <Download className="w-4 h-4" /> Tải bài viết
                  </button>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] uppercase tracking-tighter text-emerald-400 font-bold">
                    Tầm nhìn 6 tháng
                  </div>
                </div>
              </div>

              <div className="relative p-8 md:p-12 bg-stone-900/30 border border-stone-800 rounded-[32px] backdrop-blur-xl overflow-hidden">
                {/* Decorative Elements */}
                <Quote className="absolute top-8 left-8 w-12 h-12 text-stone-800 -z-10" />
                
                <div className="space-y-8 relative z-10">
                  <header className="border-b border-stone-800 pb-8">
                    <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-2">
                      {data.fullName}
                    </h2>
                    <p className="text-emerald-400 font-mono text-sm tracking-widest uppercase">
                      Thời điểm: {data.targetDate}
                    </p>
                  </header>

                  <div className="prose prose-invert max-w-none">
                    <div className="text-stone-300 leading-relaxed text-lg whitespace-pre-wrap font-light">
                      {visionText}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 border-t border-stone-800">
                    <SenseBadge icon={<Eye />} label="Thị giác" />
                    <SenseBadge icon={<Ear />} label="Thính giác" />
                    <SenseBadge icon={<Wind />} label="Khứu giác" />
                    <SenseBadge icon={<Utensils />} label="Vị giác" />
                    <SenseBadge icon={<Hand />} label="Xúc giác" />
                    <SenseBadge icon={<Zap />} label="Trực giác" />
                  </div>
                </div>
              </div>

              <footer className="text-center py-12">
                <p className="text-stone-600 text-xs uppercase tracking-[0.2em]">
                  Kiến tạo bởi Sức mạnh Tiềm thức & Trí tuệ Nhân tạo
                </p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function InputGroup({ label, name, value, onChange, placeholder, icon }: { 
  label: string, 
  name: string, 
  value: string, 
  onChange: any, 
  placeholder: string,
  icon: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-2">
        {icon} {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-stone-900/50 border border-stone-800 rounded-xl p-4 text-stone-200 focus:outline-none focus:border-emerald-500/50 transition-colors"
      />
    </div>
  );
}

function SenseBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-stone-900/50 border border-stone-800 rounded-2xl group hover:border-emerald-500/30 transition-colors">
      <div className="text-stone-500 group-hover:text-emerald-400 transition-colors">
        {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4" })}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{label}</span>
    </div>
  );
}
