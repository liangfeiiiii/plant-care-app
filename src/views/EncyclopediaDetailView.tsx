import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Thermometer, Droplets, Sun, Wind, BookOpen } from 'lucide-react';

// Simplified article data for retrieval in detail view
const ARTICLE_DATA = {
  'monstera': {
    id: 'monstera',
    title: '龟背竹 (Monstera)',
    scientificName: 'Monstera deliciosa',
    category: '观叶植物',
    image: '/plant1.png',
    bgImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    waterInterval: '7-10天',
    light: '明亮散射光',
    temp: '18-30°C',
    humidity: '60%+',
    summary: '热带雨林的“大网格”魅力，室内装饰的首选。',
    fullContent: `龟背竹（Monstera deliciosa）是天南星科最受欢迎的室内观叶植物之一。它那巨大的、带有深裂和孔洞的叶片不仅具有极高的观赏价值，更散发着浓郁的热带气息。

### 生长习性
在自然界中，龟背竹是攀援生长的。它们利用气生根攀附在树木上。在室内养护时，如果你提供一根棕柱，你会发现它的叶片会长得更大、更健壮。

### 养护要点
1. **光照**：虽然它耐阴，但长期光照不足会导致新叶不再开背。明亮的散射光是它最爱的“口粮”。
2. **水分**：保持盆土湿润但不要积水。夏季可以多向叶片喷水，模拟热带雨林的湿度。
3. **土壤**：需要疏松透气的泥炭土或腐叶土混合基质。

送它进入你的生活，它会用四季常青的绿意回报你的温柔。`
  },
  'sansevieria': {
    id: 'sansevieria',
    title: '虎皮兰 (Snake Plant)',
    category: '观叶植物',
    image: '/plant2.png',
    bgImage: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
    waterInterval: '15-20天',
    light: '全光照至阴暗',
    temp: '15-32°C',
    humidity: '不限',
    summary: '生命力极强的“空气净化器”，新手必入。',
    fullContent: `虎皮兰是名副其实的“懒人植物”，极其耐旱且对光照要求极低。

### 独特魅力
它是极少数能在夜间吸收二氧化碳并释放氧气的植物，非常适合摆放在卧室。其挺拔的剑丛叶片极具现代设计感。

### 养护指南
不要频繁浇水。当你犹豫是否该浇水时，那就等下周再看。积水是它唯一的“天敌”。它在干旱的环境中反而能茁壮成长。`
  },
  'echeveria': {
    id: 'echeveria',
    title: '玉露 (Haworthia)',
    category: '多肉植物',
    image: '/plant3.png',
    bgImage: 'https://images.unsplash.com/photo-1509423358206-25917e13c019?auto=format&fit=crop&w=800&q=80',
    waterInterval: '10-14天',
    light: '半阴/散射光',
    temp: '15-28°C',
    humidity: '建议稍高',
    summary: '晶莹剔透的窗部结构，像宝石一样的绿植。',
    fullContent: `玉露是百合科十二卷属的多肉植物，其叶片顶端透明，被称为“窗”。

### 养护奥秘
玉露不喜欢暴晒，强光会让它原本剔透的叶片变得灰暗。放在书桌或北向窗台是极佳的选择。夏季休眠期需要控水，但在生长季节，适当的喷雾能让它的“窗”更加晶莹欲滴。`
  }
};

export const EncyclopediaDetailView: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  
  const article = ARTICLE_DATA[id as keyof typeof ARTICLE_DATA];

  if (!article) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <p style={{ color: 'var(--color-secondary)' }}>未找到相关百科内容</p>
        <button onClick={() => navigate('/encyclopedia')} style={{ marginTop: '20px', color: 'var(--color-primary)', border: 'none', background: 'none', cursor: 'pointer' }}>返回百科</button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '80px', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Header Image */}
      <div style={{ 
        position: 'relative', 
        height: '340px', 
        width: '100%',
        overflow: 'hidden',
        borderBottomLeftRadius: '32px',
        borderBottomRightRadius: '32px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <img 
          src={article.bgImage} 
          alt={article.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(245,241,232,0.8) 100%)' 
        }} />
        
        <button 
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <ArrowLeft size={20} color="var(--color-text)" />
        </button>
      </div>

      <div style={{ padding: '0 24px', marginTop: '-40px', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-heading)', 
            fontSize: '32px', 
            margin: 0,
            color: 'var(--color-text)'
          }}>
            {article.title.split(' ')[0]}
          </h1>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{article.category}</span>
        </div>
        
        {article.scientificName && (
          <p style={{ color: 'var(--color-secondary)', fontStyle: 'italic', marginBottom: '24px', fontSize: '14px' }}>
            {article.scientificName}
          </p>
        )}

        {/* Info Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
          {[
            { icon: <Droplets size={18} />, label: '浇水', value: article.waterInterval },
            { icon: <Sun size={18} />, label: '日照', value: article.light },
            { icon: <Thermometer size={18} />, label: '温度', value: article.temp },
            { icon: <Wind size={18} />, label: '湿度', value: article.humidity || '40-60%' }
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ 
                backgroundColor: 'var(--color-input-bg)', 
                padding: '8px', 
                borderRadius: '12px',
                color: 'var(--color-primary)'
              }}>
                {item.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: 'var(--color-secondary)' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <section style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '24px',
          boxShadow: 'var(--shadow-sm)',
          lineHeight: '1.8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BookOpen size={18} color="var(--color-primary)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0 }}>深度科普</h3>
          </div>
          
          <div style={{ color: 'var(--color-text)', fontSize: '15px', whiteSpace: 'pre-wrap' }}>
            {article.fullContent.split('\n\n').map((para, i) => {
              if (para.startsWith('###')) {
                return (
                  <h4 key={i} style={{ 
                    color: 'var(--color-primary)', 
                    marginTop: '24px', 
                    marginBottom: '12px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '18px'
                  }}>
                    {para.replace('### ', '')}
                  </h4>
                );
              }
              return <p key={i} style={{ marginBottom: '16px' }}>{para}</p>;
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
