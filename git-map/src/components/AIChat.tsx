import { useState, useRef, useEffect } from 'react'; // React kelimesini kaldırdık
import { Send, Bot, User, Sparkles, Trash2 } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'ai';
    text: string;
}

export const AIChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'ai',
            text: "Merhaba! Ben GaziCyber AI Mentorü. Git ve GitHub ile ilgili takıldığın her şeyi bana sorabilirsin. 👋"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Örnek Sorular
    const SUGGESTIONS = [
        "Yanlışlıkla main branch'e commit attım, ne yapmalıyım? 😱",
        "Son commit'i tamamen silmek istiyorum.",
        "Merge conflict (çakışma) çıktı, nasıl çözerim?",
        ".gitignore dosyası ne işe yarar?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // --- GELİŞMİŞ CEVAP SİMÜLASYONU ---
    const getAIResponse = (question: string) => {
        const lowerQ = question.toLowerCase();

        // Senaryo 1: Yanlışlıkla Main'e Commit Atmak
        if (lowerQ.includes("main branch") || lowerQ.includes("yanlışlıkla")) {
            return `Panik yapmana gerek yok, bu hepimizin başına gelir! 😌
      
Bu durumu düzeltmek için "Soft Reset" tekniğini kullanacağız. Bu yöntem, attığın commit'i (paketlemeyi) geri alır ama yazdığın kodları silmez. Kodların hala "Staging Area"da güvenle bekler.

Adım adım çözüm:
1. **Commit'i Geri Al:** Terminale \`git reset --soft HEAD~1\` yaz. (Bu, zamanı bir adım geriye alır ama dosyalarına dokunmaz).
2. **Yeni Branch Aç:** Kodlarını taşımak istediğin yeni dala geç: \`git switch -c yeni-ozellik\`.
3. **Tekrar Commit At:** Artık doğru daldasın! \`git commit -m "özellik eklendi"\` diyerek işi bitir.

Böylece main branch tertemiz kalır, sen de yeni dalında çalışmaya devam edersin. 🚀`;
        }

        // Senaryo 2: Commit Silmek
        if (lowerQ.includes("silmek") || lowerQ.includes("geri al") || lowerQ.includes("hard")) {
            return `Dikkat! ⚠️ Yapacağın işlem biraz tehlikeli olabilir, o yüzden emin olmalısın.

Eğer *"Yazdığım kodlar tamamen çöp oldu, her şeyi silip son commit'e dönmek istiyorum"* diyorsan:
👉 \`git reset --hard HEAD~1\`
Bu komut, son yaptığın tüm değişiklikleri **kalıcı olarak siler** ve geri getirilemez.

Eğer *"Sadece commit mesajını yanlış yazdım, onu düzeltmek istiyorum"* diyorsan:
👉 \`git commit --amend -m "yeni doğru mesaj"\`
Bu çok daha güvenli bir yöntemdir. Kodlarını silmez, sadece etiketi değiştirir.`;
        }

        // Senaryo 3: Merge Conflict (Çakışma)
        if (lowerQ.includes("conflict") || lowerQ.includes("çakışma")) {
            return `Çakışma (Conflict) görmek korkutucu olabilir ama aslında Git sana sadece bir soru soruyor: *"İki kişi de aynı satırı değiştirmiş, hangisini seçeyim?"* 🤔

Çözmek için şu adımları izle:
1. VS Code'da (veya editöründe) çakışma olan dosyayı aç.
2. \`<<<<<<< HEAD\` ve \`>>>>>>>\` ile işaretlenmiş satırları göreceksin.
3. Git sana "Mevcut Değişiklik" (Current) ve "Gelen Değişiklik" (Incoming) seçeneklerini sunar.
4. Hangisinin doğru olduğuna karar ver, diğerini sil. O garip işaretleri (\`<<<\`, \`===\`, \`>>>\`) de sildiğinden emin ol.
5. Dosyayı kaydet ve terminale dönüp:
   \`git add .\`
   \`git commit -m "çakışma çözüldü"\`
   
İşte bu kadar! Kriz çözüldü. 🎉`;
        }

        // Senaryo 4: .gitignore
        if (lowerQ.includes("gitignore")) {
            return `Güzel soru! 🧠 .gitignore dosyası, Git'in görmezden gelmesini istediğimiz dosyaların listesidir.

Neden buna ihtiyaç duyarız?
Çünkü bazı dosyalar projenin çalışması için gereklidir ama kodun kendisi değildir. Bunları GitHub'a yüklemek hem depoyu şişirir hem de güvenlik riski yaratabilir.

Neleri eklemelisin?
- **Bağımlılıklar:** \`node_modules/\` (Binlerce dosya içerir, gereksizdir).
- **Gizli Bilgiler:** \`.env\` (Şifrelerin ve API anahtarların burada durur, asla paylaşma!).
- **Derleme Dosyaları:** \`.class\`, \`dist/\`, \`build/\` (Bunlar her bilgisayarda yeniden üretilebilir).
- **Sistem Dosyaları:** \`.DS_Store\` (Mac kullanıcılarının baş belasıdır).

Kısaca: "Kod olmayan her şeyi" buraya yazabilirsin.`;
        }

        // Genel Cevap
        return "Bu harika bir soru! 🤖 Şu an demo modunda olduğum için veritabanımda bu sorunun tam karşılığı yok. Ancak workshop sırasında mentörlerine el kaldırarak sorarsan sana seve seve yardımcı olacaklardır! Ayrıca 'git --help' yazarak da ipuçlarına ulaşabilirsin.";
    };

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const newMsg: Message = { id: Date.now().toString(), role: 'user', text };
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Daha doğal hissettirmek için biraz daha uzun bekleme süresi (1.5 sn)
        setTimeout(() => {
            const responseText = getAIResponse(text);
            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: responseText };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="bg-[#161B22] border border-slate-700 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-2xl animate-in fade-in duration-500">

            {/* Chat Header */}
            <div className="bg-[#0D1117] p-4 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bot size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">AI Mentor</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs text-slate-400">Çevrimiçi</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setMessages([messages[0]])}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Sohbeti Temizle"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-slate-800 text-blue-400' : 'bg-blue-600 text-white'}`}>
                            {msg.role === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
                        </div>
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                            msg.role === 'user'
                                ? 'bg-blue-600 text-white rounded-tr-none'
                                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                        }`}>
                            {/* Markdown benzeri stil (Satır boşluklarını korur) */}
                            <div className="whitespace-pre-wrap font-sans">{msg.text}</div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                            <Sparkles size={16} className="text-blue-400 animate-pulse" />
                        </div>
                        <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions & Input Area */}
            <div className="bg-[#0D1117] p-4 border-t border-slate-800">
                {messages.length === 1 && (
                    <div className="mb-4 flex flex-wrap gap-2 animate-in slide-in-from-bottom-2">
                        {SUGGESTIONS.map((sug, i) => (
                            <button
                                key={i}
                                onClick={() => handleSend(sug)}
                                className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-300 border border-slate-700/50 px-3 py-2 rounded-full transition-colors text-left"
                            >
                                {sug}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex gap-2 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                        placeholder="Bir soru sor..."
                        className="flex-1 bg-[#161B22] text-white border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 placeholder-slate-500 pr-10"
                    />
                    <button
                        onClick={() => handleSend(input)}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-2 bottom-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};