import { useState } from 'react';
import { COMMANDS } from './data';
import type { Category } from './types'; // "import type" kullanarak hatayı önledik
import { GitVisualizer } from './components/GitVisualizer';
import { AIChat } from './components/AIChat';
import {
    Terminal,
    GitBranch,
    Globe,
    RotateCcw,
    Layers,
    Search,
    Copy,
    Check,
    BookOpen,
    MessageSquare,
    Settings,
    Users,
    UploadCloud,
    Github,
    Zap,
    FileText,
    Save,
    Clock,
    Info,
    UserCheck,
    X,
    MousePointer2,
    Map,
} from 'lucide-react';

// --- BİLEŞEN 1: SYNTAX HIGHLIGHTER ---
const SyntaxHighlighter = ({ code }: { code: string }) => {
    const parts = code.split(' ');
    return (
        <div className="font-mono text-sm">
            {parts.map((part, i) => {
                let color = "text-slate-300";
                if (part === "git") color = "text-blue-400 font-bold";
                else if (part.startsWith("-")) color = "text-slate-500";
                else if (part.startsWith('"') || part.startsWith("'")) color = "text-green-400";
                else if (["commit", "push", "pull", "add", "checkout", "status", "init", "clone", "branch", "merge", "remote", "log"].includes(part)) color = "text-yellow-400 font-semibold";

                return <span key={i} className={`${color} mr-1.5`}>{part}</span>;
            })}
        </div>
    );
};

// --- BİLEŞEN 2: ABOUT MODAL ---
const AboutModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative bg-[#161B22] border border-slate-700 rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-[#0D1117]">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="text-yellow-400" size={20} />
                        Hızlı Başlangıç Rehberi
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors text-center group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                            <Search size={24} />
                        </div>
                        <h3 className="text-white font-bold mb-2">1. Bul</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">İhtiyacın olan komutu <strong>arama çubuğundan</strong> veya kategorilerden seç.</p>
                    </div>
                    <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors text-center group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-white font-bold mb-2">2. Anla</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Komutun ne yaptığını <strong>Görselleştirici</strong> sekmesinde simüle et.</p>
                    </div>
                    <div className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors text-center group">
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform">
                            <MousePointer2 size={24} />
                        </div>
                        <h3 className="text-white font-bold mb-2">3. Uygula</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Kodu kopyala ve terminaline yapıştır. Hata alırsan <strong>AI Mentor</strong>'a sor.</p>
                    </div>
                </div>
                <div className="p-4 bg-blue-900/10 border-t border-slate-700/50 text-center text-xs text-blue-300">
                    <span className="font-bold">İpucu:</span> Bu uygulama GaziCyber Workshop eğitimi için özel olarak tasarlanmıştır.
                </div>
            </div>
        </div>
    );
};

// --- SABİT VERİLER ---
const GITHUB_GUIDES = [
    {
        id: 'PROJECT_SETUP',
        title: 'Projeyi GitHub\'a Yükleme',
        icon: <UploadCloud className="text-blue-400" size={24} />,
        steps: [
            { text: 'GitHub.com\'da sağ üstten "+" butonuna basıp "New Repository" de.', code: null },
            { text: 'Proje ismini gir ve "Create" butonuna bas (README ekleme!).', code: null },
            { text: 'Terminalini aç ve proje klasörüne git.', code: 'cd proje-klasorun' },
            { text: 'Git\'i başlat.', code: 'git init' },
            { text: 'Tüm dosyaları ekle.', code: 'git add .' },
            { text: 'İlk kaydını oluştur.', code: 'git commit -m "ilk commit"' },
            { text: 'GitHub\'daki linki kopyala ve yapıştır.', code: 'git remote add origin https://github.com/KULLANICI/REPO.git' },
            { text: 'Kodları gönder!', code: 'git push -u origin main' }
        ]
    },
    {
        id: 'COLLABORATION',
        title: 'Arkadaş Ekleme (Invite)',
        icon: <Users className="text-green-400" size={24} />,
        steps: [
            { text: 'GitHub\'da projenin sayfasına gir.', code: null },
            { text: 'Üst menüden "Settings" sekmesine tıkla.', code: null },
            { text: 'Sol menüden "Collaborators" seçeneğine gel.', code: null },
            { text: 'Yeşil "Add people" butonuna bas.', code: null },
            { text: 'Arkadaşının kullanıcı adını veya emailini yaz.', code: null },
            { text: 'Arkadaşın emailine gelen daveti kabul ettiğinde artık o da "git push" yapabilir!', code: null }
        ]
    }
];

