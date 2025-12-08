import type {Command} from './types';

export const COMMANDS: Command[] = [
    // SETUP
    {
        id: 'config-name',
        cmd: 'git config --global user.name "Adın Soyadın"',
        description: 'Commitlerde görünecek adını ayarla.',
        category: 'SETUP'
    },
    {
        id: 'config-email',
        cmd: 'git config --global user.email "email@adresin.com"',
        description: 'Commitlerde görünecek email adresini ayarla.',
        category: 'SETUP'
    },
    {
        id: 'init',
        cmd: 'git init',
        description: 'Bulunduğun klasörde yeni bir Git deposu (repository) oluştur.',
        category: 'SETUP'
    },

    // BASIC
    {
        id: 'status',
        cmd: 'git status',
        description: 'Değişikliklerin durumunu (takip edilen/edilmeyen dosyalar) göster.',
        category: 'BASIC',
        tips: 'Sık sık kullanın!'
    },
    {
        id: 'add-all',
        cmd: 'git add .',
        description: 'Tüm değişiklikleri "Staging Area"ya (sahne) ekle.',
        category: 'BASIC'
    },
    {
        id: 'add-file',
        cmd: 'git add <dosya_adi>',
        description: 'Sadece belirli bir dosyayı sahneye ekle.',
        category: 'BASIC'
    },
    {
        id: 'commit',
        cmd: 'git commit -m "Mesajın"',
        description: 'Sahnedeki dosyaları kalıcı olarak kaydet (snapshot al).',
        category: 'BASIC',
        tips: 'Mesajlarınız açıklayıcı olsun.'
    },
    {
        id: 'log',
        cmd: 'git log',
        description: 'Commit geçmişini listele.',
        category: 'BASIC'
    },

    // BRANCHING
    {
        id: 'branch-list',
        cmd: 'git branch',
        description: 'Mevcut branchleri listele.',
        category: 'BRANCHING'
    },
    {
        id: 'branch-new',
        cmd: 'git branch <isim>',
        description: 'Yeni bir branch oluştur.',
        category: 'BRANCHING'
    },
    {
        id: 'checkout',
        cmd: 'git checkout <isim>',
        description: 'Başka bir branch\'e geçiş yap.',
        category: 'BRANCHING'
    },
    {
        id: 'switch-create',
        cmd: 'git checkout -b <isim>',
        description: 'Yeni bir branch oluştur ve hemen ona geç.',
        category: 'BRANCHING'
    },
    {
        id: 'merge',
        cmd: 'git merge <isim>',
        description: 'Belirtilen branch\'i bulunduğun branch ile birleştir.',
        category: 'BRANCHING'
    },

    // REMOTE
    {
        id: 'clone',
        cmd: 'git clone <url>',
        description: 'Uzak bir depoyu bilgisayarına kopyala.',
        category: 'REMOTE'
    },
    {
        id: 'remote-add',
        cmd: 'git remote add origin <url>',
        description: 'Yerel deponu uzak sunucuya (GitHub/GitLab) bağla.',
        category: 'REMOTE'
    },
    {
        id: 'push',
        cmd: 'git push -u origin main',
        description: 'Commitlerini uzak sunucuya gönder.',
        category: 'REMOTE'
    },
    {
        id: 'pull',
        cmd: 'git pull',
        description: 'Uzak sunucudaki değişiklikleri al ve birleştir.',
        category: 'REMOTE'
    },

    // UNDO
    {
        id: 'discard-changes',
        cmd: 'git checkout -- <dosya>',
        description: 'Dosyadaki kaydedilmemiş değişiklikleri geri al (tehlikelidir).',
        category: 'UNDO'
    },
    {
        id: 'reset-soft',
        cmd: 'git reset --soft HEAD~1',
        description: 'Son commiti geri al ama değişiklikleri koru.',
        category: 'UNDO'
    },
    {
        id: 'reset-hard',
        cmd: 'git reset --hard HEAD~1',
        description: 'Son commiti ve tüm değişiklikleri sil (Çok tehlikeli).',
        category: 'UNDO'
    },

    // ADVANCED
    {
        id: 'stash',
        cmd: 'git stash',
        description: 'Değişiklikleri geçici olarak kenara kaldır (hafızaya al).',
        category: 'ADVANCED'
    },
    {
        id: 'stash-pop',
        cmd: 'git stash pop',
        description: 'Kenara kaldırdığın değişiklikleri geri getir.',
        category: 'ADVANCED'
    },
    {
        id: 'diff',
        cmd: 'git diff',
        description: 'Henüz add yapmadığın değişikliklerin içeriğini gör.',
        category: 'ADVANCED'
    }
];