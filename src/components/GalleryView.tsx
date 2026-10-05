"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Film,
  Play,
  Calendar,
  MapPin,
  Sparkles,
  Plus,
  Upload,
  X,
  Maximize2,
} from "lucide-react";
import MediaLightbox, { MediaItem } from "./MediaLightbox";

// Default curated memories
// Tip: To add your own photos, simply place them in the /public folder (e.g. public/my-photo.jpg)
// and add an entry here with src: "/my-photo.jpg"!
const INITIAL_PHOTOS: MediaItem[] = [
  {
    id: "1",
    type: "photo",
    title: "my birthday 2025",
    date: "jan 7th, 2025",
    location: "Zayed",
    src: "/photos/jan7-2025-bd.jpg",
    caption: "it was my birthday and u took me on a birthday date with zein included lmao, rawahtek for the first time sa3etha mn maadi l zayed, we had joyluck kaman",
  },
  {
    id: "2",
    type: "photo",
    title: "post-breakup feat : zein",
    date: "june 23rd, 2025",
    location: "Zamalek",
    src: "/photos/jun23-with-zein.jpg",
    caption: "this was after the breakup and you were very sad w ma2fola, crazy times, u told me u liked me then said nvm i was pmsing sa3etha, wonder why, cute and fun day tho",
  },
  {
    id: "3",
    type: "photo",
    title: "before gym, start of me coming to zayed",
    date: "aug17th, 2025",
    location: "zayed",
    src: "/photos/aug17-before-gym.jpg",
    caption: "we were in zamalek then i drove you all the way to zayed, it was when i started to come to zayed kol 3 days harfyan, ba2et zayedian bsabbek #worthit #sheWantMeToGoToSpain #ianEvenGoToZayed",
  },
  {
    id: "4",
    type: "photo",
    title: "working at night",
    date: "September 2, 2025",
    location: "dahab",
    src: "/photos/sep2-working-at-night.jpg",
    caption: "that night was weird, kona ta3baneen 3shan lesa gayeen w kan yomna twel awy, farida w mimi dakhalo namo. w ana kont khalas hanam, ur mom called me asking about the day w 2a3adna ntklm kteer awy, sa2aletny law fe had f hayaty lol, 2oltlha la2a lesa, 2aletly tayeb etla3 o3od ma3 jana ento msh 3awageez rayheen tnamo (made me laugh moot) w fl sanya el ana batla3 feha la2etek already bt5abaty, was so nice and wholesome, you made so much sense to me yomha...",
  },
  {
    id: "5",
    type: "photo",
    title: "tacos picture",
    date: "September 3, 2025",
    location: "dahab",
    src: "/photos/sep3-sent-to-novy.jpg",
    caption: "kona bnakol tacos w ba3atna el sora de l omek, i like it cuz i look cute in it lowk, i mog you lol",
  },
  {
    id: "6",
    type: "photo",
    title: "us in the kitchen before u cried",
    date: "September 5, 2025",
    location: "dahab",
    src: "/photos/sep5-before-crying.jpg",
    caption: "last day, wholesome trip, enjoyed it moot. until i heard u cry (shortly after this pic), i HATED how helpless i was and felt disappointed i couldn't help you enjoy the trip without thinking about the past, felt like i failed you...",
  },
  {
    id: "7",
    type: "photo",
    title: "jeff buckley tribute",
    date: "oct 10th, 2025",
    location: "maadi",
    src: "/photos/oct-10-crazysmile.jpg",
    caption: "i was so happy u actually came all the way (with telephone zarayer too) to maadi to attend this small concert with me, we had so much fun and ate at joy luck after with belal and that girl",
  },
  {
    id: "8",
    type: "photo",
    title: "mirror pic",
    date: "oct 10th, 2025",
    location: "maadi",
    src: "/photos/oct10-cute-bardo.jpg",
    caption: "we looked cute that day.",
  },
  {
    id: "9",
    type: "photo",
    title: "THAT photo lol",
    date: "oct 10th, 2025",
    location: "maadi",
    src: "/photos/oct10-cute-couple.jpg",
    caption: "you hated that photo because we looked cute and the photo was too couple-y , you hate good things dont you",
  },
  {
    id: "10",
    type: "photo",
    title: "look at yo dumbass",
    date: "idk",
    location: "idk",
    src: "/photos/wow.jpg",
    caption: "HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAH",
  },
  {
    id: "11",
    type: "photo",
    title: "your graduation",
    date: "oct 18th, 2025",
    location: "Meadow Sanctuary",
    src: "/photos/oct18th-grad.jpg",
    caption: "i was the only man invited to that grad and i enjoyed it moot, kont ma3 el banateet kda. and OFC i wont ever let yo ass forget what i did yomha, nzelt on MY KNEEEEES w nzlt gebt el telephone el enty wa2a3teeh, craaazy princess treatment...",
  },
  {
    id: "12",
    type: "photo",
    title: "sushi surprise",
    date: "Nov 19th, 2025",
    location: "zayed",
    src: "/photos/nov19-sushisurprise.jpg",
    caption: "we were talking late at night the night before, u just said 3ayza sushi w nemty, i decided to surprise yo dumbass with sushi lhad 3andek ba3d el shoghl. CRAZY stuff idk why i did that, i be doin that for the people i love tho. lucky them, they should thank god everyday and appreciate me everyday #justAnOpinion",
  },
  {
    id: "13",
    type: "photo",
    title: "rokstar",
    date: "dec 11th , 2025",
    location: "fayoum",
    src: "/photos/dec11-rooky.jpg",
    caption: "you and rooky, twinnem. loved that whole fayoum trip, it was so wholesome and cute #wifethat",
  },
  {
    id: "14",
    type: "photo",
    title: "happy mirror pic",
    date: "jan 16th, 2026",
    location: "your house",
    src: "/photos/jan16-im-happy-asl.jpg",
    caption: "it was right before a hangout, we went out and look at how happy i was , i was just happy ur beside me.",
  },
  {
    id: "15",
    type: "photo",
    title: "musty lookin aah ho",
    date: "jan 21st, 2026",
    location: "zayed",
    src: "/photos/jan21-musty-asl.jpg",
    caption: "i really hung out with you for like 6 hours with you looking like this...... yarab ma t2baly b haga a2al mn kda ya jana",
  },
  {
    id: "16",
    type: "photo",
    title: "the best person in the world",
    date: "feb 13th, 2026",
    location: "your house",
    src: "/photos/feb13-best-person.jpg",
    caption: "enough said, best person in the world.",
  },
  {
    id: "17",
    type: "photo",
    title: "ur birthday",
    date: "feb 20th, 2026",
    location: "tokyo, korba",
    src: "/photos/feb20-birthday-tokyo.jpg",
    caption: "your birthday at tokyo, it was after i told you, glad u still accepted the day and didnt cancel it. appreciate it",
  },
  {
    id: "18",
    type: "photo",
    title: "my grad",
    date: "sep 3rd, 2026",
    location: "helwan uni",
    src: "/photos/sep3-mygrad.jpg",
    caption: "i thought you wouldn't come, i thought u would see it as too much , but u were so excited to come and see me graduate, it was such a wholesome day, i had my whole family around me and with the sushi after. i just couldnt believe how happy i was, with you and your mom being half of the reason i was that happy, thank you and i love you for coming that day. also relax why are u holding me like that #someoneGetThatCougarOffMe",
  },

];

