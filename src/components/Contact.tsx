import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="reveal">
            <span className="text-primary font-serif italic mb-4 block tracking-wide">Commission Your Story</span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 tracking-tight leading-[0.9]">
              Begin your <br />
              <span className="fire-text italic">sanctuary</span>
            </h2>
            <div className="space-y-6 text-foreground/60 text-lg md:text-xl font-sans max-w-xl leading-relaxed mb-12 italic tracking-wide">
              <p>
                Every Cubic home begins with a conversation. Tell us about your land in Queensland, your vision, and what you want to feel when you arrive home. We handle everything from there — design, fabrication, and delivery across Central Queensland and beyond.
              </p>
              <p>
                Or visit our workshop in Rockhampton and run your hand across the Shou Sugi Ban surface. There is no substitute for that first touch.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10 max-w-xl reveal reveal-delay-2 group transition-all duration-500 hover:border-primary/50">
              <div className="flex flex-col gap-1 transition-transform group-hover:translate-x-2 duration-500">
                <span className="text-xs uppercase tracking-widest font-bold text-foreground/30 font-sans group-hover:text-foreground/50">Rockhampton</span>
                <span className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">+61 (07) 4900 0000</span>
              </div>
              <div className="flex flex-col gap-1 transition-transform group-hover:translate-x-2 duration-500 delay-100">
                <span className="text-xs uppercase tracking-widest font-bold text-foreground/30 font-sans group-hover:text-foreground/50">Email</span>
                <span className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">hello@cubichomes.com.au</span>
              </div>
              <div className="flex flex-col gap-1 col-span-1 sm:col-span-2 mt-4 transition-transform group-hover:translate-x-2 duration-500 delay-200">
                <span className="text-xs uppercase tracking-widest font-bold text-foreground/30 font-sans group-hover:text-foreground/50">Serving</span>
                <span className="text-sm font-sans text-foreground/40 leading-relaxed italic group-hover:text-foreground/70 transition-colors">
                  Central Queensland · Rockhampton Region · Capricorn Coast · Mackay · Gladstone · Emerald
                </span>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="p-8 md:p-12 rounded-3xl bg-charcoal border border-white/5 hover:border-primary/20 transition-all duration-700 hover:shadow-fire group">
              <form className="space-y-8 group/form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/30 ml-1 font-sans group-hover:text-foreground/50 transition-colors">Full Name</label>
                    <Input placeholder="Sarah Mitchell" className="bg-background border-white/5 focus:border-primary h-14 rounded-xl font-sans group-hover:border-primary/20 transition-all duration-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/30 ml-1 font-sans group-hover:text-foreground/50 transition-colors">Email Address</label>
                    <Input type="email" placeholder="sarah@email.com" className="bg-background border-white/5 focus:border-primary h-14 rounded-xl font-sans group-hover:border-primary/20 transition-all duration-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/30 ml-1 font-sans group-hover:text-foreground/50 transition-colors">Phone Number</label>
                    <Input type="tel" placeholder="0400 000 000" className="bg-background border-white/5 focus:border-primary h-14 rounded-xl font-sans group-hover:border-primary/20 transition-all duration-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/30 ml-1 font-sans group-hover:text-foreground/50 transition-colors">Location Postcode</label>
                    <Input placeholder="4700" className="bg-background border-white/5 focus:border-primary h-14 rounded-xl font-sans group-hover:border-primary/20 transition-all duration-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/30 ml-1 font-sans group-hover:text-foreground/50 transition-colors">What are you dreaming of?</label>
                  <Select>
                    <SelectTrigger className="bg-background border-white/5 focus:border-primary h-14 rounded-xl font-sans group-hover:border-primary/20 transition-all duration-500">
                      <SelectValue placeholder="Select your vision" />
                    </SelectTrigger>
                    <SelectContent className="bg-charcoal border-white/10 text-foreground rounded-xl font-sans">
                      <SelectItem value="private" className="focus:bg-primary focus:text-background rounded-lg">Private Residence</SelectItem>
                      <SelectItem value="retreat" className="focus:bg-primary focus:text-background rounded-lg">Short-Stay Retreat / Airbnb</SelectItem>
                      <SelectItem value="park" className="focus:bg-primary focus:text-background rounded-lg">Holiday Park / Development</SelectItem>
                      <SelectItem value="other" className="focus:bg-primary focus:text-background rounded-lg">Other Vision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/30 ml-1 font-sans group-hover:text-foreground/50 transition-colors">Tell us about your land in Queensland</label>
                  <Textarea placeholder="Rockhampton rural block, Capricorn Coast waterfront, Mackay hinterland..." className="bg-background border-white/5 focus:border-primary min-h-[120px] rounded-xl font-sans group-hover:border-primary/20 transition-all duration-500" />
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-background/50 border border-white/5 transition-all duration-500 hover:border-primary/20">
                  <input type="checkbox" id="newsletter" className="mt-1 w-4 h-4 rounded border-white/10 bg-background text-primary focus:ring-primary focus:ring-offset-0" />
                  <label htmlFor="newsletter" className="text-sm text-foreground/60 font-sans leading-relaxed cursor-pointer hover:text-foreground/80 transition-colors">
                    Send me the Cubic Homes Material Journal — monthly stories, finishes, and owner spotlights from Central Queensland.
                  </label>
                </div>
                
                <Button className="w-full py-8 text-lg font-serif tracking-tight bg-primary hover:bg-primary/90 text-white border-none transition-all duration-500 group-hover:scale-[1.02] hover:fire-glow shadow-xl">
                  Request a Consultation
                </Button>

                <p className="text-[10px] text-foreground/20 text-center font-sans uppercase tracking-[0.2em] font-bold group-hover:text-foreground/40 transition-colors leading-relaxed italic">
                  We respond within 24 hours. Built in Rockhampton, serving all of Queensland.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
