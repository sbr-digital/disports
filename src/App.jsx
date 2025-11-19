import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, ShoppingBag, Menu, X } from 'lucide-react';

/**
 * CONFIGURAÇÃO DO CATÁLOGO
 * ------------------------------------------------------------------
 * Para adicionar suas imagens:
 * 1. Crie uma pasta chamada 'public' na raiz do projeto.
 * 2. Crie uma pasta 'images' dentro de 'public'.
 * 3. Coloque suas fotos lá.
 * 4. Atualize o campo 'image' abaixo com o nome do arquivo (ex: '/images/foto1.jpg').
 */
const PRODUCTS_DATA = [
  {
    id: 1,
    title: "Corre 4 - Edição Especial",
    category: "tenis",
    price: "R$ 599,90",
    description: "Super lançamento. Amortecimento e leveza para sua corrida.",
    // Caminho relativo à pasta public
    image: "/images/corre4.png", 
    color: "bg-orange-500",
    whatsappMessage: "Olá! Gostaria de saber mais sobre o Corre 4 Edição Especial."
  },
  {
    id: 2,
    title: "Conjunto Icon Adaptive",
    category: "roupas",
    price: "R$ 249,90",
    description: "Tecnologia que se adapta ao corpo. Conforto total.",
    image: "/images/conjunto.png",
    color: "bg-neutral-800",
    whatsappMessage: "Olá! Tenho interesse no Conjunto Icon Adaptive."
  },
  {
    id: 3,
    title: "Skechers Glide-Step",
    category: "tenis",
    price: "R$ 499,90",
    description: "Ultraconfortável com sistema Slip-ins. Calce fácil.",
    image: "/images/skechers.png",
    color: "bg-slate-400",
    whatsappMessage: "Olá! Quero experimentar o Skechers Glide-Step."
  },
  {
    id: 4,
    title: "UA Tribase Performance",
    category: "tenis",
    price: "R$ 699,90",
    description: "Estabilidade e força para seus treinos mais pesados.",
    image: "/images/tribase.png",
    color: "bg-purple-600",
    whatsappMessage: "Olá! Gostaria de detalhes do UA Tribase."
  }
];

const App = () => {
  const [filter, setFilter] = useState('todos'); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0); 
  const [imageError, setImageError] = useState(false);

  // Filtra produtos
  const filteredProducts = PRODUCTS_DATA.filter(p => 
    filter === 'todos' ? true : p.category === filter
  );

  // Reseta índice ao trocar filtro
  useEffect(() => {
    setCurrentIndex(0);
    setImageError(false); // Reseta erro de imagem ao trocar filtro
  }, [filter]);

  // Reseta erro ao trocar slide
  useEffect(() => {
    setImageError(false);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProducts.length);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleWhatsappClick = (message) => {
    // Formata a mensagem para URL
    const text = encodeURIComponent(message);
    // Substitua pelo seu número real
    const phone = "555332615806"; 
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const currentProduct = filteredProducts[currentIndex];

  if (!currentProduct) return (
    <div className="flex items-center justify-center h-screen bg-neutral-950 text-white">
      <p>Nenhum produto encontrado nesta categoria.</p>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-neutral-950 text-white font-sans overflow-hidden selection:bg-lime-400 selection:text-black">
      
      {/* BACKGROUND COM GLOW DINÂMICO */}
      <div className={`absolute inset-0 opacity-20 transition-colors duration-700 ${currentProduct.color} blur-3xl mix-blend-screen pointer-events-none`} />
      
      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2 select-none">
          {/* <div className="w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center shadow-lg shadow-lime-400/20">
            <span className="font-bold text-black text-lg"></span>
          </div> */}
          <span className="font-bold text-xl tracking-tighter">diSports</span>
        </div>
        
        {/* FILTROS */}
        <div className="flex bg-white/5 rounded-full p-1 backdrop-blur-md border border-white/10">
          {['todos', 'tenis', 'roupas'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 ${filter === cat ? 'bg-white text-black shadow-lg scale-105' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="relative h-screen flex flex-col items-center justify-center pt-16 pb-24">
        
        <div className="relative w-full max-w-md px-6 flex flex-col items-center">
          
          {/* IMAGEM DO PRODUTO */}
          <div className="relative w-full aspect-[4/5] mb-8 group">
            <div 
              className={`w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10 transition-all duration-500 ease-out transform will-change-transform ${isAnimating ? (direction > 0 ? '-translate-x-16 opacity-0 rotate-[-6deg]' : 'translate-x-16 opacity-0 rotate-[6deg]') : 'translate-x-0 opacity-100 rotate-0 scale-100'}`}
            >
              {/* Fallback para caso a imagem não carregue */}
              {imageError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-500 p-4 text-center">
                  <ShoppingBag size={48} className="mb-2 opacity-50" />
                  <span className="text-sm">Imagem não encontrada:<br/>{currentProduct.image}</span>
                </div>
              ) : (
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.title}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              )}
              
              {/* PREÇO FLUTUANTE */}
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-md text-black font-black px-5 py-2.5 rounded-2xl shadow-xl z-10">
                {currentProduct.price}
              </div>
            </div>
          </div>

          {/* INFORMAÇÕES DO PRODUTO */}
          <div className={`text-center transition-all duration-500 delay-75 ${isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
            <div className="inline-block px-3 py-1 bg-white/5 rounded-lg text-lime-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 border border-white/5">
              {currentProduct.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-none mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              {currentProduct.title}
            </h1>
            <p className="text-white/60 text-sm px-2 leading-relaxed max-w-xs mx-auto font-medium">
              {currentProduct.description}
            </p>
          </div>

        </div>

        {/* BOTÕES DE NAVEGAÇÃO */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all active:scale-90 text-white/70 hover:text-white z-20 touch-manipulation"
          aria-label="Anterior"
        >
          <ChevronLeft size={28} />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all active:scale-90 text-white/70 hover:text-white z-20 touch-manipulation"
          aria-label="Próximo"
        >
          <ChevronRight size={28} />
        </button>

      </main>

      {/* FOOTER FIXO */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-black via-black/95 to-transparent z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
          
          {/* CONTADOR */}
          <div className="flex flex-col pl-2">
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Produto</span>
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-xl font-bold text-white">{currentIndex + 1}</span>
              <span className="text-sm text-white/30">/</span>
              <span className="text-sm text-white/30">{filteredProducts.length}</span>
            </div>
          </div>

          {/* AÇÕES */}
          <div className="flex gap-3">
            <button 
              onClick={() => window.open('https://www.instagram.com/disports__', '_blank')}
              className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl hover:bg-gradient-to-tr hover:from-purple-500 hover:to-orange-500 hover:text-white transition-all border border-white/10 backdrop-blur-md text-white/70 active:scale-95"
              aria-label="Instagram"
            >
              <Instagram size={22} />
            </button>
            
            <button 
              onClick={() => handleWhatsappClick(currentProduct.whatsappMessage)}
              className="flex-1 flex items-center gap-3 bg-lime-400 hover:bg-lime-300 text-neutral-900 px-6 py-3 rounded-2xl font-bold shadow-lg shadow-lime-400/10 transition-all active:scale-95 min-w-[140px] justify-center"
            >
              <MessageCircle size={20} className="fill-black/10 stroke-black" />
              <span>Comprar</span>
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default App;