const CATEGORIES: { id: Category; label: string; icon: React.ReactNode; description: string }[] = [
    { id: 'SETUP', label: 'Kurulum', icon: <Settings size={18} />, description: 'Git kimliğini ve ayarlarını yapılandır.' },
    { id: 'BASIC', label: 'Temel', icon: <Terminal size={18} />, description: 'Günlük hayatta en çok kullanacağın komutlar.' },
    { id: 'BRANCHING', label: 'Dallanma', icon: <GitBranch size={18} />, description: 'Projeyi bozmadan yeni özellikler geliştir.' },
    { id: 'REMOTE', label: 'Uzak Depo', icon: <Globe size={18} />, description: 'GitHub ile senkronizasyon ve paylaşım.' },
    { id: 'UNDO', label: 'Geri Alma', icon: <RotateCcw size={18} />, description: 'Hataları düzelt ve zamanda yolculuk yap.' },
    { id: 'ADVANCED', label: 'İleri Seviye', icon: <Layers size={18} />, description: 'Git\'in derinliklerine in.' },
];

const getTipForCommand = (cmd: any) => {
    if (cmd.tips) return cmd.tips;
    switch(cmd.category) {
        case 'SETUP': return "Bu ayarı genellikle proje başında veya kurulumda bir kez yapman yeterlidir.";
        case 'BASIC': return "Bu komutu sık sık kullanacaksın, kısa yollarını öğrenmek hız kazandırır.";
        case 'BRANCHING': return "Dal (branch) isimlerinde Türkçe karakter ve boşluk kullanmamaya özen göster.";
        case 'REMOTE': return "Bu komutu çalıştırmadan önce internet bağlantını kontrol etmeyi unutma.";
        case 'UNDO': return "Dikkat! Bu işlem bazı durumlarda geri alınamayabilir, emin olarak ilerle.";
        case 'ADVANCED': return "Karmaşık bir işlem yapıyorsun, öncesinde 'git status' ile durumu kontrol et.";
        default: return "Git kullanırken hata yapmaktan korkma, her şeyin bir geri dönüşü vardır.";
    }
};

