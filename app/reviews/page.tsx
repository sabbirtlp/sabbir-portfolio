"use client";

import { useState, useEffect } from "react";
import contentData from "@/data/site-content.json";
import { Star, Loader2, ArrowRight } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(data => {
        if (data.reviews) {
          setReviews(data.reviews);
        } else {
          setReviews(contentData.reviews || []);
        }
      })
      .catch(() => {
        setReviews(contentData.reviews || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => prev + 9);
  };

  return (
    <div className="flex flex-col pt-24 selection:bg-accent/20">
      
      {/* Premium Hero Section */}
      <section className="relative px-4 pb-16 pt-8 md:pt-16">
        <div className="max-w-7xl mx-auto">
          {/* Deep professional container matching the image request */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0A0A0A] border border-border/10 shadow-2xl">
            {/* Soft inner glow / gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-50 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10 px-6 py-16 md:px-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start justify-between">
              
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/90">Real Results</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-syne text-white tracking-tight leading-[1.1] mb-6">
                  Real Impact, Measured<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">by Client Growth.</span>
                </h1>
                
                <p className="text-white/70 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
                  Don't just take my word for it. Explore exactly how we've helped businesses scale their digital presence through strategic design.
                </p>
              </div>

              {/* Stats Block */}
              <div className="w-full lg:w-auto grid grid-cols-2 gap-4 md:gap-6 shrink-0">
                <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col justify-center items-center lg:items-start transition-transform hover:-translate-y-1">
                  <h3 className="text-4xl md:text-5xl font-black text-white font-syne mb-2">300<span className="text-accent">+</span></h3>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Projects</p>
                </div>
                <div className="p-6 md:p-8 rounded-2xl bg-accent/10 backdrop-blur-md border border-accent/20 flex flex-col justify-center items-center lg:items-start transition-transform hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
                  <h3 className="text-4xl md:text-5xl font-black text-accent font-syne mb-2 relative z-10">4.9<span className="text-2xl text-accent/50">/5</span></h3>
                  <p className="text-xs font-bold text-accent/80 uppercase tracking-[0.2em] relative z-10">Avg Rating</p>
                </div>
                <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col justify-center items-center lg:items-start transition-transform hover:-translate-y-1">
                  <h3 className="text-4xl md:text-5xl font-black text-white font-syne mb-2">99<span className="text-accent">%</span></h3>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Satisfaction</p>
                </div>
                <div className="p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col justify-center items-center lg:items-start transition-transform hover:-translate-y-1">
                  <h3 className="text-4xl md:text-5xl font-black text-white font-syne mb-2">200<span className="text-accent">%</span></h3>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-[0.2em]">Avg ROI</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Reviews Masonry Grid */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-16 relative z-10">
        
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black font-syne text-text-primary tracking-tight">Loved by Clients.</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-accent animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 text-text-muted bg-surface rounded-3xl border border-border">
            No reviews found yet. Check back later!
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, visibleCount).map((review, i) => (
                <div 
                  key={review.id || i} 
                  className="bg-white dark:bg-surface border border-black/5 dark:border-white/5 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 group relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-black/5 dark:from-white/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-full bg-background dark:bg-accent/10 border border-border/50 text-text-primary dark:text-accent flex items-center justify-center font-black text-xl overflow-hidden shrink-0 shadow-inner">
                      {review.avatar ? (
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                      ) : (
                        review.name?.charAt(0) || "C"
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-text-primary text-lg font-syne">{review.name}</h3>
                      <p className="text-xs font-semibold text-accent/80 font-mono tracking-wide">{review.username}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-6 relative z-10">
                    {[...Array(5)].map((_, idx) => (
                      <Star 
                        key={idx} 
                        className={`w-4 h-4 ${idx < (review.rating || 5) ? "text-amber-400 fill-amber-400" : "text-border"}`} 
                      />
                    ))}
                  </div>

                  <p className="text-text-secondary text-base leading-relaxed relative z-10 font-medium">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>

            {visibleCount < reviews.length && (
              <div className="mt-20 flex justify-center relative z-10">
                <button 
                  onClick={loadMore}
                  className="group px-10 py-4 bg-text-primary hover:bg-accent text-background dark:text-background dark:hover:text-white rounded-full font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-accent/25 flex items-center gap-3 hover:-translate-y-1"
                >
                  <span>Load More Reviews</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
