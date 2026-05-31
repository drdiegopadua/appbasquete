import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Calendar, Users, Zap, Flame, Star } from 'lucide-react';

/**
 * Supercopa de Basquete - Redesign Premium
 * Design: Art Deco Esportivo + Dark Luxury com Animações Avançadas
 * Paleta: Vinho (#6B1B2A) + Dourado (#D4AF37) + Preto (#0F0F0F)
 * Tipografia: Playfair Display (títulos) + Roboto (corpo)
 */

// Mock data para times
const teams = [
  { id: 1, name: 'CT das Montanhas', city: 'Afonso Cláudio, ES', group: 'A', wins: 2, losses: 0 },
  { id: 2, name: 'Equipe X', city: 'Vitória, ES', group: 'A', wins: 1, losses: 1 },
  { id: 3, name: 'Equipe Y', city: 'Itaperuna, RJ', group: 'B', wins: 2, losses: 0 },
  { id: 4, name: 'Equipe Z', city: 'Rio de Janeiro, RJ', group: 'B', wins: 0, losses: 2 },
  { id: 5, name: 'Equipe W', city: 'Belo Horizonte, MG', group: 'C', wins: 1, losses: 1 },
  { id: 6, name: 'Equipe V', city: 'São Paulo, SP', group: 'C', wins: 1, losses: 1 },
];

