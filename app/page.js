"use client"
  
import { useState } from "react"
import {
  ShoppingBag, Heart, Search, Star, Menu, X,
  ChevronRight, ArrowRight, Instagram, MessageCircle,
  MapPin, Clock, Minus, Plus, Trash2,
  Shield, Truck, RotateCcw, CheckCircle, Phone
} from "lucide-react"

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const WA = "23590445578"
const IG = "@ykonic_official"
const VILLE = "N'Djamena, Tchad"

// DÉPLACEZ LA FONCTION ICI (Juste après les constantes de config)
const fmt = n => new Intl.NumberFormat("fr-FR").format(n) + " FCFA"


// ─── LOGO SVG YKONIC (reconstruit depuis les vrais logos) ─────────────────────
function YkonicLogo({ size = "md", variant = "gold" }) {
  const scales = { sm: 0.55, md: 0.75, lg: 1.1 }
  const s = scales[size] || 0.75
  const gold = "#B8953F"
  const dark = variant === "white" ? "#fff" : variant === "black" ? "#111" : gold

  return (
    <svg width={120 * s} height={52 * s} viewBox="0 0 120 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Couronne */}
      <g transform="translate(22, 0)">
        {/* Base couronne */}
        <path d="M4 14 L4 20 L32 20 L32 14 L28 8 L24 14 L18 6 L12 14 L8 8 Z"
          fill={dark} />
        {/* Perles */}
        <circle cx="4" cy="13" r="2" fill={dark} />
        <circle cx="18" cy="5" r="2" fill={dark} />
        <circle cx="32" cy="13" r="2" fill={dark} />
      </g>

      {/* Monogramme YK */}
      {/* Y */}
      <path d="M8 22 L18 36 L18 50 L24 50 L24 36 L34 22 L27 22 L21 31 L15 22 Z"
        fill={dark} />
      {/* K */}
      <path d="M36 22 L36 50 L42 50 L42 38 L54 50 L62 50 L48 35 L61 22 L53 22 L42 33 L42 22 Z"
        fill={dark} />

      {/* Texte YkoniC */}
      <text x="0" y="50" fontSize="0">{/* spacer */}</text>
    </svg>
  )
}

// Logo complet avec texte
function LogoFull({ variant = "gold", size = "md" }) {
  const gold = "#B8953F"
  const color = variant === "white" ? "#fff" : variant === "black" ? "#111" : gold
  const textScale = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-xl"

  return (
    <div className="flex flex-col items-center leading-none select-none">
      {/* Couronne SVG */}
      <svg width={size === "sm" ? 28 : size === "lg" ? 52 : 38}
           height={size === "sm" ? 14 : size === "lg" ? 26 : 19}
           viewBox="0 0 52 26" fill="none">
        <path d="M4 26 L4 18 L13 6 L20 16 L26 2 L32 16 L39 6 L48 18 L48 26 Z"
          fill={color} />
        <circle cx="4" cy="18" r="3" fill={color} />
        <circle cx="26" cy="2" r="3" fill={color} />
        <circle cx="48" cy="18" r="3" fill={color} />
      </svg>
      {/* YK monogramme */}
      <div className="flex items-end -mt-1" style={{ color }}>
        <span style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: size === "sm" ? "28px" : size === "lg" ? "52px" : "38px",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.02em"
        }}>Y</span>
        <span style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: size === "sm" ? "22px" : size === "lg" ? "42px" : "30px",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          marginLeft: size === "sm" ? "-4px" : "-6px",
          marginBottom: "2px"
        }}>k</span>
      </div>
      {/* Wordmark */}
      <span style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: size === "sm" ? "11px" : size === "lg" ? "18px" : "13px",
        fontWeight: 400,
        letterSpacing: "0.18em",
        color,
        marginTop: "2px"
      }}>YkoniC</span>
    </div>
  )
}

