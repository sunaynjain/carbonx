"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Send, Bot, User, Sprout, ChevronDown, Info } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function AdvisorStudio() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [farms, setFarms] = useState<any[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/farms')
      .then(res => res.json())
      .then(d => {
        setFarms(d.farms || []);
        if (d.farms && d.farms.length > 0) {
          setSelectedFarmId(d.farms[0].id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedFarm = farms.find(f => f.id === selectedFarmId);

  useEffect(() => {
    if (selectedFarm) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `Hello! I'm your CarbonX Agronomy Advisor. I see you're looking at ${selectedFarm.name} (${selectedFarm.area} acres of ${selectedFarm.cropType}). How can I help you optimize your carbon practices today?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [selectedFarmId, selectedFarm]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Rule-based mock advisor responses
    setTimeout(() => {
      let responseText = "I can certainly help with that. Could you provide more details about your current practices?";
      
      const lowerInput = userMessage.content.toLowerCase();
      if (lowerInput.includes('cover crop') || lowerInput.includes('cover crops')) {
        responseText = `For ${selectedFarm?.cropType || 'your crops'}, I recommend planting a mix of rye and clover as a cover crop. This will help prevent erosion, fix nitrogen, and significantly increase your soil organic carbon accumulation rate, which is key for your carbon credits.`;
      } else if (lowerInput.includes('tillage') || lowerInput.includes('till')) {
        responseText = "Switching to no-till or reduced-till practices can greatly enhance carbon sequestration. By leaving the soil undisturbed, you preserve the root structures and organic matter. This practice alone can add an estimated 0.3 to 0.6 tonnes of carbon per acre per year.";
      } else if (lowerInput.includes('fertilizer') || lowerInput.includes('nitrogen')) {
        responseText = "Optimizing nitrogen application is crucial. Using precision agriculture to apply fertilizer only where needed reduces N2O emissions—a potent greenhouse gas. This directly improves your project's carbon baseline.";
      } else if (lowerInput.includes('readiness') || lowerInput.includes('score')) {
        responseText = `${selectedFarm?.name}'s current readiness score is ${selectedFarm?.readinessScore || 0}. To improve this, focus on completing your boundary mapping and submitting recent soil sample evidence.`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-serif text-forest-deep mb-1">AI Agronomy Advisor</h2>
        <p className="text-text-muted">Get practice recommendations to maximize carbon yield.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Sidebar */}
        <div className="lg:w-1/3 flex flex-col space-y-6 overflow-y-auto pr-2">
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
            <h3 className="font-serif text-forest-deep text-lg mb-4">Context</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Target Farm</label>
                <div className="relative">
                  <select 
                    value={selectedFarmId} 
                    onChange={e => setSelectedFarmId(e.target.value)}
                    className="w-full appearance-none bg-surface border border-border-subtle rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/50 focus:border-forest"
                  >
                    {farms.map(f => (
                      <option key={f.id} value={f.id}>{f.name} ({f.ownerName})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-text-muted pointer-events-none" />
                </div>
              </div>

              {selectedFarm && (
                <div className="space-y-3 pt-4 border-t border-border-subtle">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Size</span>
                    <span className="font-medium text-text-main">{selectedFarm.area} Acres</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Crop</span>
                    <span className="font-medium text-text-main">{selectedFarm.cropType}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Status</span>
                    <span className="font-medium text-text-main bg-sage/20 text-forest px-2 py-0.5 rounded-md">{selectedFarm.status}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-muted">Readiness</span>
                    <span className="font-medium text-text-main">{selectedFarm.readinessScore}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Rule-Based Advisor</p>
              <p className="text-xs text-blue-800 leading-relaxed">
                No active AI provider detected. Using local rule-based inference for demo purposes. Try asking about <strong>cover crops</strong>, <strong>tillage</strong>, or <strong>fertilizer</strong>.
              </p>
            </div>
          </div>
          
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 flex-1">
            <h3 className="font-serif text-forest-deep text-lg mb-4">Suggested Topics</h3>
            <div className="space-y-2">
              <button onClick={() => setInputValue("What cover crops work best for " + (selectedFarm?.cropType || 'my farm') + "?")} className="w-full text-left px-3 py-2 text-sm text-forest hover:bg-forest/5 rounded-lg border border-transparent hover:border-forest/20 transition-colors">
                What cover crops work best?
              </button>
              <button onClick={() => setInputValue("How does tillage affect my carbon score?")} className="w-full text-left px-3 py-2 text-sm text-forest hover:bg-forest/5 rounded-lg border border-transparent hover:border-forest/20 transition-colors">
                How does tillage affect carbon score?
              </button>
              <button onClick={() => setInputValue("How can I improve my farm's readiness?")} className="w-full text-left px-3 py-2 text-sm text-forest hover:bg-forest/5 rounded-lg border border-transparent hover:border-forest/20 transition-colors">
                Improve project readiness
              </button>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-surface rounded-2xl shadow-sm border border-border-subtle flex flex-col overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-gold/20 text-gold ml-3' : 'bg-forest text-ivory mr-3'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-forest text-ivory rounded-tr-none' : 'bg-surface-muted border border-border-subtle text-text-main rounded-tl-none'}`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <span className={`text-[10px] mt-2 block ${msg.role === 'user' ? 'text-ivory/70' : 'text-text-muted'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-forest text-ivory mr-3">
                    <Sprout className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="px-4 py-4 rounded-2xl bg-surface-muted border border-border-subtle text-text-main rounded-tl-none flex items-center space-x-1">
                    <div className="w-2 h-2 bg-text-muted/50 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-text-muted/50 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-text-muted/50 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface border-t border-border-subtle">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for recommendations (e.g. cover crops, tillage, fertilizer)..."
                className="w-full bg-surface-muted border border-border-subtle rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/50 focus:border-forest"
                disabled={isTyping}
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="absolute right-2 p-2 bg-forest text-ivory rounded-lg hover:bg-forest-deep disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