// Mock data para jogos
const games = [
  { id: 1, team1: 'CT das Montanhas', team2: 'Equipe X', score1: 85, score2: 72, date: '25/07/2026', time: '19:00', status: 'finalizado' },
  { id: 2, team1: 'Equipe Y', team2: 'Equipe Z', score1: 92, score2: 68, date: '25/07/2026', time: '20:30', status: 'finalizado' },
  { id: 3, team1: 'Equipe W', team2: 'Equipe V', score1: 78, score2: 78, date: '26/07/2026', time: '19:00', status: 'agendado' },
  { id: 4, team1: 'CT das Montanhas', team2: 'Equipe Y', score1: null, score2: null, date: '26/07/2026', time: '20:30', status: 'agendado' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === 'finalizado') return 'bg-emerald-900/40 text-emerald-300 border-emerald-500/30';
    if (status === 'agendado') return 'bg-amber-900/40 text-amber-300 border-amber-500/30';
    return 'bg-slate-700/40 text-slate-300 border-slate-500/30';
  };

  const getStatusText = (status: string) => {
    if (status === 'finalizado') return 'Finalizado';
    if (status === 'agendado') return 'Agendado';
    return 'Em Andamento';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F] text-foreground overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#6B1B2A]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header Hero Premium */}
      <div className="relative w-full h-screen max-h-[600px] bg-cover bg-center overflow-hidden group">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663652138610/MAQ8GzVJ4wk7Nkbi3rtwFf/hero-premium-basketball-3xNMh3dvz5BZhLtEPj3KP7.webp)',
          }}
        ></div>

        {/* Overlay com gradiente premium */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#6B1B2A]/95 via-[#0F0F0F]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F0F0F]"></div>

        {/* Conteúdo do Header */}
        <div className="relative h-full flex flex-col justify-center items-center md:items-start px-6 md:px-12 max-w-6xl mx-auto w-full">
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Logo Oficial */}
            <div className="flex items-center justify-center md:justify-start">
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663652138610/MAQ8GzVJ4wk7Nkbi3rtwFf/logo-supercopa-J9UPr5YvaXnwHroudykiMX.webp" 
                alt="Supercopa de Basquete" 
                className="h-48 md:h-56 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Descrição */}
            <div className="text-center md:text-left space-y-3 max-w-lg">
              <p className="text-lg md:text-2xl text-[#D4AF37] font-semibold tracking-wider">
                1ª EDIÇÃO • 2026
              </p>
              <p className="text-base md:text-xl text-gray-200 leading-relaxed">
                A maior competição multiesportiva da Região das Montanhas. Talento, garra e muita emoção em cada lance.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex gap-4 pt-4">
              <Button 
                className="bg-[#D4AF37] hover:bg-[#E8C547] text-[#0F0F0F] font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/50 transform hover:scale-105"
              >
                <Flame className="w-5 h-5 mr-2" />
                Acompanhe Agora
              </Button>
            </div>
          </div>
        </div>

        {/* Linha decorativa animada */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#D4AF37]/50 to-transparent animate-pulse"></div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12">
        {/* Cards de Informações Rápidas - Grid Premium */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Times Participantes', value: '6', delay: '0s' },
            { icon: Zap, label: 'Jogos Realizados', value: '2', delay: '0.1s' },
            { icon: Calendar, label: 'Data do Evento', value: '25-26 Jul', delay: '0.2s' },
            { icon: Trophy, label: 'Edição', value: '1ª', delay: '0.3s' },
          ].map(({ icon: Icon, label, value, delay }) => (
            <div 
              key={label}
              className="group animate-slide-up"
              style={{ animationDelay: delay }}
            >
              <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/30 transform hover:scale-105 cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400 mb-2 font-medium">{label}</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F0D960] bg-clip-text text-transparent">{value}</p>
                    </div>
                    <div className="p-3 bg-[#D4AF37]/10 rounded-lg group-hover:bg-[#D4AF37]/20 transition-colors">
                      <Icon className="w-8 h-8 text-[#D4AF37] group-hover:scale-125 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Tabs de Conteúdo Premium */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border border-[#D4AF37]/20 rounded-xl p-1 mb-8">
              {['inicio', 'classificacao', 'times'].map((tab, idx) => (
                <TabsTrigger 
                  key={tab}
                  value={tab}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#E8C547] data-[state=active]:text-[#0F0F0F] data-[state=active]:shadow-lg data-[state=active]:shadow-[#D4AF37]/50 text-gray-300 font-semibold transition-all duration-300 rounded-lg"
                >
                  {['Jogos', 'Classificação', 'Times'][idx]}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab: Jogos */}
            <TabsContent value="inicio" className="space-y-4 mt-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-[#D4AF37] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Tabela de Jogos
              </h2>
              <div className="space-y-4">
                {games.map((game, idx) => (
                  <div 
                    key={game.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <Card className="bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] border-[#333333]/50 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20 group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <CardContent className="pt-6 relative z-10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className={`${getStatusColor(game.status)} border text-xs font-bold px-3 py-1`}>
                                {getStatusText(game.status)}
                              </Badge>
                              <span className="text-sm text-gray-400 font-medium">{game.date} • {game.time}</span>
                            </div>
                            <div className="flex items-center justify-between md:justify-start gap-4">
                              <div className="flex-1">
                                <p className="font-bold text-gray-100 text-lg">{game.team1}</p>
                              </div>
                              {game.status === 'finalizado' ? (
                                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/30">
                                  <span className="text-3xl font-bold text-[#D4AF37]">{game.score1}</span>
                                  <span className="text-gray-500 font-bold">×</span>
                                  <span className="text-3xl font-bold text-[#D4AF37]">{game.score2}</span>
                                </div>
                              ) : (
                                <div className="px-6 py-3 bg-[#0F0F0F]/50 rounded-lg border border-[#333333] text-gray-400 font-semibold">
                                  vs
                                </div>
                              )}
                              <div className="flex-1 text-right">
                                <p className="font-bold text-gray-100 text-lg">{game.team2}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Tab: Classificação */}
            <TabsContent value="classificacao" className="space-y-4 mt-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-[#D4AF37] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Classificação Geral
              </h2>
              <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#333333]/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-[#D4AF37]/30 bg-gradient-to-r from-[#0F0F0F] to-[#1A1A1A]">
                        <th className="text-left py-4 px-6 text-[#D4AF37] font-bold">Posição</th>
                        <th className="text-left py-4 px-6 text-[#D4AF37] font-bold">Time</th>
                        <th className="text-center py-4 px-6 text-[#D4AF37] font-bold">V</th>
                        <th className="text-center py-4 px-6 text-[#D4AF37] font-bold">D</th>
                        <th className="text-center py-4 px-6 text-[#D4AF37] font-bold">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams
                        .sort((a, b) => {
                          const ptsA = a.wins * 2;
                          const ptsB = b.wins * 2;
                          return ptsB - ptsA;
                        })
                        .map((team, index) => (
                          <tr 
                            key={team.id} 
                            className="border-b border-[#333333]/50 hover:bg-[#1A1A1A]/50 transition-colors group"
                          >
                            <td className="py-4 px-6 font-bold text-[#D4AF37] text-lg">{index + 1}º</td>
                            <td className="py-4 px-6">
                              <div className="group-hover:translate-x-2 transition-transform">
                                <p className="font-bold text-gray-100">{team.name}</p>
                                <p className="text-xs text-gray-500">{team.city}</p>
                              </div>
                            </td>
                            <td className="text-center py-4 px-6 text-gray-100 font-bold text-lg">{team.wins}</td>
                            <td className="text-center py-4 px-6 text-gray-100 font-bold text-lg">{team.losses}</td>
                            <td className="text-center py-4 px-6 text-[#D4AF37] font-bold text-xl">{team.wins * 2}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            {/* Tab: Times */}
            <TabsContent value="times" className="space-y-4 mt-6 animate-fade-in">
              <h2 className="text-3xl font-bold text-[#D4AF37] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Times Participantes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team, idx) => (
                  <div 
                    key={team.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#333333]/50 hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/30 group transform hover:scale-105 h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-gray-100 group-hover:text-[#D4AF37] transition-colors">{team.name}</CardTitle>
                            <CardDescription className="text-gray-500">{team.city}</CardDescription>
                          </div>
                          <Badge className="bg-gradient-to-r from-[#6B1B2A] to-[#8B2E3B] text-[#D4AF37] border border-[#D4AF37]/30 font-bold">
                            G{team.group}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-4">
                          <div className="flex-1 text-center p-3 bg-[#0F0F0F]/50 rounded-lg group-hover:bg-[#D4AF37]/10 transition-colors">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Vitórias</p>
                            <p className="text-2xl font-bold text-[#D4AF37]">{team.wins}</p>
                          </div>
                          <div className="flex-1 text-center p-3 bg-[#0F0F0F]/50 rounded-lg group-hover:bg-[#D4AF37]/10 transition-colors">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Derrotas</p>
                            <p className="text-2xl font-bold text-[#D4AF37]">{team.losses}</p>
                          </div>
                          <div className="flex-1 text-center p-3 bg-[#0F0F0F]/50 rounded-lg group-hover:bg-[#D4AF37]/10 transition-colors">
                            <p className="text-xs text-gray-500 mb-1 font-medium">Pontos</p>
                            <p className="text-2xl font-bold text-[#D4AF37]">{team.wins * 2}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Seção de Informações do Evento */}
        <div className="mt-16 pt-12 border-t border-[#333333]/50 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-4xl font-bold text-[#D4AF37] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            Sobre o Evento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#333333]/50 hover:border-[#D4AF37]/30 transition-all">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                  <Star className="w-6 h-6" />
                  Informações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1 font-bold">•</span>
                  <span><strong>Data:</strong> 25 e 26 de julho de 2026</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1 font-bold">•</span>
                  <span><strong>Local:</strong> Afonso Cláudio, ES</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1 font-bold">•</span>
                  <span><strong>Times:</strong> 6 equipes</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1 font-bold">•</span>
                  <span><strong>Taxa de Inscrição:</strong> R$ 0,00</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] border-[#333333]/50 hover:border-[#D4AF37]/30 transition-all">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                  <Trophy className="w-6 h-6" />
                  Estrutura
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1 font-bold">→</span>
                  <span><strong>Fase de Grupos:</strong> Todos enfrentam todos</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1 font-bold">→</span>
                  <span><strong>Semifinal:</strong> 4 melhores times</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1 font-bold">→</span>
                  <span><strong>Grande Final:</strong> Melhor de 1</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#D4AF37] mt-1 font-bold">→</span>
                  <span><strong>Premiação:</strong> Troféus e medalhas</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Premium */}
      <footer className="mt-20 py-12 border-t border-[#333333]/50 bg-gradient-to-r from-[#0F0F0F] to-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3 group">
              <Trophy className="w-8 h-8 text-[#D4AF37] group-hover:scale-125 transition-transform" />
              <span className="font-bold text-[#D4AF37] text-lg">Supercopa 2026</span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-right">
              © 2026 Supercopa de Basquete de Afonso Cláudio. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Estilos de Animação */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