const INITIAL_VIDEOS: MediaItem[] = [
  {
    id: "first hijabi video",
    type: "video",
    title: "First Hijabi Video",
    date: "Oct 25th , 2024",
    location: "idk",
    src: "/first-hijabi-video.mp4",
    caption: "I remember this video it surprised me so much, and it made me so happy, just slightly less happy than i was when my sister ethagebet. I remember being SO proud of that step you took on your own without any external pressure, it's when i was 100% sure you are a good person",
  },
  {
    id: "AOUW",
    type: "video",
    title: "after run and iftar at your house",
    date: "MAR 4th , 2026",
    location: "your house",
    src: "/AOUW.mp4",
    caption: "We were done with the run and had iftar at your house, we spend that whole night together until el fajr, i remember leaving your house being so bittersweet as it was after i told you. LOVED THAT DAY ONE OF MY FAV EVER, also wtf are we doing",
  },
  {
    id: "AAAA",
    type: "video",
    title: "AAAA",
    date: "Jan 17th 2026",
    location: "Majarrah ",
    src: "/AAAA.mp4",
    caption: "our usual dumb shit that we do, idek what we did here lol",
  },
  {
    id: "awkward smile",
    type: "video",
    title: "awkward...",
    date: "FEB 21st 2026",
    location: "your house",
    src: "/awkward-smile.mp4",
    caption: "this was after your birthday that we spent together 3alatool, i spent a couple of hours 3andek and it was so wholesome i was also so happy sa3etha",
  },
  {
    id: "birthday domina",
    type: "video",
    title: "birthday with MY JACKET",
    date: "FEB 20th 2026",
    location: "Cairo view , mokkatam",
    src: "/birthday-domina.mp4",
    caption: "this was at cairo view, after we had our sushi we went to chill in mokkatam which is the first time we hung out in mokkatam, you were ASS in domina and it was so funny/cute seeing u play, you were a lil cold so you took my jacket and wore it like this for some dumb reason",
  },
  {
    id: "birthday WOW",
    type: "video",
    title: "WOW",
    date: "FEB 20th 2026",
    location: "Korba",
    src: "/birthday-wow.mp4",
    caption: "this was at korba, we were just done with sushi walking so i could take pictures of your outfit, and the WOW says enough...",
  },
  {
    id: "lookin cute",
    type: "video",
    title: "lookin cute",
    date: "JAN 17th 2026",
    location: "Your house",
    src: "/lookin-cute.mp4",
    caption: "e7m e7m, you look cute asl here",
  },
  {
    id: "musty",
    type: "video",
    title: "musty asl",
    date: "JAN 7th 2026",
    location: "Zayed",
    src: "/musty.mp4",
    caption: "now that we're done with you lookin cute, you were MUSTY as FUUUUCK hena",
  },
  {
    id: "stupid pout",
    type: "video",
    title: "stupid pout...",
    date: "AUG 27th 2026",
    location: "Zayed",
    src: "/stupid-pout.mp4",
    caption: "wtf is this stupid pout",
  },
  {
    id: "freaky",
    type: "video",
    title: "freakkyyy",
    date: "JAN 17th 2026",
    location: "majarrah",
    src: "/freaky.mp4",
    caption: "freakyy",
  },
  {
    id: "singing",
    type: "video",
    title: "singing together",
    date: "JAN 7th 2026",
    location: "Zayed",
    src: "/singing-tgthr.mp4",
    caption: "this was on my birthday, while waiting for bowling (which you beat my ass in, low point in my life). we were singing marwan moussa and this just shows how much i am myself around you, i dont need effort or energy to be someone around you i just exist, and it feels warm. and your dumbass match my too-much energy right away. i love this video, cant be recreated with anyone else lmao",
  },

];