// ─── DONNÉES PRODUITS (Nomenclature mise à jour) ─────────────────────────────
const PRODUCTS = [
  { id:1, name:"Polo YkoniC Blanc", brand:"YkoniC", cat:"Polos",
    price:10000, badge:"Bestseller",
    images: ["/images/polo-blanc-1.jpg", "/images/polo-blanc-2.jpg"], emoji:"👕",
    sizes:["S","M","L","XL","XXL"],
    desc:"Polo YkoniC blanc en piqué coton premium. Col côtelé tricolore rouge-blanc-noir, broderie couronne YK dorée sur poitrine. Coupe ajustée moderne." },
  
  { id:2, name:"Polo YkoniC Vert Olive", brand:"YkoniC", cat:"Polos",
    price:10000,
    images: ["/images/polo-olive.jpg", "/images/polo-olive-1.jpg"], emoji:"👕",
    sizes:["S","M","L","XL","XXL"],
    desc:"Polo YkoniC vert olive en piqué coton premium. Col côtelé tricolore, broderie couronne YK dorée sur poitrine." },
    
  { id:3, name:"Polo YkoniC Bleu Navy", brand:"YkoniC", cat:"Polos",
    price:9000, badge:"New",
    images: ["/images/polo-navy-1.jpg", "/images/polo-navy-2.jpg", "/images/polo-navy-3.jpg","/images/polo-navy-4.jpg"], emoji:"👕",
    sizes:["S","M","L","XL","XXL"],
    desc:"Polo YkoniC bleu navy en piqué coton premium. Col côtelé tricolore, broderie couronne YK dorée." },
    
  { id:4, name:"T-Shirt Sope YkoniC", brand:"YkoniC", cat:"T-Shirts",
    price:8000,
    images: ["/images/tshirt-sope.jpg", "/images/tshirt-sope-1.jpg"], emoji:"👕",
    sizes:["S","M","L","XL"],
    desc:"T-shirt oversize blanc avec imprimé graffiti Sope. Coton jersey 220g, coupe moderne streetwear." },
    
  { id:5, name:"T-Shirt Crazy Animals", brand:"YkoniC", cat:"T-Shirts",
    price:8000,
    images: ["/images/tshirt-crazy.jpg", "/images/tshirt-crazy-1.jpg"], emoji:"👕",
    sizes:["S","M","L","XL"],
    desc:"T-shirt oversize blanc avec imprimé Crazy Animals. Style street art original, coton jersey premium." },
    
  { id:6, name:"T-Shirt Boston Bear Noir", brand:"YkoniC", cat:"T-Shirts",
    price:8500,
    images: ["/images/tshirt-boston.jpg", "/images/tshirt-boston-1.jpg"], emoji:"👕",
    sizes:["S","M","L","XL"],
    desc:"T-shirt oversize noir avec imprimé Boston Bear. Graphisme streetwear exclusif, coton jersey 220g." },
    
  { id:7, name:"T-Shirt Celestial Noir", brand:"YkoniC", cat:"T-Shirts",
    price:8500,
    images: ["/images/tshirt-celestial.jpg", "/images/tshirt-celestial-1.jpg"], emoji:"👕",
    sizes:["S","M","L","XL"],
    desc:"T-shirt oversize noir avec imprimé Celestial Street Market. Style vintage américain, coton jersey premium." },
]

const CATS = ["Tout","Polos","Ensembles","Survêtements","Joggings","Casquettes","Jeans","Chaussures","Accessoires"]
const waMsg = (p, size) => `https://wa.me/${WA}?text=${encodeURIComponent(`Bonjour YkoniC 👑\n\nJe souhaite commander :\n• *${p.name}*${size && size!=="Unique" ? `\n• Taille : ${size}` : ""}\n• Prix : ${fmt(p.price)}\n\nMerci de confirmer la disponibilité.`)}`

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400/40" />
      <span style={{ color:"#B8953F", fontSize:"10px" }}>♦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400/40" />
    </div>
  )
}

