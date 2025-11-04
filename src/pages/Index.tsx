import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'finished' | 'upcoming';
  time: string;
  league: string;
}

interface Prediction {
  id: number;
  user: string;
  avatar: string;
  match: string;
  prediction: string;
  confidence: number;
  likes: number;
  accuracy: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sportMenuOpen, setSportMenuOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<string>('football');

  const matches: Match[] = [
    { id: 1, homeTeam: 'Манчестер Сити', awayTeam: 'Ливерпуль', homeScore: 2, awayScore: 1, status: 'live', time: '67\'', league: 'АПЛ' },
    { id: 2, homeTeam: 'Реал Мадрид', awayTeam: 'Барселона', homeScore: 1, awayScore: 3, status: 'finished', time: 'FT', league: 'Ла Лига' },
    { id: 3, homeTeam: 'Бавария', awayTeam: 'Боруссия Д', homeScore: 0, awayScore: 0, status: 'upcoming', time: '19:30', league: 'Бундеслига' },
    { id: 4, homeTeam: 'ПСЖ', awayTeam: 'Марсель', homeScore: 3, awayScore: 0, status: 'live', time: '82\'', league: 'Лига 1' },
  ];

  const predictions: Prediction[] = [
    { id: 1, user: 'Алексей М.', avatar: '🔥', match: 'Манчестер Сити - Ливерпуль', prediction: 'Победа хозяев 2:1', confidence: 85, likes: 142, accuracy: 78 },
    { id: 2, user: 'Мария К.', avatar: '⚡', match: 'Реал - Барселона', prediction: 'Обе забьют, >2.5', confidence: 92, likes: 203, accuracy: 84 },
    { id: 3, user: 'Дмитрий В.', avatar: '🎯', match: 'Бавария - Боруссия', prediction: 'Голы в обоих таймах', confidence: 76, likes: 89, accuracy: 71 },
  ];

  const leaderboard = [
    { rank: 1, name: 'Мария К.', avatar: '⚡', predictions: 247, accuracy: 84, points: 2340 },
    { rank: 2, name: 'Алексей М.', avatar: '🔥', predictions: 189, accuracy: 78, points: 1876 },
    { rank: 3, name: 'Дмитрий В.', avatar: '🎯', predictions: 156, accuracy: 71, points: 1542 },
    { rank: 4, name: 'Елена С.', avatar: '💫', predictions: 134, accuracy: 69, points: 1289 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Activity" className="text-primary" size={32} />
                <h1 className="text-2xl font-bold">SportAnalytics</h1>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setSportMenuOpen(!sportMenuOpen)} 
                  className={`px-4 py-2 rounded-lg transition-colors font-semibold ${sportMenuOpen ? 'bg-primary text-primary-foreground' : 'text-primary hover:text-primary/80'}`}
                >
                  СПОРТ
                </button>
                {sportMenuOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[150px] z-50 animate-fade-in">
                    <button
                      onClick={() => {
                        setSelectedSport('football');
                        setActiveTab('events');
                        setSportMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                        selectedSport === 'football' ? 'bg-primary/10 text-primary' : ''
                      }`}
                    >
                      Футбол
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSport('hockey');
                        setActiveTab('events');
                        setSportMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                        selectedSport === 'hockey' ? 'bg-primary/10 text-primary' : ''
                      }`}
                    >
                      Хоккей
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab('home')} className={`transition-colors text-primary hover:text-primary/80`}>
                Главная
              </button>
              <button onClick={() => setActiveTab('rating')} className={`transition-colors text-primary hover:text-primary/80`}>
                Турнирные таблицы БП
              </button>
              <button onClick={() => setActiveTab('analytics')} className={`transition-colors text-primary hover:text-primary/80`}>
                Центр событий
              </button>
            </div>
            <Button variant="default" className="hidden md:block">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setActiveTab('predictions')} 
              className={`px-6 py-2 rounded-lg transition-colors font-semibold text-2xl ${activeTab === 'predictions' ? 'bg-primary text-primary-foreground' : 'text-primary hover:text-primary/80'}`}
            >
              БИТВА ПРОГНОЗОВ
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-12">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Футбольная Аналитика
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Все события, прогнозы экспертов и битва мнений в одном месте
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/20 hover:border-primary/50 transition-all cursor-pointer animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Radio" className="text-accent animate-pulse-glow" size={24} />
                    Live Матчи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-primary">
                    {matches.filter(m => m.status === 'live').length}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">В прямом эфире</p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 hover:border-secondary/50 transition-all cursor-pointer animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" className="text-secondary" size={24} />
                    Прогнозы
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-secondary">1.2k</div>
                  <p className="text-sm text-muted-foreground mt-2">Сегодня опубликовано</p>
                </CardContent>
              </Card>