export default function GalleryView() {
  const [activeTab, setActiveTab] = useState<"all" | "photos" | "videos">("all");
  const [photos, setPhotos] = useState<MediaItem[]>(INITIAL_PHOTOS);
  const [videos, setVideos] = useState<MediaItem[]>(INITIAL_VIDEOS);

  // Lightbox selection
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);




  // Load from localStorage if user added custom photos previously
  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem("jay_surprise_photos");
      if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
      const savedVideos = localStorage.getItem("jay_surprise_videos");
      if (savedVideos) setVideos(JSON.parse(savedVideos));
    } catch {
      // fallback
    }
  }, []);




  // Filter items based on active tab
  const allItems = [...photos, ...videos];
  const displayedItems =
    activeTab === "photos" ? photos : activeTab === "videos" ? videos : allItems;

  return (
    <div className="w-full max-w-2xl mx-auto px-3.5 sm:px-6 pt-2 pb-28">
      {/* Top Header */}
      <div className="flex flex-col items-center mb-5 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8A598]/20 text-[#613B35] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B85949]" />
          <span>Our Memories</span>
        </div>
        <h2 className="font-headline text-2xl sm:text-3xl font-normal text-[#2A2320]">
          The Gallery
        </h2>
        <p className="text-xs sm:text-sm text-[#7F736A] font-body mt-1 max-w-sm">
          Tap any photo to expand it full screen with date, location, and the story behind it.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-2 w-full mt-4 max-w-sm">
          <div className="p-1 rounded-full bg-[#E8DFD5]/70 flex items-center gap-1 flex-1 shadow-inner">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === "all"
                ? "bg-white text-[#2B2320] shadow-sm font-semibold"
                : "text-[#7F736A] hover:text-[#2B2320]"
                }`}
            >
              All ({allItems.length})
            </button>

            <button
              onClick={() => setActiveTab("photos")}
              className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === "photos"
                ? "bg-white text-[#2B2320] shadow-sm font-semibold"
                : "text-[#7F736A] hover:text-[#2B2320]"
                }`}
            >
              Photos ({photos.length})
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === "videos"
                ? "bg-white text-[#2B2320] shadow-sm font-semibold"
                : "text-[#7F736A] hover:text-[#2B2320]"
                }`}
            >
              Videos ({videos.length})
            </button>
          </div>


        </div>
      </div>

      {/* =========================================================================
          PHOTOS-LIKE COMPACT GRID (iOS Photos App Aesthetic)
         ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2.5 sm:gap-3.5">
        {displayedItems.map((item, idx) => {
          return (
            <div
              key={item.id}
              onClick={() => setSelectedIdx(idx)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-[#E8DDD2]/40 border border-white/60 shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98]"
            >
              {/* Media Thumbnail */}
              {item.type === "photo" ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="relative w-full h-full bg-black">
                  <video
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    className="w-full h-full object-cover opacity-85"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-white shadow-sm">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Subtle Overlay for Title & Date */}
              <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-black/75 via-black/35 to-transparent text-white opacity-95 group-hover:opacity-100 transition-opacity">
                <p className="text-[11px] sm:text-xs font-medium truncate drop-shadow-sm leading-tight">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-white/80 font-mono mt-0.5">
                  {item.date && <span>{item.date}</span>}
                </div>
              </div>

              {/* Video indicator badge */}
              {item.type === "video" && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[9px] text-white/90 font-medium flex items-center gap-1">
                  <Film className="w-2.5 h-2.5 text-[#7EA0B7]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          FULLSCREEN MODAL / LIGHTBOX
         ========================================================================= */}
      {selectedIdx !== null && (
        <MediaLightbox
          items={displayedItems}
          currentIndex={selectedIdx}
          onClose={() => setSelectedIdx(null)}
          onNavigate={(newIdx) => setSelectedIdx(newIdx)}
        />
      )}



    </div>
  );
}
