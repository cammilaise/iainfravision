import { useState, useEffect } from 'react';
import { BrazilMap } from './components/BrazilMap';
import { MapLegend } from './components/MapLegend';
import { StatisticsPanel } from './components/StatisticsPanel';
import { Header } from './components/Header';
import { LoadingScreen } from './components/LoadingScreen';
import { categories, infrastructureIssues } from './data/infrastructureData';
import { MapIcon, TrendingUp, AlertTriangle, Info } from 'lucide-react';

export default function App() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(
    new Set(categories.map(c => c.id))
  );
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [statsHover, setStatsHover] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading for smooth experience
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleFilter = (categoryId: string) => {
    setActiveFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(categoryId)) {
        newFilters.delete(categoryId);
      } else {
        newFilters.add(categoryId);
      }
      return newFilters;
    });
  };

  const totalAffected = infrastructureIssues.reduce(
    (sum, issue) => sum + issue.affectedPopulation,
    0
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#0a1929] via-[#0f1f2f] to-[#05131f] flex flex-col overflow-hidden">
      {/* Header Premium */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-4 flex gap-5 overflow-hidden">
        {/* Left Sidebar - Glassmorphism Premium */}
        <div className="w-96 flex-shrink-0 space-y-5 overflow-y-auto custom-scrollbar">
          {/* Stats Cards Premium */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-5 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider">
                Impacto Total
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-950/50 rounded-xl p-3 text-center border border-blue-500/30">
                <p className="text-2xl font-bold text-green-400">
                  {infrastructureIssues.length}
                </p>
                <p className="text-xs text-blue-300">Problemas Mapeados</p>
              </div>
              <div className="bg-blue-950/50 rounded-xl p-3 text-center border border-blue-500/30">
                <p className="text-2xl font-bold text-yellow-400">
                  {(totalAffected / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-blue-300">Pessoas Afetadas</p>
              </div>
            </div>
          </div>

          {/* Map Legend */}
          <MapLegend
            categories={categories}
            activeFilters={activeFilters}
            onToggleFilter={handleToggleFilter}
          />

          {/* Statistics Panel */}
          <StatisticsPanel
            issues={infrastructureIssues}
            activeFilters={activeFilters}
            onHover={setStatsHover}
            hoveredItem={statsHover}
          />
        </div>

        {/* Map Container - Premium Design */}
        <div className="flex-1 bg-gradient-to-br from-[#0f1a2a] to-[#08121f] rounded-2xl shadow-2xl overflow-hidden border border-blue-500/30 backdrop-blur-sm relative">
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md rounded-lg px-3 py-1.5 border border-blue-500/30">
            <div className="flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono text-blue-200">
                Mapa Interativo • Clique nos pontos para detalhes
              </span>
            </div>
          </div>
          <BrazilMap
            issues={infrastructureIssues}
            activeFilters={activeFilters}
            onCityClick={setSelectedCity}
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-black/40 backdrop-blur-md border-t border-blue-500/20 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-xs text-blue-300/70">
            <Info className="w-3 h-3" />
            <p>
              Dados baseados em informações públicas sobre déficits de infraestrutura no Brasil.
              <strong className="text-yellow-400 ml-1"> Passe o mouse sobre os pontos</strong> para ver detalhes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}import { MapIcon, TrendingUp, Globe, Activity, Shield } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isGlowing, setIsGlowing] = useState(false);

  return (
    <div className="relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 opacity-95" />
      
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-blue-500/20 animate-pulse" />
      
      {/* Main Header Content */}
      <div className="relative container mx-auto px-4 py-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-gradient-to-br from-green-400 to-blue-500 p-3 rounded-2xl shadow-2xl">
                <MapIcon className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-white via-green-300 to-blue-300 bg-clip-text text-transparent">
                INFRA<span className="text-green-400">VISION</span>
              </h1>
              <p className="text-blue-200 text-sm mt-1 flex items-center gap-2">
                <Globe className="w-3 h-3" />
                Mapeamento de Déficit de Infraestrutura • Brasil 2026
              </p>
            </div>
          </div>

          {/* Stats Badges */}
          <div className="flex gap-3">
            <div 
              className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-green-500/30 hover:border-green-400 transition-all cursor-pointer group"
              onMouseEnter={() => setIsGlowing(true)}
              onMouseLeave={() => setIsGlowing(false)}
            >
              <div className="flex items-center gap-2">
                <Activity className={`w-4 h-4 text-green-400 transition-all ${isGlowing ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-mono text-blue-200">27 Estados</span>
              </div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-blue-500/30">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono text-blue-200">Dados Oficiais</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent" />
      </div>
    </div>
  );
}import { MapIcon } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#030a1a] via-[#0a1929] to-[#05131f] flex items-center justify-center z-50">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,transparent_1px),linear-gradient(90deg,transparent_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-20" />
      </div>

      <div className="relative text-center">
        {/* Glowing Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="relative bg-gradient-to-br from-green-500 to-blue-600 p-6 rounded-3xl shadow-2xl animate-bounce-slow">
            <MapIcon className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-3xl font-black bg-gradient-to-r from-white via-green-300 to-blue-300 bg-clip-text text-transparent">
            INFRA<span className="text-green-400">VISION</span>
          </h2>
          <p className="text-blue-300 text-sm tracking-wider">CARREGANDO MAPA INTERATIVO</p>
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-blue-900/50 rounded-full mt-8 overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-slide" />
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-slide {
          animation: slide 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface MapLegendProps {
  categories: any[];
  activeFilters: Set<string>;
  onToggleFilter: (id: string) => void;
}

export function MapLegend({ categories, activeFilters, onToggleFilter }: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-xl rounded-2xl border border-blue-500/20 overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-blue-800/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-green-400" />
          <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider">
            Filtros por Categoria
          </h3>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4 text-blue-300" /> : <ChevronDown className="w-4 h-4 text-blue-300" />}
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onToggleFilter(cat.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                activeFilters.has(cat.id)
                  ? 'bg-blue-800/40 border border-blue-500/50 shadow-lg'
                  : 'bg-blue-950/30 border border-blue-800/30 hover:bg-blue-800/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shadow-md"
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                />
                <span className="text-sm font-medium text-blue-100">{cat.name}</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full transition-all ${
                  activeFilters.has(cat.id)
                    ? 'bg-green-500 shadow-lg shadow-green-500/50'
                    : 'bg-blue-800/50'
                }`}
              />
            </button>
          ))}

          {/* Reset Button */}
          <button
            onClick={() => categories.forEach(c => activeFilters.has(c.id) && onToggleFilter(c.id))}
            className="w-full mt-2 text-xs text-blue-400 hover:text-green-400 transition-colors py-2 border-t border-blue-800/30"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
}import { TrendingUp, Users, MapPin, AlertCircle } from 'lucide-react';

