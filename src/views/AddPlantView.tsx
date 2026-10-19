import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Camera, Upload, X } from 'lucide-react';

export const AddPlantView: React.FC = () => {
  const { addPlant } = useStore();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [interval, setInterval] = useState('7');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addPlant({
      name,
      species,
      waterIntervalDays: parseInt(interval, 10) || 7,
      imageUrl: imagePreview || '/plant1.png',
    });
    
    navigate('/');
  };

  return (
    <div>
      <h2 className="title" style={{ marginTop: '24px', marginBottom: '8px' }}>添加新植物</h2>
      <p className="subtitle">记录下这位新朋友的信息吧</p>

      <div style={{ marginBottom: '32px' }}>
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }} 
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        
        {imagePreview ? (
          <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden' }}>
            <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button 
              type="button" 
              onClick={removeImage}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              height: '160px',
              border: '2px dashed #D1C4B2',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: 'pointer',
              backgroundColor: 'rgba(255,255,255,0.4)',
              transition: 'all 0.2s'
            }}
          >
            <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <Camera size={32} color="var(--color-primary)" />
            </div>
            <span style={{ fontSize: '14px', color: 'var(--color-secondary)' }}>点击拍照或上传图片</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <Input 
          label="植物昵称" 
          placeholder="例如：我的小龟背" 
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        
        <Input 
          label="植物品种" 
          placeholder="例如：龟背竹" 
          value={species}
          onChange={e => setSpecies(e.target.value)}
        />
        
        <Input 
          label="浇水周期 (天)" 
          type="number"
          min="1"
          max="30"
          value={interval}
          onChange={e => setInterval(e.target.value)}
        />

        <div style={{ marginTop: '48px' }}>
          <Button type="submit">保存植物档案</Button>
        </div>
      </form>
    </div>
  );
};
