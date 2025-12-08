import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowRight,
    Save,
    Cloud,
    HardDrive,
    FilePlus,
    PlayCircle
} from 'lucide-react';

// Zone tipleri
type ZoneType = 'WORKING_DIR' | 'STAGING' | 'LOCAL_REPO' | 'REMOTE_REPO';

interface ZoneProps {
    id: ZoneType;
    title: string;
    icon: React.ReactNode;
    description: string;
}

export const GitVisualizer: React.FC = () => {
    const [activeZone, setActiveZone] = useState<ZoneType | null>(null);
    const [animationStep, setAnimationStep] = useState<string>('');
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const zones: ZoneProps[] = [
        {
            id: 'WORKING_DIR',
            title: 'Working Directory',
            icon: <HardDrive className="w-6 h-6" />,
            description: 'Dosyaları düzenlediğin yer (Untracked/Modified).'
        },
        {
            id: 'STAGING',
            title: 'Staging Area',
            icon: <FilePlus className="w-6 h-6" />,
            description: 'Commitlenmeye hazır dosyalar (Index).'
        },
        {
            id: 'LOCAL_REPO',
            title: 'Local Repo',
            icon: <Save className="w-6 h-6" />,
            description: 'Kendi bilgisayarındaki kalıcı kayıtlar (.git).'
        },
        {
            id: 'REMOTE_REPO',
            title: 'Remote Repo',
            icon: <Cloud className="w-6 h-6" />,
            description: 'GitHub/GitLab üzerindeki sunucu.'
        }
    ];

    // --- RENK VE STİL AYARLARI ---
    const getStepStyles = () => {
        switch (animationStep) {
            case 'ADD': // SARI
                return {
                    border: 'border-yellow-500',
                    shadow: 'shadow-[0_0_25px_rgba(234,179,8,0.3)]',
                    barColor: 'bg-yellow-500',
                    textColor: 'text-yellow-400',
                    iconBg: 'bg-yellow-500/20',
                    messageBorder: 'border-yellow-500/30',
                    messageBg: 'bg-yellow-900/20',
                    messageText: 'text-yellow-300'
                };
            case 'COMMIT': // YEŞİL
                return {
                    border: 'border-green-500',
                    shadow: 'shadow-[0_0_25px_rgba(22,163,74,0.3)]',
                    barColor: 'bg-green-500',
                    textColor: 'text-green-400',
                    iconBg: 'bg-green-500/20',
                    messageBorder: 'border-green-500/30',
                    messageBg: 'bg-green-900/20',
                    messageText: 'text-green-300'
                };
            case 'PUSH': // MAVİ
                return {
                    border: 'border-blue-500',
                    shadow: 'shadow-[0_0_25px_rgba(59,130,246,0.3)]',
                    barColor: 'bg-blue-500',
                    textColor: 'text-blue-400',
                    iconBg: 'bg-blue-500/20',
                    messageBorder: 'border-blue-500/30',
                    messageBg: 'bg-blue-900/20',
                    messageText: 'text-blue-300'
                };
            case 'PULL': // MOR
                return {
                    border: 'border-purple-500',
                    shadow: 'shadow-[0_0_25px_rgba(168,85,247,0.3)]',
                    barColor: 'bg-purple-500',
                    textColor: 'text-purple-400',
                    iconBg: 'bg-purple-500/20',
                    messageBorder: 'border-purple-500/30',
                    messageBg: 'bg-purple-900/20',
                    messageText: 'text-purple-300'
                };
            default: // Varsayılan
                return {
                    border: 'border-slate-700',
                    shadow: '',
                    barColor: 'bg-slate-800',
                    textColor: 'text-slate-500',
                    iconBg: 'bg-slate-800',
                    messageBorder: 'border-transparent',
                    messageBg: 'bg-slate-800/50',
                    messageText: 'text-slate-500'
                };
        }
    };

    const styles = getStepStyles();

    const runSimulation = (action: 'ADD' | 'COMMIT' | 'PUSH' | 'PULL') => {
        if (timerRef.current) clearTimeout(timerRef.current);

        setAnimationStep(action);

        if (action === 'ADD') setActiveZone('STAGING');
        else if (action === 'COMMIT') setActiveZone('LOCAL_REPO');
        else if (action === 'PUSH') setActiveZone('REMOTE_REPO');
        else if (action === 'PULL') setActiveZone('WORKING_DIR');

        timerRef.current = setTimeout(() => {
            setAnimationStep('');
            setActiveZone(null);
        }, 1500);
    };

    return (
        <div className="bg-[#161B22] p-6 rounded-2xl border border-slate-700 shadow-2xl animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-4">
                <PlayCircle className="text-blue-500" />
                Git Akışı Simülasyonu
            </h3>

            {/* KONTROL BUTONLARI */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
                <button
                    onClick={() => runSimulation('ADD')}
                    className={`px-6 py-3 rounded-xl font-mono font-bold transition-all duration-200 border active:scale-95 ${
                        animationStep === 'ADD'
                            ? 'bg-yellow-500 text-black border-yellow-400 scale-105 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
                            : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    git add
                </button>

                <button
                    onClick={() => runSimulation('COMMIT')}
                    className={`px-6 py-3 rounded-xl font-mono font-bold transition-all duration-200 border active:scale-95 ${
                        animationStep === 'COMMIT'
                            ? 'bg-green-600 text-white border-green-500 scale-105 shadow-[0_0_15px_rgba(22,163,74,0.4)]'
                            : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    git commit
                </button>

                <button
                    onClick={() => runSimulation('PUSH')}
                    className={`px-6 py-3 rounded-xl font-mono font-bold transition-all duration-200 border active:scale-95 ${
                        animationStep === 'PUSH'
                            ? 'bg-blue-600 text-white border-blue-500 scale-105 shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                            : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    git push
                </button>

                <button
                    onClick={() => runSimulation('PULL')}
                    className={`px-6 py-3 rounded-xl font-mono font-bold transition-all duration-200 border active:scale-95 ${
                        animationStep === 'PULL'
                            ? 'bg-purple-600 text-white border-purple-500 scale-105 shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                            : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    git pull
                </button>
            </div>

            {/* AKIŞ DİYAGRAMI */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative mt-8">
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-700 -translate-y-1/2 z-0"></div>

                {zones.map((zone, idx) => {
                    // Bu kutu şu an aktif mi?
                    const isActive = activeZone === zone.id;

                    return (
                        <div key={zone.id} className="relative z-10 group cursor-default">
                            <div
                                className={`
                      p-4 rounded-2xl border-2 min-h-[180px] flex flex-col items-center justify-between transition-all duration-300
                      ${isActive
                                    ? `${styles.border} bg-slate-800 ${styles.shadow} transform -translate-y-2 scale-105`
                                    : 'border-slate-700 bg-[#0D1117] hover:border-slate-500'}
                  `}
                            >
                                <div className="flex flex-col items-center gap-3 mt-2">
                                    <div className={`p-3 rounded-full transition-colors duration-300 ${isActive ? styles.iconBg : 'bg-slate-800'} ${isActive ? styles.textColor : 'text-slate-500'}`}>
                                        {zone.icon}
                                    </div>
                                    <span className={`font-bold text-sm md:text-base text-center transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                          {zone.title}
                      </span>
                                </div>

                                <p className="text-xs text-center text-slate-500 mt-2 px-1 leading-relaxed">
                                    {zone.description}
                                </p>

                                {/* Dosya Simülasyonu */}
                                <div className="w-full mt-3 space-y-1.5 px-2">
                                    <div className={`h-1.5 w-full rounded-full transition-all duration-300 ${isActive ? styles.barColor : 'bg-slate-800'}`}></div>
                                    <div className={`h-1.5 w-2/3 mx-auto rounded-full transition-all duration-300 delay-75 ${isActive ? styles.barColor : 'bg-slate-800'}`}></div>
                                </div>
                            </div>

                            {/* Ok İşaretleri */}
                            {idx < zones.length - 1 && (
                                <div className="hidden md:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20 text-slate-600 bg-[#161B22] p-1 rounded-full">
                                    <ArrowRight className={`w-5 h-5 transition-colors duration-200 ${animationStep ? styles.textColor : ''}`} />
                                </div>
                            )}

                            {idx < zones.length - 1 && (
                                <div className="md:hidden flex justify-center py-2 text-slate-600">
                                    <ArrowRight className={`w-6 h-6 rotate-90 transition-colors duration-200 ${animationStep ? styles.textColor : ''}`} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Bilgi Mesajı */}
            <div className="mt-8 text-center h-12 flex items-center justify-center">
                <div className={`inline-block px-6 py-2.5 rounded-lg text-sm font-mono transition-all duration-300 border ${styles.messageBg} ${styles.messageBorder} ${styles.messageText}`}>
                    {animationStep === 'ADD' && "git add: Dosyalar Working Directory'den Staging Area'ya taşındı."}
                    {animationStep === 'COMMIT' && "git commit: Dosyalar paketlendi ve Local Repo'ya kaydedildi."}
                    {animationStep === 'PUSH' && "git push: Kodlar GitHub (Remote Repo) sunucusuna gönderildi."}
                    {animationStep === 'PULL' && "git pull: Uzak sunucudaki değişiklikler senin bilgisayarına çekildi."}
                    {!animationStep && "Akışı görmek için yukarıdaki komut butonlarına tıkla."}
                </div>
            </div>
        </div>
    );
};