interface StatisticsPanelProps {
  issues: any[];
  activeFilters: Set<string>;
  onHover: (id: string | null) => void;
  hoveredItem: string | null;
}

export function StatisticsPanel({ issues, activeFilters, onHover, hoveredItem }: StatisticsPanelProps) {
  const filteredIssues = issues.filter(issue => activeFilters.has(issue.category));
  
  const totalAffected = filteredIssues.reduce((sum, issue) => sum + issue.affectedPopulation, 0);
  const totalCities = new Set(filteredIssues.map(i => `${i.city}-${i.state}`)).size;
  
  const severityColors = {
    high: 'bg-gradient-to-r from-red-500 to-red-600',
    medium: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    low: 'bg-gradient-to-r from-green-500 to-emerald-500'
  };

  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 backdrop-blur-xl rounded-2xl border border-blue-500/20 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-blue-500/20">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider">
            Estatísticas
          </h3>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-green-400">{(totalAffected / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-blue-300">Pessoas Afetadas</p>
          </div>
          <div className="bg-black/30 rounded-xl p-3 text-center">
            <MapPin className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <p className="text-xl font-bold text-yellow-400">{totalCities}</p>
            <p className="text-xs text-blue-300">Cidades Mapeadas</p>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="max-h-96 overflow-y-auto custom-scrollbar p-2 space-y-2">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-50" />
            <p className="text-xs text-blue-400">Nenhum problema selecionado</p>
          </div>
        ) : (
          filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className={`p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                hoveredItem === issue.id
                  ? 'bg-blue-800/50 border border-blue-500/50 scale-[1.02]'
                  : 'bg-black/30 hover:bg-blue-900/30 border border-blue-800/30'
              }`}
              onMouseEnter={() => onHover(issue.id)}
              onMouseLeave={() => onHover(null)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: '#00ff88' }}
                    />
                    <p className="text-sm font-semibold text-white">{issue.city}</p>
                    <span className="text-xs text-blue-400">- {issue.state}</span>
                  </div>
                  <p className="text-xs text-blue-200 line-clamp-2">{issue.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${severityColors[issue.severity]} text-white font-bold`}>
                      {issue.severity === 'high' ? 'CRÍTICO' : issue.severity === 'medium' ? 'MODERADO' : 'LEVE'}
                    </span>
                    <span className="text-[10px] text-blue-400">
                      {(issue.affectedPopulation / 1000).toFixed(0)}k pessoas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}import { useState } from 'react';
import { CityModal } from './CityModal';

interface BrazilMapProps {
  issues: any[];
  activeFilters: Set<string>;
  onCityClick: (city: any) => void;
}

export function BrazilMap({ issues, activeFilters, onCityClick }: BrazilMapProps) {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);

  const filteredIssues = issues.filter(issue => activeFilters.has(issue.category));

  return (
    <>
      <div className="relative w-full h-full bg-[#0a1425]">
        {/* Map SVG */}
        <svg
          viewBox="0 0 800 780"
          className="w-full h-full cursor-pointer"
          style={{ background: '#0a2a5a' }}
        >
          {/* Estados do Brasil - SVG completo aqui */}
          {/* Este é o mesmo código SVG do mapa que desenvolvemos anteriormente */}
          <rect width="800" height="780" fill="#0a2a5a" />
          
          {/* Renderizar pontos no mapa */}
          {filteredIssues.map((issue) => {
            // Coordenadas aproximadas para cada cidade
            const coordinates: Record<string, { x: number; y: number }> = {
              'Manaus': { x: 248, y: 190 },
              'Belém': { x: 385, y: 185 },
              'Salvador': { x: 738, y: 185 },
              'Recife': { x: 625, y: 125 },
              'Fortaleza': { x: 515, y: 155 },
              'São Paulo': { x: 485, y: 285 },
              'Rio de Janeiro': { x: 548, y: 310 },
              'Porto Alegre': { x: 618, y: 440 },
              'Brasília': { x: 435, y: 235 },
              'Curitiba': { x: 535, y: 365 },
              'Belo Horizonte': { x: 475, y: 265 },
              'Goiânia': { x: 435, y: 255 },
            };

            const coord = coordinates[issue.city] || { x: 400, y: 300 };
            
            const categoryColors: Record<string, string> = {
              escola: '#ff4444',
              hospital: '#ff4444',
              upa: '#44aaff',
              saneamento: '#ff8844',
              saude_basica: '#44aaff',
              transporte: '#ffdd44',
              energia: '#ffdd44',
            };

            const color = categoryColors[issue.category] || '#ff4444';
            const size = issue.severity === 'high' ? 12 : issue.severity === 'medium' ? 10 : 8;

            return (
              <g
                key={issue.id}
                onClick={() => {
                  setSelectedCity(issue);
                  onCityClick(issue);
                }}
                onMouseEnter={() => setHoveredPoint(issue.id)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={hoveredPoint === issue.id ? size + 3 : size}
                  fill={color}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-200"
                  style={{
                    filter: hoveredPoint === issue.id ? 'drop-shadow(0 0 8px currentColor)' : 'none',
                    transform: hoveredPoint === issue.id ? 'scale(1.1)' : 'scale(1)',
                    transformOrigin: 'center',
                  }}
                />
                {hoveredPoint === issue.id && (
                  <>
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r={size + 5}
                      fill="none"
                      stroke={color}
                      strokeWidth="1"
                      className="animate-ping"
                    />
                    <text
                      x={coord.x}
                      y={coord.y - size - 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="10"
                      fontWeight="bold"
                      className="drop-shadow-lg"
                    >
                      {issue.city}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Modal */}
      {selectedCity && (
        <CityModal city={selectedCity} onClose={() => setSelectedCity(null)} />
      )}
    </>
  );
}import { X, Users, MapPin, AlertTriangle, TrendingUp, Calendar } from 'lucide-react';

interface CityModalProps {
  city: any;
  onClose: () => void;
}

export function CityModal({ city, onClose }: CityModalProps) {
  const severityConfig = {
    high: { color: 'red', text: 'CRÍTICO', icon: AlertTriangle },
    medium: { color: 'orange', text: 'MODERADO', icon: TrendingUp },
    low: { color: 'green', text: 'LEVE', icon: TrendingUp },
  };

  const config = severityConfig[city.severity];
  const SeverityIcon = config.icon;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#0f1f2f] to-[#05131f] rounded-2xl max-w-lg w-full mx-4 overflow-hidden border border-blue-500/30 shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <div className={`h-2 bg-${config.color}-500`} />
          <div className="p-5 border-b border-blue-500/20">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-white">{city.city}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <p className="text-blue-300">{city.state}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-blue-800/30 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-blue-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Severity Badge */}
          <div className={`bg-${config.color}-500/20 border border-${config.color}-500/30 rounded-xl p-3`}>
            <div className="flex items-center gap-2">
              <SeverityIcon className={`w-5 h-5 text-${config.color}-400`} />
              <span className={`text-${config.color}-400 font-bold text-sm uppercase tracking-wider`}>
                Nível {config.text}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{city.title}</h3>
            <p className="text-blue-200 text-sm leading-relaxed">{city.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 rounded-xl p-3 text-center">
              <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-400">
                {(city.affectedPopulation / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-blue-300">Pessoas Afetadas</p>
            </div>
            <div className="bg-black/30 rounded-xl p-3 text-center">
              <Calendar className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-yellow-400">2026</p>
              <p className="text-xs text-blue-300">Dados Atualizados</p>
            </div>
          </div>

          {/* Category Info */}
          <div className="bg-blue-900/20 rounded-xl p-3">
            <p className="text-xs text-blue-300 uppercase tracking-wider mb-1">Categoria</p>
            <p className="text-sm font-medium text-white capitalize">{city.category.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/20 bg-black/20">
          <button
            onClick={onClose}
            className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white font-bold hover:shadow-lg transition-all"
          >
            Fechar
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}export interface InfrastructureIssue {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  category: 'escola' | 'hospital' | 'upa' | 'saneamento' | 'saude_basica' | 'transporte' | 'energia';
  title: string;
  description: string;
  affectedPopulation: number;
  severity: 'high' | 'medium' | 'low';
}

export interface CategoryInfo {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const categories: CategoryInfo[] = [
  { id: 'escola', name: 'Escolas', color: '#ff4444', icon: '🏫' },
  { id: 'hospital', name: 'Hospitais', color: '#ff4444', icon: '🏥' },
  { id: 'upa', name: 'UPAs', color: '#44aaff', icon: '🚑' },
  { id: 'saneamento', name: 'Saneamento', color: '#ff8844', icon: '💧' },
  { id: 'saude_basica', name: 'Saúde Básica', color: '#44aaff', icon: '🏥' },
  { id: 'transporte', name: 'Transporte', color: '#ffdd44', icon: '🚌' },
  { id: 'energia', name: 'Energia', color: '#ffdd44', icon: '⚡' },
];

export const infrastructureIssues: InfrastructureIssue[] = [
  {
    id: '1',
    city: 'Manaus',
    state: 'AM',
    lat: -3.1190,
    lng: -60.0217,
    category: 'escola',
    title: '47 escolas sem estrutura básica',
    description: 'Escolas municipais na Zona Leste operam sem biblioteca, laboratório e estrutura adequada para os alunos.',
    affectedPopulation: 45000,
    severity: 'high',
  },
  {
    id: '2',
    city: 'Manaus',
    state: 'AM',
    lat: -3.1190,
    lng: -60.0217,
    category: 'upa',
    title: 'UPAs com superlotação',
    description: 'Unidades de Pronto Atendimento na Cidade Nova e Lago Azul operam com 200% da capacidade.',
    affectedPopulation: 120000,
    severity: 'high',
  },
  {
    id: '3',
    city: 'Belém',
    state: 'PA',
    lat: -1.4558,
    lng: -48.4902,
    category: 'saneamento',
    title: '71% sem coleta de esgoto',
    description: 'Pior índice do país. Grande parte da população não tem acesso a saneamento básico.',
    affectedPopulation: 890000,
    severity: 'high',
  },
  {
    id: '4',
    city: 'Salvador',
    state: 'BA',
    lat: -12.9714,
    lng: -38.5014,
    category: 'escola',
    title: '89 escolas sem biblioteca',
    description: 'Subúrbio ferroviário concentra escolas públicas sem estrutura mínima.',
    affectedPopulation: 65000,
    severity: 'high',
  },
  {
    id: '5',
    city: 'Recife',
    state: 'PE',
    lat: -8.0476,
    lng: -34.8770,
    category: 'transporte',
    title: 'Alagamentos recorrentes',
    description: '47 pontos críticos de alagamento durante o período chuvoso.',
    affectedPopulation: 320000,
    severity: 'medium',
  },
  {
    id: '6',
    city: 'Fortaleza',
    state: 'CE',
    lat: -3.7172,
    lng: -38.5434,
    category: 'saneamento',
    title: '45% sem coleta de esgoto',
    description: 'Grande Fortaleza tem déficit histórico em saneamento básico.',
    affectedPopulation: 980000,
    severity: 'high',
  },
  {
    id: '7',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.5505,
    lng: -46.6333,
    category: 'saneamento',
    title: '1 milhão sem esgoto',
    description: 'Periferias da Zona Sul e Leste não têm acesso à coleta de esgoto.',
    affectedPopulation: 1000000,
    severity: 'high',
  },
  {
    id: '8',
    city: 'São Paulo',
    state: 'SP',
    category: 'transporte',
    title: '21% das vias sem asfalto',
    description: 'Mais de 3.000 km de ruas sem pavimentação na periferia.',
    affectedPopulation: 2800000,
    severity: 'medium',
  },
  {
    id: '9',
    city: 'Rio de Janeiro',
    state: 'RJ',
    lat: -22.9068,
    lng: -43.1729,
    category: 'escola',
    title: '112 escolas em situação crítica',
    description: 'Unidades na Zona Norte e Baixada Fluminense precisam de
    export interface InfrastructureIssue {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  category: 'escola' | 'hospital' | 'upa' | 'saneamento' | 'saude_basica' | 'transporte' | 'energia';
  title: string;
  description: string;
  affectedPopulation: number;
  severity: 'high' | 'medium' | 'low';
}

export interface CategoryInfo {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const categories: CategoryInfo[] = [
  { id: 'escola', name: 'Escolas', color: '#ff4444', icon: '🏫' },
  { id: 'hospital', name: 'Hospitais', color: '#ff4444', icon: '🏥' },
  { id: 'upa', name: 'UPAs', color: '#44aaff', icon: '🚑' },
  { id: 'saneamento', name: 'Saneamento', color: '#ff8844', icon: '💧' },
  { id: 'saude_basica', name: 'Saúde Básica', color: '#44aaff', icon: '🏥' },
  { id: 'transporte', name: 'Transporte', color: '#ffdd44', icon: '🚌' },
  { id: 'energia', name: 'Energia', color: '#ffdd44', icon: '⚡' },
];

export const infrastructureIssues: InfrastructureIssue[] = [
  {
    id: '1',
    city: 'Manaus',
    state: 'AM',
    lat: -3.1190,
    lng: -60.0217,
    category: 'escola',
    title: '47 escolas sem estrutura básica',
    description: 'Escolas municipais na Zona Leste operam sem biblioteca, laboratório e estrutura adequada para os alunos.',
    affectedPopulation: 45000,
    severity: 'high',
  },
  {
    id: '2',
    city: 'Manaus',
    state: 'AM',
    lat: -3.1190,
    lng: -60.0217,
    category: 'upa',
    title: 'UPAs com superlotação',
    description: 'Unidades de Pronto Atendimento na Cidade Nova e Lago Azul operam com 200% da capacidade.',
    affectedPopulation: 120000,
    severity: 'high',
  },
  {
    id: '3',
    city: 'Belém',
    state: 'PA',
    lat: -1.4558,
    lng: -48.4902,
    category: 'saneamento',
    title: '71% sem coleta de esgoto',
    description: 'Pior índice do país. Grande parte da população não tem acesso a saneamento básico.',
    affectedPopulation: 890000,
    severity: 'high',
  },
  {
    id: '4',
    city: 'Salvador',
    state: 'BA',
    lat: -12.9714,
    lng: -38.5014,
    category: 'escola',
    title: '89 escolas sem biblioteca',
    description: 'Subúrbio ferroviário concentra escolas públicas sem estrutura mínima.',
    affectedPopulation: 65000,
    severity: 'high',
  },
  {
    id: '5',
    city: 'Recife',
    state: 'PE',
    lat: -8.0476,
    lng: -34.8770,
    category: 'transporte',
    title: 'Alagamentos recorrentes',
    description: '47 pontos críticos de alagamento durante o período chuvoso.',
    affectedPopulation: 320000,
    severity: 'medium',
  },
  {
    id: '6',
    city: 'Fortaleza',
    state: 'CE',
    lat: -3.7172,
    lng: -38.5434,
    category: 'saneamento',
    title: '45% sem coleta de esgoto',
    description: 'Grande Fortaleza tem déficit histórico em saneamento básico.',
    affectedPopulation: 980000,
    severity: 'high',
  },
  {
    id: '7',
    city: 'São Paulo',
    state: 'SP',
    lat: -23.5505,
    lng: -46.6333,
    category: 'saneamento',
    title: '1 milhão sem esgoto',
    description: 'Periferias da Zona Sul e Leste não têm acesso à coleta de esgoto.',
    affectedPopulation: 1000000,
    severity: 'high',
  },
  {
    id: '8',
    city: 'São Paulo',
    state: 'SP',
    category: 'transporte',
    title: '21% das vias sem asfalto',
    description: 'Mais de 3.000 km de ruas sem pavimentação na periferia.',
    affectedPopulation: 2800000,
    severity: 'medium',
  },
  {
    id: '9',
    city: 'Rio de Janeiro',
    state: 'RJ',
    lat: -22.9068,
    lng: -43.1729,
    category: 'escola',
    title: '112 escolas em situação crítica',
    description: 'Unidades na Zona Norte e Baixada Fluminense precisam de reforma urgente.',
    affectedPopulation: 84000,
    severity: 'high',
  },
  {
    id: '10',
    city: 'Porto Alegre',
    state: 'RS',
    lat: -30.0346,
    lng: -51.2177,
    category: 'transporte',
    title: '32 áreas com risco de alagamento',
    description: 'Drenagem urbana precária causa alagamentos frequentes.',
    affectedPopulation: 210000,
    severity: 'medium',
  },
  {
    id: '11',
    city: 'Brasília',
    state: 'DF',
    lat: -15.8267,
    lng: -47.9218,
    category: 'escola',
    title: '56 escolas sem estrutura',
    description: 'Cidades satélites têm escolas sem infraestrutura adequada.',
    affectedPopulation: 42000,
    severity: 'medium',
  },
  {
    id: '12',
    city: 'Curitiba',
    state: 'PR',
    lat: -25.4296,
    lng: -49.2727,
    category: 'transporte',
    title: '25% das vias em estado crítico',
    description: 'Região do CIC tem pavimentação precária.',
    affectedPopulation: 98000,
    severity: 'low',
  },
  {
    id: '13',
    city: 'Goiânia',
    state: 'GO',
    lat: -16.6869,
    lng: -49.2648,
    category: 'saneamento',
    title: '42% sem coleta de esgoto',
    description: 'Regiões Norte e Oeste têm déficit de saneamento.',
    affectedPopulation: 630000,
    severity: 'high',
  },
  {
    id: '14',
    city: 'Belo Horizonte',
    state: 'MG',
    lat: -19.9167,
    lng: -43.9345,
    category: 'hospital',
    title: 'Hospitais superlotados',
    description: 'Filas de espera no sistema público de saúde.',
    affectedPopulation: 450000,
    severity: 'medium',
  },
];@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #0a1929 0%, #05131f 100%);
    overflow: hidden;
  }
}

@layer components {
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 255, 136, 0.1);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 136, 0.5);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 136, 0.8);
  }
}

@layer utilities {
  .bg-grid-pattern {
    background-image: 
      linear-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 255, 136, 0.05) 1px, transparent 1px);
    background-size: 50px 50px;
  }
}