const CategoryHeader = ({ category }: { category: Category }) => {
    const commonClasses = "bg-[#161B22] border border-slate-700 rounded-2xl p-6 mb-6 relative overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-2xl min-h-[160px]";

    const TipBox = () => (
        <div className="mt-4 flex items-start gap-2 text-xs text-yellow-300/90 bg-yellow-900/10 p-2.5 rounded-lg border border-yellow-700/30 max-w-md animate-in fade-in slide-in-from-left-2">
            <Zap size={14} className="mt-0.5 text-yellow-400 flex-shrink-0" />
            <span><span className="font-bold text-yellow-400">Pro İpucu:</span> Git kullanırken hata yapmaktan korkma!</span>
        </div>
    );

    switch (category) {
        case 'BASIC': return (
            <div className={commonClasses}>
                <div className="flex-1 z-10"><h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2"><Terminal className="text-green-400 w-8 h-8"/> Temel Komutlar</h2><p className="text-slate-400">Git'in alfabesi. Bu komutları her gün kullanacaksın.</p><TipBox /></div><div className="relative w-48 h-32 flex items-center justify-center"><FileText className="absolute left-0 text-slate-500 w-8 h-8 animate-pulse" /><div className="absolute left-10 w-8 h-0.5 bg-slate-600"></div><div className="absolute w-16 h-16 border-2 border-dashed border-yellow-500 rounded flex items-center justify-center"><div className="text-[8px] text-yellow-500 absolute -top-4">Staging</div><FileText className="text-yellow-400 w-6 h-6 animate-bounce" /></div><div className="absolute right-10 w-8 h-0.5 bg-slate-600"></div><div className="absolute right-0 w-10 h-10 bg-green-900/50 border border-green-500 rounded flex items-center justify-center shadow-[0_0_10px_green]"><Save className="text-green-400 w-5 h-5" /></div></div>
            </div>
        );
        case 'BRANCHING': return (
            <div className={commonClasses}>
                <div className="flex-1 z-10"><h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2"><GitBranch className="text-pink-500 w-8 h-8"/> Paralel Evrenler (Branches)</h2><p className="text-slate-400">Ana projeyi (main) bozmadan, 'feature' dalında özgürce çalış.</p><TipBox /></div><div className="relative w-64 h-24 bg-slate-900/50 rounded-xl border border-slate-700/50 p-2 overflow-hidden"><svg className="w-full h-full" viewBox="0 0 200 80"><line x1="10" y1="60" x2="190" y2="60" stroke="#3b82f6" strokeWidth="3" /><circle cx="20" cy="60" r="4" fill="#3b82f6" /><circle cx="80" cy="60" r="4" fill="#3b82f6" /><circle cx="180" cy="60" r="4" fill="#3b82f6" /><text x="10" y="75" fill="#3b82f6" fontSize="10" fontFamily="monospace" fontWeight="bold">main</text><path d="M 80 60 C 100 60, 100 25, 120 25 L 150 25 C 160 25, 170 35, 180 60" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 2" className="animate-pulse" /><circle cx="120" cy="25" r="4" fill="#ec4899" /><circle cx="150" cy="25" r="4" fill="#ec4899" /><text x="120" y="15" fill="#ec4899" fontSize="10" fontFamily="monospace" fontWeight="bold">feature</text></svg></div>
            </div>
        );
        case 'REMOTE': return (
            <div className={commonClasses}>
                <div className="flex-1 z-10"><h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2"><Globe className="text-blue-400 w-8 h-8"/> Dünyaya Açıl (Remote)</h2><p className="text-slate-400">Kodlarını GitHub bulutuna gönder veya oradan çek.</p><TipBox /></div><div className="relative w-32 h-24 flex items-center justify-center"><Globe className="text-slate-700 w-24 h-24 absolute opacity-50" /><div className="absolute w-28 h-28 border-t-2 border-b-2 border-blue-500/50 rounded-full animate-spin-slow" style={{ animationDuration: '4s' }}></div><div className="absolute w-20 h-20 border-l-2 border-r-2 border-cyan-400/30 rounded-full animate-spin-slow" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div><UploadCloud className="text-white z-10 w-8 h-8 animate-bounce" /></div>
            </div>
        );
        case 'UNDO': return (
            <div className={commonClasses}>
                <div className="flex-1 z-10"><h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2"><RotateCcw className="text-orange-400 w-8 h-8"/> Zaman Makinesi (Undo)</h2><p className="text-slate-400">Hata mı yaptın? Geçmişe dönmek Git ile çok kolay.</p><TipBox /></div><div className="relative w-24 h-24 border-4 border-slate-700 rounded-full flex items-center justify-center bg-slate-800 shadow-[0_0_15px_rgba(251,146,60,0.2)]"><Clock className="text-slate-600 w-20 h-20 absolute opacity-20" /><div className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-orange-500 origin-bottom animate-spin-slow" style={{ animationDuration: '2s', animationDirection: 'reverse', transform: 'translateX(-50%) translateY(-100%)' }}></div><div className="absolute top-1/2 left-1/2 w-1 h-5 bg-slate-300 origin-bottom animate-spin-slow" style={{ animationDuration: '10s', animationDirection: 'reverse', transform: 'translateX(-50%) translateY(-100%)' }}></div><div className="w-2 h-2 bg-white rounded-full absolute z-10 border border-slate-900"></div><div className="absolute -bottom-6 text-[10px] text-orange-400 font-mono animate-pulse">CTRL+Z</div></div>
            </div>
        );
        case 'SETUP': return (
            <div className={commonClasses}>
                <div className="flex-1 z-10"><h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2"><Settings className="text-slate-400 w-8 h-8"/> Kurulum & Ayarlar</h2><p className="text-slate-400">Git kimliğini oluştur ve maceraya hazırlan.</p><TipBox /></div><div className="relative w-40 h-24 bg-slate-900 rounded-lg border border-slate-600 p-3 shadow-lg transform rotate-3 hover:rotate-0 transition-transform"><div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-1"><div className="w-6 h-6 bg-slate-700 rounded-full overflow-hidden flex items-center justify-center"><UserCheck size={16} className="text-slate-400"/></div><div className="h-2 w-16 bg-slate-700 rounded"></div></div><div className="space-y-1.5"><div className="flex items-center gap-1 text-[8px] font-mono text-green-400"><span>user.name</span><span className="text-white">"Sude"</span><span className="w-0.5 h-2 bg-green-500 animate-pulse"></span></div><div className="flex items-center gap-1 text-[8px] font-mono text-green-400 opacity-50"><span>user.email</span><span className="text-white">...</span></div></div><div className="absolute -right-2 -top-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg"><Check size={14} /></div></div>
            </div>
        );
        case 'ADVANCED': return (
            <div className={commonClasses}>
                <div className="flex-1 z-10"><h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-2"><Layers className="text-purple-400 w-8 h-8"/> İleri Seviye</h2><p className="text-slate-400">Git'in derinliklerine in, ustalık gerektiren hamleler yap.</p><TipBox /></div><div className="relative w-32 h-24 flex items-center justify-center perspective-1000"><div className="absolute w-16 h-16 bg-purple-500/20 border border-purple-500 rounded transform -rotate-x-60 -translate-y-4 animate-pulse"></div><div className="absolute w-16 h-16 bg-purple-500/40 border border-purple-500 rounded transform -rotate-x-60 translate-y-0 shadow-[0_0_15px_purple]"></div><div className="absolute w-16 h-16 bg-purple-500/60 border border-purple-500 rounded transform -rotate-x-60 translate-y-4"></div></div>
            </div>
        );
        default: return null;
    }
};

