import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, Droplets, Wind, Thermometer, Bug, Sprout, Zap, 
  Leaf, Flower 
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  isArticle?: boolean; // For general care knowledge
  icon?: React.ReactNode;
}

export const EncyclopediaView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const navigate = useNavigate();

  const categories = ['全部', '观叶植物', '多肉植物', '花卉类', '养护知识'];

  const articles: Article[] = [
    {
      id: 'monstera',
      title: '龟背竹',
      category: '观叶植物',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80',
      summary: '热带雨林的“大网格”魅力。'
    },
    {
      id: 'sansevieria',
      title: '虎皮兰',
      category: '观叶植物',
      image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=400&q=80',
      summary: '生命力极强的“空气净化器”。'
    },
    {
      id: 'echeveria',
      title: '玉露',
      category: '多肉植物',
      image: 'https://images.unsplash.com/photo-1509423358206-25917e13c019?auto=format&fit=crop&w=400&q=80',
      summary: '晶莹剔透的窗部结构。'
    },
    // General Care Knowledge
    {
      id: 'light-guide',
      title: '光照指南',
      category: '养护知识',
      isArticle: true,
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80',
      summary: '如何平衡散射光与直射光。',
      icon: <Sun size={20} />
    },
    {
      id: 'water-mystery',
      title: '水分奥秘',
      category: '养护知识',
      isArticle: true,
      image: 'https://images.unsplash.com/photo-1463930644024-c1180fb0672e?auto=format&fit=crop&w=400&q=80',
      summary: '掌握“见干见湿”的核心。',
      icon: <Droplets size={20} />
    }
  ];

  const filteredArticles = activeCategory === '全部' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div style={{ paddingBottom: '100px', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <header style={{ padding: '32px 24px 20px 24px' }}>
        <h1 className="title" style={{ fontSize: '32px', marginBottom: '8px' }}>养护百科</h1>
        <p className="subtitle" style={{ color: 'var(--color-secondary)' }}>让有见识的朋友，带你走进植物世界</p>
      </header>

      {/* Category Tabs */}
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        padding: '0 24px 24px 24px',
        gap: '24px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '0 0 8px 0',
              border: 'none',
              background: 'none',
              fontSize: '18px',
              fontFamily: 'var(--font-heading)',
              fontWeight: activeCategory === cat ? '700' : '400',
              color: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-secondary)',
              borderBottom: activeCategory === cat ? '3px solid var(--color-primary)' : '3px solid transparent',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <main style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '16px',
        padding: '0 24px'
      }}>
        {filteredArticles.map((article) => (
          <article 
            key={article.id}
            onClick={() => navigate(`/encyclopedia/${article.id}`)}
            style={{
              position: 'relative',
              height: '220px',
              backgroundColor: 'white',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <img 
              src={article.image} 
              alt={article.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '60%',
              background: 'linear-gradient(to top, rgba(45,42,38,0.9) 0%, rgba(45,42,38,0.4) 60%, transparent 100%)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end'
            }}>
              <h3 style={{ 
                color: 'white', 
                fontFamily: 'var(--font-heading)', 
                fontSize: '18px',
                marginBottom: '4px'
              }}>
                {article.title}
              </h3>
              <p style={{ 
                color: 'rgba(255,255,255,0.7)', 
                fontSize: '11px',
                lineHeight: '1.4'
              }}>
                {article.summary}
              </p>
              
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(217, 119, 87, 0.9)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {article.icon || <Leaf size={16} />}
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
};
