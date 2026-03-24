import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

interface NewsletterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewsletterModal: React.FC<NewsletterModalProps> = ({ open, onOpenChange }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [storyType, setStoryType] = useState('');
  const [location, setLocation] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  const handleStoryTypeSubmit = () => {
    if (storyType) {
      setStep(3);
    }
  };

  const handleFinalSubmit = () => {
    console.log('Newsletter signup:', { email, storyType, location });
    setStep(4);
  };

  const resetModal = () => {
    setStep(1);
    setEmail('');
    setStoryType('');
    setLocation('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-charcoal border border-white/10 text-foreground">
        <DialogHeader className="sr-only">
          <DialogTitle>Join The Cubic Journal</DialogTitle>
          <DialogDescription>Subscribe to stories of craft, fire, and the homes that rise from it.</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-8 py-4">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="h-[1px] w-6 bg-primary"></div>
                <span className="text-primary font-serif italic text-sm tracking-widest">The Cubic Journal</span>
                <div className="h-[1px] w-6 bg-primary"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight leading-tight">
                Stories from <span className="fire-text italic">the fire</span>
              </h2>
              <p className="text-foreground/60 text-base font-sans leading-relaxed max-w-md mx-auto">
                Weekly stories of craft, fire, and the homes that rise from it. Join architects, investors, and dreamers across Central Queensland.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-foreground/30 ml-1 font-sans">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-background border-white/10 focus:border-primary h-14 rounded-xl font-sans"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-base font-serif tracking-tight bg-primary hover:bg-primary/90 text-white"
              >
                Join The Journal
              </Button>
            </form>

            <p className="text-xs text-foreground/20 text-center font-sans leading-relaxed">
              Unsubscribe anytime. No spam, just stories worth reading.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 py-4">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Which story are you <span className="fire-text italic">writing?</span>
              </h2>
              <p className="text-foreground/60 text-sm font-sans leading-relaxed">
                Help us send you stories that matter to your vision.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { value: 'sanctuary', label: 'My Private Sanctuary', desc: 'Building a personal refuge' },
                { value: 'investment', label: 'An Investment Retreat', desc: 'Premium Airbnb or short-stay' },
                { value: 'development', label: 'A Development Vision', desc: 'Multiple units or park' },
                { value: 'admiring', label: 'Just Admiring the Craft', desc: 'Exploring possibilities' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setStoryType(option.value);
                    setTimeout(handleStoryTypeSubmit, 300);
                  }}
                  className="w-full text-left p-5 rounded-xl bg-background border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                        {option.label}
                      </div>
                      <div className="text-xs text-foreground/40 mt-1 font-sans italic">
                        {option.desc}
                      </div>
                    </div>
                    <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 py-4">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Where in <span className="fire-text italic">Queensland?</span>
              </h2>
              <p className="text-foreground/60 text-sm font-sans leading-relaxed">
                This helps us share local build stories and site-specific insights.
              </p>
            </div>

            <div className="space-y-2">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-background border-white/10 focus:border-primary h-14 rounded-xl font-sans">
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
                <SelectContent className="bg-charcoal border-white/10 text-foreground rounded-xl font-sans">
                  <SelectItem value="rockhampton" className="focus:bg-primary focus:text-background">
                    Rockhampton Region
                  </SelectItem>
                  <SelectItem value="capricorn" className="focus:bg-primary focus:text-background">
                    Capricorn Coast
                  </SelectItem>
                  <SelectItem value="central" className="focus:bg-primary focus:text-background">
                    Central QLD (Emerald, Blackwater)
                  </SelectItem>
                  <SelectItem value="mackay" className="focus:bg-primary focus:text-background">
                    Mackay Region
                  </SelectItem>
                  <SelectItem value="gladstone" className="focus:bg-primary focus:text-background">
                    Gladstone Region
                  </SelectItem>
                  <SelectItem value="other" className="focus:bg-primary focus:text-background">
                    Other Queensland
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleFinalSubmit}
              disabled={!location}
              className="w-full py-6 text-base font-serif tracking-tight bg-primary hover:bg-primary/90 text-white disabled:opacity-50"
            >
              Complete Sign-Up
            </Button>

            <button
              onClick={() => setStep(2)}
              className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors mx-auto block font-sans"
            >
              Back
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 py-8 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-serif font-bold tracking-tight">
                Welcome to <span className="fire-text italic">the Journal</span>
              </h2>
              <p className="text-foreground/60 text-base font-sans leading-relaxed max-w-sm mx-auto">
                Expect your first story in your inbox shortly. Every week, we share the craft behind the char.
              </p>
            </div>

            <Button
              onClick={resetModal}
              className="px-8 py-6 text-base font-serif bg-primary hover:bg-primary/90 text-white"
            >
              Return to Site
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