function App() {
    const [activeTab, setActiveTab] = useState<'CHEAT_SHEET' | 'VISUALIZER' | 'GITHUB' | 'AI'>('CHEAT_SHEET');
    const [selectedCategory, setSelectedCategory] = useState<Category>('SETUP');
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    const filteredCommands = COMMANDS.filter(cmd => {
        const matchesCategory = selectedCategory === cmd.category;
        const matchesSearch = cmd.cmd.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
        return searchQuery ? matchesSearch : matchesCategory;
    });

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setShowToast(true);
        setTimeout(() => setCopiedId(null), 2000);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-blue-500 selection:text-white pb-10 bg-[#0D1117] text-slate-300">

            {/* Header */}
            <header className="bg-[#161B22]/90 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">

                    <div className="flex items-center gap-4">
                        {/* GitMap Logo */}
                        <div className="flex items-center gap-3 bg-slate-800/40 p-2 rounded-2xl border border-slate-700/50 backdrop-blur-sm group hover:border-blue-500/50 transition-colors cursor-pointer" onClick={() => setIsAboutOpen(true)}>
                            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Map size={20} />
                            </div>
                            <div className="flex items-center">
                                <span className="text-xl font-extrabold text-white leading-none tracking-wide">GIT</span>
                                <span className="text-xl font-extrabold text-blue-400 leading-none tracking-wide">MAP</span>
                            </div>
                        </div>
                    </div>

                    <nav className="flex bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/50 overflow-x-auto max-w-full">
                        {[
                            { id: 'CHEAT_SHEET', icon: <BookOpen size={16} />, label: 'Komutlar' },
                            { id: 'VISUALIZER', icon: <Layers size={16} />, label: 'Görselleştirici' },
                            { id: 'GITHUB', icon: <Github size={16} />, label: 'GitHub' },
                            { id: 'AI', icon: <MessageSquare size={16} />, label: 'AI Mentor' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}

                        {/* Nasıl Kullanılır Butonu (Navigasyonun sağında, farklı renkte) */}
                        <button
                            onClick={() => setIsAboutOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap bg-slate-700/50 hover:bg-slate-700 text-yellow-400/90 hover:text-yellow-400 border border-transparent hover:border-yellow-500/30"
                        >
                            <Info size={16} />
                            Nasıl Kullanılır?
                        </button>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 mt-8 flex-1 w-full">

                {activeTab === 'GITHUB' && (
                    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
                        <div className="text-center mb-8 relative">
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white mb-2 relative z-10">GitHub Rehberi</h2>
                            <p className="text-slate-400 relative z-10">Projelerini dünyayla paylaş, takımınla güçlen.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {GITHUB_GUIDES.map(guide => (
                                <div key={guide.id} className="bg-[#161B22] border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-900/10 group">
                                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                                        <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {guide.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white">{guide.title}</h3>
                                    </div>
                                    <div className="space-y-6 relative">
                                        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-800"></div>
                                        {guide.steps.map((step, idx) => (
                                            <div key={idx} className="relative flex gap-4">
                                                <div className="z-10 flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xs font-bold text-white group-hover:border-blue-500 transition-colors">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1 pb-2">
                                                    <p className="text-sm text-slate-300 mb-2">{step.text}</p>
                                                    {step.code && (
                                                        <div className="group/code relative mt-2">
                                                            <code className="block bg-black/50 p-3 rounded-lg text-green-400 font-mono text-xs border border-slate-700/50 hover:border-slate-500 transition-colors">
                                                                {step.code}
                                                            </code>
                                                            <button
                                                                onClick={() => copyToClipboard(step.code!, `${guide.id}-${idx}`)}
                                                                className="absolute top-2 right-2 text-slate-500 hover:text-white opacity-0 group-hover/code:opacity-100 transition-opacity"
                                                            >
                                                                {copiedId === `${guide.id}-${idx}` ? <Check size={14} className="text-green-500"/> : <Copy size={14} />}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'CHEAT_SHEET' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-in slide-in-from-bottom-4 duration-500">
                        <aside className="space-y-2 md:sticky md:top-28 h-fit">
                            <div className="mb-6 relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Komut ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#161B22] border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-slate-500 transition-all shadow-sm"
                                />
                            </div>

                            {!searchQuery && (
                                <div className="space-y-1">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Kategoriler</h3>
                                    {CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all border font-medium ${selectedCategory === cat.id ? 'bg-blue-600/10 border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-transparent text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                                        >
                                            {cat.icon}
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </aside>

                        <div className="md:col-span-3">
                            {!searchQuery && <CategoryHeader category={selectedCategory} />}
                            <div className="space-y-4">
                                {filteredCommands.length === 0 ? (
                                    <div className="text-center py-20 text-slate-500 bg-[#161B22] rounded-xl border border-slate-800">
                                        <Search size={40} className="mx-auto mb-4 opacity-50" />
                                        <p>Aradığınız kriterde komut bulunamadı.</p>
                                    </div>
                                ) : (
                                    filteredCommands.map(cmd => (
                                        <div key={cmd.id} className="group bg-[#0D1117] border border-slate-700/80 rounded-xl overflow-hidden hover:border-slate-500 transition-all hover:shadow-xl hover:shadow-blue-900/5 relative">

                                            {/* Kart Üst Bar (Terminal Havası) */}
                                            <div className="bg-[#161B22] px-4 py-2 border-b border-slate-800 flex items-center justify-between">
                                                <div className="flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                                                </div>
                                                <div className="text-[10px] text-slate-500 font-mono opacity-50">bash</div>
                                            </div>

                                            <div className="p-5 flex items-start gap-4">
                                                <div className="flex-1 space-y-3">

                                                    {/* Kod Alanı (Syntax Highlighting) */}
                                                    <div className="relative group/code">
                                                        <div className="bg-black/40 border border-slate-800 rounded-lg p-3 pl-4 flex items-center justify-between group-hover:border-slate-600 transition-colors">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-green-500 font-bold select-none">$</span>
                                                                <SyntaxHighlighter code={cmd.cmd} />
                                                            </div>

                                                            <button
                                                                onClick={() => copyToClipboard(cmd.cmd, cmd.id)}
                                                                className="p-1.5 hover:bg-slate-700 rounded-md text-slate-500 hover:text-white transition-colors"
                                                                title="Kopyala"
                                                            >
                                                                {copiedId === cmd.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Açıklama */}
                                                    <p className="text-slate-300 text-sm leading-relaxed pl-1 border-l-2 border-slate-700 ml-1">
                                                        {cmd.description}
                                                    </p>

                                                    {/* İpucu Kutusu */}
                                                    <div className="inline-flex items-center gap-2 text-xs text-orange-300/80 bg-orange-900/10 px-3 py-1.5 rounded-full border border-orange-900/20">
                                                        <Zap size={12} className="fill-orange-300/20" />
                                                        <span>{getTipForCommand(cmd)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'VISUALIZER' && (
                    <div className="max-w-4xl mx-auto">
                        <GitVisualizer />
                    </div>
                )}

                {activeTab === 'AI' && (
                    <div className="max-w-3xl mx-auto">
                        <AIChat />
                    </div>
                )}
            </main>

            <footer className="mt-auto py-8 text-center text-slate-500 text-xs border-t border-slate-800/50">
                <p className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                    GaziCyber GitHub Workshop
                </p>
            </footer>

            {/* TOAST BİLDİRİMİ */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full border border-slate-700 shadow-2xl flex items-center gap-3 transition-all duration-300 z-50 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                <div className="bg-green-500/20 p-1 rounded-full text-green-400">
                    <Check size={16} />
                </div>
                <span className="text-sm font-medium">Komut başarıyla kopyalandı!</span>
            </div>

            {/* ABOUT MODAL (POP-UP) */}
            {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}

        </div>
    );
}

export default App;