function Badge({ label }) {
  if (!label) return null
  const styles = {
    Bestseller: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
    New: "bg-gray-900 text-white",
    Sale: "bg-red-500 text-white",
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide ${styles[label] || "bg-gray-100 text-gray-700"}`}>
      {label}
    </span>
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ cartCount, onPage, current }) {
  const [open, setOpen] = useState(false)
  const links = [["Accueil","home"],["Boutique","shop"],["À propos","about"]]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100/60">
      {/* Gold top bar */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button onClick={() => onPage("home")} className="hover:opacity-80 transition-opacity">
            <LogoFull variant="gold" size="sm" />
          </button>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(([l,p]) => (
              <button key={p} onClick={() => onPage(p)}
                className={`text-sm font-medium transition-colors ${current===p ? "text-amber-600" : "text-stone-500 hover:text-stone-900"}`}
                style={{ fontFamily: "Georgia, serif", letterSpacing:"0.05em" }}>
                {l}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <button className="p-2.5 rounded-xl hover:bg-amber-50 transition-colors" aria-label="Rechercher">
              <Search className="w-5 h-5 text-stone-500" />
            </button>
            <button onClick={() => onPage("cart")} aria-label="Panier"
              className="relative p-2.5 rounded-xl hover:bg-amber-50 transition-colors">
              <ShoppingBag className="w-5 h-5 text-stone-500" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 text-white text-[10px] font-black rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #B8953F, #D4AF5A)" }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2.5 rounded-xl hover:bg-amber-50 transition-colors"
              onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden py-3 border-t border-amber-100 space-y-1">
            {links.map(([l,p]) => (
              <button key={p} onClick={() => { onPage(p); setOpen(false) }}
                className="block w-full text-left px-3 py-3 text-stone-700 hover:bg-amber-50 rounded-xl text-sm font-medium transition-colors"
                style={{ fontFamily:"Georgia, serif" }}>
                {l}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function Card({ p, onView }) {
  const [liked, setLiked] = useState(false)
  const [hov, setHov] = useState(false)
  return (
    <div onClick={() => onView(p)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-100/50 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
        <img 
          src={p.images[0]} // Affiche la première image du tableau
          alt={p.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {/* Gold shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/0 to-amber-200/0 group-hover:from-amber-100/10 group-hover:to-transparent transition-all duration-500" />

        {/* Badges */}
        <div className="absolute top-3 left-3">
          <Badge label={p.badge} />
        </div>
        {p.brand === "YkoniC" && (
          <div className="absolute top-3 right-10 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-sm"
            style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.15em", color:"#B8953F" }}>
            YKONIC
          </div>
        )}
        <button onClick={e => { e.stopPropagation(); setLiked(!liked) }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-all"
          aria-label="Favoris">
          <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : "text-stone-400"}`} />
        </button>

        {/* CTA hover */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-white/96 backdrop-blur-sm transform transition-all duration-200 ${hov ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
          <a href={waMsg(p)} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-center gap-2 w-full text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: "linear-gradient(135deg, #25D366, #20BA5A)" }}>
            <MessageCircle className="w-4 h-4" /> Commander
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color:"#B8953F", fontFamily:"Georgia,serif" }}>{p.cat}</p>
        <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight group-hover:text-amber-700 transition-colors"
          style={{ fontFamily:"Georgia, serif" }}>
          {p.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          {[...Array(5)].map((_,i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating||4.8) ? "fill-amber-400 text-amber-400" : "text-stone-200"}`} />
          ))}
          <span className="text-[10px] text-stone-400">({p.reviews||0})</span>
        </div>
        <p className="font-black text-gray-900" style={{ fontFamily:"Georgia,serif", fontSize:"15px" }}>{fmt(p.price)}</p>
      </div>
    </div>
  )
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function Home({ onShop, onView }) {
  const featured = PRODUCTS.filter(p => p.brand === "YkoniC").slice(0, 4)

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        {/* Background gold glow subtil */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-10"
            style={{ background:"radial-gradient(circle, #B8953F 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Texte */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 border"
                style={{ borderColor:"#D4AF5A40", background:"#FDF8EE" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#B8953F" }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color:"#B8953F", fontFamily:"Georgia,serif" }}>
                  Nouvelle Collection 2025
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.02] mb-4"
                style={{ fontFamily:"Georgia, 'Times New Roman', serif" }}>
                Sois
                <span className="block" style={{ WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  backgroundImage:"linear-gradient(135deg, #B8953F 0%, #D4AF5A 50%, #9A7A30 100%)",
                  backgroundClip:"text" }}>
                  YkoniC.
                </span>
              </h1>

              <GoldDivider />

              <p className="text-lg text-stone-500 leading-relaxed mb-10 max-w-md mt-4">
                Mode premium pour hommes ambitieux. YkoniC — portez la couronne à N'Djamena.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={onShop}
                  className="inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 shadow-lg"
                  style={{ background:"linear-gradient(135deg, #B8953F, #D4AF5A)", boxShadow:"0 8px 24px #B8953F30" }}>
                  Voir la boutique <ArrowRight className="w-4 h-4" />
                </button>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 text-green-700 bg-green-50 hover:bg-green-100 px-8 py-4 rounded-xl font-bold text-sm transition-colors"
                  style={{ borderColor:"#86EFAC" }}>
                  <MessageCircle className="w-4 h-4" /> +235 90 44 55 78
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-5 text-sm text-stone-500">
                {[
                  { icon: CheckCircle, text:"Qualité garantie", color:"text-green-500" },
                  { icon: MapPin, text:"Livraison N'Djamena", color:"text-amber-500" },
                  { icon: Shield, text:"Paiement à la livraison", color:"text-blue-500" },
                ].map(({ icon: Icon, text, color }) => (
                  <span key={text} className="flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 ${color}`} /> {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual hero */}
            <div className="hidden lg:block relative">
              <div className="w-full aspect-square rounded-3xl overflow-hidden relative flex items-center justify-center"
                style={{ background:"linear-gradient(135deg, #FDF8EE 0%, #F5EDD4 100%)" }}>
                {/* Logo géant en arrière-plan */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <LogoFull variant="gold" size="lg" />
                </div>
                <span className="text-[140px] select-none opacity-20">👑</span>

                {/* Gradient overlay bas */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent" />
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-amber-100">
                <p className="text-xs text-stone-400 mb-1">⭐ Bestseller</p>
                <p className="font-black text-gray-900 text-sm" style={{ fontFamily:"Georgia,serif" }}>Polo Signature</p>
                <p className="font-bold text-sm mt-1" style={{ color:"#B8953F" }}>18 500 FCFA</p>
              </div>
              <div className="absolute -top-4 -right-4 rounded-2xl p-4 shadow-xl text-white"
                style={{ background:"linear-gradient(135deg, #B8953F, #9A7A30)" }}>
                <p className="text-xs opacity-70 mb-0.5">Clients satisfaits</p>
                <p className="font-black text-2xl">500+</p>
                <div className="flex gap-0.5 mt-1">
                  {[...Array(5)].map((_,i) => <Star key={i} className="w-3 h-3 fill-white text-white" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color:"#B8953F", fontFamily:"Georgia,serif" }}>Collections</p>
          <h2 className="text-2xl font-black text-gray-900" style={{ fontFamily:"Georgia,serif" }}>Explorez nos univers</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label:"Polos & T-Shirts", emoji:"👕", count:"3 pièces", bg:"from-stone-50 to-amber-50/30" },
            { label:"Survêts & Joggings", emoji:"🥋", count:"2 pièces", bg:"from-zinc-50 to-stone-100" },
            { label:"Chaussures", emoji:"👟", count:"1 modèle", bg:"from-slate-50 to-gray-100" },
            { label:"Accessoires", emoji:"🧢", count:"2 pièces", bg:"from-amber-50 to-yellow-50" },
          ].map(c => (
            <button key={c.label} onClick={onShop}
              className={`group bg-gradient-to-br ${c.bg} rounded-2xl p-5 text-left border border-stone-100 hover:border-amber-200 hover:shadow-lg transition-all duration-200`}>
              <span className="text-3xl mb-3 block">{c.emoji}</span>
              <p className="font-bold text-gray-900 text-sm leading-tight" style={{ fontFamily:"Georgia,serif" }}>{c.label}</p>
              <p className="text-xs text-stone-400 mt-0.5">{c.count}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color:"#B8953F" }}>
                Explorer <ChevronRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUITS VEDETTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color:"#B8953F", fontFamily:"Georgia,serif" }}>Exclusivités</p>
            <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily:"Georgia,serif" }}>Marque YkoniC</h2>
          </div>
          <button onClick={onShop} className="hidden sm:flex items-center gap-1 text-sm font-semibold text-stone-400 hover:text-amber-600 transition-colors">
            Tout voir <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(p => <Card key={p.id} p={p} onView={onView} />)}
        </div>
      </section>

      {/* BANNIÈRE WHATSAPP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background:"linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%)" }}>
          {/* Gold accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background:"linear-gradient(90deg, transparent, #B8953F, transparent)" }} />
          <div className="absolute -top-20 right-20 w-64 h-64 rounded-full opacity-5"
            style={{ background:"radial-gradient(circle, #B8953F, transparent)" }} />

          <div className="text-center md:text-left">
            <div className="mb-3">
              <LogoFull variant="white" size="sm" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-4 mb-2" style={{ fontFamily:"Georgia,serif" }}>
              Commandez sur WhatsApp
            </h2>
            <p className="text-stone-400 text-sm">Réponse en moins de 2h · Paiement à la livraison · Livraison N'Djamena</p>
          </div>

          <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 text-white px-8 py-4 rounded-xl font-black text-sm transition-all hover:scale-105 shadow-xl whitespace-nowrap"
            style={{ background:"linear-gradient(135deg, #25D366, #1DB954)", boxShadow:"0 8px 32px #25D36640" }}>
            <MessageCircle className="w-5 h-5" />
            +235 90 44 55 78
          </a>
        </div>
      </section>

      {/* AVIS */}
      <section className="py-20" style={{ background:"#FAFAF7" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color:"#B8953F", fontFamily:"Georgia,serif" }}>Témoignages</p>
            <h2 className="text-3xl font-black text-gray-900" style={{ fontFamily:"Georgia,serif" }}>Ils portent la couronne</h2>
            <GoldDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name:"Mahamat A.", city:"N'Djamena", r:5, txt:"Le polo est de très bonne qualité, coupe parfaite. Commandé via WhatsApp, reçu le lendemain. YkoniC c'est sérieux !", av:"from-amber-400 to-yellow-500" },
              { name:"Ibrahim S.", city:"Moundou", r:5, txt:"Le survêtement Elite est incroyable — tissu premium, finitions impeccables. La meilleure marque tchadienne.", av:"from-stone-400 to-gray-600" },
              { name:"Oumar D.", city:"N'Djamena", r:5, txt:"Service client top, échange de taille sans problème. La casquette Crown est vraiment de qualité. Déjà 4 commandes !", av:"from-amber-600 to-orange-600" },
            ].map((t,i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:border-amber-100 hover:shadow-md transition-all">
                {/* Gold quote */}
                <div className="text-4xl font-black mb-2 leading-none" style={{ color:"#B8953F", fontFamily:"Georgia,serif", opacity:0.3 }}>"</div>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.r)].map((_,j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-6">{t.txt}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.av} flex-shrink-0`} />
                  <div>
                    <p className="font-bold text-gray-900 text-sm" style={{ fontFamily:"Georgia,serif" }}>{t.name}</p>
                    <p className="text-xs text-stone-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{t.city} · Client vérifié</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#0A0A0A" }} className="text-stone-500">
        <div className="h-0.5" style={{ background:"linear-gradient(90deg, transparent, #B8953F, transparent)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <LogoFull variant="gold" size="sm" />
              <p className="text-sm leading-relaxed mt-4 mb-5">Mode premium pour hommes. N'Djamena, Tchad.</p>
              <div className="space-y-2.5 text-sm">
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                  <MessageCircle className="w-4 h-4 text-green-400" /> +235 90 44 55 78
                </a>
                <p className="flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-400" />{IG}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color:"#B8953F" }} />{VILLE}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" />Lun–Sam · 8h–20h</p>
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-4" style={{ fontFamily:"Georgia,serif" }}>Boutique</p>
              <ul className="space-y-2 text-sm">
                {["Polos YkoniC","Ensembles","Survêtements Elite","Joggings","Casquettes Crown","Jeans","Chaussures","Sacs"].map(l => (
                  <li key={l}><button className="hover:text-white transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-bold text-sm mb-4" style={{ fontFamily:"Georgia,serif" }}>La marque</p>
              <ul className="space-y-2 text-sm">
                {["Notre histoire","Guide des tailles","Livraison & zones","Retours & échanges","FAQ"].map(l => (
                  <li key={l}><button className="hover:text-white transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <p>© 2026 YkoniC. Tous droits réservés.</p>
            <p style={{ color:"#B8953F" }}>👑 Fait avec fierté à N'Djamena</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── SHOP ─────────────────────────────────────────────────────────────────────
function Shop({ onView }) {
  const [cat, setCat] = useState("Tout")
  const list = cat === "Tout" ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color:"#B8953F", fontFamily:"Georgia,serif" }}>Catalogue</p>
        <h1 className="text-3xl font-black text-gray-900" style={{ fontFamily:"Georgia,serif" }}>Toute la boutique</h1>
        <GoldDivider />
      </div>
      <div className="flex gap-2 flex-wrap mb-8">
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              cat === c ? "text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
            style={cat === c ? { background:"linear-gradient(135deg, #B8953F, #D4AF5A)" } : {}}>
            {c}
          </button>
        ))}
      </div>
      <p className="text-sm text-stone-400 mb-6">{list.length} article{list.length > 1 ? "s" : ""}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {list.map(p => <Card key={p.id} p={p} onView={onView} />)}
      </div>
    </div>
  )
}

// ─── PRODUCT PAGE (Mise à jour avec l'affichage interactif des miniatures) ───
function ProductPage({ p, onBack }) {
  // L'état activeImg permet de traquer l'image affichée en grand. Elle prend par défaut la première image du produit.
  const [activeImg, setActiveImg] = useState(p.images[0])
  const [size, setSize] = useState(null)
  const [liked, setLiked] = useState(false)
  const similar = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4)

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-amber-600 transition-colors mb-8">
          ← Retour
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
          {/* Visuel */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-3xl relative overflow-hidden border border-amber-100 bg-stone-50">
              {/* On affiche l'image active ici */}
              <img src={activeImg} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/10 to-transparent pointer-events-none" />
              {/* Logo watermark */}
              <div className="absolute bottom-4 right-4 opacity-20 pointer-events-none">
                <LogoFull variant="gold" size="sm" />
              </div>
            </div>
            
            {/* Génération automatique des miniatures en fonction de la liste d'images */}
            <div className="flex gap-3 overflow-x-auto py-1">
              {p.images.map((imgSrc, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImg(imgSrc)} // Change l'image affichée en grand au clic
                  className={`w-20 h-24 rounded-xl flex items-center justify-center overflow-hidden border transition-all bg-stone-50 cursor-pointer flex-shrink-0 ${
                    activeImg === imgSrc 
                      ? "border-amber-400 ring-2 ring-amber-300/50 opacity-100" 
                      : "border-stone-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={imgSrc} alt={`${p.name} - Vue ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Infos */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400" style={{ fontFamily:"Georgia,serif" }}>{p.cat}</span>
              {p.brand === "YkoniC" && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider border"
                  style={{ color:"#B8953F", borderColor:"#D4AF5A60", background:"#FDF8EE", fontFamily:"Georgia,serif" }}>
                  YKONIC ORIGINAL
                </span>
              )}
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-3 leading-tight" style={{ fontFamily:"Georgia,serif" }}>{p.name}</h1>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-1">
                {[...Array(5)].map((_,i) => <Star key={i} className={`w-4 h-4 ${i<4?"fill-amber-400 text-amber-400":"text-stone-200"}`}/>)}
              </div>
              <span className="text-sm text-stone-400">4.9 · {p.reviews||0} avis</span>
            </div>
            <div className="mb-5 pb-5 border-b border-stone-100">
              <span className="text-3xl font-black text-gray-900" style={{ fontFamily:"Georgia,serif" }}>{fmt(p.price)}</span>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-8">{p.desc}</p>

            {/* Tailles */}
            {p.sizes && p.sizes[0] !== "Unique" && (
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <p className="text-sm font-bold text-gray-900">Taille</p>
                  <button className="text-xs hover:underline" style={{ color:"#B8953F" }}>Guide des tailles</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)}
                      className={`px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                        size===s ? "text-white border-transparent" : "border-stone-200 text-stone-700 hover:border-amber-300"}`}
                      style={size===s ? { background:"linear-gradient(135deg, #B8953F, #D4AF5A)", borderColor:"transparent" } : {}}>
                      {s}
                    </button>
                  ))}
                </div>
                {!size && <p className="text-xs mt-2" style={{ color:"#B8953F" }}>⚠️ Sélectionne une taille avant de commander</p>}
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 mb-8">
              <a href={waMsg(p, size)} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 text-white py-4 rounded-xl font-black text-sm transition-all hover:opacity-90 shadow-lg"
                style={{ background:"linear-gradient(135deg, #25D366, #1DB954)", boxShadow:"0 8px 24px #25D36630" }}>
                <MessageCircle className="w-5 h-5" /> Commander via WhatsApp
              </a>
              <button onClick={() => setLiked(!liked)}
                className="w-full flex items-center justify-center gap-2 border-2 border-stone-200 hover:border-red-200 hover:bg-red-50 text-stone-600 hover:text-red-500 py-3.5 rounded-xl font-semibold text-sm transition-all">
                <Heart className={`w-4 h-4 ${liked?"fill-red-500 text-red-500":""}`} />
                {liked ? "Retiré des favoris" : "Ajouter aux favoris"}
              </button>
            </div>

            {/* Trust */}
            <div className="rounded-2xl p-5 space-y-3 border border-amber-100" style={{ background:"#FDFAF3" }}>
              {[
                { icon:Truck, t:"Livraison N'Djamena sous 24h", s:"Gratuite dès 25 000 FCFA" },
                { icon:Shield, t:"Paiement à la livraison disponible", s:"Cash ou Mobile Money" },
                { icon:RotateCcw, t:"Échange sous 7 jours", s:"Si défaut de fabrication" },
              ].map(({ icon:Icon, t, s }) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border border-amber-200"
                    style={{ background:"white" }}>
                    <Icon className="w-4 h-4" style={{ color:"#B8953F" }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{t}</p>
                    <p className="text-xs text-stone-400">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily:"Georgia,serif" }}>Tu pourrais aussi aimer</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map(x => <Card key={x.id} p={x} onView={() => {}} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <LogoFull variant="gold" size="lg" />
        <GoldDivider />
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 mt-6" style={{ color:"#B8953F" }}>Notre histoire</p>
        <h1 className="text-4xl font-black text-gray-900 mb-6" style={{ fontFamily:"Georgia,serif" }}>La couronne, c'est toi.</h1>
        <p className="text-stone-500 leading-relaxed max-w-xl mx-auto">
          YkoniC est née à N'Djamena d'une conviction : les hommes africains méritent une mode premium, locale et accessible. Porter YkoniC, c'est affirmer son style avec élégance.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { emoji:"🎯", title:"Notre mission", text:"Proposer des pièces de qualité premium à des prix accessibles, conçues pour l'homme tchadien moderne et ambitieux." },
          { emoji:"🌍", title:"Notre ancrage", text:"100% basée à N'Djamena. Nous livrons dans toute la ville avec un service rapide et personnalisé." },
          { emoji:"👑", title:"Notre promesse", text:"Chaque pièce YkoniC est rigoureusement sélectionnée. Qualité garantie ou échange sans question." },
        ].map(v => (
          <div key={v.title} className="rounded-2xl p-6 text-center border border-amber-100" style={{ background:"#FDFAF3" }}>
            <div className="text-4xl mb-4">{v.emoji}</div>
            <h3 className="font-black text-gray-900 mb-3" style={{ fontFamily:"Georgia,serif" }}>{v.title}</h3>
            <p className="text-stone-500 text-sm leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl p-10 text-center" style={{ background:"linear-gradient(135deg, #0F0F0F, #1A1A1A)" }}>
        <div className="mb-4">
          <LogoFull variant="gold" size="md" />
        </div>
        <h2 className="text-2xl font-black text-white mt-4 mb-3" style={{ fontFamily:"Georgia,serif" }}>Rejoins la famille YkoniC</h2>
        <p className="text-stone-400 text-sm mb-6">Des questions ? Une commande spéciale ? Écris-nous directement.</p>
        <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-black text-sm transition-all hover:opacity-90"
          style={{ background:"linear-gradient(135deg, #25D366, #1DB954)" }}>
          <MessageCircle className="w-5 h-5" /> +235 90 44 55 78
        </a>
      </div>
    </div>
  )
}

// ─── CART ─────────────────────────────────────────────────────────────────────
function Cart({ items, onQty, onRemove, onShop, onBack }) {
  const sub = items.reduce((s,i) => s+i.price*(i.qty||1), 0)
  const free = sub >= 25000
  const msg = encodeURIComponent(
    `Bonjour YkoniC 👑\n\nMa commande :\n\n${items.map(i=>`• *${i.name}* × ${i.qty||1}${i.size&&i.size!=="Unique"?` (${i.size})`:""} — ${fmt(i.price*(i.qty||1))}`).join("\n")}\n\n*Total : ${fmt(sub)}*\n\nMerci de confirmer et d'arranger la livraison.`
  )

  if (!items.length) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-100" style={{ background:"#FDFAF3" }}>
        <ShoppingBag className="w-8 h-8" style={{ color:"#B8953F" }} />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-3" style={{ fontFamily:"Georgia,serif" }}>Panier vide</h2>
      <p className="text-stone-500 mb-8 text-sm">Découvrez nos pièces premium dans la boutique.</p>
      <button onClick={onShop} className="text-white px-8 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90"
        style={{ background:"linear-gradient(135deg, #B8953F, #D4AF5A)" }}>
        Voir la boutique
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-amber-600 transition-colors mb-8">← Continuer mes achats</button>
      <h1 className="text-3xl font-black text-gray-900 mb-8" style={{ fontFamily:"Georgia,serif" }}>
        Mon panier <span className="text-stone-400 font-normal text-xl">({items.length})</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-5 p-4 bg-white border border-stone-100 rounded-2xl shadow-sm hover:border-amber-100 transition-all">
              <div className="w-24 h-28 rounded-xl flex items-center justify-center flex-shrink-0 border border-amber-50 overflow-hidden bg-stone-50">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2 mb-1">
                  <p className="font-black text-gray-900 text-sm leading-tight" style={{ fontFamily:"Georgia,serif" }}>{item.name}</p>
                  <p className="font-black text-gray-900 whitespace-nowrap text-sm" style={{ fontFamily:"Georgia,serif" }}>{fmt(item.price*(item.qty||1))}</p>
                </div>
                {item.size && item.size !== "Unique" && <p className="text-xs text-stone-400 mb-2">Taille : {item.size}</p>}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 border border-stone-200 rounded-xl px-3 py-1.5 bg-stone-50">
                    <button onClick={() => onQty(item.id,(item.qty||1)-1)} className="text-stone-400 hover:text-gray-900 transition-colors"><Minus className="w-3.5 h-3.5"/></button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty||1}</span>
                    <button onClick={() => onQty(item.id,(item.qty||1)+1)} className="text-stone-400 hover:text-gray-900 transition-colors"><Plus className="w-3.5 h-3.5"/></button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="flex items-center gap-1 text-xs text-stone-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5"/> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky top-24 h-fit">
          <div className="rounded-2xl p-6 border border-amber-100" style={{ background:"#FDFAF3" }}>
            {/* Logo dans récap */}
            <div className="flex justify-center mb-5">
              <LogoFull variant="gold" size="sm" />
            </div>
            <GoldDivider />
            <div className="space-y-3 my-5 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Sous-total</span><span>{fmt(sub)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Livraison</span>
                <span className={free?"text-green-600 font-bold":""}>{free?"Gratuite 🎉":"À confirmer"}</span>
              </div>
              {!free && (
                <p className="text-xs rounded-lg px-3 py-2 border border-amber-200" style={{ background:"white", color:"#9A7A30" }}>
                  Encore <strong>{fmt(25000-sub)}</strong> pour la livraison gratuite !
                </p>
              )}
            </div>
            <div className="border-t border-amber-100 pt-4 mb-5">
              <div className="flex justify-between font-black text-gray-900 text-lg" style={{ fontFamily:"Georgia,serif" }}>
                <span>Total</span><span>{fmt(sub)}</span>
              </div>
            </div>
            <a href={`https://wa.me/${WA}?text=${msg}`} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-white py-4 rounded-xl font-black text-sm transition-all hover:opacity-90 shadow-lg"
              style={{ background:"linear-gradient(135deg, #25D366, #1DB954)" }}>
              <MessageCircle className="w-5 h-5" /> Envoyer sur WhatsApp
            </a>
            <p className="text-xs text-stone-400 text-center mt-2">Récapitulatif envoyé automatiquement</p>
            <div className="mt-4 pt-4 border-t border-amber-100 space-y-2">
              {["Paiement à la livraison disponible","Livraison N'Djamena sous 24h","Échange sous 7 jours"].map(t => (
                <p key={t} className="flex items-center gap-2 text-xs text-stone-500">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0"/>{t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function YkonicApp() {
  const [page, setPage] = useState("home")
  const [prev, setPrev] = useState("home")
  const [product, setProduct] = useState(null)
  const [cart, setCart] = useState([])

  const go = p => { setPrev(page); setPage(p) }
  const view = p => { setProduct(p); setPrev(page); setPage("product") }

  const addCart = p => {
    setCart(c => {
      const k = `${p.id}-${p.size||"u"}`
      const ex = c.find(i=>`${i.id}-${i.size||"u"}`===k)
      if (ex) return c.map(i=>`${i.id}-${i.size||"u"}`===k?{...i,qty:(i.qty||1)+1}:i)
      return [...c, {...p, qty:1}]
    })
  }

  const updQty = (id, q) => {
    if (q < 1) { setCart(c=>c.filter(i=>i.id!==id)); return }
    setCart(c=>c.map(i=>i.id===id?{...i,qty:q}:i))
  }

  const total = cart.reduce((s,i)=>s+(i.qty||1),0)

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily:"'Inter', system-ui, sans-serif" }}>
      <Nav cartCount={total} onPage={go} current={page} />
      {page==="home"    && <Home onShop={()=>go("shop")} onView={view} />}
      {page==="shop"    && <Shop onView={view} />}
      {page==="product" && product && <ProductPage p={product} onBack={()=>go(prev)} />}
      {page==="about"   && <About />}
      {page==="cart"    && <Cart items={cart} onQty={updQty} onRemove={id=>setCart(c=>c.filter(i=>i.id!==id))} onShop={()=>go("shop")} onBack={()=>go(prev)} />}

      {/* WhatsApp floating */}
      <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110"
        style={{ background:"linear-gradient(135deg, #25D366, #1DB954)", boxShadow:"0 8px 32px #25D36650" }}
        aria-label="WhatsApp YkoniC">
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  )
}
