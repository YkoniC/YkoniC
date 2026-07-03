"use client"
  
import { useState } from "react"
import {
  ShoppingBag, Heart, Search, Star, Menu, X,
  ChevronRight, ArrowRight, Instagram, MessageCircle,
  MapPin, Clock, Minus, Plus, Trash2,
  Shield, Truck, RotateCcw, CheckCircle, Phone
} from "lucide-react"

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const WA = "23590445578"
const IG = "@ykonic_official"
const VILLE = "N'Djamena, Tchad"

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

// ─── DONNÉES PRODUITS ─────────────────────────────────────────────────────────
const fmt = n => new Intl.NumberFormat("fr-FR").format(n) + " FCFA"

const PRODUCTS = [
  { id:1, name:"Polo YkoniC Blanc", brand:"YkoniC", cat:"Polos",
    price:10000, badge:"Bestseller",
    img:"/images/polo-blanc-1.jpg", emoji:"👕",
    sizes:["S","M","L","XL","XXL"],
    desc:"Polo YkoniC blanc en piqué coton premium. Col côtelé tricolore rouge-blanc-noir, broderie couronne YK dorée sur poitrine. Coupe ajustée moderne." },
  { id:2, name:"Polo YkoniC Vert Olive", brand:"YkoniC", cat:"Polos",
    price:10000,
    img:"/images/polo-olive.jpg", emoji:"👕",
    sizes:["S","M","L","XL","XXL"],
    desc:"Polo YkoniC vert olive en piqué coton premium. Col côtelé tricolore, broderie couronne YK dorée sur poitrine. Élégant et polyvalent." },
  { id:3, name:"Polo YkoniC Bleu Navy", brand:"YkoniC", cat:"Polos",
    price:9000, badge:"New",
    img:"/images/polo-navy-1.jpg", emoji:"👕",
    sizes:["S","M","L","XL","XXL"],
    desc:"Polo YkoniC bleu navy en piqué coton premium. Col côtelé tricolore rouge-blanc-noir, broderie couronne YK dorée. Style premium et raffiné." },
  { id:4, name:"T-Shirt Sope YkoniC", brand:"YkoniC", cat:"T-Shirts",
    price:8000,
    img:"/images/tshirt-sope.jpg", emoji:"👕",
    sizes:["S","M","L","XL"],
    desc:"T-shirt oversize blanc avec imprimé graffiti Sope. Coton jersey 220g, coupe moderne streetwear." },
  { id:5, name:"T-Shirt Crazy Animals", brand:"YkoniC", cat:"T-Shirts",
    price:8000,
    img:"/images/tshirt-crazy.jpg", emoji:"👕",
    sizes:["S","M","L","XL"],
    desc:"T-shirt oversize blanc avec imprimé Crazy Animals. Style street art original, coton jersey premium." },
  { id:6, name:"T-Shirt Boston Bear Noir", brand:"YkoniC", cat:"T-Shirts",
    price:8500,
    img:"/images/tshirt-boston.jpg", emoji:"👕",
    sizes:["S","M","L","XL"],
    desc:"T-shirt oversize noir avec imprimé Boston Bear. Graphisme streetwear exclusif, coton jersey 220g." },
  { id:7, name:"T-Shirt Celestial Noir", brand:"YkoniC", cat:"T-Shirts",
    price:8500,
    img:"/images/tshirt-celestial.jpg", emoji:"👕",
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
          src={p.img} 
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
                Mode premium pour hommes ambitieux. Polos, survêtements, ensembles et accessoires — portez la couronne à N'Djamena.
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
                <p className="