              <Card className="border-accent/20 hover:border-accent/50 transition-all cursor-pointer animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-accent" size={24} />
                    Точность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-accent">78%</div>
                  <p className="text-sm text-muted-foreground mt-2">Средняя по платформе</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" className="text-primary" size={24} />
                    Топ Прогнозы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {predictions.slice(0, 3).map((pred) => (
                    <div key={pred.id} className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{pred.avatar}</span>
                          <div>
                            <div className="font-semibold">{pred.user}</div>
                            <div className="text-xs text-muted-foreground">{pred.match}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {pred.accuracy}% точность
                        </Badge>
                      </div>
                      <p className="text-sm font-medium mb-2">{pred.prediction}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="ThumbsUp" size={14} />
                          {pred.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Zap" size={14} />
                          {pred.confidence}% уверен
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Trophy" className="text-accent" size={24} />
                    Топ Аналитиков
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.slice(0, 3).map((user) => (
                    <div key={user.rank} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 border border-border hover:border-secondary/50 transition-all">
                      <div className={`text-2xl font-bold ${user.rank === 1 ? 'text-accent' : user.rank === 2 ? 'text-primary' : 'text-secondary'}`}>
                        #{user.rank}
                      </div>
                      <span className="text-2xl">{user.avatar}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.predictions} прогнозов · {user.accuracy}% точность
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{user.points}</div>
                        <div className="text-xs text-muted-foreground">очков</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">СПОРТ</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Filter" size={16} className="mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="live">
                  <Icon name="Radio" size={16} className="mr-2 text-accent" />
                  Live
                </TabsTrigger>
                <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
                <TabsTrigger value="finished">Завершённые</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-6">
                {matches.map((match) => (
                  <Card key={match.id} className={`overflow-hidden ${match.status === 'live' ? 'border-accent/50' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary">{match.league}</Badge>
                        {match.status === 'live' && (
                          <Badge className="bg-accent text-accent-foreground animate-pulse-glow">
                            <Icon name="Radio" size={12} className="mr-1" />
                            LIVE {match.time}
                          </Badge>
                        )}
                        {match.status === 'upcoming' && (
                          <Badge variant="outline">{match.time}</Badge>
                        )}
                        {match.status === 'finished' && (
                          <Badge variant="outline">{match.time}</Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="text-right">
                          <div className="font-semibold text-lg">{match.homeTeam}</div>
                        </div>
                        <div className="text-center">
                          {match.status !== 'upcoming' ? (
                            <div className="text-3xl font-bold">
                              {match.homeScore} : {match.awayScore}
                            </div>
                          ) : (
                            <div className="text-xl text-muted-foreground">VS</div>
                          )}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-lg">{match.awayTeam}</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="BarChart3" size={16} className="mr-2" />
                          Статистика
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="MessageSquare" size={16} className="mr-2" />
                          Обсудить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Битва Прогнозов</h2>
              <Button>
                <Icon name="Plus" size={18} className="mr-2" />
                Создать прогноз
              </Button>
            </div>

            <div className="grid gap-6">
              {predictions.map((pred) => (
                <Card key={pred.id} className="hover:border-primary/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{pred.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-lg">{pred.user}</div>
                            <div className="text-sm text-muted-foreground">{pred.match}</div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">
                              <Icon name="Target" size={12} className="mr-1" />
                              {pred.accuracy}%
                            </Badge>
                            <Badge variant="outline">
                              <Icon name="Zap" size={12} className="mr-1" />
                              {pred.confidence}%
                            </Badge>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4 mb-3">
                          <p className="font-semibold">{pred.prediction}</p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm">
                            <Icon name="ThumbsUp" size={16} className="mr-2" />
                            {pred.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="MessageCircle" size={16} className="mr-2" />
                            Комментарии
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="Share2" size={16} className="mr-2" />
                            Поделиться
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rating' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Рейтинг Аналитиков</h2>

            <div className="space-y-4">
              {leaderboard.map((user) => (
                <Card key={user.rank} className={`hover:border-primary/50 transition-all ${user.rank <= 3 ? 'border-accent/30' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className={`text-4xl font-bold ${user.rank === 1 ? 'text-accent' : user.rank === 2 ? 'text-primary' : user.rank === 3 ? 'text-secondary' : 'text-muted-foreground'}`}>
                        #{user.rank}
                      </div>
                      <span className="text-4xl">{user.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-bold text-xl">{user.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {user.predictions} прогнозов опубликовано
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-primary">{user.points}</div>
                            <div className="text-sm text-muted-foreground">очков</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Точность прогнозов</span>
                            <span className="font-semibold">{user.accuracy}%</span>
                          </div>
                          <Progress value={user.accuracy} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">Аналитика</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-primary" size={24} />
                    Тренды Прогнозов
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Победа хозяев</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Ничья</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Победа гостей</span>
                        <span className="font-semibold">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" className="text-secondary" size={24} />
                    Популярные Лиги
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>АПЛ</span>
                        <span className="font-semibold">890 прогнозов</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Ла Лига</span>
                        <span className="font-semibold">720 прогнозов</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span>Серия А</span>
                        <span className="font-semibold">560 прогнозов</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" className="text-accent" size={24} />
                    Лучшие Прогнозисты Недели
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.slice(0, 3).map((user, idx) => (
                    <div key={user.rank} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className={`text-xl font-bold ${idx === 0 ? 'text-accent' : 'text-muted-foreground'}`}>
                        {idx + 1}
                      </div>
                      <span className="text-2xl">{user.avatar}</span>
                      <div className="flex-1">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.accuracy}% точность
                        </div>
                      </div>
                      <Badge variant="secondary">+{120 - idx * 20} pts</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Clock" className="text-primary" size={24} />
                    Активность Платформы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Icon name="Users" className="text-primary" size={20} />
                      <span className="text-sm">Активных пользователей</span>
                    </div>
                    <span className="font-bold">2.4k</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Icon name="MessageCircle" className="text-secondary" size={20} />
                      <span className="text-sm">Комментариев сегодня</span>
                    </div>
                    <span className="font-bold">8.9k</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <Icon name="Target" className="text-accent" size={20} />
                      <span className="text-sm">Новых прогнозов</span>
                    </div>
                    <span className="font-bold">1.2k</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Activity" className="text-primary" size={24} />
              <span className="font-semibold">SportAnalytics</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">О нас</Button>
              <Button variant="ghost" size="sm">Правила</Button>
              <Button variant="ghost" size="sm">Контакты</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;